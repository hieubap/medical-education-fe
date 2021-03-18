import React, { Component } from "react";
import UniqueId from "react-html-id";

import "./../CSS/manageAdmin.css";
import "./../CSS/base.css";
import "./../CSS/main.css";
import "./../CSS/grid.css";
import "./../CSS/responsive.css";

class FormProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreate: false,
      props: props,
      loading: false,
    };
    if(props.param == null){
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

  componentDidMount() {
    fetch("http://93.188.162.82:8088/typeProduct")
      .then((res) => res.json())
      .then((json) => {
        var list = [];
        json.data.map((data) => {
          list.push(<option value={data.id}>{data.name}</option>);
        });
        this.setState({
          ...this.state,
          typeProduct: list,
        });
      });
  }

  create = (e) => {
    e.preventDefault();
    console.log(this.state.props.param);
    var bodyRequest = JSON.stringify(this.state.props.param);
    // this.props.eventChange();
    this.state.loading = true;
    fetch("http://93.188.162.82:8088/product", {
      method: "post",
    headers: {
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzM4NCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiYWRtaW4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaWF0IjoxNjE2MDIxOTQ5LCJleHAiOjE2MTcyMTAwMDB9.F1WZAJc7dX_Gl46SslFlTCvmYW8iw_LF9aeiH9W2vsWCag8-kb75lfrUnhPdAX5z",
    },
      body: bodyRequest
    })
    .then((res) => {
      this.props.eventChange();
      this.props.eventScreen();
    });
  };

  update = (e) => {
    e.preventDefault();
    console.log(this.state.props.param);
    var bodyRequest = JSON.stringify(this.state.props.param);
    // this.props.eventChange();
    this.state.loading = true;
    fetch("http://93.188.162.82:8088/product/"+this.state.props.param.id, {
      method: "put",
    headers: {
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzM4NCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiYWRtaW4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaWF0IjoxNjE2MDIxOTQ5LCJleHAiOjE2MTcyMTAwMDB9.F1WZAJc7dX_Gl46SslFlTCvmYW8iw_LF9aeiH9W2vsWCag8-kb75lfrUnhPdAX5z",
    },
      body: bodyRequest
    })
    .then((res) => {
      this.props.eventChange();
      this.props.eventScreen('product');
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
            <div className style={{ flexBasis: "50%" }}>
              <div className="create_groups">
                <label>Tiêu đề</label>
                <input
                  type="text"
                  name="title"
                  className="update_input"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.title
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
                  name="name"
                  className="update_input"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.name
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
              <div className="create_groups">
                <label>Giá cũ</label>
                <input
                  name="oldPrice"
                  type="text"
                  className="update_input"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.oldPrice
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
              <div className="create_groups">
                <label>Giá mới</label>
                <input
                  name="newPrice"
                  type="text"
                  className="update_input"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.newPrice
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
              <div className="create_groups">
                <label>Link ảnh</label>
                <input
                  name="img"
                  type="text"
                  className="update_input"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.img
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
              <div className="create_groups">
                <label>Số lượng</label>
                <input
                  name="number"
                  type="number"
                  className="update_input"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.number
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
                  className="update_input"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.detail
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
            </div>
            <div className="create_groups" style={{ flexBasis: "50%" }}>
              <div className="create_groups">
                <label>Loại</label>
                <select
                  className="update_input select-type-product"
                  name="carlist"
                  form="carform"
                >
                  {this.state.typeProduct}
                </select>
              </div>
              <div className="create_groups">
                <label>Màu sắc</label>
                <input
                  name="color"
                  type="text"
                  className="update_input"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.color
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
              <div className="create_groups">
                <label>Nhãn hiệu</label>
                <input
                  name="tradeMark"
                  type="text"
                  className="update_input"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.tradeMark
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
              <div className="create_groups">
                <label>Xuất xứ</label>
                <input
                  name="manufactureCountry"
                  type="text"
                  className="update_input"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.manufactureCountry
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
              <div className="create_groups">
                <label>Nhà phân phối</label>
                <input
                  name="distributor"
                  type="text"
                  className="update_input"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.distributor
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
              <div className="create_groups">
                <label>Thể tích</label>
                <input
                  type="number"
                  name="volumn"
                  className="update_input"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.volumn
                      : "0"
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
              <div className="create_groups">
                <label>Khối lượng</label>
                <input
                  type="text"
                  name="mass"
                  className="update_input"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.mass
                      : "0"
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
              onClick={this.state.props.eventChange}
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
                this.state.isCreate?this.create(e):this.update(e)
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

export default FormProduct;
