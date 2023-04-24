import { useState } from "react"
import { Typewriter } from "react-simple-typewriter"

export default function SkimifyNode(props) {
  const [hideCursor, setHideCursor] = useState(false)

  function disableCursor() {
    setHideCursor(true)
  }
  return (
    <span className="tw-node">
      {
          <Typewriter
            words={[props.text]}
            loop={1}
            deleteSpeed = {0}
            cursor={hideCursor}
            onLoopDone={disableCursor}
            cursorStyle='|'
            typeSpeed={15}
            delaySpeed={1000}
            />
        }
    </span>
  )
}
