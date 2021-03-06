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
import Search from "./Item/Search";
import Head from "./Item/Head";

class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.nameComponent = "Base Component Build";

    this.api_get = null;
    this.api_post = null;
    this.api_update = null;
    this.api_delete = null;

    this.state = {
      loading: true,
      isShowDetail: false,
      isShowModal: false,
      idDetail: null,
      indexDetail: null,
      dataDetail: null,

      dataRender: null,

      page: 0,
      size: 10,
      totalPage: 0,
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
            dataRender: json.data,
            totalPage: size,
          });
          this.afterDidMount();
        });
    this.moreApi();
  }
  afterDidMount() {}
  moreApi() {}

  /**
   * chuyển trang
   */
  setPage = (index) => {
    var newState = Object.assign({}, this.state);
    newState.page = index;
    this.setState(newState);
  };

  /**
   * cập nhật dữ liệu hiển thị từ form
   */
  updateDataRender = (data, index) => {
    var newData = Object.assign([], this.state.dataRender);

    if (index === null) {
      newData = [data, ...newData];
    } else newData[index] = data;

    const newState = { ...this.state, dataRender: newData };
    this.setState(newState);
  };

  /**
   * bật popup
   */
  changeModel = (id, index) => {
    var newState = Object.assign({}, this.state);
    newState.showModal = !newState.showModal;
    if (id != null)
      newState = {
        ...newState,
        idDetail: id,
        indexDetail: index,
        dataDetail: this.state.dataRender[index],
      };
    else
      newState = {
        ...newState,
        idDetail: null,
        indexDetail: null,
        dataDetail: null,
      };
    console.log(newState);
    this.setState(newState);
  };

  setSelect(name, value) {
    console.log(this.state);
    var newData = Object.assign({}, this.state.dataDetail);
    newData = { ...newData, [name]: value };
    console.log(newData);
    this.setState({
      ...this.state,
      dataDetail: newData,
    });
    console.log(this.state);
  }

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

  render() {
    var listPage = [];
    for (let i = 0; i < this.state.totalPage; i++) {
      listPage.push(
        <li key={i}>
          <button onClick={() => this.setPage(i)}>{i + 1}</button>
        </li>
      );
    }

    return (
      <div className="container screen" style={{ fontSize: "17px" }}>
        {this.state.loading && <div className="loader" id="loader"></div>}
        <Head title={this.nameComponent} changeModel={this.changeModel}></Head>
        <Search search={this.search}></Search>
        <div>
          <table>
            <tbody>
              {this.headTable()}
              {this.state.dataRender != null &&
                this.state.dataRender
                  .filter((o, index) => {
                    return (
                      this.state.page * this.state.size <= index &&
                      index < (this.state.page + 1) * this.state.size
                    );
                  })
                  .map((o, index) => {
                    return this.bodyTable(
                      o,
                      index + this.state.page * this.state.size
                    );
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

  search = (name) => {
    fetch(this.api_get + "?name=" + name)
      .then((res) => res.json())
      .then((json) => {
        const size = parseInt(json.totalElements / this.state.size) + 1;
        console.log(json.data);
        this.setState({
          ...this.state,
          dataRender: json.data,
          sizePage: size,
        });
      });
  };

  form() {}

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

  delete = (id, index) => {
    console.log(index);
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
            var newState = Object.assign({}, this.state);
            newState.dataRender.splice(index, 1);
            console.log(newState.dataRender);
            this.setState(newState);
          } else {
            toast.error(json.message);
          }
          this.setState({ ...this.state, loading: false });
        });
  };
}

export default BaseComponent;
