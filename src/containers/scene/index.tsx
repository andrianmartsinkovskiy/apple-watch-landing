import {CameraControls} from "./camera-controls";
import {WatchModel} from "./watch-model";
import {useProgress} from "@react-three/drei";
import {type FC, useEffect} from "react";
import {WatchProps} from "./watch-props";

interface IScene {
  onLoad: () => void;
}

const Scene: FC<IScene> = ({onLoad}) => {
  const {progress} = useProgress()

  useEffect(() => {
    if (progress === 100) {
      onLoad()
    }
  }, [progress]);

  return (
    <>
      <ambientLight intensity={.6} />
      <directionalLight
        position={[3, 4, 5]}
        intensity={0.7}
        castShadow={true}
      />
      <directionalLight
        position={[3, 4, -5]}
        intensity={0.7}
        castShadow={true}
      />
      <CameraControls />

      <WatchModel />
      <WatchProps />
    </>
  );
};

export {
  Scene
}
