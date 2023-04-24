import { useState } from "react"
import { Typewriter } from 'react-simple-typewriter'
import textAreaStore from "../mobx/stores/UserInputText";
import { observer } from "mobx-react-lite";

export function LandingHeader() {

  const [showSkimifyTool, setShowSkimifyTool] = useState(false);


  function toggleSkimifyTool() {
    setShowSkimifyTool(prevState => !prevState);
  }

  function DropDownAnimation() {

  }

  return (
    <div className="p-2  flex flex-col items-center gap-6">
      <div className="text-7xl break-words font-bold text-gray-700 w-6/12 text-center">
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

      <div className="text-2xl w-4/12 text-center text-gray-600">
        Skimify is an AI tool that enables students to summarize their lecture videos and notes.
      </div>

    </div>

  )
}
