import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as TWEEN from '@tweenjs/tween.js';

const SimpleModelViewer = () => {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee); // Slightly off-white background
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      35, // Wider field of view
      containerRef.current.clientWidth / containerRef.current.clientHeight, // aspect ratio
      0.1, // near
      1000 // far
    );
    camera.position.set(0, 1.2, 8); // Lower and closer perspective
    
    // Create renderer with improved settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
      precision: 'highp' // Use high precision for more stable rendering
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Use newer encoding settings for better stability
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // More stable tone mapping
    renderer.toneMappingExposure = 0.03; // More reasonable exposure value
    containerRef.current.appendChild(renderer.domElement);
    
    // Balanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(0, 10, 0);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048; // Increased resolution
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.bias = -0.00005; // Less aggressive bias to reduce shadow acne
    directionalLight.shadow.normalBias = 0.02; // Add normal bias to reduce shadow artifacts
    scene.add(directionalLight);
    
    function createSpotlight(x, y, z, intensity, distance) {
      const spotLight = new THREE.SpotLight(0xffffff, intensity, distance, Math.PI / 6, 0.3); // reduce penumbra, keep intensity
      spotLight.position.set(x, y, z);
      spotLight.castShadow = true;
      spotLight.shadow.mapSize.width = 512;
      spotLight.shadow.mapSize.height = 512;
      spotLight.target.position.set(x, 0, z);
      scene.add(spotLight.target);
      return spotLight;
    }
    
    const leftWallLights = [];
    const rightWallLights = [];
    for (let i = -15; i <= 15; i += 7.5) {
      const leftLight =createSpotlight(-10, 5, i, 0.5, 10); // Try 0.3 to 0.6
      scene.add(leftLight);
      leftWallLights.push(leftLight);
      
      const rightLight = createSpotlight(-10, 5, i, 0.5, 10); // Try 0.3 to 0.6
      scene.add(rightLight);
      rightWallLights.push(rightLight);
    }
    
    const fillLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.05);
    scene.add(fillLight);
    
    // Add floor with more stable rendering properties
    const floorGeometry = new THREE.PlaneGeometry(50, 50);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.05, // Reduced metalness
      roughness: 0.9, // Increased roughness for stability
      envMapIntensity: 0.1 // Lower reflection intensity
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.51; // Very slightly lower to avoid z-fighting
    floor.receiveShadow = true;
    // Add renderOrder to ensure floor renders first
    floor.renderOrder = -1;
    scene.add(floor);
    
    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.minDistance = 0.5;
    controls.maxDistance = 50;
    controls.target.set(0, 0, 0);
    
    // Setup raycaster for object selection with improved precision
    const raycaster = new THREE.Raycaster();
    raycaster.params.Line.threshold = 0.1; // Improve precision
    const mouse = new THREE.Vector2();
    
    // Create a movable object
    // This is a simple 3D box that can be positioned anywhere with a click
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x1e88e5, 
      metalness: 0.5, 
      roughness: 0.2 
    });
    const movableObject = new THREE.Mesh(geometry, material);
    movableObject.castShadow = true;
    movableObject.receiveShadow = true;
    movableObject.position.set(0, 0, 0);
    scene.add(movableObject);
    
    // Movement system variables
    const velocity = new THREE.Vector3();
    const targetPosition = new THREE.Vector3();
    const isMoving = { current: false };
    const moveSpeed = 2; // Units per second
    
    // Camera following variables
    const cameraOffset = new THREE.Vector3(0, 3, 5);
    const cameraLerpFactor = 0.1;
    
    // Click event handler to set movement target
    const handleClick = (event) => {
      event.preventDefault();
      
      // Calculate mouse position in normalized device coordinates
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Update the raycaster
      raycaster.setFromCamera(mouse, camera);
      
      // Find all intersected objects
      const intersects = raycaster.intersectObjects(scene.children, true);
      
      if (intersects.length > 0) {
        // Get the first intersected object (closest to camera)
        const intersect = intersects[0];
        
        // Ignore if clicked on the movable object itself
        if (intersect.object === movableObject) return;
        
        // Determine if the clicked object is a wall (not floor or ceiling)
        const normal = intersect.face.normal.clone();
        // Transform the normal to world space
        normal.transformDirection(intersect.object.matrixWorld);
        
        // Calculate the absolute value of the Y component of the normal
        const absNormalY = Math.abs(normal.y);
        
        // If absNormalY is close to 1, it's likely a floor or ceiling
        // (normal pointing up or down)
        if (absNormalY > 0.8) {
          // This is floor or ceiling, do not move
          console.log('Clicked on floor/ceiling, not moving');
          return;
        }
        
        // It's a wall, proceed with movement
        // Calculate direction from the intersection to the camera (viewing direction)
        // This ensures we're moving away from the wall, not into it
        const viewDirection = new THREE.Vector3().subVectors(camera.position, intersect.point).normalize();
        
        // Calculate dot product to determine if we need to flip the normal
        const dot = viewDirection.dot(intersect.face.normal);
        
        // If dot product is negative, the normal is facing away from the camera
        // We need to use either the face normal or its opposite based on camera position
        const offsetDirection = dot < 0 ? 
            intersect.face.normal.clone().negate() : // Flip if facing away from camera
            intersect.face.normal.clone(); // Use as is if facing camera
        
        // Create a target position that's 10cm (0.1 units) away from the intersection point
        // along the correct direction (away from the wall)
        targetPosition.copy(intersect.point).addScaledVector(offsetDirection, 0.1);
        isMoving.current = true;
        
        // Disable orbit controls during movement
        controls.enabled = false;
      }
    };
    
    // Define room boundaries (adjust values based on your room size)
    const roomBoundaries = {
      minX: -10, // Left wall
      maxX: 10,  // Right wall
      minZ: -15, // Back wall
      maxZ: 15,  // Front wall
      buffer: 0.2 // Keep object slightly away from walls
    };
    
    // Function to check and adjust position to stay within room boundaries
    const enforceRoomBoundaries = (position) => {
      // Apply buffer to keep the object slightly away from walls
      position.x = Math.max(roomBoundaries.minX + roomBoundaries.buffer, 
                         Math.min(roomBoundaries.maxX - roomBoundaries.buffer, position.x));
      position.z = Math.max(roomBoundaries.minZ + roomBoundaries.buffer, 
                         Math.min(roomBoundaries.maxZ - roomBoundaries.buffer, position.z));
      return position;
    };
    
    // Function to update character and camera movement
    const updateMovement = (deltaTime) => {
      if (!isMoving.current) return;
      
      const currentPos = movableObject.position;
      
      // Calculate direction and distance to target
      const direction = targetPosition.clone().sub(currentPos).normalize();
      const distanceToTarget = currentPos.distanceTo(targetPosition);
      
      // Stop if we've reached the target or very close to it (within 0.05 units)
      if (distanceToTarget < 0.05) {
        isMoving.current = false;
        controls.enabled = true;
        return;
      }
      
      // Calculate velocity based on direction and speed
      velocity.copy(direction).multiplyScalar(moveSpeed * deltaTime);
      
      // Limit movement to not overshoot target
      if (velocity.length() > distanceToTarget) {
        velocity.copy(direction).multiplyScalar(distanceToTarget);
      }
      
      // Calculate new position
      const newPosition = currentPos.clone().add(velocity);
      
      // Enforce room boundaries before applying movement
      enforceRoomBoundaries(newPosition);
      
      // Update position
      currentPos.copy(newPosition);
      
      // Rotate character to face movement direction
      if (velocity.length() > 0.01) {
        const angle = Math.atan2(direction.x, direction.z);
        movableObject.rotation.y = angle;
      }
      
      // Update camera position following the character
      const characterForward = new THREE.Vector3(0, 0, 1).applyAxisAngle(
        new THREE.Vector3(0, 1, 0),
        movableObject.rotation.y
      );
      
      const cameraTarget = currentPos.clone().add(new THREE.Vector3(0, 1.5, 0));
      const desiredCameraPosition = currentPos.clone()
        .sub(characterForward.multiplyScalar(5))
        .add(new THREE.Vector3(0, 3, 0));
      
      // Smoothly interpolate camera position
      camera.position.lerp(desiredCameraPosition, cameraLerpFactor);
      
      // Update controls target
      controls.target.lerp(cameraTarget, cameraLerpFactor);
      controls.update();
    };
    
    // Add event listener
    renderer.domElement.addEventListener('click', handleClick);
    

    
    // Add a simple cube as placeholder
    const placeholderGeometry = new THREE.BoxGeometry(1, 1, 1);
    const placeholderMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const cube = new THREE.Mesh(placeholderGeometry, placeholderMaterial);
    cube.visible = false;
    scene.add(cube);
    
    // Load model
    const loader = new GLTFLoader();
    
    loader.load(
      '/hall1.glb',
      (gltf) => {
        scene.remove(cube);
        
        const model = gltf.scene;
        model.scale.set(1.2, 1.2, 1.2);
        model.position.y = -1.5;
        model.position.z = 0;
        model.position.x = 0;
        
        model.traverse((node) => {
          if (node.isMesh && node.material.map) {
            node.material.map.encoding = THREE.sRGBEncoding;
          }
        });
        
        
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        camera.lookAt(center);
        
        scene.add(model);
        setLoading(false);
      },
      (xhr) => {
        const progress = (xhr.loaded / xhr.total) * 100;
        setLoadingProgress(Math.round(progress));
      },
      (error) => {
        console.error('Error loading GLB model:', error);
        setError('Failed to load 3D model. Please try again later.');
        setLoading(false);
        cube.visible = true;
      }
    );
    
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Time tracking for consistent movement speed
    let lastTime = 0;
    
    const animate = (time) => {
      requestAnimationFrame(animate);
      
      // Calculate delta time for smooth animation
      const deltaTime = Math.min((time - lastTime) / 1000, 0.1); // Cap to 100ms to prevent large jumps
      lastTime = time;
      
      // Update character and camera movement
      updateMovement(deltaTime);
      
      // Only update controls if not moving
      if (!isMoving.current) {
        controls.update();
      }
      
      renderer.render(scene, camera);
    };
    
    // Start animation with timestamp
    animate(0);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleClick);

      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      controls.dispose();
    };
  }, []);
  
  return (
    <div style={{ position: 'relative', width: '100%', height: '600px' }}>
      <div 
        ref={containerRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      />
      
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            width: '200px',
            height: '6px',
            background: '#ddd',
            borderRadius: '3px',
            overflow: 'hidden',
            marginBottom: '10px'
          }}>
            <div style={{
              width: `${loadingProgress}%`,
              height: '100%',
              background: '#4a90e2',
              transition: 'width 0.3s ease-in-out'
            }} />
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Loading 3D Model... {loadingProgress}%
          </div>
        </div>
      )}
      
      {error && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '80%'
        }}>
          <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            <p>Possible issues:</p>
            <ul style={{ textAlign: 'left' }}>
              <li>The 3D model file is too large (145MB)</li>
              <li>The model format may be incompatible</li>
              <li>Your browser may have insufficient memory</li>
              <li>Network connection issues</li>
            </ul>
          </div>
        </div>
      )}
      
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255, 255, 255, 0.7)',
        padding: '5px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#666'
      }}>
        🎯 Scroll to zoom | 🔄 Right click + drag to pan | 👆 Click to smoothly move the blue cube
      </div>
    </div>
  );
};

export default SimpleModelViewer;