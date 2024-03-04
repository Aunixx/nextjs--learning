import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import ScrambleText from "./ScrambleText/ScrambleText";
import Test from "./test";

export default function Layout({ children }) {
  return (
    <div>
      <div className="canvasWrapper">
        <Canvas shadows={true} color="#4169e1">
          <Test />
        </Canvas>
        <div className="main">{children}</div>
      </div>
    </div>
  );
}
