import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Model component that loads and displays the GLB file
function Model({ onError }) {
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Create a new GLTFLoader instance
    const loader = new GLTFLoader();
    
    // Load the GLB model
    loader.load(
      '/hall1.glb',
      (gltf) => {
        // Success callback
        const scene = gltf.scene;
        
        // Optimize the scene
        scene.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        
        setModel(scene);
        setIsLoading(false);
      },
      (xhr) => {
        // Progress callback
        const progress = (xhr.loaded / xhr.total) * 100;
        console.log(`Loading model: ${Math.round(progress)}% loaded`);
      },
      (error) => {
        // Error callback
        console.error('Error loading GLB model:', error);
        onError(error.message || 'Failed to load 3D model');
        setIsLoading(false);
      }
    );
    
    // Cleanup function
    return () => {
      if (model) {
        model.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, [onError]); // Only run on mount and when onError changes
  
  if (isLoading) return null;
  if (!model) return null;
  
  return <primitive object={model} scale={1} position={[0, 0, 0]} />;
}

// Loading component with progress indicator
function LoadingIndicator() {
  const { progress, errors } = useProgress();
  
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center'
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
          width: `${progress}%`,
          height: '100%',
          background: '#4a90e2',
          transition: 'width 0.3s ease-in-out'
        }} />
      </div>
      <div style={{
        color: '#666',
        fontSize: '16px'
      }}>
        Loading 3D Model... {Math.round(progress)}%
      </div>
      {errors.length > 0 && (
        <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>
          Error: {errors[0]}
        </div>
      )}
    </div>
  );
}

const ModelViewer = () => {
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [showFallback, setShowFallback] = useState(false);

  // Handle model loading errors
  const handleModelError = (errorMessage) => {
    setError(`Failed to load 3D model: ${errorMessage}`);
    setShowFallback(true);
  };

  // Retry loading the model
  const handleRetry = () => {
    setError(null);
    setShowFallback(false);
    setRetryCount(prev => prev + 1);
    // Force reload the GLB by clearing the cache
    useGLTF.clear();
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '600px', 
      background: '#f0f0f0',
      position: 'relative',
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {showFallback ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>
          <div style={{ marginBottom: '20px' }}>
            <p>Possible issues:</p>
            <ul style={{ textAlign: 'left' }}>
              <li>The 3D model file is too large (145MB)</li>
              <li>The model format may be incompatible</li>
              <li>Your browser may have insufficient memory</li>
              <li>Network connection issues</li>
            </ul>
          </div>
          <button 
            onClick={handleRetry}
            style={{
              padding: '10px 20px',
              background: '#4a90e2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Retry Loading
          </button>
        </div>
      ) : (
        <Canvas
          key={`canvas-${retryCount}`} // Force re-render on retry
          camera={{ position: [0, 2, 5], fov: 60 }}
          shadows
          gl={{ 
            antialias: true,
            powerPreference: 'high-performance',
            alpha: false,
            stencil: false,
            depth: true
          }}
          onCreated={({ gl }) => {
            gl.setClearColor('#f0f0f0');
            // Set pixel ratio to balance performance and quality
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }}
          performance={{ min: 0.5 }} // Performance optimization
        >
          <Suspense fallback={<LoadingIndicator />}>
            <Model onError={handleModelError} />
            <Environment preset="city" />
          </Suspense>
          
          {/* Lighting setup */}
          <ambientLight intensity={0.4} />
          <directionalLight
            intensity={1.2}
            position={[5, 10, 7.5]}
            castShadow
            shadow-mapSize-width={1024} // Reduced for performance
            shadow-mapSize-height={1024} // Reduced for performance
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} />
          
          {/* Controls */}
          <OrbitControls 
            enableDamping 
            dampingFactor={0.05}
            enableZoom={true}
            enableRotate={true}
            enablePan={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={1}
            maxDistance={20}
          />
        </Canvas>
      )}
    </div>
  );
};

// No need for preloading with our custom loader approach

export default ModelViewer;