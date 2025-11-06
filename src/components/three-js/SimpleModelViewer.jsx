import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as TWEEN from "@tweenjs/tween.js";

// Icon components (simple SVG implementations)
const X = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Play = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
  </svg>
);

const Volume2 = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M6.343 6.343A8 8 0 004.222 16.1l2.122 2.122m5.656-5.656L9.88 14.686" />
  </svg>
);

const MoreHorizontal = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
  </svg>
);

const SimpleModelViewer = () => {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(null);
  const [showPaintingModal, setShowPaintingModal] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [selectedPaintingImage, setSelectedPaintingImage] = useState(null);
  const [selectedPaintingName, setSelectedPaintingName] = useState(null);
  const currentPaintingId = useRef(null); // Track which painting is currently selected

  // Close modal function
  const closeModal = () => {
    setShowPaintingModal(false);
    setSelectedPainting(null);
    setSelectedPaintingImage(null);
    setSelectedPaintingName(null);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee); // Slightly off-white background

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      60, // More natural field of view to prevent ceiling appearing too close
      containerRef.current.clientWidth / containerRef.current.clientHeight, // aspect ratio
      0.1, // near
      1000 // far
    );
    camera.position.set(0, 1.6, 8); // Position camera at back of room with good view of center

    // Create renderer with improved settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
      precision: "highp", // Use high precision for more stable rendering
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Use newer encoding settings for better stability
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // More stable tone mapping
    renderer.toneMappingExposure = 0.01; // More reasonable exposure value
    containerRef.current.appendChild(renderer.domElement);

    // Natural gallery lighting setup to match reference image
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // White ambient light for natural gallery appearance
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4); // White directional light for even illumination
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
      const spotLight = new THREE.SpotLight(
        0xffffff,
        intensity,
        distance,
        Math.PI / 6,
        0.3
      ); // White spotlight for natural gallery lighting
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
      const leftLight = createSpotlight(-10, 5, i, 0.2, 10); // Natural gallery spotlight intensity
      scene.add(leftLight);
      leftWallLights.push(leftLight);

      const rightLight = createSpotlight(10, 5, i, 0.2, 10); // Natural gallery spotlight intensity
      scene.add(rightLight);
      rightWallLights.push(rightLight);
    }

    const fillLight = new THREE.HemisphereLight(0xffffff, 0xf0f0f0, 0.1); // White hemisphere light for natural gallery ambiance
    scene.add(fillLight);

    // Add floor with more stable rendering properties
    const floorGeometry = new THREE.PlaneGeometry(50, 50);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.05, // Reduced metalness
      roughness: 0.9, // Increased roughness for stability
      envMapIntensity: 0.1, // Lower reflection intensity
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.51; // Very slightly lower to avoid z-fighting
    floor.receiveShadow = true;
    // Add renderOrder to ensure floor renders first
    floor.renderOrder = -1;
    scene.add(floor);

    // Add controls with restricted movement
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.2; // Restrict vertical rotation
    controls.minPolarAngle = Math.PI / 3; // Restrict vertical rotation
    controls.minDistance = 0.5;
    controls.maxDistance = 8; // Limit zoom out to stay in room
    controls.enableZoom = true; // Allow limited zoom
    controls.enableRotate = true; // Allow rotation but limited
    controls.enablePan = false; // Disable panning to prevent leaving room
    controls.target.set(0, 0, 0); // Look down at center of gallery

    // Setup raycaster for object selection with improved precision
    const raycaster = new THREE.Raycaster();
    raycaster.params.Line.threshold = 0.1; // Improve precision
    const mouse = new THREE.Vector2();

    // Painting information database
    const paintingDatabase = {
      // Front wall paintings
      painting_front_1: {
        title: "Starry Night",
        artist: "Vincent van Gogh",
        year: "1889",
        description:
          "A masterpiece depicting a swirling night sky over a village, painted during van Gogh's stay at the asylum in Saint-Rémy-de-Provence.",
        medium: "Oil on canvas",
        dimensions: "73.7 cm × 92.1 cm",
      },
      painting_front_2: {
        title: "The Great Wave",
        artist: "Katsushika Hokusai",
        year: "1831",
        description:
          "An iconic woodblock print depicting a large wave threatening boats off the coast of Kanagawa.",
        medium: "Woodblock print",
        dimensions: "25.7 cm × 37.9 cm",
      },
      // Left wall paintings
      painting_left_1: {
        title: "Mona Lisa",
        artist: "Leonardo da Vinci",
        year: "1503-1519",
        description:
          "The world's most famous portrait, known for the subject's enigmatic smile and Leonardo's innovative painting techniques.",
        medium: "Oil on poplar panel",
        dimensions: "77 cm × 53 cm",
      },
      painting_left_2: {
        title: "Girl with a Pearl Earring",
        artist: "Johannes Vermeer",
        year: "1665",
        description:
          "A captivating portrait of a girl wearing an exotic dress and a large pearl earring.",
        medium: "Oil on canvas",
        dimensions: "44.5 cm × 39 cm",
      },
      // Right wall paintings
      painting_right_1: {
        title: "The Persistence of Memory",
        artist: "Salvador Dalí",
        year: "1931",
        description:
          "A surrealist masterpiece featuring melting clocks in a dreamlike landscape.",
        medium: "Oil on canvas",
        dimensions: "24 cm × 33 cm",
      },
      painting_right_2: {
        title: "The Scream",
        artist: "Edvard Munch",
        year: "1893",
        description:
          "An expressionist work depicting a figure with an agonized expression against a tumultuous orange sky.",
        medium: "Oil and pastel on cardboard",
        dimensions: "91 cm × 73.5 cm",
      },
      // Back wall paintings
      painting_back_1: {
        title: "American Gothic",
        artist: "Grant Wood",
        year: "1930",
        description:
          "A painting depicting a farmer standing beside his daughter in front of their house.",
        medium: "Oil on beaverboard",
        dimensions: "78 cm × 65.3 cm",
      },
      // Default for unidentified paintings
      default: {
        title: "Gallery Artwork",
        artist: "Unknown Artist",
        year: "Various",
        description:
          "A beautiful piece of art displayed in our VR gallery. Each artwork tells its own unique story.",
        medium: "Mixed media",
        dimensions: "Various",
      },
    };

    // Function to identify painting based on position
    const identifyPainting = (intersectPoint) => {
      const x = intersectPoint.x;
      const z = intersectPoint.z;

      console.log("Identifying painting at coordinates:", x, z);

      // Front wall (positive Z) - adjusted threshold
      if (z > 4) {
        if (x < 0) return "painting_front_1";
        else return "painting_front_2";
      }
      // Back wall (negative Z) - adjusted threshold
      else if (z < -4) {
        return "painting_back_1";
      }
      // Left wall (negative X) - adjusted threshold
      else if (x < -4) {
        if (z > 0) return "painting_left_1";
        else return "painting_left_2";
      }
      // Right wall (positive X) - adjusted threshold
      else if (x > 4) {
        if (z > 0) return "painting_right_1";
        else return "painting_right_2";
      }

      return "default";
    };

    // Create a simple white box indicator with dark ring (matching user's image)
    // This is a minimalistic indicator object that can be positioned anywhere with a click
    const indicatorGroup = new THREE.Group();

    // Simple white rectangular box (like in the user's image) - made narrower
    const boxGeometry = new THREE.BoxGeometry(0.2, 0.15, 0.15);
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff, // Pure white
      metalness: 0.1,
      roughness: 0.8,
    });
    const whiteBox = new THREE.Mesh(boxGeometry, boxMaterial);
    whiteBox.position.set(0, 0.075, 0); // Lift it slightly above the ring
    whiteBox.castShadow = true;
    whiteBox.receiveShadow = true;
    indicatorGroup.add(whiteBox);

    // Dark circular ring around the box (matching user's image)
    const ringGeometry = new THREE.RingGeometry(0.25, 0.3, 32);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333, // Dark gray/black ring
      metalness: 0.2,
      roughness: 0.9,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = -Math.PI / 2; // Lay flat on ground
    ring.position.set(0, 0.001, 0); // Slightly above floor to avoid z-fighting
    ring.receiveShadow = true;
    indicatorGroup.add(ring);

    const movableObject = indicatorGroup;
    movableObject.position.set(0, 0.075, 2); // Position on floor, visible from camera
    movableObject.visible = false; // Hide the indicator object while keeping functionality
    scene.add(movableObject);

    // Movement system variables
    const velocity = new THREE.Vector3();
    const targetPosition = new THREE.Vector3();
    const targetRotation = { current: 0 }; // Target Y rotation to face painting
    const isMoving = { current: false };
    const moveSpeed = 1; // Units per second (slightly increased from 0.5)
    const rotationSpeed = 1; // Radians per second (slightly increased from 0.5)

    // Camera following variables
    const cameraOffset = new THREE.Vector3(0, 1.5, 3);
    const cameraLerpFactor = 0.1;
    const targetCameraPosition = new THREE.Vector3();
    const targetCameraLookAt = new THREE.Vector3();
    const isCameraMoving = { current: false };

    // Click event handler to move indicator to paintings only
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
        if (
          intersect.object === movableObject ||
          intersect.object.parent === movableObject
        )
          return;

        // Simplified painting detection - exclude only floor and indicator object
        const normal = intersect.face.normal.clone();
        normal.transformDirection(intersect.object.matrixWorld);

        const absNormalY = Math.abs(normal.y);

        // Only ignore floor/ceiling clicks (Y-dominant normal pointing up/down)
        if (absNormalY > 0.8) {
          console.log("Clicked on floor/ceiling, not moving");
          return;
        }

        // Check if this is a wall-mounted object/painting or just an empty wall
        // Look for objects that are likely paintings or decorative items
        const clickedObject = intersect.object;
        console.log(
          "Clicked object:",
          clickedObject.name,
          clickedObject.geometry?.type,
          "Has texture:",
          !!clickedObject.material?.map
        );

        // Log painting picture/texture details if available
        if (clickedObject.material?.map) {
          console.log("Painting texture/image:", clickedObject.material.map);
          console.log("Texture source:", clickedObject.material.map.image?.src || clickedObject.material.map.image?.currentSrc || "No source found");
        }
        
        // Log object name specifically for paintings
        console.log("Object name:", clickedObject.name || "No name assigned");

        // Store painting image and name for modal display
        const paintingTexture = clickedObject.material?.map;
        const paintingName = clickedObject.name || "Unknown Painting";

        // More permissive detection - treat most wall objects as paintings
        const isWallMountedObject =
          clickedObject.material?.map || // Has texture (likely a painting)
          clickedObject.geometry?.type === "PlaneGeometry" || // Flat plane (likely a painting)
          (clickedObject.name &&
            (clickedObject.name.toLowerCase().includes("painting") ||
              clickedObject.name.toLowerCase().includes("frame") ||
              clickedObject.name.toLowerCase().includes("art") ||
              clickedObject.name.toLowerCase().includes("picture") ||
              clickedObject.name.toLowerCase().includes("vase") ||
              clickedObject.name.toLowerCase().includes("sculpture"))) ||
          // If it's on a wall (not floor/ceiling) and not the room structure, treat as painting
          (absNormalY < 0.5 &&
            clickedObject.name !== "room" &&
            clickedObject.name !== "wall");

        console.log("Is wall mounted object:", isWallMountedObject);

        if (isWallMountedObject) {
          // It's a painting/object on a wall, move indicator to stand in front of it
          console.log("Moving to painting/object at:", intersect.point);

          // Use object name as painting ID for consistent identification
          const paintingId = clickedObject.name || "unknown_painting";
          console.log("Current painting ID in ref:", currentPaintingId.current);
          console.log("New painting ID:", paintingId);
          console.log(
            "Are they equal?",
            currentPaintingId.current === paintingId
          );

          // Check if this is the same painting as currently selected
          if (currentPaintingId.current === paintingId) {
            // Second click on same painting - show modal
            const paintingInfo =
              paintingDatabase[paintingId] || paintingDatabase["default"];
            
            // Create image URL from texture for modal display
            let imageUrl = null;
            if (paintingTexture && paintingTexture.image) {
              // Create canvas to convert ImageBitmap to data URL
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = paintingTexture.image.width || 512;
              canvas.height = paintingTexture.image.height || 512;
              ctx.drawImage(paintingTexture.image, 0, 0);
              imageUrl = canvas.toDataURL('image/png');
            }
            
            setSelectedPainting(paintingInfo);
            setSelectedPaintingImage(imageUrl);
            setSelectedPaintingName(paintingName);
            setShowPaintingModal(true);
            console.log("Second click - opening modal for:", paintingId);
          } else {
            // First click on new painting - just move, don't show modal
            currentPaintingId.current = paintingId;
            console.log("First click - moving to painting:", paintingId);
          }
        } else {
          // It's an empty wall, return to room center
          console.log("Clicked on empty wall, returning to center");

          // Reset current painting selection
          currentPaintingId.current = null;

          // Set target position to room center
          const roomCenter = new THREE.Vector3(0, 1.4, 0); // Center at eye level
          targetPosition.copy(roomCenter);

          // Face towards the front wall (positive Z direction)
          // In Three.js, rotation.y = 0 means facing positive Z (front wall)
          targetRotation.current = 0;

          // Set camera to follow the indicator back to center
          const cameraHeight = 1.5;
          // Position camera behind the indicator, looking towards front wall
          const cameraPos = roomCenter
            .clone()
            .add(new THREE.Vector3(0, cameraHeight - 1.4, -3)); // Behind indicator
          targetCameraPosition.copy(cameraPos);
          targetCameraLookAt.copy(new THREE.Vector3(0, 1.4, 5)); // Look towards front wall (positive Z)

          isMoving.current = true;
          isCameraMoving.current = true;
          controls.enabled = false;

          return; // Skip the painting positioning logic
        }

        // Calculate position in front of the painting
        // Use a more reliable method to determine offset direction

        // Calculate direction from room center to the intersection point
        const roomCenter = new THREE.Vector3(0, 0, 0);
        const directionFromCenter = intersect.point
          .clone()
          .sub(roomCenter)
          .normalize();

        // Use the wall normal, but ensure it points into the room (toward center)
        let offsetDirection = normal.clone();

        // If normal is pointing away from room center, flip it
        if (offsetDirection.dot(directionFromCenter) > 0) {
          offsetDirection.negate();
        }

        // Position indicator at optimal distance from the painting for good viewing
        const viewingDistance = 2.0;
        const targetPos = intersect.point
          .clone()
          .add(offsetDirection.multiplyScalar(viewingDistance));

        // Set Y to floor level (indicator should be on ground)
        targetPos.y = 1.4; // Keep at eye level for visibility

        // Apply room boundary enforcement
        targetPosition.copy(enforceRoomBoundaries(targetPos));

        // Calculate rotation to face the painting
        // Direction from indicator position to painting
        const directionToPainting = intersect.point
          .clone()
          .sub(targetPos)
          .normalize();
        // Calculate Y rotation angle to face the painting
        targetRotation.current = Math.atan2(
          directionToPainting.x,
          directionToPainting.z
        );

        // Calculate camera position to match the same distance as indicator object
        // Camera should be at the same viewingDistance from painting as the indicator
        const cameraHeight = 1.5; // Height above ground (eye level)

        // Position camera at the same distance from painting as the indicator object
        // This ensures consistent viewing distance for both indicator and camera
        const cameraPos = intersect.point
          .clone()
          .add(offsetDirection.clone().multiplyScalar(viewingDistance)); // Same distance as indicator
        cameraPos.y = cameraHeight;

        // Set camera targets
        targetCameraPosition.copy(cameraPos);
        targetCameraLookAt.copy(intersect.point); // Look at the painting

        isMoving.current = true;
        isCameraMoving.current = true;

        // Disable orbit controls during movement
        controls.enabled = false;
      }
    };

    // Define room boundaries (adjust values based on your room size)
    const roomBoundaries = {
      minX: -9, // Left wall (moved inward for more safety)
      maxX: 9, // Right wall (moved inward for more safety)
      minZ: -14, // Back wall (moved inward for more safety)
      maxZ: 14, // Front wall (moved inward for more safety)
      buffer: 0.5, // Increased buffer to keep further from walls
    };

    // Function to check and adjust position to stay within room boundaries
    const enforceRoomBoundaries = (position) => {
      // Apply strict enforcement of boundaries with increased buffer
      position.x = Math.max(
        roomBoundaries.minX + roomBoundaries.buffer,
        Math.min(roomBoundaries.maxX - roomBoundaries.buffer, position.x)
      );
      position.z = Math.max(
        roomBoundaries.minZ + roomBoundaries.buffer,
        Math.min(roomBoundaries.maxZ - roomBoundaries.buffer, position.z)
      );

      // Add y-axis constraint to prevent flying or sinking
      position.y = 1.4; // Keep object at human eye level

      return position;
    };

    // Function to update character and camera movement
    const updateMovement = (deltaTime) => {
      if (!isMoving.current) return;

      const currentPos = movableObject.position;

      // Calculate direction and distance to target
      const direction = targetPosition.clone().sub(currentPos).normalize();
      const distanceToTarget = currentPos.distanceTo(targetPosition);

      // Calculate rotation difference to target
      const currentRotation = movableObject.rotation.y;
      const rotationDifference = targetRotation.current - currentRotation;

      // Normalize rotation difference to [-π, π]
      let normalizedRotDiff = rotationDifference;
      while (normalizedRotDiff > Math.PI) normalizedRotDiff -= 2 * Math.PI;
      while (normalizedRotDiff < -Math.PI) normalizedRotDiff += 2 * Math.PI;

      // Calculate camera movement if needed
      let cameraDistanceToTarget = 0;
      if (isCameraMoving.current) {
        cameraDistanceToTarget =
          camera.position.distanceTo(targetCameraPosition);
      }

      // Stop if we've reached both position, rotation, and camera targets
      const rotationThreshold = 0.05; // Small angle threshold
      const cameraThreshold = 0.1; // Camera position threshold
      const indicatorReady =
        distanceToTarget < 0.05 &&
        Math.abs(normalizedRotDiff) < rotationThreshold;
      const cameraReady =
        !isCameraMoving.current || cameraDistanceToTarget < cameraThreshold;

      if (indicatorReady && cameraReady) {
        isMoving.current = false;
        isCameraMoving.current = false;
        controls.enabled = true;
        return;
      }

      // Update position if not at target
      if (distanceToTarget >= 0.05) {
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
      }

      // Update rotation to face painting
      if (Math.abs(normalizedRotDiff) >= rotationThreshold) {
        const rotationStep =
          Math.sign(normalizedRotDiff) *
          Math.min(Math.abs(normalizedRotDiff), rotationSpeed * deltaTime);
        movableObject.rotation.y += rotationStep;
      }

      // Update camera position for painting viewing
      if (isCameraMoving.current) {
        // Move camera at the same speed as the indicator object
        const currentCameraPos = camera.position;
        const cameraDirection = targetCameraPosition
          .clone()
          .sub(currentCameraPos)
          .normalize();
        const cameraDistanceToTarget =
          currentCameraPos.distanceTo(targetCameraPosition);

        // Move camera at same speed as indicator object
        if (cameraDistanceToTarget >= 0.05) {
          const cameraVelocity = cameraDirection.multiplyScalar(
            moveSpeed * deltaTime
          );

          // Limit movement to not overshoot target
          if (cameraVelocity.length() > cameraDistanceToTarget) {
            cameraVelocity
              .copy(cameraDirection)
              .multiplyScalar(cameraDistanceToTarget);
          }

          camera.position.add(cameraVelocity);
        }

        // Smoothly adjust camera to look at the painting (keep this smooth for natural viewing)
        const currentLookAt = new THREE.Vector3();
        camera.getWorldDirection(currentLookAt);
        currentLookAt.add(camera.position);

        // Lerp the look-at target (keep this smooth)
        currentLookAt.lerp(targetCameraLookAt, cameraLerpFactor * 2);
        controls.target.copy(currentLookAt);
      } else {
        // Position camera at the same location as the indicator for normal wall view
        const desiredCameraPosition = currentPos
          .clone()
          .add(new THREE.Vector3(0, 1.5, 0)); // Camera at same X,Z as object, but at eye level

        // Ensure camera position is within room boundaries
        enforceRoomBoundaries(desiredCameraPosition);

        // Smoothly interpolate camera position
        camera.position.lerp(desiredCameraPosition, cameraLerpFactor);

        // Set camera to look in the same direction as the object (using object's rotation)
        const objectRotationY = movableObject.rotation.y;
        const lookDirection = new THREE.Vector3(
          Math.sin(objectRotationY),
          0,
          Math.cos(objectRotationY)
        ).normalize();
        const cameraTarget = desiredCameraPosition.clone().add(lookDirection);
        controls.target.copy(cameraTarget);
      }

      controls.update();
    };

    // Add event listener
    renderer.domElement.addEventListener("click", handleClick);

    // Add a simple cube as placeholder
    const placeholderGeometry = new THREE.BoxGeometry(1, 1, 1);
    const placeholderMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
    });
    const cube = new THREE.Mesh(placeholderGeometry, placeholderMaterial);
    cube.visible = false;
    scene.add(cube);

    // Load model
    const loader = new GLTFLoader();

    loader.load(
      "/hall1.glb",
      // "http://31.97.150.223/hall1.glb",
      (gltf) => {
        scene.remove(cube);

        const model = gltf.scene;
        model.scale.set(1.0, 1.0, 1.0); // Reduce scale to fit better
        model.position.set(0, -1.5, 0); // Center the model

        model.traverse((node) => {
          if (node.isMesh && node.material.map) {
            node.material.map.encoding = THREE.sRGBEncoding;
          }
        });

        scene.add(model);

        // Position camera inside the room after model loads
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());

        // Set camera to face the front wall (position camera towards back, looking forward)
        camera.position.set(0, 1.4, -10); // Position camera towards back of room
        controls.target.set(0, 1.4, 5); // Look towards front wall
        controls.update();

        setLoading(false);
      },
      (xhr) => {
        const progress = (xhr.loaded / xhr.total) * 100;
        setLoadingProgress(Math.round(progress));
      },
      (error) => {
        console.error("Error loading GLB model:", error);
        setError("Failed to load 3D model. Please try again later.");
        setLoading(false);
        cube.visible = true;
      }
    );

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

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
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("click", handleClick);

      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "600px" }}>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      />

      {loading && (
        <>
          {/* Blurred Background Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 999,
            }}
          />

          {/* VR Gallery Title Overlay */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "white",
              zIndex: 1001,
            }}
          >
            {/* Logo */}
            <div
              style={{
                marginBottom: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.4)",
                  border: "3px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  VR
                </div>
              </div>
            </div>

            <h1
              style={{
                fontSize: "4rem",
                fontWeight: "300",
                margin: "0 0 15px 0",
                letterSpacing: "4px",
                textTransform: "uppercase",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "none",
                filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8))",
              }}
            >
              VR Gallery
            </h1>
            <div
              style={{
                fontSize: "1.3rem",
                opacity: 0.9,
                letterSpacing: "2px",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
                marginBottom: "20px",
              }}
            >
              Immersive Art Experience
            </div>

            {/* Loading Animation */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  border: "3px solid rgba(255, 255, 255, 0.3)",
                  borderTop: "3px solid white",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
            </div>
          </div>

          {/* CSS Animation for spinner */}
          <style jsx>{`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>

          {/* Bottom Progress Bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              zIndex: 1002,
            }}
          >
            {/* Progress Bar Container */}
            <div
              style={{
                width: "100%",
                height: "6px",
                background: "rgba(255, 255, 255, 0.2)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${loadingProgress}%`,
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #00f5ff, #0080ff, #00f5ff)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite linear",
                  transition: "width 0.3s ease-out",
                  boxShadow: "0 0 15px rgba(0, 245, 255, 0.6)",
                }}
              />
            </div>

            {/* Loading Text */}
            <div
              style={{
                padding: "15px 20px",
                background: "rgba(0, 0, 0, 0.8)",
                color: "white",
                fontSize: "0.9rem",
                fontWeight: "300",
                letterSpacing: "1px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Loading Gallery...</span>
              <span>{loadingProgress}%</span>
            </div>
          </div>

          {/* CSS Animations */}
          <style jsx>{`
            @keyframes shimmer {
              0% {
                background-position: -200% 0;
              }
              100% {
                background-position: 200% 0;
              }
            }
          `}</style>
        </>
      )}

      {error && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>
          <div style={{ fontSize: "14px", color: "#666" }}>
            <p>Possible issues:</p>
            <ul style={{ textAlign: "left" }}>
              <li>The 3D model file is too large (145MB)</li>
              <li>The model format may be incompatible</li>
              <li>Your browser may have insufficient memory</li>
              <li>Network connection issues</li>
            </ul>
          </div>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(255, 255, 255, 0.7)",
          padding: "5px 10px",
          borderRadius: "4px",
          fontSize: "12px",
          color: "#666",
        }}
      >
        Click on any painting to view it
      </div>

      {/* Sleek Painting Information Modal */}
      {showPaintingModal && selectedPainting && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
          }}
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
              maxWidth: '900px',
              width: '90%',
              maxHeight: '80%',
              overflow: 'hidden',
              display: 'flex',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                width: '35px',
                height: '35px',
                backgroundColor: 'black',
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1001,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'black'}
            >
              <X style={{ width: '18px', height: '18px', color: 'white' }} />
            </button>

            {/* Left Side - Image */}
            <div style={{
              width: '45%',
              backgroundColor: '#2a2a2a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <img
                src={selectedPaintingImage || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=faces"}
                alt={selectedPaintingName || selectedPainting.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Right Side - Content */}
            <div style={{
              width: '55%',
              padding: '40px 35px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start'
            }}>
              {/* Title */}
              <h1 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'black',
                marginBottom: '8px',
                marginTop: '20px',
                letterSpacing: '0.5px',
                fontFamily: 'Algerian, serif'
              }}>
                {selectedPainting.title.toUpperCase()}
              </h1>
              
              {/* Object Name */}
              <p style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '15px',
                fontFamily: 'Algerian, serif'
              }}>
                Object: {selectedPaintingName}
              </p>

              {/* Artist Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#ddd',
                  borderRadius: '50%',
                  marginRight: '12px'
                }}></div>
                <div>
                  <p style={{
                    fontWeight: '600',
                    color: 'black',
                    margin: '0',
                    fontSize: '16px',
                    fontFamily: 'Algerian, serif'
                  }}>{selectedPainting.artist}</p>
                  <p style={{
                    color: '#666',
                    fontSize: '13px',
                    margin: '2px 0 0 0',
                    fontFamily: 'Algerian, serif'
                  }}>
                    {selectedPainting.medium}
                  </p>
                  <p style={{
                    color: '#666',
                    fontSize: '13px',
                    margin: '2px 0 0 0',
                    fontFamily: 'Algerian, serif'
                  }}>{selectedPainting.dimensions}</p>
                </div>
              </div>

              <hr style={{
                border: 'none',
                borderTop: '1px solid #e0e0e0',
                margin: '20px 0'
              }} />

              {/* Status */}
              <p style={{
                color: '#666',
                marginBottom: '20px',
                fontSize: '14px',
                fontFamily: 'Algerian, serif'
              }}>Not For Sale</p>

              {/* Audio Player */}
              <div style={{
                backgroundColor: '#f8f8f8',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '25px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <button style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>
                    <Play style={{ width: '16px', height: '16px', color: '#333', marginLeft: '2px' }} />
                  </button>

                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#666',
                      marginBottom: '4px',
                      fontFamily: 'Algerian, serif'
                    }}>
                      0:00 / 0:38
                    </div>
                    <div style={{
                      width: '100%',
                      backgroundColor: '#ddd',
                      borderRadius: '10px',
                      height: '4px',
                      position: 'relative'
                    }}>
                      <div style={{
                        backgroundColor: '#666',
                        height: '4px',
                        borderRadius: '10px',
                        width: '0%'
                      }}></div>
                    </div>
                  </div>

                  <button style={{
                    padding: '4px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    <Volume2 style={{ width: '16px', height: '16px', color: '#666' }} />
                  </button>

                  <button style={{
                    padding: '4px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    <MoreHorizontal style={{ width: '16px', height: '16px', color: '#666' }} />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div style={{
                color: '#555',
                fontSize: '13px',
                lineHeight: '1.6',
                fontFamily: 'Algerian, serif'
              }}>
                <p style={{ marginBottom: '12px', margin: '0 0 12px 0' }}>
                  <strong>{selectedPainting.artist.toUpperCase()}</strong>, {selectedPainting.year}.
                </p>
                <p style={{ margin: '0' }}>
                  <strong>"{selectedPainting.title.toUpperCase()}"</strong>, {selectedPainting.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleModelViewer;
