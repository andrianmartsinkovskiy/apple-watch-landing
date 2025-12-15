import {useGLTF} from "@react-three/drei";
import {observer} from "mobx-react-lite";
import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {type Mesh, type MeshStandardMaterial, type Object3D, SRGBColorSpace, TextureLoader} from "three";
import {useFrame} from "@react-three/fiber";
import {store} from "../../../store";

const WatchProps = observer(() => {
  const { nodes } = useGLTF("/models/props.glb");
  const leftRef = useRef<Object3D>(null);
  const rightRef = useRef<Object3D>(null);
  const lineRef = useRef<Object3D>(null);
  const buttonRef = useRef<Object3D>(null);
  const modelTextRef = useRef<Object3D>(null);
  const priceRef = useRef<Object3D>(null);

  // Transition animation to screen 2
  useFrame(() => {
    if (store.flow.current.name === 'preview') {
      const y = -4 * (store.flow.progress / 100);

      if (leftRef.current) leftRef.current.position.y = y;
      if (rightRef.current) rightRef.current.position.y = y;
      if (lineRef.current) lineRef.current.position.y = -y;
      if (buttonRef.current) buttonRef.current.position.y = -y;
      if (priceRef.current) priceRef.current.position.y = -y;
      if (modelTextRef.current) modelTextRef.current.position.y = -y;
    }
  });

  // Clone button material
  useEffect(() => {
    if (!buttonRef.current) return;
    const mesh = buttonRef.current?.children[0].children[0] as Mesh;
    (mesh as Mesh).material = (mesh.material as MeshStandardMaterial).clone();
  }, []);

  // Update display texture
  useEffect(() => {
    const texMsg = new TextureLoader().load(store.theme.current.screens[0]);
    const texCar = new TextureLoader().load(store.theme.current.screens[2]);
    texMsg.colorSpace = SRGBColorSpace;
    texMsg.flipY = false;
    texCar.colorSpace = SRGBColorSpace;
    texCar.flipY = false;

    const meshMsg = nodes["display-left"].children[1] as Mesh
    const meshCar = nodes["display-right"].children[1] as Mesh
    const matMsg = meshMsg.material as MeshStandardMaterial;
    const matCar = meshCar.material as MeshStandardMaterial;


    matMsg.emissiveMap = texMsg;
    matMsg.needsUpdate = true;
    matCar.emissiveMap = texCar;
    matCar.needsUpdate = true;
  }, [store.theme.activeIndex]);

  useEffect(() => {
    // Startup animation
    if (!buttonRef.current) return;
    if (!priceRef.current) return;
    if (!modelTextRef.current) return;
    if (!leftRef.current) return;
    if (!rightRef.current) return;

    gsap.fromTo(
      leftRef.current.position,
      { x: 5 },
      {
        x: 0,
        duration: 0.9,
        ease: "power3.out"
      }
    );

    gsap.fromTo(
      rightRef.current.position,
      { x: 5 },
      {
        x: 0,
        duration: 0.9,
        ease: "power3.out"
      }
    );

    gsap.fromTo(
      modelTextRef.current.position,
      { z: -0.3 },
      {
        z: 0,
        duration: 1.2,
        ease: "power3.out"
      }
    );

    gsap.fromTo(
      priceRef.current.position,
      { z: 0.3 },
      {
        z: 0,
        duration: 1.2,
        ease: "power3.out"
      }
    );
    gsap.fromTo(
      buttonRef.current.position,
      { z: 0.44 },
      {
        z: 0,
        duration: 1.2,
        ease: "power3.out"
      }
    );
  }, []);

  const openLink = () => {
    window.open("https://am-dev.site/", "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <primitive ref={leftRef} object={nodes['display-left']} />
      <primitive ref={rightRef} object={nodes['display-right']} />
      <primitive ref={lineRef} object={nodes['line']} />
      <primitive ref={priceRef} object={nodes['price']} />
      <group ref={buttonRef}>
        <primitive
          onClick={openLink}
          onPointerOver={() => {
            const mesh = buttonRef.current?.children[0].children[0] as any;
            const meshText = buttonRef.current?.children[0].children[1] as any;
            mesh.material.emissive.set("#000000")
            meshText.material.emissive.set("#ffffff")
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            const mesh = buttonRef.current?.children[0].children[0] as any;
            const meshText = buttonRef.current?.children[0].children[1] as any;
            mesh.material.emissive.set("#ffffff")
            meshText.material.emissive.set("#000000")
            document.body.style.cursor = "default";
          }}
          object={nodes['button']}
        />
      </group>
      <primitive ref={modelTextRef} object={nodes['model-text']} />
    </>
  );
});

export {
  WatchProps
}
