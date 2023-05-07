import { AnimatePresence, motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRotateRight } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
import canvasStore from "../../mobx/stores/CanvasStore";

interface ResetCanvasProps {
  resetGraph: () => void;
}
export default function RestartCanvas(props : ResetCanvasProps)
{

  const [isHovered, setIsHovered] = useState(false);

  const buttonVariants = {
    expanded: {
      borderRadius: "50px",
      padding: "0.4rem 0.4rem",
      width: 150,
      transition: {
        duration: 0.2,
      },
    },
    collapsed: {
      borderRadius: "50px",
      padding: "0.4rem 0.4rem",
      width: 40,
      height: 40,
      transition: {
        duration: 0.2,
      },
    },
  };


  const clearCanvas = () => {

    setTimeout(() => {
      canvasStore.bottomRef.current.scrollIntoView({      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',})
    }, 0);

    props.resetGraph();


    setTimeout(() => {

      canvasStore.setShowCanvas();
    }, 1000);



  }
  return (
    <div>
      <motion.button
        onClick={clearCanvas}
        className={`restart-canvas-btn flex gap-2`}
        variants={buttonVariants}
        initial="collapsed"
        animate={isHovered ? "expanded": "collapsed"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={isHovered ? {rotate: 270 } : {}}
        >
          <FontAwesomeIcon icon={faRotateRight} size="xl"/>
        </motion.div>
          {isHovered && (
            <motion.span
              className="restart-canvas-txt"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{delay: 0.2, duration: 0.25}}
            >
            New Canvas

            </motion.span>
          )}
      </motion.button>
    </div>
  )
}
