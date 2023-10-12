class UserInfo {
  constructor({ userName, userJob, input }) {
    this._user = userName;
    this._job = userJob;
    this._input = input;
  }

  getUserInfo() {
    this._input.value = this._user;
    this._input.value = this._job;
  }

  setUserInfo() {
    this.getUserInfo();
    this._user = this._input.value;
    this._job = this._input.value;
  }
}

export default UserInfo;
