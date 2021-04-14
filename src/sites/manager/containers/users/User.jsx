import {
  faEye,
  faLock,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api_user } from "@utils/API.js";
import { BaseComponent,connect } from "@utils/BaseComponent";
import React from "react";
import "./style.scss";
class User extends BaseComponent {
  constructor(props) {
    super(props);
    this.api_get = api_user;
    this.nameComponent = "Quản lý tài khoản";
    console.log("init ...");
  }

  // componentDidMount() {
  //   fetch(api_user)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       const size = parseInt(json.totalElements / this.state.size) + 1;
  //       console.log(json.data);
  //       this.setState({
  //         ...this.state,
  //         loading: false,
  //         data: json.data,
  //         detail: new Array(json.data.length).fill(true),
  //         sizePage: size,
  //       });
  //     });

  //   console.log("call api product");
  // }

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

  headTable() {
    return (
      <>
        <th style={{ width: "2%", padding: "0" }}>stt</th>
        <th style={{ width: "3%", padding: "0" }}>ID</th>
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
      </>
    );
  }

  bodyTable(o, index) {
    return (
      <>
        <td>{index + 1}</td>
        <td>{o.id}</td>
        <td>{o.fullName}</td>
        <td>{o.username}</td>
        <td>{o.status}</td>
        <td>{o.role}</td>
        <td>{o.gender}</td>
        <td>{o.age}</td>
        <td>{o.address}</td>
        <td>{o.phoneNumber}</td>
        <td>{o.email}</td>
        <td>{o.createAt}</td>
        <td>{o.updateAt}</td>
      </>
    );
  }

  action(o, index) {
    return (
      <td style={{ width: "10%" }}>
        <div class="i" onClick={() => this.detail(o.id)}>
          <FontAwesomeIcon icon={faEye} className="icon-green" />
        </div>
        <div class="i">
          <FontAwesomeIcon icon={faLock} className="icon-mangeto" />
        </div>
        {/* <div class="i" onClick={() => this.changeModel()}>
          <FontAwesomeIcon icon={faEdit} className="icon-blue" />
        </div> */}
        <div class="i">
          <FontAwesomeIcon icon={faTrashAlt} className="icon-red" />
        </div>
      </td>
    );
  }
}

export default connect(User);
