class UserInfo {
  constructor(userName, userDescription, userProfileImage) {
    this._userName = userName;
    this._userDescription = userDescription;
    this._userProfileImage = userProfileImage;
  }

  getUserInfo() {
    const userData = {};

    userData.name = this._userName.textContent;
    userData.about = this._userDescription.textContent;

    return userData;
  }

  setUserInfo(info) {
    this._userName.textContent = info.name;
    this._userDescription.textContent = info.about;
  }

  setUserProfileImage(data) {
    this._userProfileImage.src = data.avatar;
    this._userProfileImage.alt = this._userName.textContent;
  }
}

export default UserInfo;
