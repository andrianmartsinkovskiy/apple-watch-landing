import {useGLTF} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {store} from "../../../store";
import {Group, MathUtils, MeshStandardMaterial} from "three";
import {WatchModelElement} from "../watch-model-element";
import {useEffect, useRef} from "react";
import {MODEL_ELEMENTS, MODEL_ELEMENTS_KEYS} from "../../../config/model-elements.tsx";
import {gsap} from "gsap";
import {observer} from "mobx-react-lite";

const WatchModel = observer(() => {
  const { nodes, materials } = useGLTF("/models/apple-watch.glb");
  const { flow } = store;
  const groupRef = useRef<Group>(null)

  // Update materials when theme changes
  useEffect(() => {
    const metal = materials?.metal as MeshStandardMaterial;
    const rubber = materials?.rubber as MeshStandardMaterial;

    if (metal) metal.color.set(store.theme.current.materialColor);
    if (rubber) rubber.color.set(store.theme.current.materialColor);
  }, [store.theme.activeIndex]);

  useEffect(() => {
    if (!groupRef.current) return;

    // Startup animation
    gsap.fromTo(
      groupRef.current.rotation,
      { z: -0.3 },
      {
        z: 0,
        duration: 1.2,
        ease: "power3.out"
      }
    );
  }, []);

  useFrame(() => {
    if (flow.current.name !== "overview") return

    // Offset coefficient 0 → 1 → 0
    const t = flow.progress / 100;
    const factor = 1 - Math.abs(t - 0.5) * 2;

    // set current offset
    MODEL_ELEMENTS_KEYS.forEach((key) => {
      const obj = nodes[key];
      const base = MODEL_ELEMENTS[key].defaultOffset;
      const off = MODEL_ELEMENTS[key].targetOffset;

      obj.position.x = MathUtils.lerp(base[0], off[0], factor);
      obj.position.y = MathUtils.lerp(base[1], off[1], factor);
      obj.position.z = MathUtils.lerp(base[2], off[2], factor);
    });
  });

  useEffect(() => {
    console.log(nodes)
  }, []);

  return (
    <group ref={groupRef} rotation={[0,0,-0.3]}>
      {
        MODEL_ELEMENTS_KEYS.map((key) => (
          <WatchModelElement key={key} node={nodes[key]} />
        ))
      }
    </group>
  );
})

export {
  WatchModel
}
