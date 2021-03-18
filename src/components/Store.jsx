import React, { Component, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertPrice } from "./common.js";

import "./../CSS/manageAdmin.css";
import "./../CSS/main.css";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      detail: [],
      page: 0,
      size: 10,
      sizePage: 10,
    };
  }

  componentDidMount() {
    fetch("http://93.188.162.82:8088/store")
      .then((res) => res.json())
      .then((json) => {
        const size = parseInt(json.totalElements / this.state.size) + 1;
        this.setState({
          loading: false,
          data: json.data,
          detail: new Array(json.data.length).fill(false),
          sizePage: size,
        });
      });
  }

  setDetail = (id) => {
    const index = this.state.data.findIndex((index) => {
      return index.id === id;
    });
    var details = Object.assign([], this.state.detail);
    details[index] = !details[index];
    console.log(details[index]);
    console.log(index);

    this.setState({
      loading: this.state.loading,
      data: this.state.data,
      detail: details,
    });
  };

  isNotRender = (id) => {
    const index = this.state.data.findIndex((index) => {
      return index.id === id;
    });
    return this.state.detail[index];
  };

  setPage = (index) => {
    const newState = Object.assign({}, this.state);
    newState.page = index;
    this.setState(newState);
  };

  render() {
    var listPage = [];
    for (let i = 0; i < this.state.sizePage; i++) {
      listPage.push(
        <li>
          <a href="#" onClick={() => this.setPage(i)}>
            {i + 1}
          </a>
        </li>
      );
    }
    if (this.state.loading) return <div class="loader" id="loader"></div>;
    else
      return (
        <div
          id="screen5"
          className="container screen"
          style={{ fontSize: "17px" }}
        >
          <button
            className="dropbtn dropup"
            onclick="changeForms('create-store-form')"
          >
            Thêm mới
          </button>
          <h2
            className=" text-center head_tag"
            data-wow-duration="1s"
            data-wow-delay="0.1s"
          >
            Cửa hàng
          </h2>
          {this.state.data.map((store, index) => {
            if (
              this.state.page * this.state.size <= index &&
              index < (this.state.page + 1) * this.state.size
            )
              return(
            <div class="list_product_order">
              <div style={{ width: "25%", float: "left", marginLeft: "20px" }}>
                <div style={{ float: "top", fontSize: "17px" }}>
                  <b>id</b>: {store.id}
                </div>
              </div>
              <div style={{ float: "left", marginLeft: "20px" }}>
                <div style={{ float: "top", fontSize: "17px" }}>
                  <b>Tên</b>: {store.name}
                </div>
                <div style={{ float: "top", fontSize: "17px" }}>
                  <b>Ngày tạo: </b> {store.createdAt}
                </div>
              </div>
              <div>
                <button
                  className="btn btn-default btn-rm"
                  onclick="deleteNotification(${o.id});"
                  style={{ content: "f2ed", marginRight: "20px" }}
                >
                  <FontAwesomeIcon icon="trash-alt" className="icon" />
                </button>
                <button
                  className="btn btn-default btn-ud"
                  onclick="update(${o.id},4)"
                >
                  <FontAwesomeIcon icon="edit" className="icon" />
                </button>
                <button
                  className="btn btn-default btn-dt"
                  onclick="changeHidden(${o.id},1)"
                >
                  <FontAwesomeIcon icon="eye" className="icon" />
                </button>
              </div>
            </div>
          )})}

          <ul className="pagination">{listPage}</ul>
        </div>
      );
  }
}

export default Store;
