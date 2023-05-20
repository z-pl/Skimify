import { makeAutoObservable } from "mobx";

class CanvasStore {
  showCanvas = false;
  firstNodeText = "";
  bottomRef = null;
  nodesToAdd = [];
  nodesOffset = 1;
  firstTimeVisit = false;
  nodesClicked = new Set()

  constructor() {
    makeAutoObservable(this);
  }

  setShowCanvas() {
    this.showCanvas = !this.showCanvas;
  }

  setFirstNodeText(value) {
    this.firstNodeText = value;
  }

  setBottomRef(ref: React.RefObject<HTMLDivElement> | null): void {
    this.bottomRef = ref;
  }
  setNodesToAdd(data) {
    this.nodesToAdd = data;
  }
  setNodesOffet(val) {
    this.nodesOffset += val;
  }

  setFirstTimeVisit(val) {
    this.firstTimeVisit = val
  }

  addNodeClick(nodeId) {
    this.nodesClicked.add(nodeId)
  }

  removeNodeClick(nodeId) {
    this.nodesClicked.delete(nodeId)
  }

  isNodeClicked(nodeId) {
    return this.nodesClicked.has(nodeId)
  }
}

export default new CanvasStore()
