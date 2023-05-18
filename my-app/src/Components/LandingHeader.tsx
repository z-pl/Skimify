import { useState, useEffect, useRef } from "react"
import { Typewriter } from 'react-simple-typewriter'
import canvasStore from "../mobx/stores/CanvasStore";
import { observer } from "mobx-react-lite";

export function LandingHeader() {

  const [showSkimifyTool, setShowSkimifyTool] = useState(false);


  const bottomRef = useRef<HTMLDivElement | null>(null);



  useEffect(() => {
    canvasStore.setBottomRef(bottomRef);
  }, []);



  function toggleSkimifyTool() {
    setShowSkimifyTool(prevState => !prevState);
  }

  function DropDownAnimation() {

  }

    return (
    <div ref = {bottomRef} className="m-1 flex flex-col items-center gap-6">
      <div className="text-5xl font-roboto landing-header-text sm:text-7xl  min-h-40 font-bold w-8/12 text-center">
        Simplify your {'  '}
        {
          <Typewriter
            words={['notes into a mind map']}
            loop={1}
            cursor
            cursorStyle='_'
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1000}
            />
        }
      </div>

      <div className="text-lg landing-subheader-text md: sm:text-xl w-6/12 text-center">
        Skimify is an AI tool that untanlges your notes & embodies first principle learning.
      </div>

    </div>

  )
}
