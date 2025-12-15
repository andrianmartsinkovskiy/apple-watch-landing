import type {ReactNode} from "react";
import {FaRegDotCircle} from "react-icons/fa";
import {BiSolidWatchAlt} from "react-icons/bi";
import {CgDisplayGrid} from "react-icons/cg";
import {MdOutlineEdgesensorHigh, MdOutlineSensors, MdSensorWindow} from "react-icons/md";
import {PiSpeakerSimpleHighFill} from "react-icons/pi";
import {RiBatteryChargeFill} from "react-icons/ri";
import {HiChip} from "react-icons/hi";

export interface IModelElement {
  isCanHover: boolean;
  defaultOffset: number[]
  targetOffset: number[]
  info: IModelElementInfo
}

export interface IModelElementInfo {
  name: string;
  icon: ReactNode;
  description: string;
}

export const MODEL_ELEMENTS: Record<string, IModelElement> = {
  apple_watch: {
    isCanHover: false,
    defaultOffset: [0,0,0],
    targetOffset: [0,0,0],
    info: {
      icon: <BiSolidWatchAlt style={{scale: 1.5}} />,
      name: "Digital Watch",
      description: "",
    }
  },
  band: {
    isCanHover: false,
    defaultOffset: [0,0,0],
    targetOffset: [0,0,0],
    info: {
      icon: "",
      name: "",
      description: "",
    }
  },
  display: {
    isCanHover: true,
    defaultOffset: [0,0,0],
    targetOffset: [-0.8, 0, 0],
    info: {
      icon: <CgDisplayGrid style={{scale: 1.3}} />,
      name: "Display",
      description: "",
    }
  },
  rear: {
    isCanHover: true,
    defaultOffset: [0,0,0],
    targetOffset: [0.4, 0, 0],
    info: {
      icon: <MdSensorWindow />,
      name: "Rear Sensors",
      description: "",
    }
  },
  battery: {
    isCanHover: true,
    defaultOffset: [0,0,0],
    targetOffset: [-0.2, 0, 0],
    info: {
      icon: <RiBatteryChargeFill />,
      name: "Battery",
      description: "",
    }
  },
  chip: {
    isCanHover: true,
    defaultOffset: [0,0,0],
    targetOffset: [-0.4, 0, 0],
    info: {
      icon: <HiChip style={{scale: 1.3}} />,
      name: "Microchip",
      description: "",
    }
  },
  crown: {
    isCanHover: true,
    defaultOffset: [0,0,0],
    targetOffset: [0, 0, 0.25],
    info: {
      icon: <FaRegDotCircle />,
      name: "Digital Crown",
      description: "",
    }
  },
  speakers: {
    isCanHover: true,
    defaultOffset: [0,0,0],
    targetOffset: [0, 0, -0.15],
    info: {
      icon: <PiSpeakerSimpleHighFill />,
      name: "Speakers",
      description: "",
    }
  },
  taptic: {
    isCanHover: true,
    defaultOffset: [0,0,0],
    targetOffset: [-0.6, 0, 0],
    info: {
      icon: <MdOutlineEdgesensorHigh style={{scale: 1.3}} />,
      name: "Taptic Engine",
      description: "",
    }
  },
  antenna: {
    isCanHover: true,
    defaultOffset: [0,0,0],
    targetOffset: [0, 0, 0.15],
    info: {
      icon: <MdOutlineSensors />,
      name: "LTE Antenna",
      description: "",
    }
  },
}

export const MODEL_ELEMENTS_KEYS = Object.keys(MODEL_ELEMENTS)
export type ModelElementKeyType = keyof typeof MODEL_ELEMENTS