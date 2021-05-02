import React, { useEffect, useState } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { api_user, api_images } from "@utils/API";
import { toast } from "react-toastify";

const Profile = (props) => {
  const [profile, setProfile] = useState({});
  const userApp = useSelector((state) => state.userApp);

  useEffect(() => {
    fetch(api_user + "/" + userApp.currentUser.userId, {
      headers: {
        "content-type": "application/json",
        Authorization: userApp.token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) setProfile(json.data);
        else {
          toast.error(json.message);
        }
      });
    return () => {};
  }, [userApp]);

  return (
    <>
      <div className="profile-content">
        <div className="content">
          <h2>Thông tin người dùng</h2>
          <div className="profile">
            <div className="a">
              <div className="avatar">
                <div>
                  {profile.avatar != null ? (
                    <img
                      src={api_images + profile.avatar}
                      width=""
                      alt=""
                    ></img>
                  ) : (
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      style={{ fontSize: "100px", color: "var(--red)" }}
                    ></FontAwesomeIcon>
                  )}
                </div>
              </div>
              <div>
                <div className="aa">
                  <span>Số khóa đã hoàn thành</span>
                  <span>Số khóa đang học</span>
                </div>
                <div className="ab">
                  <span>0</span>
                  <span>0</span>
                </div>
              </div>
            </div>
            <div className="c">
              <span>Họ tên</span>
              <span>Tuổi</span>
              <span>Giới tính</span>
              <span>Ngày sinh</span>
              <span>Địa chỉ</span>
              <span>Email</span>
              <span>Số điện thoại</span>
              <span>Tên đăng nhập</span>
              <span>Trạng thái</span>
            </div>
            <div className="d">
              <span>{profile.fullName}</span>
              <span>{profile.age}</span>
              <span>{profile.gender}</span>
              <span>{profile.fullName}</span>
              <span>{profile.address}</span>
              <span>{profile.email}</span>
              <span>{profile.phoneNumber}</span>
              <span>{profile.username}</span>
              <span>{profile.status}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
