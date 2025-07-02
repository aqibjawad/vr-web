import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const SimpleModelViewer = () => {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);
    
    // Create camera - eye level height
    const camera = new THREE.PerspectiveCamera(
      35,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.5, 8); // Eye level height (0.5)
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 0.03;
    containerRef.current.appendChild(renderer.domElement);
    
    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(0, 10, 0);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.bias = -0.0001;
    scene.add(directionalLight);
    
    function createSpotlight(x, y, z, intensity, distance) {
      const spotLight = new THREE.SpotLight(0xffffff, intensity, distance, Math.PI / 6, 0.3);
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
      const leftLight = createSpotlight(-10, 5, i, 0.5, 10);
      scene.add(leftLight);
      leftWallLights.push(leftLight);
      
      const rightLight = createSpotlight(-10, 5, i, 0.5, 10);
      scene.add(rightLight);
      rightWallLights.push(rightLight);
    }
    
    const fillLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.05);
    scene.add(fillLight);
    
    // Add reflective floor
    const floorGeometry = new THREE.PlaneGeometry(50, 50);
    const floorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.2,
      reflectivity: 0.5,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.5;
    floor.receiveShadow = true;
    scene.add(floor);
    
    // Simple orbit controls without external library
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let spherical = new THREE.Spherical();
    spherical.setFromVector3(camera.position);
    
    const target = new THREE.Vector3(0, 0, 0);
    
    // Mouse controls
    const handleMouseDown = (event) => {
      isDragging = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };
    
    const handleMouseMove = (event) => {
      if (!isDragging) return;
      
      const deltaX = event.clientX - previousMousePosition.x;
      const deltaY = event.clientY - previousMousePosition.y;
      
      // Horizontal rotation (theta)
      spherical.theta -= deltaX * 0.01;
      
      // Vertical rotation (phi) - RESTRICTED to eye level
      spherical.phi += deltaY * 0.01;
      
      // Clamp phi to keep camera at eye level (between 1.3 and 1.8 radians)
      // This prevents camera from going too high (ceiling) or too low (floor)
      spherical.phi = Math.max(1.3, Math.min(1.8, spherical.phi));
      
      // Update camera position
      camera.position.setFromSpherical(spherical);
      camera.lookAt(target);
      
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };
    
    const handleMouseUp = () => {
      isDragging = false;
    };
    
    // Zoom controls
    const handleWheel = (event) => {
      event.preventDefault();
      
      const zoomSpeed = 0.1;
      const delta = event.deltaY > 0 ? 1 + zoomSpeed : 1 - zoomSpeed;
      
      // Zoom by changing radius
      spherical.radius *= delta;
      
      // Clamp radius
      spherical.radius = Math.max(1, Math.min(50, spherical.radius));
      
      // Update camera position
      camera.position.setFromSpherical(spherical);
      camera.lookAt(target);
    };
    
    // Add event listeners
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('wheel', handleWheel);
    
    // Click to move functionality
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    const moveToPosition = (point) => {
      const direction = new THREE.Vector3().subVectors(camera.position, point).normalize();
      const targetPosition = new THREE.Vector3().copy(point).add(direction.multiplyScalar(3));
      
      // Keep eye level height
      targetPosition.y = 0.5;
      
      // Animate camera movement
      const startPos = camera.position.clone();
      const duration = 1000;
      const startTime = Date.now();
      
      const animateCamera = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        camera.position.lerpVectors(startPos, targetPosition, easeOut);
        
        // Update spherical coordinates
        spherical.setFromVector3(camera.position);
        
        camera.lookAt(target);
        
        if (progress < 1) {
          requestAnimationFrame(animateCamera);
        }
      };
      
      animateCamera();
    };
    
    const handleClick = (event) => {
      if (isDragging) return; // Don't trigger click if dragging
      
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      
      if (intersects.length > 0) {
        const point = intersects[0].point.clone();
        moveToPosition(point);
      }
    };
    
    renderer.domElement.addEventListener('click', handleClick);
    
    // Add placeholder cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const cube = new THREE.Mesh(geometry, material);
    cube.visible = false;
    scene.add(cube);
    
    // Load model
    const loader = new THREE.GLTFLoader();
    
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
        target.copy(center);
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
    
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      renderer.domElement.removeEventListener('click', handleClick);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
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
          background: 'rgba(255, 255, 255, 0.9)',
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
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '12px',
        color: '#555',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        🎯 Mouse wheel to zoom | 🖱️ Drag to look around | 👆 Click to move to object
        <br />
        <span style={{ fontSize: '11px', color: '#777' }}>Camera locked to eye level</span>
      </div>
    </div>
  );
};

export default SimpleModelViewer;