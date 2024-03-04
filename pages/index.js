import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import Test from "@/components/test";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import Test2 from "@/components/test2";
import { useScroll } from "@react-hooks-library/core";
import { PerspectiveCamera } from "@react-three/drei";
import ScrambleText from "@/components/ScrambleText/ScrambleText";
// import { useScroll, animated } from "@react-spring/web";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [cameraPosition, setCameraPosition] = useState(1.75);
  // const texture = useLoader(TextureLoader, map);
  const canvasref = useRef();
  // const [scroll, setScroll] = useState({ x: 0, y: 0 });

  // useScroll(canvasref, ({ scrollX, scrollY }) =>
  //   setScroll({ x: scrollX, y: scrollY })
  // );
  // useLayoutEffect(() => {
  //   document.addEventListener("scroll", () => setScroll(window.scrollY));
  // }, [scroll, canvasref]);

  const handleClick = () => {
    setCameraPosition(1.25);
  };

  return (
    <>
      <Head>
        <title>Sahil E Arwand</title>
        <meta name="description" content="Created by Sahil E Arwand" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<h1>Loading</h1>}>
        <div ref={canvasref}>
          <div className={styles.canvasWrapper}>
            <Canvas shadows={true} color="#4169e1">
              <Test cameraPosition={cameraPosition} />
            </Canvas>
            <ScrambleText />
          </div>
        </div>
      </Suspense>
    </>
  );
}
