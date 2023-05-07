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
    <div ref = {bottomRef} className="p-2  flex flex-col items-center gap-6">
      <div className=" font-roboto landing-header-text text-7xl break-words font-bold  w-6/12 text-center">
        Simplify your {'  '}
        {
          <Typewriter
            words={[' lecture notes', 'videos', 'lecture notes and videos.']}
            loop={1}
            cursor
            cursorStyle='_'
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1000}
            />
        }
      </div>

      <div className="landing-subheader-text text-xl w-4/12 text-center">
        Skimify is an AI tool that enables students to summarize their lecture videos and notes.
      </div>

    </div>

  )
}
