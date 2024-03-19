import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import Test from "@/components/test";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";

import ScrambleText from "@/components/ScrambleText/ScrambleText";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [cameraPosition, setCameraPosition] = useState(1.75);
  const canvasref = useRef();

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Angkor&family=Leckerli+One&family=Lilita+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Suspense fallback={<h1>Loading</h1>}>
        <div ref={canvasref}>
          <div className={styles.canvasWrapper}>
            <Canvas shadows={false}>
              <color attach="background" args={["#05050E"]} />
              <Test cameraPosition={cameraPosition} />
            </Canvas>
            <ScrambleText />
          </div>
        </div>
      </Suspense>
    </>
  );
}
