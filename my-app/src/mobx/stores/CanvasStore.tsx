import { makeAutoObservable } from "mobx";

class CanvasStore {
  showCanvas = false;
  firstNodeText = "";

  constructor() {
    makeAutoObservable(this);
  }

  setShowCanvas() {
    this.showCanvas = !this.showCanvas;
  }

  setFirstNodeText(value) {
    this.firstNodeText = value;
  }
}

export default new CanvasStore()
