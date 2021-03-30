import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { token } from "./API";

class BaseFormComponent extends Component {
  constructor(props) {
    super(props);
    this.api_create = null;
    this.api_update = null;

    this.state = {
      isCreate: false,
      props: props,
      loading: false,
    };
    
    if (props.param == null) this.state.isCreate = true;
    this.afterInit();
  }

  afterInit(){}

  change = (e) => {
    var newParam = Object.assign({}, this.state.props.param);
    newParam = { ...newParam, [e.target.name]: e.target.value };
    const newProps = { ...this.state.props, param: newParam };
    this.setState({ ...this.state, props: newProps });
  };

  create = (e) => {
    e.preventDefault();
    var bodyRequest = JSON.stringify({ ...this.state.props.param, id: null });
    this.setState({...this.state,loading:true});
    if (this.api_create != null)
      fetch(this.api_create, {
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
        body: bodyRequest,
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.code === 200) {
            this.props.setData(json.data, -1);
            this.props.eventBack();
            toast.success("Create Successful");
          } else {
            toast.error(json.message);
          }
          this.setState({...this.state,loading:false});
        });
  };

  update = (e) => {
    e.preventDefault();
    var bodyRequest = JSON.stringify(this.state.props.param);
    this.setState({...this.state,loading:true});
    
    if (this.api_update != null)
    fetch(this.api_update + this.state.props.param.id, {
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
          console.log(json);
          this.props.eventBack();
          toast.success("Update Successful");
        } else {
          toast.error(json.message);
        }
        this.setState({...this.state,loading:false});
      });
  };

  render() {
    return (
      <form id="update-product-form" className="create-form fm">
        {this.state.loading && <div className="loader" id="loader"></div>}
        <div className="auth-form__container">
          <div className="auth-form__header">
            <div className="auth-form__heading">
              {this.state.isCreate ? "Tạo mới" : "Cập nhật"}
            </div>
          </div>
          {this.element()}
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

  element() {
    return (
      ''
    );
  }
}

export default BaseFormComponent;
