import ReactFlowWrapper from "./Canvas/GraphForce"
import { observer } from "mobx-react-lite";
import canvasStore from "../mobx/stores/CanvasStore";
export const CanvasGrid = observer(() => {

  return (
    <div className="h-screen">
      <div className={`${canvasStore.showCanvas ? "canvas-show" : "canvas-hide"} h-5/6  m-12 border border-2 border-black rounded-md`}>
          <ReactFlowWrapper />
      </div>
    </div>
  )
})
