import { useThree, useLoader, useFrame, extend } from "@react-three/fiber";
import React, { use, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { SpotLightShadow, TextureLoader } from "three";
import floor from "../public/floor.png";
import darkWood from "../public/dark_wood.png";
import darkWoodRoughness from "../public/dark_wood_roughness.png";
import floor2 from "../public/floor-2.png";
// import floorroughness from "../public/floor-roughness.png";
import floornormal from "../public/floor-normal.png";
import floorheight from "../public/floor-height.png";
import woodBright from "../public/Wood-Bright.png";
import { useScroll } from "@react-hooks-library/core";

// import studioLight from "../public/studiolight.obj";
import {
  Html,
  OrbitControls,
  PositionalAudio,
  useFBX,
  useObj,
  useHelper,
  ContactShadows,
  SpotLight,
  SpotLightShadows,
  BakeShadows,
  AccumulativeShadows,
  Text3D,
  useMatcapTexture,
  Clone,
  Sky,
  Stars,
  Center,
  Float,
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import marker from "../public/regular3.json";
import { Physics, RigidBody } from "@react-three/rapier";
import gsap from "gsap";

extend({ TextGeometry });

export default function Test2() {
  const chair = useFBX("./chair.fbx");
  const monitor = useFBX("./LED.fbx");
  // const desk = useFBX("./desk.fbx");
  // const carpet = useFBX("./carpet.fbx");
  // const monitor = useLoader(OBJLoader, "./monitor.obj");
  // const monitor2 = useLoader(OBJLoader, "./monitor.obj");
  const desk = useLoader(OBJLoader, "./office-desk.obj");
  // const stair = useLoader(OBJLoader, "./stair.obj");
  //   const lamp = useLoader(OBJLoader, "./light.obj");
  const monitorRef = useRef();
  const chairRef = useRef();
  const deskRef = useRef();
  console.log(chair, "chair");
  console.log(monitor, "monitor");
  console.log(desk, "desk");
  const font = new FontLoader().parse(marker);
  const [scroll, setScroll] = useState({ x: 0, y: 0 });

  const { camera } = useThree();

  // camera.position.set(0, 20, 5);
  camera.quaternion;

  useFrame((state, delta) => {
    // meshRef.current.rotation.x += 0.01;
    // state.camera.position.set(centerRef.current.position);
  });
  return (
    <>
      <ambientLight args={[0x000000, 0.001]} />
      <spotLight args={[0xffffff, 0.5]} position={[0, 50, 5]} />
      <OrbitControls />
      <mesh>
        <boxGeometry args={[100, 100, 1]} receiveShadow />
        <meshStandardMaterial color={"gray"} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 50]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={"gray"} side={THREE.BackSide} />
      </mesh>

      <primitive
        object={chair}
        ref={chairRef}
        castShadow
        position={[0, 0, 12]}
        scale={[0.1, 0.1, 0.1]}
        rotation={[0, Math.PI / 1, 0]}
      />
      <primitive
        object={desk}
        ref={deskRef}
        castShadow
        position={[0, 0, 8]}
        scale={[0.35, 0.35, 0.35]}
      />
      <group>
        {monitorRef && (
          <Html
            center
            distanceFactor={1}
            occlude={[monitorRef, deskRef, chairRef]}
            transform
            position={[3, 12.58, 2.19]}
            rotation={[0, 0, 0]}
          >
            <div className="screen">
              <h1>Sahil E Arwand</h1>
              <h2>Hello</h2>
            </div>
          </Html>
        )}
        <primitive
          castShadow
          ref={monitorRef}
          object={monitor}
          position={[3, 12.3, 2]}
          scale={[0.06, 0.06, 0.06]}
          rotation={[Math.PI / -2, 0, Math.PI / 2]}
        />
      </group>
      {/* <Clone
        object={monitor}
        position={[-5.1, 12.7, 0]}
        scale={[0.3, 0.3, 0.3]}
        rotation={[0, Math.PI / -2.2, 0]}
      /> */}
    </>
  );
}
