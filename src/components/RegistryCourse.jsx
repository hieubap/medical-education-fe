import React, { Component, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertPrice } from "./common.js";

import "./../CSS/manageAdmin.css";
import "./../CSS/main.css";
import { faFontAwesomeLogoFull } from "@fortawesome/free-solid-svg-icons";
import { url_course_register } from "./API.js";

class RegistryCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: 0,
      size: 10,
      sizePage: 0,
      data: [
        {
          id: 1,
          time: "06:00 - 08:00",
          class: "Lớp A",
        },
      ],
      codeSubject:""
    };
  }

  setPage = (index) => {
    const newState = Object.assign({}, this.state);
    newState.page = index;
    this.setState(newState);
  };

  read = (index, id) => {
    const newState = Object.assign({}, this.state);
    newState.data[index].isRead = 0;
    this.setState(newState);
  };

  delete = (index, id) => {
    const newState = Object.assign({}, this.state);
    newState.data = newState.data.splice(index, 1);
    this.setState(newState);
  };

  registerCourse = (index) => {
    var json = JSON.stringify({

    });
    fetch(url_course_register,{
      method:"post",
      body:json
    })
      .then((res) => res.json())
      .then((json) => {
        
      });
    const newState = Object.assign({}, this.state);
    newState.data = newState.data.splice(index, 1);
    this.setState(newState);
  };

  change = (e) => {
    var newParam = Object.assign({}, this.state.props.param);
    newParam = { ...newParam, [e.target.name]: e.target.value };
    const newProps = { ...this.state.props, param: newParam };
    this.setState({ ...this.state, props: newProps });
  };
  
  render() {
    var listPage = [];
    for (let i = 0; i < 5; i++) {
      listPage.push(
        <li>
          <a href="#" onClick={() => this.setPage(i)}>
            {i + 1}
          </a>
        </li>
      );
    }

    return (
      <div className="container screen" style={{ fontSize: "17px" }}>
        {/* {this.state.loading && <div class="loader" id="loader"></div>} */}
        <button class="dropbtn dropup" onClick={() => this.changeModel()}>
          đăng kí
        </button>
        <input
          type="text"
          class=""
          style={{ float: "right", width: "200px", marginLeft: "100px" }}
          value={this.state.codeSubject}
        ></input>
        <h2
          className=" text-center head_tag"
          data-wow-duration="1s"
          data-wow-delay="0.1s"
        >
          Đăng kí môn học
        </h2>
        <div>
          <table>
            <tr>
              <th>Thời gian</th>
              <th>Các lớp</th>
            </tr>
            {this.state.data.map((feedback, index) => {
              if (
                this.state.page * this.state.size <= index &&
                index < (this.state.page + 1) * this.state.size
              )
                return (
                  <tr style={{ fontSize: "17px" }}>
                    <td style={{ width: "15%" }}>{feedback.time}</td>
                    <td>{feedback.class}</td>
                  </tr>
                );
            })}
          </table>
        </div>
        <ul class="pagination" id="pageTag1">
          {listPage}
        </ul>
      </div>
    );
  }
}

export default RegistryCourse;
