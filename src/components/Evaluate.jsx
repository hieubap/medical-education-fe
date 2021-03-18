import React, { Component, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertPrice } from "./common.js";

import "./../CSS/manageAdmin.css";
import "./../CSS/main.css";

class Evaluate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      detail: [],
      page: 0,
      size: 10,
      sizePage: 0,
    };
  }

  componentDidMount() {
    fetch("http://93.188.162.82:8088/evaluate")
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

  setPage = (index) => {
    const newState = Object.assign({}, this.state);
    newState.page = index;
    this.setState(newState);
  };

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
          id="screen7"
          className="container screen"
          style={{ fontSize: "17px" }}
        >
          <button
            className="dropbtn dropup"
            onclick="changeForms('create-evaluate-form')"
          >
            Thêm mới
          </button>
          <h2
            className=" text-center head_tag"
            data-wow-duration="1s"
            data-wow-delay="0.1s"
          >
            Đánh giá
          </h2>
          {this.state.data.map((evaluate, index) => {
            console.log(
              this.state.page * this.state.size <= index &&
                index < (this.state.page + 1) * this.state.size
            );

            if (
              this.state.page * this.state.size <= index &&
              index < (this.state.page + 1) * this.state.size
            )
              return(
            <div className="list_product_order">
              <div style={{ width: "25%", float: "left", marginLeft: "20px" }}>
                <div style={{ float: "top", fontSize: "17px" }}>
                  <b>ID</b>: {evaluate.id}
                </div>
              </div>
              <div style={{ float: "left", marginLeft: "20px" }}>
                <div style={{ float: "top", fontSize: "17px" }}>
                  <b>Nội dung</b>: {evaluate.content}
                </div>
                <div style={{ float: "top", fontSize: "17px" }}>
                  <b>Thời gian</b>: {evaluate.createdAt}
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
                  onclick="update(${o.id})"
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

export default Evaluate;
