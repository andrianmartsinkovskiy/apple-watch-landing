import { observer } from "mobx-react-lite";
import c from "./style.module.css";
import {FaArrowAltCircleDown, FaArrowAltCircleUp} from "react-icons/fa";
import {store} from "../../../store";
import {useMemo} from "react";

export const ColorSelect = observer(() => {
  const {current, progress} = store.flow
  const {themes, activeIndex} = store.theme

  // Circular theme loop
  const { prev, next, currentTheme } = useMemo(() => {
    const prev = themes[(activeIndex - 1 + themes.length) % themes.length];
    const next = themes[(activeIndex + 1) % themes.length];
    const currentTheme = themes[activeIndex];
    return { prev, next, currentTheme };
  }, [themes, activeIndex]);

  if (store.flow.index < 2) return
  const opacityVal =
    current.name === "overview-to-color" && progress > 80 || current.name === "color" && progress < 30 ? 1 : 0

  return (
    <div
      className={c.wrap}
      style={{opacity: opacityVal}}
    >
      <div className={c.colors}>
        <div className={c.item} style={{background: prev.uiColor}} />
        <div className={`${c.item} ${c.itemActive}`} style={{background: currentTheme.uiColor}} />
        <div className={c.item} style={{background: next.uiColor}} />
      </div>

      <div className={c.arrows}>
        <FaArrowAltCircleUp className={c.icon} onClick={() => store.theme.prevTheme()} />
        <FaArrowAltCircleDown className={c.icon} onClick={() => store.theme.nextTheme()} />
      </div>
    </div>
  );
});
