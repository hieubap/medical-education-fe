import React, { Component, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FormProduct from "./FormProduct.jsx";

import "./../CSS/manageAdmin.css";
import "./../CSS/main.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showModal: false,
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

  changeModel = (dataSet) => {
    var newState = Object.assign({}, this.state);
    newState.showModal = !newState.showModal;

    this.setState(newState);
  };

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
          Th??m m???i
        </button>
        <button class="dropbtn dropup" onclick="showAllProduct()">
          Xem t???t c???
        </button>
        <div class="dropup">
          <button class="dropbtn">S???p x???p</button>
          <div class="dropup-content">
            <a href="#">Gi?? t??ng d???n</a>
            <a href="#">Gi?? gi???m d???n</a>
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
                      <b>t??n</b>: {product.name}
                    </div>
                    <div>
                      <b style={{ float: "top", fontSize: "17px" }}>gi??</b>:{" "}
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
                      onClick={() => this.changeModel()}
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
                          <th>ti??u ?????</th>
                          <td>{product.title}</td>
                        </tr>
                        <tr>
                          <th>t??n</th>
                          <td>{product.name}</td>
                        </tr>
                        <tr>
                          <th>s??? sao</th>
                          <td>{product.star}</td>
                        </tr>
                        <tr>
                          <th>????nh gi??</th>
                          <td>{product.numberComment}</td>
                        </tr>
                        <tr>
                          <th>???? b??n</th>
                          <td>{product.numberSell}</td>
                        </tr>
                        <tr>
                          <th>s??? l?????ng</th>
                          <td>{product.number}</td>
                        </tr>
                        <tr>
                          <th>gi?? m???i</th>
                          <td>{convertPrice(product.newPrice)}</td>
                        </tr>
                        <tr>
                          <th>gi?? c??</th>
                          <td>{convertPrice(product.oldPrice)}</td>
                        </tr>
                        <tr>
                          <th>lo???i</th>
                          <td>{product.typeStr}</td>
                        </tr>
                        <tr>
                          <th>m??u s???c</th>
                          <td>{product.color}</td>
                        </tr>
                        <tr>
                          <th>nh??n hi???u</th>
                          <td>{product.tradeMark}</td>
                        </tr>
                        <tr>
                          <th>xu???t x???</th>
                          <td>{product.manufactureCountry}</td>
                        </tr>
                        <tr>
                          <th>th??? t??ch</th>
                          <td>{product.volumn}</td>
                        </tr>
                        <tr>
                          <th>kh???i l?????ng</th>
                          <td>{product.mass}</td>
                        </tr>
                        <tr>
                          <th>chi ti???t</th>
                          <td>{product.detail}</td>
                        </tr>
                        <tr>
                          <th>nh?? ph??n ph???i</th>
                          <td>{product.distributor}</td>
                        </tr>
                        <tr>
                          <th>ng??y t???o</th>
                          <td>{product.createdAt}</td>
                        </tr>
                        <tr>
                          <th>ng??y c???p nh???t</th>
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
        {this.state.showModal ? (
          <div className="modal" style={{ display: "flex" }}>
            <div class="modal__overlay"></div>
            <div class="modal__body">
              <FormProduct
                param={this.state.dataDetail}
                eventChange={this.changeModel.bind()}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

function convertPrice(money) {
  var price = money + "??";
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
