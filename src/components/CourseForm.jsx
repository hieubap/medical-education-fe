import React, { Component } from "react";
import UniqueId from "react-html-id";
import { api_course, api_course_update } from "./API.js";

import "./../CSS/manageAdmin.css";
import "./../CSS/base.css";
import "./../CSS/grid.css";
import "./../CSS/responsive.css";

class CourseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreate: false,
      props: props,
      loading: false,
    };
    if (props.param == null) {
      this.state.isCreate = true;
    }
    console.log(this.state);
  }

  change = (e) => {
    var newParam = Object.assign({}, this.state.props.param);
    newParam = { ...newParam, [e.target.name]: e.target.value };
    const newProps = { ...this.state.props, param: newParam };
    this.setState({ ...this.state, props: newProps });
  };

  create = (e) => {
    e.preventDefault();
    var bodyRequest = JSON.stringify(this.state.props.param);
    console.log(bodyRequest);
    this.state.loading = true;
    fetch(api_course, {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzM4NCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiYWRtaW4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaWF0IjoxNjE2MDIxOTQ5LCJleHAiOjE2MTcyMTAwMDB9.F1WZAJc7dX_Gl46SslFlTCvmYW8iw_LF9aeiH9W2vsWCag8-kb75lfrUnhPdAX5z",
      },
      body: bodyRequest,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.props.eventBack();
      });
  };

  update = (e) => {
    e.preventDefault();
    console.log(this.state.props.param);
    var bodyRequest = JSON.stringify(this.state.props.param);
    // this.props.eventChange();
    this.state.loading = true;
    fetch(api_course_update + this.state.props.param.id, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzM4NCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiYWRtaW4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaWF0IjoxNjE2MDIxOTQ5LCJleHAiOjE2MTcyMTAwMDB9.F1WZAJc7dX_Gl46SslFlTCvmYW8iw_LF9aeiH9W2vsWCag8-kb75lfrUnhPdAX5z",
      },
      body: bodyRequest,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.props.eventBack();
      });
  };

  render() {
    return (
      <form id="update-product-form" className="create-form fm">
        {this.state.loading && <div class="loader" id="loader"></div>}
        <div className="auth-form__container">
          <div className="auth-form__header">
            <div className="auth-form__heading">Cập nhật</div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flexBasis: "100%" }}>
              <div className="create_groups">
                <label>Mã Khóa học</label>
                <input
                  type="text"
                  name="value"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.value
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
              <div className="create_groups">
                <label>Tên</label>
                <input
                  name="name"
                  type="text"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.name
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
              <div className="create_groups">
                <label>Giá</label>
                <input
                  name="price"
                  type="number"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.price
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
              <div className="create_groups">
                <label>Thời gian học</label>
                <input
                  name="thoiGianHoc"
                  type="number"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.thoiGianHoc
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
              <div className="create_groups">
                <label>Chi Tiết</label>
                <input
                  name="detail"
                  type="text"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.details
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
            </div>
          </div>
          <div className="auth-form__controls">
            <button
              id="update-back_btn"
              className="btn create_btn_cancel back-btn"
              onClick={this.state.props.eventBack}
            >
              TRỞ LẠI
            </button>
            <button id="update-cancel_btn" className="btn create_btn_cancel">
              HỦY
            </button>
            <button
              id="update-btn"
              className="btn create_btn_cancel"
              onClick={(e) => {
                this.state.isCreate ? this.create(e) : this.update(e);
              }}
            >
              {this.state.isCreate ? "THÊM" : "CẬP NHẬT"}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default CourseForm;
