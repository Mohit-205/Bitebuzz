import {Canvas} from "@react-three/fiber";
import {Environment, OrbitControls, useGLTF} from "@react-three/drei";

function Burger() {
    const {scene} = useGLTF("/scene.gltf")
  return (
    <Canvas camera={{position: [0,0,10], fov: 25}} style={{
        height: "100vh",
        width: "100vw"
    }}>
        <ambientLight/>
        <OrbitControls/>
        <primitive object={scene}/>
        <Environment preset="apartment"/>
    </Canvas>
  )
}

export default Burger