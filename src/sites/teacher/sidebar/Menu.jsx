import React, { Component } from "react";
import { Link } from "react-router-dom";
import { faDatabase, faTools } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "@src/resourses/Logo.png";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attibute: [
        {
          path: "/teacher/dashboard",
          class: "bar",
          name: "Home",
        },
        {
          path: "/teacher/courses",
          class: "bar",
          name: "Khóa học",
        },
        {
          path: "/teacher/subject",
          class: "bar",
          name: "Môn học",
        },
        {
          path: "/teacher/class",
          class: "bar",
          name: "Lớp",
        },
        {
          path: "/teacher/schedule",
          class: "bar",
          name: "Lịch",
        },
        {
          path: "/teacher/feedback",
          class: "bar",
          name: "Phản hồi",
        },
        {
          path: "/teacher/notification",
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
    });
    this.setState(newState);
  }
  render() {
    return (
      <div className="menu">
        <img
          // src={"http://localhost:8082/images/Logo.png"}
          src={logo}
          style={{ width: "150%", marginTop: "10px", marginLeft: "-25%" }}
        />
        {this.state.attibute.map((atb, index) => (
          <Link
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
            <div style={{marginLeft:"7px"}}>{atb.name}</div>
          </Link>
        ))}
      </div>
    );
  }
}

export default Menu;
