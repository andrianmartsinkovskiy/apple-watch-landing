import c from './style.module.css';
import {observer} from "mobx-react-lite";
import {store} from "../../../store";
import {useState} from "react";


const Order = observer(() => {
  const [hover, setHover] = useState(false)
  if (store.flow.current.name !== 'order') return
  const opacityVal = store.flow.progress / 100
  const marginVal = 200 - (200 / 100 * store.flow.progress)
  const screens = store.theme.current.orderScreens;

  const openLink = () => {
    window.open("https://am-dev.site/", "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <h2
        className={c.name}
        style={{
          transform: `translateX(-50%) translateY(${-marginVal}px)`,
          opacity: opacityVal
        }}
      >
        Series S9
      </h2>
      <button
        className={c.btn}
        onClick={openLink}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: hover ? store.theme.current.materialColor : store.theme.current.uiColor,
          transform: `translateX(-50%) translateY(${marginVal}px)`,
          opacity: opacityVal
        }}
      >
        order now
      </button>
      <div
        className={c.left}
        style={{
          top: `${100 - store.flow.progress}vh`,
          opacity: opacityVal
        }}
      >
        {
          [screens[0], screens[1], screens[2]].map((screen, index) => (
            <img key={index} src={screen} alt=""/>
          ))
        }
      </div>
      <div
        className={c.right}
        style={{
          top: `${-(100 - store.flow.progress)}vh`,
          opacity: opacityVal
        }}
      >
        {
          [screens[3], screens[4], screens[5]].map((screen, index) => (
            <img key={index} src={screen} alt=""/>
          ))
        }
      </div>
    </>
  );
})

export {
  Order
}
