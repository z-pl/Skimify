import { makeAutoObservable } from "mobx";

class TextAreaStore {
  textValue = "";
  

  constructor() {
    makeAutoObservable(this);
  }

  setTextValue(value) {
    this.textValue = value;
  }
}

export default new TextAreaStore();