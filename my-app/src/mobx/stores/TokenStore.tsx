import { makeAutoObservable } from "mobx";

class TokenStore {
  token = null

  constructor(){
    makeAutoObservable(this)
  }

  saveToken(userToken) {
    localStorage.setItem('token', userToken)
    this.token = userToken
  }

  removeToken() {
    localStorage.removeItem('token')
    this.token = null
  }

  getToken() {
    this.token = localStorage.getItem('token') || null;
    return this.token
  }
}

export default new TokenStore()
