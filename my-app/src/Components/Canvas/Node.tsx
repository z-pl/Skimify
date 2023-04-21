import { useState } from "react"
import { Typewriter } from "react-simple-typewriter"

export function Node(props) {
  const [hideCursor, setHideCursor] = useState(false)

  function disableCursor() {
    setHideCursor(true)
  }
  return (
    <div>
      {
          <Typewriter
            words={props.text.split(" ")}
            loop={1}
            cursor={hideCursor}
            onLoopDone={disableCursor}
            cursorStyle='|'
            typeSpeed={80}
            delaySpeed={1000}
            />
        }
    </div>
  )
}
