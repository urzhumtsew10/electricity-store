import "../UserOffice/UserOffice.css";
import { MenuItem } from "./MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { Profile } from "./Profile/Profile";
import { Orders } from "./Orders/Orders";
import { Editing } from "./Editing/Editing";
import icon_exit from "../../../../svg/icon-exit.svg";
import { useCookies } from "react-cookie";
import { setActiveAuthModal } from "../../../../store/modals";

export const UserOffice = ({ activeOffice }) => {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const menuList = useSelector((state) => state.menuAccount.menuList);
  const activeContent = menuList.filter((item) => item.isActive)[0];

  const exitAccount = () => {
    removeCookie("token");
    dispatch(setActiveAuthModal({ isActive: false }));
  };

  return (
    <div className={`contentAuthorization__userOffice ${activeOffice}`}>
      <div className="userOffice__menuOffice">
        {menuList.map((item) => (
          <MenuItem
            key={item.title}
            title={item.title}
            isActive={item.isActive}
          />
        ))}
        <img
          onClick={exitAccount}
          className="menuOffice__exitImg"
          src={icon_exit}
          alt="exit"
        />
      </div>
      {activeContent.title === "Your profile" && <Profile />}
      {activeContent.title === "Your orders" && <Orders />}
      {activeContent.title === "Editing" && <Editing />}
    </div>
  );
};
