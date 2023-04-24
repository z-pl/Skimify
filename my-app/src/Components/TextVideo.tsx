import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import textAreaStore from "../mobx/stores/UserInputText";
import canvasStore from "../mobx/stores/CanvasStore";
import { observer } from "mobx-react-lite";


export const TextVideo = observer(() => {

  const [inputType, setInputType] = useState("text");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const radioButtonStyle = "w-6 h-6 border-2 border-blue-600 rounded-full p-0.5 flex items-center justify-center";

  const radioButtonInnerStyle = "w-3 h-3 bg-blue-600 rounded-full transform transition-transform duration-200";

  const handleSkimItClick = () => {

    if (bottomRef.current){
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }

    canvasStore.setShowCanvas()
    console.log("Textarea value:", textAreaStore.textValue);
  };

  return (
    <div className="flex flex-col items-center space-y-5 mt-3">
      <div className="p-4 bg-gray-100 rounded-md shadow-md">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <div className={radioButtonStyle}>
              <input
                type="radio"
                name="inputType"
                value="text"
                className="hidden"
                checked={inputType === "text"}
                onChange={() => setInputType("text")}
              />
              <div
                className={`${radioButtonInnerStyle} ${
                  inputType !== "text" && "scale-0"
                }`}
              ></div>
            </div>
            <div className="flex items-center space-x-1">
              <i className="fas fa-align-left text-lg"></i>
              <span className="text-lg">Text</span>
            </div>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <div className={radioButtonStyle}>
              <input
                type="radio"
                name="inputType"
                value="file"
                className="hidden"
                checked={inputType === "file"}
                onChange={() => setInputType("file")}
              />
              <div
                className={`${radioButtonInnerStyle} ${
                  inputType !== "file" && "scale-0"
                }`}
              ></div>
            </div>
            <div className="flex items-center space-x-1">
              <i className="fas fa-file-upload text-lg"></i>
              <span className="text-lg">Recording</span>
            </div>
          </label>
        </div>
      </div>

      {inputType === "text" ? (
  <div className="w-10/12">
    <textarea
      rows={15}
      maxLength={10000}
      className="w-full px-4 py-2 text-lg bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-96"
      placeholder="Enter your lecture transcript here..."
      value={textAreaStore.textValue}
      onChange={(e) => textAreaStore.setTextValue(e.target.value)}
    ></textarea>
    <div className="mt-2 text-right text-sm text-gray-500">
      {textAreaStore.textValue.length}/10000
    </div>
  </div>
) : (
  <div className="mt-8 w-10/12 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center h-96">
    <p className="text-gray-500 text-lg">Drag a file...</p>
  </div>
)}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleSkimItClick}
        className="px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Skim It
      </motion.button>
      <div ref={bottomRef}></div>

    </div>

  );
})
