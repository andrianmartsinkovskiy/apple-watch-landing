import {Suspense, useEffect, useState} from "react";
import {store} from "./store";
import {Canvas} from "@react-three/fiber";
import {Scene} from "./containers/scene";
import {observer} from "mobx-react-lite";
import {Overview} from "./containers/ui/overview";
import {Navbar} from "./containers/ui/navbar";
import {Loader} from "./components/loader";
import {ColorText} from "./containers/ui/color-text";
import {ColorSelect} from "./containers/ui/color-select";
import {Order} from "./containers/ui/order";

const App = observer(() => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    store.flow.startScrollDetect()
  }, []);

  return (
    <>
      {
        isLoaded ? (
          <>
            <Navbar />
            <Overview />
            <ColorText />
            <ColorSelect />
            <Order />
          </>
        ) : (
          <Loader />
        )
      }

      <div className="canvas" style={{left: `${store.flow.wrapPosition}%`}}>
        <Canvas
          style={{width: "100%", height: "100%"}}
          camera={{ position: [-1.5, 0, 0] }}
        >
          <Suspense fallback={null}>
            <Scene onLoad={() => setIsLoaded(true)} />
          </Suspense>
        </Canvas>
      </div>
    </>

  )
})

export default App
