import { observer } from "mobx-react-lite";
import c from "./style.module.css";
import {store} from "../../../store";

const TEXT = `
  Explain to you how all this mistaken idea of denouncing pleasure and praising pain was
  born and I will give you a complete account of the system, and expound the actual teachings of the
  great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or
  avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue
  pleasure rationally encounter consequences that are extremely painful.
`

export const ColorText = observer(() => {
  const {progress, current} = store.flow
  if (current.name !== "overview-to-color" && current.name !== "color") return
  if (current.name === "overview-to-color" && progress < 50) return

  // text animation
  const visibleChars = Math.max(0, Math.floor(((progress - 50) / 50) * TEXT.length));
  let visibleText1 = TEXT.slice(0, visibleChars);
  let visibleText2 = TEXT.slice(0, visibleChars + 50);
  let visibleText3 = TEXT.slice(0, visibleChars + 100);

  if (current.name === "color") {
    visibleText1 = TEXT
    visibleText2 = TEXT
    visibleText3 = TEXT
  }

  // Smooth fade-in of the initial text
  let opacityVal = 1;
  if (progress > 50 && progress < 65 && current.name === "overview-to-color") {
    opacityVal = 1 - ((65 - progress) / 15);
  }

  // Smooth fade-out of the initial text
  let marginVal = 0
  if (current.name === 'color' && progress > 50) {
    marginVal = 150 - (150 / 50 * (100 - progress))
  } else if (current.name === 'order' as string) {
    marginVal = 150
  }

  return (
    <div
      className={c.wrap}
      style={{
        opacity: opacityVal,
        transform: `translateY(-50%) translateX(${marginVal}%)`
    }}
    >
      <div style={{position: "absolute",opacity: 1}}>{visibleText1}</div>
      <div style={{position: "absolute",opacity: .5}}>{visibleText2}</div>
      <div style={{position: "absolute",opacity: .2}}>{visibleText3}</div>
      <div style={{opacity: 0}}>{TEXT}</div>
    </div>
  );
});
