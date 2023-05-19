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
    <div ref = {bottomRef} className="mx-2 flex flex-col items-center gap-1">
      <div className="text-5xl font-roboto landing-header-text min-h-40 xl:h-40 lg:h-auto md:h-auto sm:text-7xl font-bold w-8/12 text-center">
        Simplify your {'  '}
        {
          <Typewriter
            words={['notes into a mind map']}
            loop={1}
            cursor
            cursorStyle='|'
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1000}
            />
        }
      </div>

      <div className="text-lg landing-subheader-text sm:text-xl w-6/12 text-center">
        Skimify is an AI tool that untanlges your notes & embodies first principle learning!
      </div>

    </div>

  )
}
