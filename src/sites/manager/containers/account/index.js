import React, { useState } from "react";
import "./style.scss";
import "@components/CSS/baseComponent.css";
import { api_login } from "../../../../utils/API";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import constants from "@src/resourses/const";
import dataCache from "@components/data-cache-provider";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };
  const userApp = useSelector((state) => state.userApp);

  const handleLogin = (e) => {
    e.preventDefault();
    var body = JSON.stringify({
      username: username,
      password: password,
    });
    fetch(api_login, {
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

  const handleRegister = (e) => {
    e.preventDefault();
    window.location.href = "/register";
  };

  return (
    <div className="background">
      <div className="bor">
        <h1>Đăng nhập</h1>
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

export default Login;
