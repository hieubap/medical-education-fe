import React, { Component } from "react";

import "@src/CSS/base.css";
import "@src/CSS/main.css";
import "@src/CSS/grid.css";
import "@src/CSS/responsive.css";
import "@src/CSS/management.css";
import "@components/CSS/baseComponent.css";
import { Link } from "react-router-dom";
import { support } from "jquery";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attibute: [
        {
          path: "/manager/dashboard",
          class: "bar",
          name: "Thông báo"
        },
        {
          path: "/manager/courses",
          class: "bar",
          name: "Quản lý khóa học"
        },
        {
          path: "/manager/subject",
          class: "bar",
          name: "Quản lý môn học"
        },
        {
          path: "/manager/class",
          class: "bar",
          name: "Quản lý lớp"
        },
        {
          path: "/manager/place",
          class: "bar",
          name: "Quản lý địa điểm"
        },
        {
          path: "/manager/student",
          class: "bar",
          name: "Quản lý học viên"
        },
        {
          path: "/manager/course-register",
          class: "bar",
          name: "Đăng ký khóa học"
        },
        {
          path: "/manager/class-register",
          class: "bar",
          name: "Đăng ký lớp"
        },
        {
          path: "/manager/schedule",
          class: "bar",
          name: "Lịch"
        },
        {
          path: "/manager/result",
          class: "bar",
          name: "Kết quả"
        },
        {
          path: "/manager/users",
          class: "bar",
          name: "Quản lý tài khoản"
        },
        {
          path: "/manager/feedback",
          class: "bar",
          name: "Phản hồi"
        },
        {
          path: "/manager/notification",
          class: "bar",
          name: "Thông báo"
        },
      ],
    };
  }
  setActive(path){
    const newState = this.state.attibute.map((obj) => {
      if(obj.path === path)
      obj.class = "bar active"
      else
      obj.class = "bar"
    })
    this.setState(newState);
  }
  render() {
    return (
      <div className="menu">
        <div className="head-menu">Menu</div>
        {this.state.attibute.map((atb, index) => (
          <Link to={atb.path} className={atb.class} onClick={() => this.setActive(atb.path)}>
            {atb.name}
          </Link>
        ))}
      </div>
    );
  }
}

export default Menu;
