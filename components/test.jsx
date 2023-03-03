import { useThree, useLoader, useFrame } from "@react-three/fiber";
import React, { use, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SpotLightShadow, TextureLoader } from "three";
import floor from "../public/floor.png";
import darkWood from "../public/dark_wood.png";
import darkWoodRoughness from "../public/dark_wood_roughness.png";
import floor2 from "../public/floor-2.png";
import floorroughness from "../public/floor-roughness.png";
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
} from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

function RightWall({ temp = new THREE.Object3D() }) {
  const ref = useRef();
  const map = useLoader(TextureLoader, woodBright.src);
  const roughness = useLoader(TextureLoader, darkWoodRoughness.src);
  //   const color = useMemo(() => new THREE.Color().setHex(0x00ff), []);
  // useEffect(() => {
  //   for (let i = 0; i < 100; i++) {
  //     //   temp.rotation.set(0.2618, 0, Math.PI / 2);
  //     temp.rotation.set(0, 0, Math.PI / 2);

  //     temp.position.set(-2.5, i * 2.58 + 5.5, i * -9.63);
  //     temp.updateMatrix();
  //     ref.current.setMatrixAt(i, temp.matrix);
  //   }
  //   ref.current.instanceMatrix.needsUpdate = true;
  // }, []);

  return (
    <mesh position={[0, Math.PI / 7, 0]} receiveShadow>
      <boxGeometry args={[10, 0.1, 10]} />
      <meshStandardMaterial
        map={map}
        roughnessMap={roughness}
        metalness={0}
        roughness={4}
      />
    </mesh>
  );
}

function LeftWall({ temp = new THREE.Object3D() }) {
  const ref = useRef();
  const map = useLoader(TextureLoader, darkWood.src);
  const roughness = useLoader(TextureLoader, darkWoodRoughness.src);
  //   const color = useMemo(() => new THREE.Color().setHex(0x00ff), []);
  // useEffect(() => {
  //   for (let i = 0; i < 100; i++) {
  //     //   temp.rotation.set(0.2618, 0, Math.PI / 2);
  //     temp.rotation.set(0, 0, Math.PI / 2);

  //     temp.position.set(2.5, i * 2.58 + 5.5, i * -9.63);
  //     temp.updateMatrix();
  //     temp.receiveShadow = true;
  //     ref.current.setMatrixAt(i, temp.matrix);
  //   }
  //   ref.current.instanceMatrix.needsUpdate = true;
  // }, []);

  return (
    <>
      {/* <ambientLight args={[0xffffff, 4, 100]} /> */}
      <mesh
        receiveShadow
        rotation={[0, 0, Math.PI / 2]}
        position={[-5, 5.5, 0]}
      >
        <boxGeometry args={[10, 0.1, 10]} />
        <meshStandardMaterial
          color={"#363636"}
          metalness={0}
          // map={map}
          // roughnessMap={roughness}
          roughness={1}
        />
      </mesh>
    </>
  );
}
// function LeftWall({ temp = new THREE.Object3D() }) {
//   const ref = useRef();
//   const map = useLoader(TextureLoader, darkWood.src);
//   const roughness = useLoader(TextureLoader, darkWoodRoughness.src);
//   //   const color = useMemo(() => new THREE.Color().setHex(0x00ff), []);
//   useEffect(() => {
//     for (let i = 0; i < 100; i++) {
//       //   temp.rotation.set(0.2618, 0, Math.PI / 2);
//       temp.rotation.set(0, 0, Math.PI / 2);

//       temp.position.set(2.5, i * 2.58 + 5.5, i * -9.63);
//       temp.updateMatrix();
//       temp.receiveShadow = true;
//       ref.current.setMatrixAt(i, temp.matrix);
//     }
//     ref.current.instanceMatrix.needsUpdate = true;
//   }, []);

//   return (
//     <>
//       {/* <ambientLight args={[0xffffff, 4, 100]} /> */}
//       <instancedMesh ref={ref} args={[null, null, 100]}>
//         <boxGeometry args={[10, 0.1, 10]} />
//         <meshStandardMaterial map={map} roughnessMap={roughness} />
//       </instancedMesh>
//     </>
//   );
// }

