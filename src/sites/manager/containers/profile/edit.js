import React, { useEffect, useState } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { api_user } from "@utils/API";
import { toast } from "react-toastify";

const Edit = (props) => {
  const nameComponent = "Chỉnh sửa thông tin";
  const [profile, setProfile] = useState({});
  const userApp = useSelector((state) => state.userApp);

  useEffect(() => {
    let mounted = true;
    console.log(userApp);
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
    return () => (mounted = false);
  }, []);

  return (
    <>
      <div className="profile-content">
        <div className="content">
          <h2>Thông tin người dùng</h2>
          <div className="profile">
            <div className="a">
              <div className="avatar">
                <div style={{ padding: "20px 40px" }}>
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    style={{ fontSize: "100px", color: "var(--red)" }}
                  ></FontAwesomeIcon>
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
              <input type="text"></input>
              <input type="text"></input>
              <input type="text"></input>
              <input type="text"></input>
              <input type="text"></input>
              <input type="text"></input>
              <input type="text"></input>
              <input type="text"></input>
              <input type="text"></input>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
