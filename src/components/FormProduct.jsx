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
    });
  };


  render() {
    return (
      <form id="update-product-form" className="create-form fm">
        {this.state.loading && <div class="loader" id="loader"></div>}
        <div className="auth-form__container">
          <div className="auth-form__header">
            <div className="auth-form__heading">C???p nh???t</div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className style={{ flexBasis: "50%" }}>
              <div className="create_groups">
                <label>Ti??u ?????</label>
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
                <label>T??n</label>
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
                <label>Gi?? c??</label>
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
                <label>Gi?? m???i</label>
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
                <label>Link ???nh</label>
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
                <label>S??? l?????ng</label>
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
                <label>Chi Ti???t</label>
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
                <label>Lo???i</label>
                <select
                  className="update_input select-type-product"
                  name="carlist"
                  form="carform"
                >
                  {this.state.typeProduct}
                </select>
              </div>
              <div className="create_groups">
                <label>M??u s???c</label>
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
                <label>Nh??n hi???u</label>
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
                <label>Xu???t x???</label>
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
                <label>Nh?? ph??n ph???i</label>
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
                <label>Th??? t??ch</label>
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
                <label>Kh???i l?????ng</label>
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
              TR??? L???I
            </button>
            <button id="update-cancel_btn" className="btn create_btn_cancel">
              H???Y
            </button>
            <button
              id="update-btn"
              className="btn create_btn_cancel"
              onClick={(e) => {
                this.state.isCreate?this.create(e):this.update(e)
              }}
            >
              {this.state.isCreate ? "TH??M" : "C???P NH???T"}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default FormProduct;
