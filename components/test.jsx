import { useThree, useFrame, extend } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { OrbitControls } from "@react-three/drei";

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import gsap from "gsap";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

import vertexShader from "../components/shaders/vertex.glsl";
import fragmentShader from "../components/shaders/fragment.glsl";
import { Effects } from "@react-three/drei";

extend({ TextGeometry });
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

  if (window.innerWidth < 768) {
    gsap.to(camera.position, { z: 2.5 });
  } else {
    gsap.to(camera.position, { z: 1.45 });
  }
  useEffect(() => {
    const btnWrapper = document.querySelector(".btnWrapper");
    const container = document.querySelector(".container");
    const about = document.querySelector(".about-section");
    const skills = document.querySelector(".skills-section");
    const work = document.querySelector(".work-section");
    const contact = document.querySelector(".contact-section");
    const sectionWrapper = document.querySelector(".section-wrapper");
    const slideOut = document.querySelector(".slide-out");
    const slideIn = document.querySelector(".slide-in");
    const main = document.querySelector(".main");
    const homeBtn = document.querySelector(".homeBtn");
    setTimeout(
      () =>
        document.addEventListener("DOMContentLoaded", function () {
          const sportify = document.querySelector("#sportify-iframe");
          if (sportify) {
            const bg = sportify.contentWindow.document.querySelector(
              ".TrackListWidget_trackListGridContainer__GZGxh"
            );
            if (bg) {
              bg.parentElement.parentElement.style.backgroundColor =
                "#ffffff10 !important";
            }
          }
        }),
      3000
    );
    btnWrapper.addEventListener("mouseover", (e) => {
      const btn = e.target.closest("button");
      if (btn) {
        if (btn.classList.contains("aboutBtn")) {
          sectionWrapper.classList.remove("work");
          sectionWrapper.classList.remove("contact");
          sectionWrapper.classList.remove("skills");
          sectionWrapper.classList.add("about");
        } else if (btn.classList.contains("workBtn")) {
          sectionWrapper.classList.remove("about");
          sectionWrapper.classList.remove("contact");
          sectionWrapper.classList.remove("skills");
          sectionWrapper.classList.add("work");
        } else if (btn.classList.contains("skillsBtn")) {
          sectionWrapper.classList.remove("about");
          sectionWrapper.classList.remove("contact");
          sectionWrapper.classList.remove("work");
          sectionWrapper.classList.add("skills");
        } else {
          sectionWrapper.classList.remove("about");
          sectionWrapper.classList.remove("work");
          sectionWrapper.classList.add("contact");
          sectionWrapper.classList.remove("skills");
        }
      }
    });

    function PageTransition() {
      gsap.to(sectionWrapper, {
        y: 0,
        delay: 0.25,
      });

      gsap.to(slideIn, {
        scaleX: 1,
        duration: 0.25,
        onComplete: () => {
          slideIn.style.transform = "scaleX(0)";
          console.log(slideIn.style, "Slide in animation complete");
        },
      });
      gsap.set(slideOut, {
        scaleX: 1,
        delay: 0.25,
      });
      gsap.to(slideOut, {
        scaleX: 0,
        delay: 0.75,

        duration: 0.25,
        onComplete: () => {
          homeBtn.style.display = "block";
        },
      });
    }
    homeBtn.addEventListener("click", () => {
      sectionWrapper.classList.remove("about");
      sectionWrapper.classList.remove("work");
      sectionWrapper.classList.remove("contact");

      gsap.to(slideIn, {
        transformOrigin: "left",
        scaleX: 1,
        duration: 0.25,
        onComplete: () => {
          slideIn.style.transform = "scaleX(0)";
          console.log("Slide in animation complete");
        },
      });
      gsap.set(slideOut, {
        scaleX: 1,
        delay: 0.25,
        // borderBottomRightRadius: 0,
        // borderTopRightRadius: 0,
      });
      gsap.to(slideOut, {
        scaleX: 0,
        delay: 0.75,

        duration: 0.25,
        onComplete: () => {
          homeBtn.style.display = "none";
          container.style.display = "flex";
        },
      });
    });

    document.querySelector(".skillsBtn").addEventListener("click", () => {
      skills.style.visibility = "visible";
      sectionWrapper.style.display = "block";
      container.style.display = "none";
      PageTransition();
      sectionWrapper.classList.add("about");
    });

    document.querySelector(".workBtn").addEventListener("click", () => {
      main.style.overflow = "auto";
      container.style.display = "none";
      gsap.to(sectionWrapper, {
        y: 0,
      });
      PageTransition();
      sectionWrapper.classList.add("work");
      work.style.transition = "transform 2s ease";
    });

    document.querySelector(".aboutBtn").addEventListener("click", () => {
      about.style.visibility = "visible";
      container.style.display = "none";
      gsap.to(sectionWrapper, {
        y: 0,
      });
      PageTransition();
      sectionWrapper.classList.add("about");
    });
    document.querySelector(".contactBtn").addEventListener("click", () => {
      contact.style.visibility = "visible";
      container.style.display = "none";
      gsap.to(sectionWrapper, {
        y: 0,
      });
      PageTransition();
      sectionWrapper.classList.add("contact");
    });
  }, []);

  let Utime = 0;
  if (window.innerWidth < 768) {
    Utime = 0.006;
  } else {
    Utime = 0.009;
  }

  useFrame((state, delta) => {
    sphereRef.current.material.uniforms.uDisplacementStrength.value = 0.15;
    sphereRef.current.material.uniforms.uDistortionStrength.value = 0.5;
    sphereRef.current.material.uniforms.uFresnelMultiplier.value = 2.5;
    sphereRef.current.material.uniforms.uLightAPosition.value.setFromSpherical(
      sphericalA
    );
    sphereRef.current.material.uniforms.uLightBPosition.value.setFromSpherical(
      sphericalB
    );

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
