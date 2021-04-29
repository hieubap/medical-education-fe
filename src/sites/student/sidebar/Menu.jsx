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
          path: "/student/dashboard",
          class: "bar",
          name: "Home",
        },
        {
          path: "/student/courses",
          class: "bar",
          name: "Khóa học",
        },
        {
          path: "/student/register-course",
          class: "bar",
          name: "Đăng ký khóa học",
        },
        {
          path: "/student/schedule",
          class: "bar",
          name: "Lịch",
        },
        {
          path: "/student/result",
          class: "bar",
          name: "Kết quả",
        },
        {
          path: "/student/feedback",
          class: "bar",
          name: "Hỏi đáp",
        },
        {
          path: "/student/notification",
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
