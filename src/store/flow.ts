import { makeAutoObservable } from "mobx";
import {store} from "./index.ts";
import type {ModelElementKeyType} from "../config/model-elements.tsx";

interface IFlow {
  name: "preview" | "overview" | "color" | "order" | "overview-to-color";
  offset: number;
  cameraTarget: number
}

class FlowStoreClass {
  flows: IFlow[] = [
    { name: "preview",  offset: 0, cameraTarget: 0 },
    { name: "overview", offset: 25, cameraTarget: -45 },
    { name: "overview-to-color", offset: 25, cameraTarget: -45 },
    { name: "color", offset: -25, cameraTarget: 45},
    { name: "order", offset: 0, cameraTarget: 0 },
  ];
  index = 0;
  progress = 0;
  dynamicStartAngle: number | null = null;
  activeHover: ModelElementKeyType | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveHover(key: ModelElementKeyType | null) {
    this.activeHover = key;
  }

  updateDynamicAngle(value: number | null) {
    this.dynamicStartAngle = value;
  }

  get current(): IFlow {
    return this.flows[this.index];
  }

  get next() {
    return this.flows[(this.index + 1) % this.flows.length];
  }

  get wrapPosition() {
    const c = this.current.offset;
    const n = this.next.offset;
    const t = this.progress / 100;
    return c + (n - c) * t;
  }

  updateScroll(delta: number) {
    this.progress += delta * 0.05;

    // Fix for start/end
    if (this.index === 0 && this.progress < 0) {
      this.progress = 0
    } else if (this.index === this.flows.length - 1 && this.progress > 100) {
      this.progress = 100
    }

    // Next/Prev flow
    if (this.progress >= 100 && this.index < this.flows.length - 1) {
      // clear dynamicStartAngle while current flow === 'overview'
      if (this.current.name !== 'overview' && this.dynamicStartAngle) {
        this.dynamicStartAngle = null
      }

      this.progress = 0.1;
      this.index = this.index + 1
    } else if (this.progress <= 0 && this.index > 0) {

      this.progress = 100;
      this.index = this.index - 1;
    }
  }

  startScrollDetect() {
    const onWheel = (e: WheelEvent) => {
      store.flow.updateScroll(e.deltaY);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
  }
}

export const FlowStore = new FlowStoreClass();
