import { useThree, useLoader, useFrame, extend } from "@react-three/fiber";
import React, { use, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { MeshBasicMaterial, SpotLightShadow, TextureLoader } from "three";
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
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import marker from "../public/regular3.json";
import { Physics, RigidBody } from "@react-three/rapier";
import gsap from "gsap";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

import vertexShader from "../components/shaders/vertex.glsl";
import fragmentShader from "../components/shaders/fragment.glsl";
import { WebGLRenderTarget } from "three";
import { Effects } from "@react-three/drei";
// import { Bloom } from "@react-three/postprocessing";

extend({ TextGeometry });
// extend({ UnrealBloomPass });
extend({ RenderPass, UnrealBloomPass });

export default function Test({ cameraPosition }) {
  const [uTimeValue, setUTimeValue] = useState(0);
  const { camera, scene, gl, size } = useThree();
  const usePostprocess = true;
  const clearColor = "#4169e1";
  const instance = new THREE.WebGLRenderer({
    alpha: false,
    antialias: true,
  });
  instance.setClearColor(clearColor, 1);
  instance.setSize(window.innerWidth, window.innerHeight);
  instance.setPixelRatio(Math.min(Math.max(window.devicePixelRatio, 1), 2));

  const effectRef = useRef();
  useEffect(() => {
    effectRef.current.radius = 25;
    effectRef.current.resolution.x = size.width;
    effectRef.current.resolution.y = size.height;
    effectRef.current.strength = 2.5;
    effectRef.current.threshold = 0;
    effectRef.current.bloomTintColors.value = "#4169e1";
    effectRef.current.bloomTintColors.instance = new THREE.Color("#4169e1");
    effectRef.current.compositeMaterial.uniforms.uTintStrength = {
      value: 0.05,
    };
    effectRef.current.compositeMaterial.fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D blurTexture1;
    uniform sampler2D blurTexture2;
    uniform sampler2D blurTexture3;
    uniform sampler2D blurTexture4;
    uniform sampler2D blurTexture5;
    uniform sampler2D dirtTexture;
    uniform float bloomStrength;
    uniform float bloomRadius;
    uniform float bloomFactors[NUM_MIPS];
    uniform vec3 bloomTintColors[NUM_MIPS];
    uniform vec3 uTintColor;
    uniform float uTintStrength;
  
    float lerpBloomFactor(const in float factor) {
        float mirrorFactor = 1.5 - factor;
        return mix(factor, mirrorFactor, bloomRadius);
    }
  
    void main() {
        vec4 color = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
            lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
            lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
            lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
            lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
  
        color.rgb = mix(color.rgb, uTintColor, uTintStrength);
        gl_FragColor = color;
    }
            `;
  }, [effectRef]);

  const sphereRef = useRef();

  const colorA = "#66A5AD";
  const intensityA = 2.85;
  const sphericalA = new THREE.Spherical(1, 2.561, -1.844);
  const lightA = new THREE.Color(colorA);
  const colorB = "#C4DFE6";
  const intensityB = 1.4;
  const sphericalB = new THREE.Spherical(1, 0.615, 2.049);
  const lightB = new THREE.Color(colorB);

  useEffect(() => {
    sphereRef.current.material.uniforms.uLightAPosition.value.setFromSpherical(
      sphericalA
    );
    sphereRef.current.material.uniforms.uLightBPosition.value.setFromSpherical(
      sphericalB
    );
    sphereRef.current.geometry.computeTangents();
  }, [sphereRef]);

  // useEffect(() => {
  //   console.log(sphereRef.current);
  //   console.log(sphereRef.current.__r3f.objects[1]?.uniforms.uTime.value);
  //   setUTimeValue(sphereRef.current.material.uniforms.uTime.value);
  //   gsap.to(camera.position, { z: cameraPosition });
  // }, [cameraPosition]);
  if (window.innerWidth < 768) {
    gsap.to(camera.position, { z: 2.5 });
  } else {
    gsap.to(camera.position, { z: 1.45 });
  }
  useEffect(() => {
    const btnWrapper = document.querySelector(".btnWrapper");
    const container = document.querySelector(".container");
    const about = document.querySelector(".about-section");
    const work = document.querySelector(".work-section");
    const sectionWrapper = document.querySelector(".section-wrapper");
    const main = document.querySelector(".main");

    btnWrapper.addEventListener("mouseover", (e) => {
      const btn = e.target.closest("button");
      if (btn) {
        if (btn.classList.contains("aboutBtn")) {
          sectionWrapper.classList.remove("work");
          sectionWrapper.classList.remove("contact");
          sectionWrapper.classList.add("about");
        } else if (btn.classList.contains("workBtn")) {
          sectionWrapper.classList.remove("about");
          sectionWrapper.classList.remove("contact");
          sectionWrapper.classList.add("work");
        } else {
          sectionWrapper.classList.remove("about");
          sectionWrapper.classList.remove("work");
          sectionWrapper.classList.add("contact");
        }
      }
    });

    document.querySelector(".aboutBtn").addEventListener("click", () => {
      about.style.visibility = "visible";
      // if (window.innerWidth < 768) {
      //   gsap.to(camera.position, { z: 1.75, duration: 2 });
      // } else {
      //   gsap.to(camera.position, { z: 1.25, duration: 2 });
      // }
      main.style.overflow = "auto";
      container.style.display = "none";
      gsap.to(sphereRef.current.rotation, {
        x: 2,
        duration: 2,
      });
      gsap.to(sectionWrapper, {
        y: 15,
        duration: 2,
      });

      // sectionWrapper.style.transform = "translateY(15%)";
      sectionWrapper.classList.add("about");
      about.style.transition = "transform 2s ease";
    });

    document.querySelector(".workBtn").addEventListener("click", () => {
      gsap.to(camera.position, { z: 1.25, duration: 2 });
      main.style.overflow = "auto";
      container.style.display = "none";
      gsap.to(sectionWrapper, {
        y: 15,
        duration: 2,
      });
      // sectionWrapper.style.transform = "translateY(15%)";
      sectionWrapper.classList.add("work");
      work.style.transition = "transform 2s ease";
    });
  }, []);

  // camera.position.x = 10;
  let Utime = 0;
  if (window.innerWidth < 768) {
    Utime = 0.006;
  } else {
    Utime = 0.009;
  }

  useFrame((state, delta) => {
    // console.log(delta);
    sphereRef.current.material.uniforms.uDisplacementStrength.value = 0.15;
    sphereRef.current.material.uniforms.uDistortionStrength.value = 0.5;
    sphereRef.current.material.uniforms.uFresnelMultiplier.value = 2.5;
    sphereRef.current.material.uniforms.uLightAPosition.value.setFromSpherical(
      sphericalA
    );
    sphereRef.current.material.uniforms.uLightBPosition.value.setFromSpherical(
      sphericalB
    );
    // console.log(sphereRef.current);

    sphereRef.current.material.uniforms.uTime.value += Utime;
  }, []);

  return (
    <>
      <pointLight />
      <OrbitControls
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
      />
      <Effects disableGamma>
        <unrealBloomPass ref={effectRef} />
      </Effects>
      <mesh ref={sphereRef} toneMapped={false}>
        <sphereGeometry args={[1, 512, 512]} />
        <shaderMaterial
          uniforms={{
            uLightAColor: { value: lightA },
            uLightAPosition: { value: new THREE.Vector3(1, 1, 0) },
            uLightAIntensity: { value: intensityA },
            uLightBColor: { value: lightB },
            uLightBPosition: { value: new THREE.Vector3(-1, -1, 0) },
            uLightBIntensity: { value: intensityB },

            uSubdivision: {
              value: new THREE.Vector2(512, 512),
            },

            uOffset: { value: new THREE.Vector3() },

            uDistortionFrequency: { value: 1.5 },
            uDistortionStrength: { value: 0.65 },
            uDisplacementFrequency: { value: 2.12 },
            uDisplacementStrength: { value: 0.152 },

            uFresnelOffset: { value: -1.609 },
            uFresnelMultiplier: { value: 3.587 },
            uFresnelPower: { value: 1.793 },

            uTime: { value: 0 },
          }}
          defines={{ USE_TANGENT: "" }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </>
  );
}
