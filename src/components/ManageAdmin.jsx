import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./../CSS/base.css";
import "./../CSS/main.css";
import "./../CSS/grid.css";
import "./../CSS/responsive.css";
import "./../CSS/management.css";

import Menu from "./Menu.jsx";
import ChartRender from "./ChartRender.jsx";
import Notification from "./Notification.jsx";
import FeedBack from "./FeedBack";
import Course from "./Course";
import Subject from "./Subject";
import Student from "./Student";
import Schedule from "./Schedule";
import Class from "./Class";
import History from "./History";
import Infrastructure from "./Infrastructure";
import RegistryCourse from "./RegistryCourse";
import User from "./User.jsx";

class ManageAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: "course",
      showModal: false,
      dataDetail: {},
    };
  }

  changeScreen = (screen) => {
    const newState = Object.assign({}, this.state);
    newState.screen = screen;
    this.setState(newState);
  };

  render() {
    return (
      <>
        <div className="app">
          <ToastContainer className="toast-down-right"/>
          <Menu event={this.changeScreen}></Menu>
          {this.state.screen === "chart" && <ChartRender />}
          {this.state.screen === "course" && <Course />}
          {this.state.screen === "subject" && <Subject />}
          {this.state.screen === "student" && <Student />}
          {this.state.screen === "schedule" && <Schedule />}
          {this.state.screen === "room" && <Class />}
          {this.state.screen === "history" && <History />}
          {this.state.screen === "infrastructure" && <Infrastructure />}
          {this.state.screen === "order" && <RegistryCourse />}
          {this.state.screen === "user" && <User />}
          {this.state.screen === "feedback" && <FeedBack />}
          {this.state.screen === "notification" && <Notification />}
        </div>
      </>
    );
  }
}

export default ManageAdmin;
