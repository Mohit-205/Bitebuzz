import React, { useState, useEffect, startTransition } from 'react';
import * as THREE from 'three'
import {Canvas} from "@react-three/fiber";
import {Environment, OrbitControls, useGLTF} from "@react-three/drei";

function Burger() {
  const [setInputValue] = useState('');
  const handleChange = (event) => {
    // Wrap potentially long-running or async operations in startTransition
    startTransition(() => {
      setInputValue(event.target.value);
    });
  };
  
  const {scene} = useGLTF("./Model/Burger/burger.glb")
  scene.position.set(0, -0.8, 0);
  scene.scale.set(1.7, 1.7, 1.7);

  const [rotation, setRotation] = useState(new THREE.Euler(0, 0, 0));
  useEffect(() => {
    const animate = () => {
      setRotation((prevRotation) => new THREE.Euler(
        prevRotation.x, 
        prevRotation.y + 0.008, 
        prevRotation.z 
      ));
      requestAnimationFrame(animate);
    };
    animate();
  }, []);
  return (
    <Canvas camera={{position: [5,5,5], fov: 45}} style={{
        height: "100%",
        width: "100%",
        paddingTop: "10px"
    }}>
        <ambientLight/>
        <OrbitControls enableZoom={false}/>
        <primitive object={scene} rotation={rotation}/>
        <Environment preset="warehouse"/>
    </Canvas>
  )
}

export default Burger