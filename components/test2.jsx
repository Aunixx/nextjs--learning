import { useThree, useLoader, useFrame, extend } from "@react-three/fiber";
import React, { use, useEffect, useMemo, useRef } from "react";
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
  // const desk = useFBX("./desk.fbx");
  // const carpet = useFBX("./carpet.fbx");
  const monitor = useLoader(OBJLoader, "./monitor.obj");
  const monitor2 = useLoader(OBJLoader, "./monitor.obj");
  const desk = useLoader(OBJLoader, "./office-desk.obj");
  // const stair = useLoader(OBJLoader, "./stair.obj");
  //   const lamp = useLoader(OBJLoader, "./light.obj");
  console.log(chair, "chair");
  console.log(monitor, "monitor");
  console.log(desk, "desk");
  const font = new FontLoader().parse(marker);

  useFrame((state, delta) => {
    // meshRef.current.rotation.x += 0.01;
    // state.camera.position.set(centerRef.current.position);
  });
  return (
    <>
      <ambientLight args={[0xffffff, 0.01]} />
      <pointLight position={[0, 70, 10]} />
      <OrbitControls />
      <mesh>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color={"gray"} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 50]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color={"brown"} side={THREE.BackSide} />
      </mesh>
      <primitive
        object={chair}
        position={[0, 0, 12]}
        scale={[0.1, 0.1, 0.1]}
        rotation={[0, Math.PI / 1, 0]}
      />
      <primitive
        object={desk}
        position={[0, 0, 8]}
        scale={[0.35, 0.35, 0.35]}
      />

      <primitive
        object={monitor}
        position={[3, 12.7, 0]}
        scale={[0.3, 0.3, 0.3]}
        rotation={[0, Math.PI / -1.7, 0]}
      />
      <Clone
        object={monitor}
        position={[-5.1, 12.7, 0]}
        scale={[0.3, 0.3, 0.3]}
        rotation={[0, Math.PI / -2.2, 0]}
      />
    </>
  );
}
