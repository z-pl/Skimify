import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import textStore from "../mobx/stores/UserInputText"



export const VideoAndDrag = observer(function VideoAndDrag() {

  const [showSkimifyTool, setShowSkimifyTool] = useState(false);

  const [showSkimifyTextTool, setShowSkimifyTextTool] = useState(true);

  const [showSkimifyVideoTool, setShowSkimifyVideoTool] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const maxLengthValue = 500;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Add the handleSummarizeButtonClick function
  function handleSummarizeButtonClick() {
    // Add your summarization logic here
    console.log("Summarize button clicked");

    // Set the modal content with the text from the textarea
    setModalContent(inputValue);

    // Open the modal
    setIsModalOpen(true);
  }


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


  function Modal({ isOpen, content, onClose }) {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }

      return () => {
        document.body.style.overflow = "auto";
      };
    }, [isOpen]);

    function handleClose() {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        onClose();
      }, 400);
    }

    if (!isOpen) {
      return null;
    }

    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          className={`fixed inset-0 bg-black opacity-75 z-10 ${isClosing ? "animate-opacity-out" : ""}`}
          onClick={handleClose}
        ></div>
        <div className={`modal-container bg-white p-8 rounded-lg z-20 ${isClosing ? "animate-scale-out" : ""}`}>
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
          <div className="overflow-auto h-72 p-4 bg-gray-200 rounded-md shadow-inner relative">
            <pre className="notebook-grid absolute inset-0"></pre>
            <pre className="whitespace-pre-wrap relative z-10 text-content">{content}</pre>
          </div>

        </div>
      </div>
    );
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
                      onClick={handleSummarizeButtonClick}
                        // Add your summarization logic here

                  >
                    Summarize
                  </button>
              )
              }


              <Modal
                isOpen={isModalOpen}
                content={modalContent}
                onClose={() => setIsModalOpen(false)}
              />


            </div>





    );
})
