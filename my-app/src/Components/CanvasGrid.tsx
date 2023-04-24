import ReactFlowWrapper from "./Canvas/GraphForce"
import { observer } from "mobx-react-lite";
import canvasStore from "../mobx/stores/CanvasStore";
export const CanvasGrid = observer(() => {

  return (
    <div className={`${canvasStore.showCanvas ? "canvas-show" : "canvas-hide"} h-screen m-4 border border-black`}>
         <ReactFlowWrapper />
    </div>
  )
})
