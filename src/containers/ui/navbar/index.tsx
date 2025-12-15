import c from './style.module.css';
import logo from "../../../assets/images/logo.png"
import {observer} from "mobx-react-lite";
import {useEffect, useMemo, useState} from "react";
import {store} from "../../../store";


const Navbar = observer(() => {
  const [wrapClass, setWrapClass] = useState(c.wrap);
  const [hover, setHover] = useState(false)
  const marginVal = useMemo(() => {
    const { name } = store.flow.current;
    const p = store.flow.progress;

    if (name === 'order') return 300;
    if (name === 'color' && p > 50) {
      return 300 - (300 / 50) * (100 - p);
    }
    return 0;
  }, [store.flow.current, store.flow.progress]);

  useEffect(() => {
    setTimeout(() => {
      setWrapClass(`${c.wrap} ${c.wrapActive}`)
    }, 50)
  }, []);

  const openLink = () => {
    window.open("https://am-dev.site/", "_blank", "noopener,noreferrer");
  }

  return (
    <div className={wrapClass}>
      <img style={{transform: `translateX(-${marginVal}px)`}} className={c.logo} src={logo} alt=""/>
      <div className={c.right} style={{transform: `translateX(${marginVal}px)`}} >
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={openLink}
          style={{background: hover ? store.theme.current.materialColor : store.theme.current.uiColor,}}
          className={c.btn}
        >
          sign in/up
        </button>
        <button className={c.menuBtn}>
          <span className={c.menuBtnIcon}>
            <span />
            <span />
            <span />
          </span>
          <span>menu</span>
        </button>
      </div>
    </div>
  );
})

export {
  Navbar
}
