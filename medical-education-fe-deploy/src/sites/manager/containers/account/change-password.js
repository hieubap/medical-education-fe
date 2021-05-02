import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { api_change_password } from "@utils/API.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ChangePassword = (props) => {
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const token = useSelector(state => state.userApp.token);

  const handleChange = (name, value) => {
    if (name === "password") setPassword(value);
    if (name === "password1") setPassword1(value);
    if (name === "password2") setPassword2(value);
  };

  const submit = () => {
      if(password1 !== password2)
      {
          toast.error('Mật khẩu không đúng. nhập lại');
          return;
      }
    fetch(api_change_password,{
        method:"put",
        headers:{
            "content-type": "application/json",
            Authorization:token
        },
        body:JSON.stringify({
            password:password,
            passwordChange:password1
        })
    }).then(res => res.json())
    .then(json => {
        if(json.code === 200){
            toast.success('Đổi mật khẩu thành công');
        }
        else if(json.code === 401){
          window.location.href = "/login";
        }
        else{
            toast.error(json.message);
        }
    });
  };
  return (
    <div className="change-pass-content">
      <div className="content">
        <div className="change-pass">
          <h2>Đổi mật khẩu</h2>
          <div className="d1">
            <div className="d11">
              <span>Mật khẩu cũ</span>
              <span>Mật khẩu mới</span>
              <span>Nhập lại mật khẩu mới</span>
            </div>
            <div className="d12">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="mật khẩu cũ"
              ></input>
              <input
                type="password"
                name="password1"
                value={password1}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="mật khẩu mới"
              ></input>
              <input
                type="password"
                name="password2"
                value={password2}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="nhập lại mật khẩu mới"
              ></input>
            </div>
          </div>
          <div className="d2">
            <button className="default-btn" onClick={() => submit()}>
              <FontAwesomeIcon icon={faSignInAlt}></FontAwesomeIcon>
              <span>Đổi mật khẩu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
