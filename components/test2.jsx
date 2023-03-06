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

function Boxes({ temp = new THREE.Object3D() }) {
  const ref = useRef();
  const map = useLoader(TextureLoader, darkWood.src);
  const roughness = useLoader(TextureLoader, darkWoodRoughness.src);
  //   const [matCaptexture] = useMatcapTexture("787165_DAD9CD_9DC0CE_36302A", 256);
  //   const [matCaptexture] = useMatcapTexture("7877EE_D87FC5_75D9C7_1C78C0", 256);
  //   const [matCaptexture] = useMatcapTexture("6D1616_E6CDBA_DE2B24_230F0F", 256);
  //   const [matCaptexture] = useMatcapTexture("5E5855_C6C4CD_C89B67_8F8E98", 256);
  const [matCaptexture] = useMatcapTexture("3E2335_D36A1B_8E4A2E_2842A5", 256);
  //   const [matCaptexture] = useMatcapTexture("85B9D3_C9EAF9_417277_528789", 256);
  //   const [matCaptexture] = useMatcapTexture("9C5B3B_49200A_E9C8AB_DDAB7D", 256);
  //   const [matCaptexture] = useMatcapTexture("AE9D99_29303B_585F70_875C33", 256);
  //   const [matCaptexture] = useMatcapTexture("C98D7F_3B0B0B_A97667_94433F", 256);
  //   const [matCaptexture] = useMatcapTexture("B0A2A8_866A63_E8E9F2_614C4F", 256);
  //   const [matCaptexture] = useMatcapTexture("B6B8B1_994A24_315C81_927963", 256);
  //   const [matCaptexture] = useMatcapTexture("B62D33_E4868B_7E2D34_DD6469", 256);
  //   const [matCaptexture] = useMatcapTexture("98332E_4A100D_691A16_A85A5B", 256);
  //   const [matCaptexture] = useMatcapTexture("9B9B9B_1E1E1E_5C5C5C_444444", 256);

  //   const color = useMemo(() => new THREE.Color().setHex(0x00ff), []);
  const rows = 256;
  const count = rows * rows;
  useEffect(() => {
    let index = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < rows; j++) {
        // if (j % 10 === 0) {
        temp.position.set(i - rows / 2, Math.random() * 1, j - rows / 2);
        // }

        temp.updateMatrix();
        ref.current.setMatrixAt(index++, temp.matrix);
      }
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {});
  return (
    <>
      {/* <ambientLight args={[0xffffff, 4, 100]} /> */}
      <instancedMesh
        ref={ref}
        args={[null, null, count]}
        rotation={[Math.PI / 2, 0, 0]}
        // position={[0, 0, -70]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshMatcapMaterial matcap={matCaptexture} metalness={0} />
      </instancedMesh>
    </>
  );
}
export default function Test2() {
  // const fbx = useFBX("./sofa.fbx");
  // const bed = useFBX("./bed.fbx");
  // const carpet = useFBX("./carpet.fbx");
  // const obj = useLoader(OBJLoader, "./sofa.obj");
  // const stair = useLoader(OBJLoader, "./stair.obj");
  const lamp = useLoader(OBJLoader, "./light.obj");
  const centerRef = useRef();
  // const grassTexture = useLoader(TextureLoader, "./grass.jpg");
  // const grass = useLoader(OBJLoader, "./grass.obj");
  // const tv = useLoader(GLTFLoader, "./tvunit.glb");
  // const bed2 = useLoader(OBJLoader, "./bed2.obj");
  // const roughness = useLoader(TextureLoader, darkWoodRoughness.src);
  const map = useLoader(TextureLoader, darkWood.src);
  // const wood = useLoader(TextureLoader, "./Wood-Dark.jpg");
  // const t1 = useLoader(TextureLoader, "./Ecostil3.jpg");
  // const t2 = useLoader(TextureLoader, "./Grand560.jpg");
  // const t3 = useLoader(TextureLoader, "./01.jpg");
  // const carpetmap = useLoader(TextureLoader, "./carpettexture.jpg");
  const [matCaptexture] = useMatcapTexture("686B73_2A2B2D_D5D9DD_B0B3BC", 256);
  const ringref = useRef();
  const light = useRef();
  const meshRef = useRef();
  const font = new FontLoader().parse(marker);
  // console.log(bed2);

  // grass.children[0].material.map = grassTexture;
  // grass.children[0].receiveShadow = false;
  // useHelper(light, THREE.SpotLightHelper);
  //   light?.current?.target.position.set(-0.5, 0, 0);
  // for (let i = 0; i < obj.children.length; i++) {
  //   obj.children[i].material.color.r = Math.random() * 1;
  //   obj.children[i].material.color.g = Math.random() * 1;
  //   obj.children[i].material.color.b = Math.random() * 1;
  //   obj.children[i].castShadow = true;
  //   obj.children[i].receiveShadow = true;
  //   // lamp.children[i].material.map = map;
  // }
  // for (let i = 0; i < stair.children.length; i++) {
  //   stair.children[i].castShadow = true;
  //   // stair.children[i].material.toneMapped = false;
  //   stair.children[i].material.shininess = 100;
  //   stair.children[i].material.map = map;
  // }
  // for (let i = 0; i < bed2.children.length; i++) {
  //   bed2.children[i].castShadow = true;
  //   bed2.children[i].receiveShadow = true;
  //   // stair.children[i].material.toneMapped = false;
  //   bed2.children[i].material.map = t1;
  // }
  // bed2.children[3].material.map = t2;
  // bed2.children[0].material.map = t3;
  // for (let i = 0; i < lamp.children.length; i++) {
  //   // stair.children[i].castShadow = true;
  //   // lamp.children[i].material.color = "black";
  //   // lamp.children[i].material.toneMapped = false;
  //   lamp.children[i].material.color = [0, 0, 0];
  // }
  // for (let i = 0; i < bed.children.length; i++) {
  //   bed.children[i].castShadow = true;
  //   bed.children[i].receive = true;
  // }

  // stair.traverse(function (child) {
  //   if (child.isMesh) {
  //     child.castShadow = true;
  //     child.receiveShadow = true;
  //   }
  // });

  useFrame((state, delta) => {
    // meshRef.current.rotation.x += 0.01;
    // state.camera.position.set(centerRef.current.position);
  });
  return (
    <>
      <ambientLight args={[0xffffff, 3]} />
      <OrbitControls />
      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshMatcapMaterial matcap={matCaptexture} />
      </mesh> */}
      <Boxes />
    </>
  );
}