function Floor({ temp = new THREE.Object3D() }) {
  const ref = useRef();
  const map = useLoader(TextureLoader, floor2.src);
  const roughness = useLoader(TextureLoader, floorroughness.src);
  const height = useLoader(TextureLoader, floorheight.src);
  const normal = useLoader(TextureLoader, floornormal.src);
  ref.receiveShadow = true;

  //   const color = useMemo(() => new THREE.Color().setHex(0x00ff), []);
  // useEffect(() => {
  //   for (let i = 0; i < 100; i++) {
  //     temp.rotation.set(0, 0, 0);

  //     temp.position.set(0, i * 2.58, i * -9.63);
  //     temp.receiveShadow = true;
  //     temp.updateMatrix();
  //     ref.current.setMatrixAt(i, temp.matrix);
  //   }
  //   ref.current.instanceMatrix.needsUpdate = true;
  // }, []);

  return (
    <mesh ref={ref} receiveShadow={true} rotation={[0, 0, 0]}>
      <boxGeometry args={[5, 1, 10]} receiveShadow={true} />
      <meshBasicMaterial color="white" receiveShadow={true} />
    </mesh>
  );
}
function Roof({ temp = new THREE.Object3D() }) {
  const ref = useRef();
  // const map = useLoader(TextureLoader, darkWood.src);
  // const roughness = useLoader(TextureLoader, darkWoodRoughness.src);

  //   const color = useMemo(() => new THREE.Color().setHex(0x00ff), []);
  useEffect(() => {
    for (let i = 0; i < 100; i++) {
      temp.rotation.set(0, 0, 0);

      temp.position.set(0, i * 2.58 + 5, i * -9.63);
      temp.receiveShadow = true;
      temp.updateMatrix();
      ref.current.setMatrixAt(i, temp.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={ref} args={[null, null, 100]}>
      <boxGeometry args={[5, 1, 10]} />
      <meshStandardMaterial map={map} metalness={20} roughnessMap={roughness} />
    </instancedMesh>
  );
}
export default function Test() {
  // const fbx = useFBX("./sofa.fbx");
  // const bed = useFBX("./bed.fbx");
  // const carpet = useFBX("./carpet.fbx");
  // const obj = useLoader(OBJLoader, "./sofa.obj");
  // const stair = useLoader(OBJLoader, "./stair.obj");
  const lamp = useLoader(OBJLoader, "./studiolight.obj");
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
  // const matCap = useMatcapTexture("291912_473531_3C2C25_3A2424", 256);
  const ringref = useRef();
  const light = useRef();
  const meshRef = useRef();
  // console.log(bed2);

  // grass.children[0].material.map = grassTexture;
  // grass.children[0].receiveShadow = false;
  // // useHelper(light, THREE.SpotLightHelper);
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
  });
  return (
    <>
      <ambientLight args={[0xffffff, 0.1]} />
      <EffectComposer>
        <Bloom mipmapBlur />
      </EffectComposer>
      {/* <BakeShadows /> */}
      <group position={[0, -1.5, 0]}>
        <group position={[0, 1.47, 0]}>
          <spotLight
            args={[0xffffff, 0.1, 100]}
            position={[2.45, 2, 0]}
            rotation={[1, 1, 1]}
            ref={light}
            castShadow
            shadow-mapSize={[1024 * 2, 1024 * 2]}
          />
          <mesh
            castShadow={true}
            rotation={[Math.PI / 2.2, Math.PI / -3.3, 0]}
            position={[2.39, 2.78, -0.05]}
            scale={[0.0004, 0.0004, 0.0004]}
          >
            <circleGeometry args={[100, 100]} castShadow={true} />
            <meshStandardMaterial
              color="white"
              emissive={"white"}
              emissiveIntensity={10}
              toneMapped={false}
            />
          </mesh>
          <Clone
            object={lamp}
            scale={[0.01, 0.01, 0.01]}
            rotation={[0, Math.PI / -2, 0.05]}
            position={[2.45, 3, 0]}
          />
        </group>
        <group position={[0, 1.47, 2]} rotation={[0, -2.4, 0]}>
          <spotLight
            args={[0xffffff, 0.2, 500]}
            position={[2.45, 2, 0]}
            rotation={[1, 1, 1]}
            ref={light}
            castShadow
            shadow-mapSize={[1024 * 2, 1024 * 2]}
          />
          <mesh
            castShadow={true}
            rotation={[Math.PI / 2.2, Math.PI / -3.3, 0]}
            position={[2.39, 2.78, -0.05]}
            scale={[0.0004, 0.0004, 0.0004]}
          >
            <circleGeometry args={[100, 100]} castShadow={true} />
            <meshStandardMaterial
              color="white"
              emissive={"white"}
              // color="blue"
              // emissive={"blue"}
              emissiveIntensity={10}
              toneMapped={false}
            />
          </mesh>
          <Clone
            object={lamp}
            scale={[0.01, 0.01, 0.01]}
            rotation={[0, Math.PI / -2, 0.05]}
            position={[2.45, 3, 0]}
          />
        </group>
        <group position={[0, 1.47, -2]} rotation={[0, 2, 0]}>
          <spotLight
            // args={[0x00ff01, 2, 500]}
            args={[0xffffff, 0.2, 500]}
            position={[2.45, 2, 0]}
            rotation={[1, 1, 1]}
            ref={light}
            castShadow
            shadow-mapSize={[1024 * 2, 1024 * 2]}
          />
          <mesh
            castShadow={true}
            rotation={[Math.PI / 2.2, Math.PI / -3.3, 0]}
            position={[2.39, 2.78, -0.05]}
            scale={[0.0004, 0.0004, 0.0004]}
          >
            <circleGeometry args={[100, 100]} castShadow={true} />
            <meshStandardMaterial
              color="white"
              emissive={"white"}
              // color="green"
              // emissive={"green"}
              emissiveIntensity={10}
              toneMapped={false}
            />
          </mesh>
          <Clone
            object={lamp}
            scale={[0.01, 0.01, 0.01]}
            rotation={[0, Math.PI / -2, 0.05]}
            position={[2.45, 3, 0]}
          />
        </group>
        <group position={[0, 1.47, -1.5]} rotation={[0, 0.5, 0]}>
          <spotLight
            args={[0xffffff, 0.2, 500]}
            position={[2.45, 2, 0]}
            rotation={[1, 1, 1]}
            ref={light}
            castShadow
            shadow-mapSize={[1024 * 2, 1024 * 2]}
          />
          <mesh
            castShadow={true}
            rotation={[Math.PI / 2.2, Math.PI / -3.3, 0]}
            position={[2.39, 2.78, -0.05]}
            scale={[0.0004, 0.0004, 0.0004]}
          >
            <circleGeometry args={[100, 100]} castShadow={true} />
            <meshStandardMaterial
              color="white"
              emissive={"white"}
              emissiveIntensity={10}
              toneMapped={false}
            />
          </mesh>
          <Clone
            object={lamp}
            scale={[0.01, 0.01, 0.01]}
            rotation={[0, Math.PI / -2, 0.05]}
            position={[2.45, 3, 0]}
          />
        </group>
        <group position={[0, 1.47, 1.5]} rotation={[0, -0.5, 0]}>
          <spotLight
            args={[0xffffff, 0.2, 500]}
            position={[2.45, 2, 0]}
            rotation={[1, 1, 1]}
            ref={light}
            castShadow
            shadow-mapSize={[1024 * 2, 1024 * 2]}
          />
          <mesh
            castShadow={true}
            rotation={[Math.PI / 2.2, Math.PI / -3.3, 0]}
            position={[2.39, 2.78, -0.05]}
            scale={[0.0004, 0.0004, 0.0004]}
          >
            <circleGeometry args={[100, 100]} castShadow={true} />
            <meshStandardMaterial
              color="white"
              emissive={"white"}
              emissiveIntensity={10}
              toneMapped={false}
            />
          </mesh>
          <Clone
            object={lamp}
            scale={[0.01, 0.01, 0.01]}
            rotation={[0, Math.PI / -2, 0.05]}
            position={[2.45, 3, 0]}
          />
        </group>
        {/* <Text3D toneMapped={false}>Sahil E Arwand</Text3D> */}
        <mesh
          ref={ringref}
          rotation={[Math.PI / 2, 0, Math.PI / 4]}
          position={[-4.1, 4.5, -3.88]}
          castShadow
          receiveShadow
        >
          <ringGeometry args={[1.1, 12, 4]} />
          <meshStandardMaterial map={map} side={THREE.DoubleSide} />
        </mesh>

        {/* <AccumulativeShadows>
        <directionalLight
          args={[0xffffff, 2, 500]}
          position={[4, 5, 0]}
          rotation={[1, 1, 1]}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
      </AccumulativeShadows> */}
        {/* <mesh receiveShadow rotation={[0, 0, 0]} position={[0, 0.5, 0]}>
        <boxGeometry args={[5, 0, 10]} />
        <meshStandardMaterial color="greenyellow" />
        <shadowMaterial opacity={1} />
      </mesh> */}

        {/* <mesh
        ref={meshRef}
        castShadow={true}
        receiveShadow
        rotation={[0, 0, 0]}
        position={[0, 1.5, 2]}
      >
        <boxGeometry args={[1, 1, 1]} castShadow={true} />
        <meshBasicMaterial color={"white"} />
      </mesh> */}

        <OrbitControls />
        {/* <ContactShadows rotation={[0, 0, 0]} position-y={0} opacity={0.5} /> */}
        {/* <Floor /> */}
        <LeftWall />
        <RightWall />
        {/* <Roof /> */}
        {/* <primitive
          object={obj}
          castShadow={true}
          scale={[1, 1, 1]}
          rotation={[0, Math.PI / -2, 0]}
          position={[4.85, Math.PI / 7, 2]}
        />

        <Clone
          object={stair}
          castShadow
          receiveShadow
          // scale={[1, 1, 1]}
          rotation={[0, Math.PI / 1.7, 0]}
          position={[-3.5, Math.PI / 6, -3.5]}
        />
        <Clone
          object={stair}
          castShadow
          receiveShadow
          // scale={[1, 1, 1]}
          rotation={[0, Math.PI / -3, 0]}
          position={[-3.5, 4.5, -3.5]}
        />

        <primitive
          object={bed2}
          scale={[0.001, 0.001, 0.001]}
          rotation={[0, Math.PI / 2, 0]}
          position={[-3.7, 0.5, 0]}
        />
        <primitive
          object={grass}
          scale={[1, 1, 1]}
          rotation={[Math.PI / -2, 0, 0]}
          position={[-4.9, -8, 0]}
        />
        <primitive
          object={tv.scene}
          scale={[0.1, 0.1, 0.1]}
          rotation={[0, 0, 0]}
          position={[2, 0.65, 4.51]}
        /> */}

        {/* <mesh
          rotation={[Math.PI / 2, 0, 0]}
          position={[-3, 0.5, 0.2]}
          scale={[5, 5, 5]}
          receiveShadow
          castShadow
        >
          <planeGeometry />
          <meshStandardMaterial map={carpetmap} side={THREE.DoubleSide} />
        </mesh> */}

        <mesh rotation={[0, 0, Math.PI / 2]} position={[5, 5.5, 0]}>
          <boxGeometry args={[10, 0.1, 10]} />
          <meshPhysicalMaterial
            // color={"#363636"}
            metalness={0}
            // map={map}
            // roughnessMap={roughness}
            roughness={0}
            transmission={0.9}
          />
        </mesh>
        <mesh
          receiveShadow
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 5.5, -5]}
        >
          <boxGeometry args={[10, 0.1, 10]} />
          <meshStandardMaterial
            color={"#363636"}
            metalness={0}
            // map={map}
            // roughnessMap={roughness}
            roughness={1}
          />
        </mesh>
        <mesh
          receiveShadow
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 5.5, 5]}
        >
          <boxGeometry args={[10, 0.1, 10]} />
          <meshStandardMaterial
            color={"#363636"}
            metalness={0}
            // map={map}
            // roughnessMap={roughness}
            roughness={1}
          />
        </mesh>
        {/* <mesh
        castShadow
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
        position={[4.94, 4.47, 0]}
        scale={[0.1, 0.1, 0.1]}
      >
        <planeGeometry args={[0.1, 100]} castShadow={true} />
        <meshStandardMaterial
          side={THREE.DoubleSide}
          color="blue"
          emissive={"blue"}
          emissiveIntensity={40}
          toneMapped={false}
        />
      </mesh> */}
      </group>
    </>
  );
}
