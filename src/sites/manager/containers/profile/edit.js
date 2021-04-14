import React, { useEffect, useState } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { api_user, api_upload_image, api_images } from "@utils/API";
import { toast } from "react-toastify";

const Edit = (props) => {
  const [profile, setProfile] = useState({});
  const [file, setFile] = useState(null);
  const userApp = useSelector((state) => state.userApp);

  const handleSubmit = () => {
    fetch(api_user + "/" + userApp.currentUser.userId, {
      method: "put",
      headers: {
        "content-type": "multipart/form-data",
        Authorization: userApp.token,
      },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          setProfile(json.data);
          toast.success("cập nhật thành công");
        } else {
          toast.error(json.message);
        }
      });
  };
  const handleSubmitFile = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    setFile(event.target.files[0]);

    console.log(formData);
    fetch(api_upload_image, {
      method: "post",
      headers: {
        Authorization: userApp.token,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          console.log(file);
          setProfile({ ...profile, avatar: file.name });
          toast.success("cập nhật thành công");
        } else {
          toast.error(json.message);
        }
      });
  };

  useEffect(() => {
    if (userApp === null) {
      window.location.href = "/login";
      return;
    }

    fetch(api_user + "/" + userApp.currentUser.userId, {
      headers: {
        "content-type": "application/json",
        Authorization: userApp.token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          setProfile(json.data);
        } else {
          toast.error(json.message);
        }
      })
      .catch((err) => {
        toast.error(err);
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
              <input value={file ? file.name : ""}></input>
              <input
                className="i_f"
                name="file"
                id="file"
                type="file"
                defaultValue=""
                onChange={(event) => handleSubmitFile(event)}
              ></input>
              <label htmlFor="file">chọn ảnh</label>

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
              <input
                value={profile.fullName}
                onChange={(e) =>
                  setProfile({ ...profile, fullName: e.target.value })
                }
              ></input>
              <input
                value={profile.age}
                onChange={(e) =>
                  setProfile({ ...profile, age: e.target.value })
                }
              ></input>
              <select
                value={profile.gender}
                onChange={(e) =>
                  setProfile({ ...profile, gender: e.target.value })
                }
              >
                <option value="NAM">nam</option>
                <option value="NU">nữ</option>
                <option>khác</option>
              </select>
              <input className="not" value={profile.fullName}></input>
              <input
                value={profile.address}
                onChange={(e) =>
                  setProfile({ ...profile, address: e.target.value })
                }
              ></input>
              <input
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              ></input>
              <input
                value={profile.phoneNumber}
                onChange={(e) =>
                  setProfile({ ...profile, phoneNumber: e.target.value })
                }
              ></input>
              <input className="not" value={profile.username}></input>
              <input className="not" value={profile.status}></input>
            </div>
          </div>
          <button className="default-btn btn" onClick={() => handleSubmit()}>
            Xác nhận
          </button>
        </div>
      </div>
    </>
  );
};

export default Edit;
