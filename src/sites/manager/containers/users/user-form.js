import Form from "@items/form";
import React from "react";
import { api_images } from "@utils/API";

const FormUser = (props) => {
  const child = (props) => {
    const { change } = props;
    const data = props.data || { name: "", price: "" };

    console.log(data);
    return (
      <div className="body-form form-user">
        <div className="head-avatar">
          <label>I, Ảnh đại diện</label>
        </div>
        <div className="head-info">
          <label>II, Thông tin cá nhân</label>
        </div>
        <div className="head-log">
          <label>III, Thông tin đăng nhập</label>
        </div>

        <div className="content-info">
          <div className="avatar">
            <img src={api_images + data.avatar} alt=""></img>
            <label>{data.avatar?data.avatar:'chọn ảnh'}</label>
          </div>
          <div className="log base-content">
            <div className="label">
              <label>Tên đăng nhập</label>
              <label>Mật khẩu</label>
            </div>
            <div className="input">
              <input
                name="price"
                type="text"
                value={data.username || ""}
                onChange={(e) => change(e)}
              />
              <input
                name="price"
                type="text"
                value={data.password || ""}
                onChange={(e) => change(e)}
              />
            </div>
          </div>
        </div>

        <div className="info base-content">
          <div className="label">
            <label>Họ tên</label>
            <label>Tuổi</label>
            <label>Giới tính</label>
            <label>Địa chỉ</label>
            <label>Số điện thoại</label>
            <label>Email</label>
            <label>Số CMND</label>
            <label>Chú thích</label>
          </div>
          <div className="input">
            <input
              name="name"
              type="text"
              value={data.fullName || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="price"
              type="number"
              value={data.age || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="price"
              type="text"
              value={data.gender || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="address"
              type="text"
              value={data.address || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="price"
              type="number"
              value={data.phoneNumber || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="price"
              type="text"
              value={data.email || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="price"
              type="number"
              value={data.email || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="price"
              type="text"
              value={data.email || ""}
              onChange={(e) => change(e)}
            />
          </div>
        </div>
      </div>
    );
  };
  return <Form bundle={props}>{child}</Form>;
};

export default FormUser;
