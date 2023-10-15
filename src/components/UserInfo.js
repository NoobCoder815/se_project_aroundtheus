class UserInfo {
  constructor({ userName, userJob }, config) {
    this._userName = userName;
    this._userJob = userJob;
    this._inputSelector = config.inputSelector;
  }

  getUserInfo(form) {
    this._inputList = [...form.querySelectorAll(this._inputSelector)];

    const userData = {};
    this._inputList.forEach((input) => {
      //
      userData[input.name] = this._userName.textContent;
    });
    console.log(userData);
    return userData;
  }

  setUserInfo(info) {
    this._userName.textContent = info.name;
    this._userJob.textContent = info.job;
  }
}

export default UserInfo;
