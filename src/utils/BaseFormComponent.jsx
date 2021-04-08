import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { token } from "./API";


class BaseFormComponent extends Component {
  constructor(props) {
    super(props);

    this.api_create = null;
    this.api_update = null;
    this.isCreate = false;
    
    this.state = {
      props: props,
      loading: false,
    };
    
    /**
     * thêm mới nếu chỉ số bằng null
     */
    if (this.props.indexDetail === null) this.isCreate = true;
    console.log(this.props.indexDetail === null);

    console.log(this.props.dataDetail);
    this.afterInit();
  }

  afterInit(){}

  setSelect(name,value){
    console.log(this.state);
    var newData = Object.assign({},this.state.props.dataDetail);
    newData = {...newData,[name] :value};
    console.log(newData);
    this.setState({
      ...this.state,
      props:{...this.state.props,dataDetail:newData}
    });
    console.log(this.state.props);
  }

  change = (e) => {
    var newDataDetail = Object.assign({}, this.state.props.dataDetail);
    newDataDetail = { ...newDataDetail, [e.target.name]: e.target.value };
    const newProps = { ...this.state.props, dataDetail: newDataDetail };
    this.setState({ ...this.state, props: newProps });
  };

  create = (e) => {
    e.preventDefault();
    var bodyRequest = JSON.stringify({ ...this.state.props.dataDetail, id: null });
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
            this.props.updateDataRender(json.data, null);
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
    var bodyRequest = JSON.stringify(this.state.props.dataDetail);
    this.setState({...this.state,loading:true});
    
    if (this.api_update != null)
    fetch(this.api_update + this.state.props.dataDetail.id, {
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
          this.props.updateDataRender(json.data, this.props.indexDetail);
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
              {this.isCreate ? "Tạo mới" : "Cập nhật"}
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
                this.isCreate ? this.create(e) : this.update(e);
              }}
            >
              {this.isCreate ? "THÊM" : "CẬP NHẬT"}
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
