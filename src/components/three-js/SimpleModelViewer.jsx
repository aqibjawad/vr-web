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
    scene.background = new THREE.Color(0xf5f5f5); // Slightly off-white background
    
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
      alpha: false
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 0.3;
    containerRef.current.appendChild(renderer.domElement);
    
    // Balanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 10, 0);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.bias = -0.0001;
    scene.add(directionalLight);
    
    function createSpotlight(x, y, z, intensity, distance) {
      const spotLight = new THREE.SpotLight(0xffffff, intensity * 0.3, distance, Math.PI / 6, 0.5);
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
      const leftLight = createSpotlight(-10, 5, i, 0.3, 10);
      scene.add(leftLight);
      leftWallLights.push(leftLight);
      
      const rightLight = createSpotlight(10, 5, i, 0.3, 10);
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
    
    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.minDistance = 0.5;
    controls.maxDistance = 50;
    controls.target.set(0, 0, 0);
    
    // Add raycaster for point-and-click navigation
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Navigation marker
    const markerGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 32);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.7 });
    const navigationMarker = new THREE.Mesh(markerGeometry, markerMaterial);
    navigationMarker.visible = false;
    scene.add(navigationMarker);
    
    // Click handler for navigation
    function handleNavigation(event) {
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);
      
      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(scene.children, true);
      
      // Find the first object that was clicked
      const intersection = intersects[0];
      
      if (intersection) {
        const point = intersection.point;
        
        // Show marker at intersection point
        navigationMarker.position.set(point.x, point.y + 0.05, point.z);
        navigationMarker.visible = true;
        
        // Create a temporary target for the camera movement
        const targetPosition = new THREE.Vector3(point.x, camera.position.y, point.z);
        
        // Get current position
        const startPosition = camera.position.clone();
        const startTarget = controls.target.clone();
        
        // Create tweens for smooth camera movement
        const positionTween = new TWEEN.Tween(startPosition)
          .to(targetPosition, 1000) // 1000ms = 1 second duration
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onUpdate(() => {
            camera.position.copy(startPosition);
          });
        
        const targetTween = new TWEEN.Tween(startTarget)
          .to(new THREE.Vector3(point.x, 0, point.z), 1000)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onUpdate(() => {
            controls.target.copy(startTarget);
          });
        
        // Start the tweens
        positionTween.start();
        targetTween.start();
        
        // Hide marker after movement completes
        setTimeout(() => {
          navigationMarker.visible = false;
        }, 1500);
      }
    }
    
    renderer.domElement.addEventListener('click', handleNavigation);
    
    // Add a simple cube as placeholder
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const cube = new THREE.Mesh(geometry, material);
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
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            if (node.material) {
              if (Array.isArray(node.material)) {
                node.material.forEach(mat => {
                  mat.metalness = 0.2;
                  mat.roughness = 0.1;
                  mat.side = THREE.DoubleSide;
                  mat.needsUpdate = true;
                });
              } else {
                node.material.metalness = 0.2;
                node.material.roughness = 0.1;
                node.material.side = THREE.DoubleSide;
                node.material.needsUpdate = true;
              }
            }
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
    
    const animate = () => {
      requestAnimationFrame(animate);
      TWEEN.update();
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleNavigation);
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
        🖱️ Left click to move | 🎯 Scroll to zoom | 🔄 Right click + drag to pan
      </div>
    </div>
  );
};

export default SimpleModelViewer;