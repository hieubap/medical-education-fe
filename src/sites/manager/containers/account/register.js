import React, { useState } from "react";
import "./style.scss";
import "@components/CSS/baseComponent.css";
import { api_register } from "../../../../utils/API";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import constants from "@src/resourses/const";
import dataCache from "@components/data-cache-provider";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      setPassword2(value);
    }
  };
  const userApp = useSelector((state) => state.userApp);

  const handleLogin = (e) => {
    e.preventDefault();
    window.location.href = "/login";
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password != password2) {
        toast.warn("mật khẩu không đúng");
        return;
    }

    var body = JSON.stringify({
      username: username,
      password: password,
    });
    fetch(api_register, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          toast.success("Đăng nhập Thành Công");
          dispatch({
            type: constants.action.action_user_login,
            value: json.body,
          });
          dataCache.save("", "access", json.data);

          setTimeout(() => {
            window.location.href = "/manager";
          }, 500);
        } else {
          toast.error(json.message);
        }
      });
  };

  return (
    <div className="background">
      <div className="bor">
        <h1>Đăng Ký</h1>
        <div className="a">
          <label>Tên đăng nhập</label>
        </div>
        <div>
          <input
            name="username"
            type="text"
            value={username}
            placeholder="Tên đăng nhập"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          ></input>
        </div>
        <div className="a">
          <label>Mật khẩu</label>
        </div>
        <div>
          <input
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          ></input>
        </div>
        <div className="a">
          <label>Nhập lại mật khẩu</label>
        </div>
        <div>
          <input
            name="password2"
            type="password"
            value={password2}
            placeholder="Password"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          ></input>
        </div>
        <div className="b">
          <button
            type="submit"
            className="default-btn b"
            onClick={(e) => handleRegister(e)}
          >
            Đăng Ký
          </button>
          <button
            type="submit"
            className="default-btn b"
            onClick={(e) => handleLogin(e)}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;