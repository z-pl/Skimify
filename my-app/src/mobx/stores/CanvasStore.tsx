import { makeAutoObservable } from "mobx";

class CanvasStore {
  showCanvas = false;
  constructor() {
    makeAutoObservable(this);
  }

  setShowCanvas() {
    this.showCanvas = !this.showCanvas;
  }
}

export default new CanvasStore()
