import c from './style.module.css';
import {store} from "../../../store";
import {useEffect, useState} from "react";
import {MODEL_ELEMENTS} from "../../../config/model-elements.tsx";
import {observer} from "mobx-react-lite";


const Overview = observer(() => {
  const [activeInfo, setActiveInfo] = useState(MODEL_ELEMENTS.apple_watch.info);
  const [wrapState, setWrapState] = useState<"visible" | "hidden">("hidden");

  useEffect(() => {
    if (store.flow.current.name !== 'overview') return
    setWrapState("hidden")
    setTimeout(() => {
      const newActiveInfo = store.flow.activeHover
        ? MODEL_ELEMENTS[store.flow.activeHover].info
        : MODEL_ELEMENTS.apple_watch.info;

      setActiveInfo(newActiveInfo)
      setWrapState("visible")
    }, 350)
  }, [store.flow.activeHover])

  useEffect(() => {
    if (store.flow.current.name === 'overview') {
      setWrapState("visible")
    } else {
      setWrapState("hidden")
    }
  }, [store.flow.index]);


  const wrapClass = wrapState === "visible" ? c.wrap : `${c.wrap} ${c.wrapHidden}`

  return (
    <div className={wrapClass}>
      <div className={c.head}>
        <span className={c.icon} style={{color: store.theme.current.uiColor}}>{activeInfo.icon}</span>
        <span>{activeInfo.name}
      </span>
      </div>
      <div className={c.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      <div className={c.model}>S9 Series</div>
    </div>
  );
})

export {
  Overview
}
