import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CSS/baseComponent.css";
import {
  faCheckCircle,
  faEdit,
  faEye,
  faLock,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { token } from "./API";

class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.nameComponent = "Base Component Build";

    this.api_get = null;
    this.api_delete = null;
    this.api_update = null;

    this.state = {
      loading: true,
      page: 0,
      size: 10,
      sizePage: 0,
      data: null,
      isDetail: false,
      idDetail: -1,
      showModal: false,
    };
    this.afterInit();
  }

  afterInit() {}

  componentDidMount() {
    if (this.api_get != null)
      fetch(this.api_get)
        .then((res) => res.json())
        .then((json) => {
          const size = parseInt(json.totalElements / this.state.size) + 1;
          console.log(json.data);
          this.setState({
            ...this.state,
            loading: false,
            data: json.data,
            sizePage: size,
          });
        });
  }

  /**
   * chuyển trang
   */
  setPage = (index) => {
    var newState = Object.assign({}, this.state);
    newState.page = index;
    this.setState(newState);
  };

  /**
   * bật popup
   */
  changeModel = (dataSet, index) => {
    var newState = Object.assign({}, this.state);
    newState.showModal = !newState.showModal;
    if (dataSet != null)
      newState = { ...newState, param: dataSet, index: index };
    else newState = { ...newState, param: null, isCreate: true };

    console.log(newState);
    this.setState(newState);
  };

  /**
   * trở lại khi đang xem chi tiết
   */
  back = () => {
    this.setState({ ...this.state, isDetail: false });
  };

  detail = (id) => {
    var newState = Object.assign({}, this.state);
    newState.isDetail = true;
    newState.idDetail = id;
    this.setState(newState);
  };

  delete = (index, id) => {
    this.callApiDelete(id, index);
    var newState = Object.assign({}, this.state);
    newState.data.splice(index, 1);
    this.setState(newState);
  };

  render() {
    var listPage = [];
    for (let i = 0; i < 5; i++) {
      listPage.push(
        <li key={i}>
          <button onClick={() => this.setPage(i)}>{i + 1}</button>
        </li>
      );
    }

    return (
      <div className="container screen" style={{ fontSize: "17px" }}>
        {this.state.loading && <div className="loader" id="loader"></div>}
        <button className="dropbtn dropup" onClick={() => this.changeModel()}>
          Thêm mới
        </button>
        <h2
          className=" text-center head_tag"
          data-wow-duration="1s"
          data-wow-delay="0.1s"
        >
          {this.nameComponent}
        </h2>
        <div>
          <table>
            <tbody>
              {this.headTable()}
              {this.state.data != null &&
                this.state.data
                  .filter((o, index) => {
                    return (
                      this.state.page * this.state.size <= index &&
                      index < (this.state.page + 1) * this.state.size
                    );
                  })
                  .map((o, index) => {
                    return this.bodyTable(o, index+this.state.page*this.state.size);
                  })}
            </tbody>
          </table>
        </div>
        <ul className="pagination">{listPage}</ul>
        {this.state.showModal ? (
          <div className="modal" style={{ display: "flex" }}>
            <div className="modal__overlay"></div>
            <div className="modal__body">{this.form()}</div>
          </div>
        ) : null}
      </div>
    );
  }

  headTable() {
    return (
      <tr>
        <th>stt</th>
        <th>A</th>
        <th>B</th>
        <th>C</th>
        <th>D</th>
        <th>E</th>
        <th></th>
      </tr>
    );
  }
  bodyTable(o, index) {
    return (
      <tr key={o.id} style={{ fontSize: "17px" }}>
        <td>{index + 1}</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <button className="but btn-yellow">
          <FontAwesomeIcon icon={faCheckCircle} className="icon" />
        </button>
        <button className="but btn-blue">
          <FontAwesomeIcon icon={faEdit} className="icon" />
        </button>
        <button className="but btn-green">
          <FontAwesomeIcon icon={faEye} className="icon" />
        </button>
        <button className="but btn-mangeto">
          <FontAwesomeIcon icon={faLock} className="icon" />
        </button>
        <button
          style={{ marginRight: "20px" }}
          className="but btn-red"
          onClick={() => this.delete(index, 1)}
        >
          <FontAwesomeIcon icon={faTrashAlt} className="icon" />
        </button>
      </tr>
    );
  }

  form() {}
  callApiCreate = () => {};
  callApiUpdate = (id) => {
    var bodyRequest = JSON.stringify(this.state.props.param);
    this.setState({ ...this.state, loading: true });
    fetch(this.api_update + id, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
      body: bodyRequest,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          this.props.setData(json.data, this.props.index);
          this.props.eventBack();
          toast.success("Cập Nhật Thành Công");
        } else {
          toast.error(json.message);
        }
      });
  };
  callApiDelete = (id, index) => {
    this.setState({ ...this.state, loading: true });
    if (this.api_delete != null)
      fetch(this.api_delete + id, {
        method: "delete",
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.code === 200) {
            toast.success("Xóa Thành Công");
          } else {
            toast.error(json.message);
          }
          this.setState({ ...this.state, loading: false });
        });
  };
}

export default BaseComponent;
