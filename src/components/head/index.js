import {
  faChalkboardTeacher,
  faUserCog,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "@src/resourses/Logo.png";
import constants from "@src/resourses/const";

const Head = (props) => {
  let i = faUserGraduate;
  switch (props.role) {
    case constants.role.admin:
      i = faUserCog;
      break;
    case constants.role.teacher:
      i = faChalkboardTeacher;
      break;
    default: {
    }
  }
  const userApp = useSelector((state) => state.userApp);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setClick(!click);
  };

  const handleChangePassword = () => {
    switch (props.role) {
      case constants.role.admin:
        window.location.href = "/manager/change-password";
        break;
      case constants.role.teacher:
        window.location.href = "/teacher/change-password";
        break;
      default: {
        window.location.href = "/student/change-password";
      }
    }
  };

  const handleLogout = () => {
    dispatch({
      type: constants.action.action_user_logout,
      value: {},
    });
    localStorage.removeItem("_access");
    window.location.href = "/login";
    console.log("logout");
  };

  const handleProfile = () => {
    switch (props.role) {
      case constants.role.admin:
        window.location.href = "/manager/profile";
        break;
      case constants.role.teacher:
        window.location.href = "/teacher/profile";
        break;
      default: {
        window.location.href = "/student/profile";
      }
    }
  };

  const handleEditProfile = () => {
    switch (props.role) {
      case constants.role.admin:
        window.location.href = "/manager/edit-profile";
        break;
      case constants.role.teacher:
        window.location.href = "/teacher/edit-profile";
        break;
      default: {
        window.location.href = "/student/edit-profile";
      }
    }
  };

  return (
    <div className="head-body">
      <div className="head-icon" style={{ flexBasis: "5%" }}>
        <FontAwesomeIcon icon={i} className="head-icon"></FontAwesomeIcon>
      </div>
      <div className="h" style={{ flexBasis: "80%" }}>
        <h3 data-wow-duration="1s" data-wow-delay="0.1s">
          {props.title}
        </h3>
      </div>
      <div style={{ flexBasis: "15%" }}>
        <div style={{ display: "flex" }}>
          <div className="name-user" style={{ flexBasis: "75%" }}>
            <span>{userApp.currentUser.full_name}</span>
          </div>
          <div className="avatar" style={{}} onClick={() => handleClick()}>
            <img src={logo} style={{ width: "70px" }} alt=""></img>
          </div>
        </div>
        <div className="t" style={{ display: click ? "block" : "none" ,zIndex:"1"}}>
          <ul>
            <li onClick={() => handleProfile()}>hồ sơ</li>
            <li onClick={() => handleEditProfile()}>chỉnh sửa thông tin</li>
            <li onClick={() => handleChangePassword()}>đổi mật khẩu</li>
            <li onClick={() => handleLogout()}>đăng xuất</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Head;
