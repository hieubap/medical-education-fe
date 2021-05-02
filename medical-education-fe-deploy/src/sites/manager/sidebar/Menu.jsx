import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "@src/resourses/Logo.png";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attibute: [
        {
          path: "/manager/dashboard",
          class: "bar",
          name: "Thống kê",
        },
        {
          path: "/manager/courses",
          class: "bar",
          name: "Danh mục khóa học",
        },
        {
          path: "/manager/subject",
          class: "bar",
          name: "Danh mục môn học",
        },
        {
          path: "/manager/health-facility",
          class: "bar",
          name: "Danh mục cơ sở",
        },
        {
          path: "/manager/place",
          class: "bar",
          name: "Danh mục địa điểm",
        },
        {
          path: "/manager/schedule",
          class: "bar",
          name: "Xếp lịch",
        },
        {
          path: "/manager/users",
          class: "bar",
          name: "Quản lý tài khoản",
        },
        {
          path: "/manager/feedback",
          class: "bar",
          name: "Phản hồi",
        },
        {
          path: "/manager/notification",
          class: "bar",
          name: "Thông báo",
        },
      ],
    };
  }
  setActive(path) {
    const newState = this.state.attibute.map((obj) => {
      if (obj.path === path) obj.class = "bar active";
      else obj.class = "bar";
      return () => {};
    });
    this.setState(newState);
  }
  render() {
    return (
      <div className="menu">
        <img
          // src={"http://localhost:8082/images/Logo.png"}
          src={logo}
          alt=""
          style={{ width: "150%", marginTop: "10px", marginLeft: "-25%" }}
        />
        {this.state.attibute.map((atb, index) => (
          <Link
            key={index}
            to={atb.path}
            className={atb.class}
            onClick={() => this.setActive(atb.path)}
            style={{ display: "flex" }}
          >
            <div>
              <FontAwesomeIcon
                className="icon"
                icon={faDatabase}
              ></FontAwesomeIcon>
            </div>
            <div style={{ marginLeft: "7px" }}>{atb.name}</div>
          </Link>
        ))}
      </div>
    );
  }
}

export default Menu;