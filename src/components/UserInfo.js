class UserInfo {
  constructor({ userName, userJob }) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo() {
    this._userData = {};

    this._userData[this._name.value] = this._userName.textContent;
    this._userData[this._job.value] = this._userJob.textContent;

    return this._userData;
  }

  setUserInfo(info) {
    this._name = info.name;
    this._job = info.job;
    this._userName.textContent = this._name;
    this._userJob.textContent = this._job;
  }
}

export default UserInfo;
