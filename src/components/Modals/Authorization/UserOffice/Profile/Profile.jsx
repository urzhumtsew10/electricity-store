import "../Profile/Profile.css";
import userAvatar from "../../../../../img/icon-user.svg";

export const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userName = userData?.name;
  const userEmail = userData?.email;
  return (
    <div className="userOffice__content contentProfile">
      <div className="contentProfile__userInfo">
        <img className="userInfo__avatar" src={userAvatar} alt="avatar" />
        <div className="userInfo__view">
          <p className="userInfo__name">
            name: <span className="userInfo__span">{userName}</span>
          </p>
          <p className="userInfo__email">
            email: <span className="userInfo__span">{userEmail}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
