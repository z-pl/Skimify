import { useState } from "react"
import { Typewriter } from 'react-simple-typewriter'

export function LandingHeader() {

  const [showSkimifyTool, setShowSkimifyTool] = useState(false);


  function toggleSkimifyTool() {
    setShowSkimifyTool(prevState => !prevState);
  }

  function DropDownAnimation() {

  }

  return (
    <div className="p-2 h-screen flex flex-col items-center gap-6">
      <div className="text-7xl break-words font-bold text-gray-700 w-6/12 text-center">
        Simplify your{' '}
        {
          <Typewriter
            words={['lecture notes', 'and videos', 'lecture notes and videos']}
            loop={1}
            cursor
            cursorStyle='_'
            typeSpeed={100}
            deleteSpeed={70}
            delaySpeed={1000}
            />
        }
      </div>

      <div className="text-2xl w-4/12 text-center text-gray-600">
        Skimify is an AI tool that enables students to summarize their lecture videos and notes.
      </div>

      <button onClick={toggleSkimifyTool} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded shadow">
        Skim It
      </button>

      {showSkimifyTool &&
        <div className="wrapper w-9/12 h-full">
          <div className="button">TEXT</div>
          <div className="bOut border top"></div>
          <div className="bOut border left"></div>
          <div className="bOut border right"></div>
          <div className="bOut border bottom-left"></div>
          <div className="bOut border bottom-right"></div>
      </div>
      }
    </div>

  )
}
