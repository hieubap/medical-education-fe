import React, { Component, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertPrice } from "./common.js";

import "./../CSS/manageAdmin.css";
import "./../CSS/main.css";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      detail: [],
      page: 0,
      size: 10,
    };
  }

  componentDidMount() {
    fetch("http://93.188.162.82:8088/bill/get-order")
      .then((res) => res.json())
      .then((json) => {
        const size = parseInt(json.totalElements / this.state.size) + 1;
        this.setState({
          loading: false,
          data: json.data,
          detail: new Array(json.data.length).fill(false),
          sizePage: size
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
          <a href="#" onClick={() => this.setPage(i)}>{i + 1}</a>
        </li>
      );
    }

    if (this.state.loading) return <div class="loader" id="loader"></div>;
    else
      return (
        <div id="screen3" class="container screen" style={{ fontSize: "17px" }}>
          <h2
            class=" text-center head_tag"
            data-wow-duration="1s"
            data-wow-delay="0.1s"
          >
            Các đơn trong tháng
          </h2>
          {this.state.data.map((bill,index) => {
              if (
                this.state.page * this.state.size <= index &&
                index < (this.state.page + 1) * this.state.size
              )
              return (
            <div>
              <div className="list_product_order">
                <div
                  style={{ width: "25%", float: "left", marginLeft: "20px" }}
                >
                  <div style={{ float: "top", fontSize: "17px" }}>
                    <b>id</b>:{bill.id}
                  </div>
                </div>
                <div style={{ width: "25%", float: "left" }}>
                  <div style={{ float: "top" }}>
                    <b>người đặt</b>:{bill.name}
                  </div>
                  <div style={{ float: "top" }}>
                    <b>thời gian</b>:{bill.createdAt}
                  </div>
                </div>
                <div style={{ width: "25%", float: "left" }}>
                  <div style={{ float: "top", fontSize: "17px" }}>
                    <b>tổng tiền</b>:{bill.total}
                  </div>
                  <div style={{ float: "top", fontSize: "17px" }}>
                    <b>trạng thái</b>:
                    <div
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "var(--red)",
                      }}
                    />
                    {bill.statusName}
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-default btn-rm"
                    onclick="deleteBill(${arr.id})"
                    style={{ marginRight: "20px" }}
                  >
                    <FontAwesomeIcon icon="window-close" className="icon" />
                  </button>
                  <button
                    className="btn btn-default btn-dt"
                    onClick={() => this.setDetail(bill.id)}
                  >
                    <FontAwesomeIcon icon="eye" className="icon" />
                  </button>
                  <button
                    className="btn btn-default btn-ck"
                    onclick="confirm(${arr.id})"
                  >
                    <FontAwesomeIcon icon="check-circle" className="icon" />
                  </button>
                </div>
              </div>
              {this.isNotRender(bill.id) && (
                <>
                  <div className="detail-bill" id="detail-bill-${arr.id}">
                    <div className="column">
                      <div>Thời gian:{bill.createdAt}</div>
                      <div>Người đặt:{bill.name}</div>
                      <div>Số điện thoại:{bill.phone}</div>
                    </div>
                    <div className="column">
                      <div>Địa chỉ giao hàng:{bill.adress}</div>
                      <div>Chú thích:{bill.note}</div>
                    </div>
                  </div>
                  <div>
                    <table>
                      <tr>
                        <th>stt</th>
                        <th>tên</th>
                        <th>số lượng</th>
                        <th>giá</th>
                      </tr>
                      {bill.foods.map((product, index) => (
                        <tr>
                          <th>{index + 1}</th>
                          <td>{product.food.name}</td>
                          <td>{product.number}</td>
                          <td>{convertPrice(product.price)}</td>
                        </tr>
                      ))}
                      <tr>
                        <th></th>
                        <th></th>
                        <th> tổng tiền:</th>
                        <th>{convertPrice(bill.total)}</th>
                      </tr>
                    </table>
                  </div>
                </>
              )}
            </div>
          )})}
          <ul class="pagination">
            {listPage}
          </ul>
        </div>
      );
  }
}

export default Order;
