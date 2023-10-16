class UserInfo {
  constructor({ userName, userJob }) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo(info) {
    const userData = {};

    userData[info.name] = this._userName.textContent;
    userData[info.job] = this._userJob.textContent;

    console.log(userData);
    return userData;
  }

  setUserInfo(info) {
    this._userName.textContent = info.name;
    this._userJob.textContent = info.job;
  }
}

export default UserInfo;
