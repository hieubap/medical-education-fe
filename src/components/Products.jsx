import React, { Component, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./../CSS/manageAdmin.css";
import "./../CSS/main.css";

class Products extends Component {
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
    fetch("http://93.188.162.82:8088/product?size=1000")
      .then((res) => res.json())
      .then((json) => {
        const size = parseInt(json.totalElements / this.state.size) + 1;
        this.setState({
          loading: false,
          data: json.data,
          detail: new Array(json.data.length).fill(true),
          sizePage: size,
        });
      });

      console.log('call api product');
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
    // if (this.state.loading) {<div class="loader" id="loader"></div>};
    return (
      <div id="screen2" className="container screen">
        {
          this.state.loading && <div class="loader" id="loader"></div>
        }
        <button class="dropbtn dropup" onClick={() => this.props.sendData()}>
          Thêm mới
        </button>
        <button class="dropbtn dropup" onclick="showAllProduct()">
          Xem tất cả
        </button>
        <div class="dropup">
          <button class="dropbtn">Sắp xếp</button>
          <div class="dropup-content">
            <a href="#">Giá tăng dần</a>
            <a href="#">Giá giảm dần</a>
          </div>
        </div>
        <h2
          class=" text-center head_tag"
          data-wow-duration="1s"
          data-wow-delay="0.1s"
        >
          Menu
        </h2>
        {this.state.data.map((product, index) => {
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
                      <b>id</b>: {product.id}
                    </div>
                  </div>
                  <div
                    style={{
                      float: "left",
                      marginLeft: "20px",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ float: "top", fontSize: "17px" }}>
                      <b>tên</b>: {product.name}
                    </div>
                    <div>
                      <b style={{ float: "top", fontSize: "17px" }}>giá</b>:{" "}
                      {convertPrice(product.newPrice)}
                    </div>
                  </div>
                  <div>
                    <button
                      style={{ marginRight: "20px" }}
                      class="btn btn-default btn-rm"
                      onclick="deleteProduct(${product.id});"
                    >
                      <FontAwesomeIcon icon="trash-alt" className="icon" />
                    </button>
                    <button
                      class="btn btn-default btn-ud"
                      onClick={() => this.props.sendData(product)}
                    >
                      <FontAwesomeIcon icon="edit" className="icon" />
                    </button>
                    <button
                      class="btn btn-default btn-dt"
                      onClick={() => this.setDetail(product.id)}
                    >
                      <FontAwesomeIcon icon="eye" className="icon" />
                    </button>
                  </div>
                </div>
                {this.isNotRender(product.id) ? (
                  ""
                ) : (
                  <div>
                    <div style={{ fontSize: "17px" }}>
                      <table>
                        <tr>
                          <th>tiêu đề</th>
                          <td>{product.title}</td>
                        </tr>
                        <tr>
                          <th>tên</th>
                          <td>{product.name}</td>
                        </tr>
                        <tr>
                          <th>số sao</th>
                          <td>{product.star}</td>
                        </tr>
                        <tr>
                          <th>đánh giá</th>
                          <td>{product.numberComment}</td>
                        </tr>
                        <tr>
                          <th>đã bán</th>
                          <td>{product.numberSell}</td>
                        </tr>
                        <tr>
                          <th>số lượng</th>
                          <td>{product.number}</td>
                        </tr>
                        <tr>
                          <th>giá mới</th>
                          <td>{convertPrice(product.newPrice)}</td>
                        </tr>
                        <tr>
                          <th>giá cũ</th>
                          <td>{convertPrice(product.oldPrice)}</td>
                        </tr>
                        <tr>
                          <th>loại</th>
                          <td>{product.typeStr}</td>
                        </tr>
                        <tr>
                          <th>màu sắc</th>
                          <td>{product.color}</td>
                        </tr>
                        <tr>
                          <th>nhãn hiệu</th>
                          <td>{product.tradeMark}</td>
                        </tr>
                        <tr>
                          <th>xuất xứ</th>
                          <td>{product.manufactureCountry}</td>
                        </tr>
                        <tr>
                          <th>thể tích</th>
                          <td>{product.volumn}</td>
                        </tr>
                        <tr>
                          <th>khối lượng</th>
                          <td>{product.mass}</td>
                        </tr>
                        <tr>
                          <th>chi tiết</th>
                          <td>{product.detail}</td>
                        </tr>
                        <tr>
                          <th>nhà phân phối</th>
                          <td>{product.distributor}</td>
                        </tr>
                        <tr>
                          <th>ngày tạo</th>
                          <td>{product.createdAt}</td>
                        </tr>
                        <tr>
                          <th>ngày cập nhật</th>
                          <td>{product.updatedAt}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
        })}
        <ul class="pagination">{listPage}</ul>
      </div>
    );
  }
}

function convertPrice(money) {
  var price = money + "đ";
  var len = price.length;
  if (len < 5) return price;
  if (len < 8)
    return price.substring(0, len - 4) + "." + price.substring(len - 4);
  if (len < 11)
    return (
      price.substring(0, len - 7) +
      "." +
      price.substring(len - 7, len - 4) +
      "." +
      price.substring(len - 4)
    );
  if (len < 14)
    return (
      price.substring(0, len - 10) +
      "." +
      price.substring(0, len - 7) +
      "." +
      price.substring(len - 7, len - 3) +
      "." +
      price.substring(len - 4)
    );
}

export default Products;
