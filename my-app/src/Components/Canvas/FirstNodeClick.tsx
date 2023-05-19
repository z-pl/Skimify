import { motion } from "framer-motion"


export default function FirstNodeClick() {
  return (
    <div className="absolute bottom-8 left-1/3 mb-2">
      <div className="flex flex-col items-center gap-3">
        <motion.div
          className="font-black font-bold text-2xl"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
          >
            Click Me
        </motion.div>
        <div className="box">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}
