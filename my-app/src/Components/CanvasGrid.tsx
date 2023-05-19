import ReactFlowWrapper from "./Canvas/GraphForce"
import { observer } from "mobx-react-lite";
import canvasStore from "../mobx/stores/CanvasStore";
import { AnimatePresence, delay, motion} from "framer-motion";
export const CanvasGrid = observer(() => {

  return (
    <div className="h-screen">
      <AnimatePresence>
        {canvasStore.showCanvas && (<motion.div
          className={`h-5/6  m-12 border border-2 border-black rounded-md`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{delay: 0, duration: 1 }}
          >
            <ReactFlowWrapper />
        </motion.div>)}
      </AnimatePresence>
    </div>
  )
})
