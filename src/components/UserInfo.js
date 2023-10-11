class UserInfo {
  constructor({ userName, userJob }) {
    this._user = document.querySelector(userName);
    this._job = document.querySelector(userJob);
  }

  getUserInfo() {
    this._user.value = this._user.textContent;
    this._job.value = this._job.textContent;
  }

  setUserInfo() {
    this._user.textContent = this._user.value;
    this._job.textContent = this._job.value;
  }
}
