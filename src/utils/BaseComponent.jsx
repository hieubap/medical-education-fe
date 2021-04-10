import React, { Component } from "react";
import { toast } from "react-toastify";
import Search from "@components/search/Search";
import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import "@components/CSS/baseComponent.css";
import { connect as reduxConnect } from "react-redux";

import '@src/CSS/base.css';
// import '@src/CSS/responsive.css';
// import '@src/CSS/manageAdmin.css';


export class BaseComponent extends Component {
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
      token: this.props.userApp.token,
    };
    console.log(this.state.token);
    this.afterInit();
  }

  afterInit() {}

  componentDidMount() {
    console.log(this.state.token);
    if (this.api_get != null)
      fetch(this.api_get, {
        headers: {
          "content-type": "application/json",
          "Authorization": this.state.token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.code === 200) {
            const size = parseInt(json.totalElements / this.state.size) + 1;
            this.setState({
              ...this.state,
              loading: false,
              dataRender: json.data,
              totalPage: size,
            });
            this.afterDidMount();
          } else if (json.code === 401) {
            // this.setState({
            //   loading: false
            // });
            // window.location.href = "/login";
          } else {
            // this.setState({
            //   loading: false
            // });
            toast.error(json.message);
          }
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
      <>
        <Head title={this.nameComponent} changeModel={this.changeModel}></Head>
        <div className="content" style={{ fontSize: "15px" }}>
          {this.state.loading && <Loading></Loading>}
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
      </>
    );
  }

  search = (name) => {
    fetch(this.api_get + "?name=" + name, {
      "content-type": "application/json",
      Authorization: this.state.token,
    })
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

  headTable() {}
  bodyTable(o, index) {}

  delete = (id, index) => {
    console.log(index);
    this.setState({ ...this.state, loading: true });
    if (this.api_delete != null)
      fetch(this.api_delete + id, {
        method: "delete",
        headers: {
          "content-type": "application/json",
          Authorization: this.state.token,
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
export function connect(Component) {
  return reduxConnect((state) => {
    return {
      userApp: state.userApp,
    };
  })(Component);
}

export default connect(BaseComponent);
