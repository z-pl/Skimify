import { useState } from "react"
import { Typewriter } from "react-simple-typewriter"
import FirstNodeClick from "./FirstNodeClick"
import canvasStore from "../../mobx/stores/CanvasStore"
import { observer } from "mobx-react-lite"

export const SkimifyNode = observer((props: any) => {
  const [hideCursor, setHideCursor] = useState(false)

  function disableCursor() {
    setHideCursor(true)
  }
  return (

    <div className="relative">
    {canvasStore.firstTimeVisit && <FirstNodeClick />}
      <span className="tw-node">
        {
            <Typewriter
              words={[props.text]}
              loop={1}
              deleteSpeed = {0}
              cursor={hideCursor}
              onLoopDone={disableCursor}
              cursorStyle='|'
              typeSpeed={5}
              delaySpeed={1000}
              />
          }
      </span>
    </div>
  )
})
