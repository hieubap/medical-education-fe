import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./CSS/baseComponent.css"
import {
  faEdit,
  faEye,
  faLock,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { api_user } from "./API.js";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: 0,
      size: 10,
      sizePage: 0,
      data: [],
    };
  }

  componentDidMount() {
    fetch(api_user)
      .then((res) => res.json())
      .then((json) => {
        const size = parseInt(json.totalElements / this.state.size) + 1;
        console.log(json.data);
        this.setState({
          ...this.state,
          loading: false,
          data: json.data,
          detail: new Array(json.data.length).fill(true),
          sizePage: size,
        });
      });

    console.log("call api product");
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

  render() {
    var listPage = [];
    for (let i = 0; i < 5; i++) {
      listPage.push(
        <li key={i}>
          <button onClick={() => this.setPage(i)}>
            {i + 1}
          </button>
        </li>
      );
    }

    return (
      <div
        id="screen4"
        className="container screen"
        style={{ fontSize: "17px" }}
      >
        {/* {this.state.loading && <div class="loader" id="loader"></div>} */}
        <h2
          className=" text-center head_tag"
          data-wow-duration="1s"
          data-wow-delay="0.1s"
        >
          Quản lý tài khoản
        </h2>
        <div>
          <table>
            <tr>
              <th>stt</th>
              <th>ID</th>
              <th>Tên</th>
              <th>Username</th>
              <th>Trạng thái</th>
              <th>Vai trò</th>
              <th>Giới tính</th>
              <th>Tuổi</th>
              <th>Địa chỉ</th>
              <th>SĐT</th>
              <th>email</th>
              <th>Ngày tạo</th>
              <th>Ngày cập nhật</th>
              <th></th>
            </tr>
            {this.state.data
              .filter(
                (o, index) =>
                  this.state.page * this.state.size <= index &&
                  index < (this.state.page + 1) * this.state.size
              )
              .map((feedback, index) => {
                return (
                  <tr style={{ fontSize: "17px" }}>
                    <td>{index + 1}</td>
                    <td>{feedback.id}</td>
                    <td>{feedback.fullName}</td>
                    <td>{feedback.username}</td>
                    <td>{feedback.status}</td>
                    <td>{feedback.role}</td>
                    <td>{feedback.gender}</td>
                    <td>{feedback.age}</td>
                    <td>{feedback.address}</td>
                    <td>{feedback.phoneNumber}</td>
                    <td>{feedback.email}</td>
                    <td>{feedback.createAt}</td>
                    <td>{feedback.updateAt}</td>
                    <td style={{ width: "17%" }}>
                      <button class="btn btn-default btn-rm">
                        <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                      </button>
                      <button class="btn btn-default btn-mangeto">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                      </button>
                      <button
                        class="btn btn-default btn-ud"
                        onClick={() => this.changeModel()}
                      >
                        <FontAwesomeIcon icon={faEdit} className="icon" />
                      </button>
                      <button
                        class="btn btn-default btn-dt"
                        onClick={() => this.setDetail(feedback.id)}
                      >
                        <FontAwesomeIcon icon={faEye} className="icon" />
                      </button>
                    </td>
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

export default User;
