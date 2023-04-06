import { useState } from "react";
import { Cursor, Typewriter } from "react-simple-typewriter";

export function VideoAndDrag() {

  const [showSkimifyTool, setShowSkimifyTool] = useState(false);

  const [showSkimifyTextTool, setShowSkimifyTextTool] = useState(true);

  const [showSkimifyVideoTool, setShowSkimifyVideoTool] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const maxLengthValue = 500;

  function onDragOver(event: any) {
    event.preventDefault();
  }

  function onDrop(event: any) {
    event.preventDefault();
    if (event.dataTransfer.items) {
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        if (event.dataTransfer.items[i].kind === "file") {
          const file = event.dataTransfer.items[i].getAsFile();
          console.log("File name:", file.name);
        }
      }
    }
  }


  function handleInputChange(event: any) {
    setInputValue(event.target.value);
  }



  function toggleSkimifyTool() {
    setShowSkimifyTool((prevState) => !prevState);
    if (!showSkimifyTool) {
      setShowSkimifyTextTool(true);
      setShowSkimifyVideoTool(false);
    }
  }
  

  function toggleSkimifyTextTool() {
    setShowSkimifyTextTool(true);
    setShowSkimifyVideoTool(false);
  }
  
  function toggleSkimifyVideoTool() {
    setShowSkimifyVideoTool(true);
    setShowSkimifyTextTool(false);
  }

  function DropDownAnimation() {}





        
          return (
            <div className="p-2  flex flex-col items-center gap-6 mb-20">

        

        
              <button
                onClick={toggleSkimifyTool}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded shadow"
              >
                Skim It
              </button>
        
        
        
        
        
        
              {showSkimifyTool && (
            <div className="mt-0 flex justify-center items-center gap-3">
              <div className="relative">
                <button
                  onClick={toggleSkimifyTextTool}
                  className={`bg-white text-gray-800 font-semibold py-2 px-4 border-t border-b border-l rounded-l shadow  ${
                    showSkimifyTextTool ? "bg-gray-400" : "hover:bg-gray-100" 
                  }`}
                >
                  Text
                </button>
                <button
                  onClick={toggleSkimifyVideoTool}
                  className={`bg-white text-gray-800 font-semibold py-2 px-4 border-t border-b border-r rounded-r shadow ${
                    showSkimifyVideoTool ? "bg-gray-400" : "hover:bg-gray-100"
                  }`}
                >
                  Video
                </button>
              </div>
            </div>
          )}
        
        
        
        {showSkimifyTool && showSkimifyTextTool && (
            <div className="mt-8 w-9/12">
              <textarea
                rows={10}
                maxLength={maxLengthValue}
                className="w-full p-2 border-2 border-gray-300 rounded"
                placeholder="Enter your text here"
                value={inputValue}
                onChange={handleInputChange}
        
        
                
              ></textarea>
                <div className="text-right text-gray-600 mt-1">
                {inputValue.length}/{maxLengthValue} characters
              </div>
        
            </div>
          )}


        
        
        
              {/* Show the drop zone when clicking on the "Video" button */}
              {showSkimifyVideoTool && showSkimifyTool && (
                <div className="w-9/12 h-80 mt-8 bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center"
                onDragOver={onDragOver}
                onDrop={onDrop}
                >
                  <p className="text-gray-600">Drag and drop files here</p>
                </div>
              )}


              {showSkimifyTool && (
                  <button
                      className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        // Add your summarization logic here
                        console.log("Summarize button clicked");
                      }}
                  >
                    Summarize
                  </button>
              )}

            </div>





    );
}