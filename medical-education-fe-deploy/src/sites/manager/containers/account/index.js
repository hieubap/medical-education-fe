import React, { useState } from "react";
import "./style.scss";
import "@components/CSS/baseComponent.css";
import { api_login } from "../../../../utils/API";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import constants from "@src/resourses/const";
import dataCache from "@components/data-cache-provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleEnter = (e) => {
    console.log(e.keyCode);
      if(e.keyCode === 13){
        handleLogin(e);
      }
  }
  
  const handleLogin = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
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
            switch (json.data.role) {
              case constants.role.admin:
                window.location.href = "/manager";
                return;
              case constants.role.teacher:
                window.location.href = "/teacher";
                return;
                default:{}
            }
            window.location.href = "/student";
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
console.log("11:10Pm")
  return (
    <div className="background">
      <div className="login">
        <h1>Đăng nhập</h1>
        <div className="a">
          <label>Tên đăng nhập</label>
        </div>
        <div>
          <input
            name="username"
            type="text"
            value={username}
            autoComplete="off"
            placeholder="Tên đăng nhập"
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleEnter(e)}
          ></input>
        </div>
        <div className="b">
          <button
            type="submit"
            className="default-btn sub"
            onClick={(e) => handleLogin(e)}
          >
            <FontAwesomeIcon icon={faSignInAlt}></FontAwesomeIcon>
            <span>Đăng nhập</span>
          </button>
          <button
            type="submit"
            className="default-btn"
            onClick={(e) => handleRegister(e)}
          >
            <FontAwesomeIcon icon={faSyncAlt}></FontAwesomeIcon>
            <span>Đăng ký</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
