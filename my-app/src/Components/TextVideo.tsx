import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import textAreaStore from "../mobx/stores/UserInputText";
import canvasStore from "../mobx/stores/CanvasStore";
import { observer } from "mobx-react-lite";
import "../App.css";




const tabs = [
  { icon: "📄", label: "Transcript" },
  { icon: "🎤", label: "Recording" },
];

let wordLimit = 2000;

export const TextVideo = observer(() => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleSkimItClick = () => {
    canvasStore.setShowCanvas();
    canvasStore.setFirstNodeText(textAreaStore.textValue);

    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 10);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const words = e.target.value.trim().split(/\s+/);
    if (words.length <= wordLimit || words[0] === "") {
      textAreaStore.setTextValue(e.target.value);
    }
  };

  let wordCount = textAreaStore.textValue.trim().split(/\s+/).length;
  if (textAreaStore.textValue.trim() === "") {
    wordCount = 0;
  }


  return (
    <div className="flex flex-col items-center space-y-5 mt-3">
      
      <div className="bg-gray-100 rounded-md shadow-md">
        <ul className="flex">
          {tabs.map((item) => (
            <li
              key={item.label}
              className={
                item === selectedTab
                  ? "selected px-4 py-2 bg-gray-300 cursor-pointer relative"
                  : "px-4 py-2 cursor-pointer"
              }
              onClick={() => setSelectedTab(item)}
            >
              {`${item.icon} ${item.label}`}
              {item === selectedTab ? (
                <motion.div
                  className="underline"
                  layoutId="underline"
                  initial={false}
                  transition={{ duration: 0.2 }}
                />
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      {selectedTab.label === "Transcript" ? (
      <div className="w-10/12">
        <textarea
          rows={15}
          className="w-full px-4 py-2 text-lg bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-96 min-w-full min-h-[10rem]"
          placeholder="Enter your lecture transcript here..."
          value={textAreaStore.textValue}
          onChange={handleTextareaChange}
        ></textarea>
        <div className="mt-2 text-right text-sm text-gray-500">
          {wordCount}/{wordLimit}
        </div>
      </div>
    ) : (
        <div className="mt-8 w-10/12 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center h-96">
          <p className="text-gray-500 text-lg">Drag a file...</p>
        </div>
      )}

      <AnimatePresence>
        {!canvasStore.showCanvas && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSkimItClick}
            className={
            "skim-it-btn " + (!canvasStore.showCanvas ? "btn-enable" : "btn-disable")}>Skim It</motion.button>
      )}
      </AnimatePresence>
    </div>
  );
});



