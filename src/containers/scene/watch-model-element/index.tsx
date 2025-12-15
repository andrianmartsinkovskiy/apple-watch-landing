import {Mesh, type MeshStandardMaterial, Object3D, SRGBColorSpace, TextureLoader} from "three";
import {type FC, useEffect} from "react";
import { observer } from "mobx-react-lite";
import {MODEL_ELEMENTS} from "../../../config/model-elements.tsx";
import {store} from "../../../store";
import {createHoverMaterial} from "../../../shaders/hover-shader.ts";

interface Props {
  node: Object3D;
}


function changeObjectMaterial(node: Object3D, color: string, isHover: boolean) {
  node.traverse((obj) => {
    if ((obj as Mesh).isMesh) {
      const mesh = obj as Mesh;
      mesh.material = isHover ? createHoverMaterial(color) : mesh.userData.originalMaterial;
    }
  });
}

function prepareHoverMaterials(node: Object3D) {
  node.traverse((obj) => {
    if ((obj as Mesh).isMesh) {
      const mesh = obj as Mesh;
      mesh.userData.originalMaterial = mesh.material;
    }
  });
}

const WatchModelElement: FC<Props> = observer(({ node }) => {

  // Update display texture when theme changes
  useEffect(() => {
    if (node.name !== "display") return;

    const mesh = node.children[1] as Mesh;
    const mat = mesh.material as MeshStandardMaterial;

    const tex = new TextureLoader().load(store.theme.current.screens[1]);
    tex.colorSpace = SRGBColorSpace;
    tex.flipY = false;

    mat.emissiveMap = tex;
    mat.needsUpdate = true;
  }, [store.theme.activeIndex]);

  useEffect(() => {
    prepareHoverMaterials(node)
  }, [])

  useEffect(() => {
    if (store.flow.current.name !== 'overview') {
      changeObjectMaterial(node, store.theme.current.materialColor, false)
    }
  }, [store.flow.current.name]);

  const onHoverStart = (e: MouseEvent) => {
    e.stopPropagation()
    if (!MODEL_ELEMENTS[node.name].isCanHover) return
    if (store.flow.current.name !== "overview") return;

    store.flow.setActiveHover(node.name);
    document.body.style.cursor = "pointer";
    changeObjectMaterial(node, store.theme.current.materialColor, true)
  }

  const onHoverEnd = () => {
    store.flow.setActiveHover(null);
    changeObjectMaterial(node, store.theme.current.materialColor, false)
    document.body.style.cursor = "default";
  }

  return (
    <group
      onPointerOver={onHoverStart}
      onPointerOut={onHoverEnd}
    >
      <primitive object={node} />
    </group>
  );
});

export { WatchModelElement };
