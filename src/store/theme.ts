import { makeAutoObservable } from "mobx";
import orangeMsgScreen from '../assets/images/orange-msg-screen.png'
import orangeScreen from '../assets/images/orange-screen.png'
import orangeCarScreen from '../assets/images/orange-car-screen.png'
import yellowMsgScreen from '../assets/images/yellow-msg-screen.png'
import yellowScreen from '../assets/images/yellow-screen.png'
import yellowCarScreen from '../assets/images/yellow-car-screen.png'
import blueMsgScreen from '../assets/images/blue-msg-screen.png'
import blueScreen from '../assets/images/blue-screen.png'
import blueCarScreen from '../assets/images/blue-car-screen.png'
import orange1 from "../assets/images/orange-msg-screen.png"
import orange2 from "../assets/images/orange-car-screen.png"
import orange3 from "../assets/images/orange-3.png"
import orange4 from "../assets/images/orange-4.png"
import orange5 from "../assets/images/orange-5.png"
import orange6 from "../assets/images/orange-6.png"
import blue1 from "../assets/images/blue-msg-screen.png"
import blue2 from "../assets/images/blue-car-screen.png"
import blue3 from "../assets/images/blue-3.png"
import blue4 from "../assets/images/blue-4.png"
import blue5 from "../assets/images/blue-5.png"
import blue6 from "../assets/images/blue-6.png"
import yellow1 from "../assets/images/yellow-msg-screen.png"
import yellow2 from "../assets/images/yellow-car-screen.png"
import yellow3 from "../assets/images/yellow-3.png"
import yellow4 from "../assets/images/yellow-4.png"
import yellow5 from "../assets/images/yellow-5.png"
import yellow6 from "../assets/images/yellow-6.png"

interface ITheme {
  uiColor: string;
  materialColor: string;
  screens: string[]
  orderScreens: string[];
}

const THEMES: ITheme[] = [
  {
    uiColor: "#554634",
    materialColor: "#E4C7A3",
    screens: [yellowMsgScreen, yellowScreen, yellowCarScreen],
    orderScreens: [yellow4, yellow3, yellow1, yellow6, yellow5, yellow2],
  },
  {
    uiColor: "#7b1d0a",
    materialColor: "#FF6410",
    screens: [orangeMsgScreen, orangeScreen, orangeCarScreen],
    orderScreens: [orange4, orange3, orange1, orange6, orange5, orange2],
  },
  {
    uiColor: "#013752",
    materialColor: "#28b9ed",
    screens: [blueMsgScreen, blueScreen, blueCarScreen],
    orderScreens: [blue4, blue3, blue1, blue6, blue5, blue2],
  },
]

class Theme {
  themes: ITheme[] = THEMES;
  activeIndex = 1;

  constructor() {
    makeAutoObservable(this);
  }

  get current() {
    return this.themes[this.activeIndex]
  }

  nextTheme() {
    this.activeIndex = (this.activeIndex + 1) % this.themes.length;
  }

  prevTheme() {
    this.activeIndex =
      (this.activeIndex - 1 + this.themes.length) % this.themes.length;
  }
}


export const ThemeStore = new Theme();
