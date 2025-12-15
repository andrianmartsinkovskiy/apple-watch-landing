import {useFrame, useThree} from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { observer } from "mobx-react-lite";
import {store} from "../../../store";
import {useMemo} from "react";

// Normalize angle into 0..2π range
function normalize(a: number) {
  const TWO = Math.PI * 2;
  return ((a % TWO) + TWO) % TWO;
}

// Interpolates between two angles
function lerpAngle(a: number, b: number, t: number) {
  a = normalize(a);
  b = normalize(b);

  let diff = b - a;
  if (diff > Math.PI) diff -= Math.PI * 2;
  if (diff < -Math.PI) diff += Math.PI * 2;

  return a + diff * t;
}

const CameraControls = observer(() => {
  const { camera } = useThree();
  const {current, next, progress, dynamicStartAngle} = store.flow
  const baseAngle = useMemo(() => Math.atan2(camera.position.z, camera.position.x), [])


  useFrame(() => {
    // update dynamic angle only while in "overview"
    if (current.name === "overview") {
      store.flow.updateDynamicAngle(Math.atan2(camera.position.z, camera.position.x))
      return;
    }

    // base angles for current and next flows
    let currentFlowAngel = baseAngle + (current.cameraTarget * Math.PI / 180);
    let nextFlowAngel = baseAngle + (next.cameraTarget * Math.PI / 180);

    // override angle if dynamic start angle is present
    if (dynamicStartAngle) {
      if (current.name === 'preview') {
        nextFlowAngel = dynamicStartAngle;
      } else {
        currentFlowAngel = dynamicStartAngle;
      }
    }

    // interpolate between angles
    const targetAngle = lerpAngle(currentFlowAngel, nextFlowAngel, progress / 100);


    // update camera position on orbit
    const radius = camera.position.length();
    camera.position.x = radius * Math.cos(targetAngle);
    camera.position.z = radius * Math.sin(targetAngle);
    camera.lookAt(0, 0, 0);
  });


  return (
    <OrbitControls
      minPolarAngle={Math.PI / 2}
      maxPolarAngle={Math.PI / 2}
      minAzimuthAngle={-140 * Math.PI / 180}
      maxAzimuthAngle={-35 * Math.PI / 180}
      enableZoom={false}
    />
  );
});


export { CameraControls };
