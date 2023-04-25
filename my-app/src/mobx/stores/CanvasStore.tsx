import { makeAutoObservable } from "mobx";

class CanvasStore {
  showCanvas = false;
  firstNodeText = "";

  nodesToAdd = [];
  nodesOffset = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setShowCanvas() {
    this.showCanvas = !this.showCanvas;
  }

  setFirstNodeText(value) {
    this.firstNodeText = value;
  }

  setNodesToAdd(data) {
    this.nodesToAdd = data;
  }
  setNodesOffet(val) {
    this.nodesOffset += val;
  }
}

export default new CanvasStore()
