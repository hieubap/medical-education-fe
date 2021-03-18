import React, { Component } from "react";
import "./FontAwesomeIcons";

import "./../CSS/base.css";
import "./../CSS/main.css";
import "./../CSS/grid.css";
import "./../CSS/responsive.css";
import "./../CSS/management.css";

import Menu from "./Menu.jsx";
import Product from "./Products.jsx";
import Order from "./Order.jsx";
import Bill from "./Bill.jsx";
import Notification from "./Notification.jsx";
import Store from "./Store.jsx";
import TypeProduct from "./TypeProduct.jsx";
import Evaluate from "./Evaluate.jsx";

import FormProduct from "./FormProduct.jsx";

class ManageAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      dataDetail: {},
      screen: "product",
    };
  }

  changeModel = (dataSet) => {
    var newState = Object.assign({}, this.state);
    newState.dataDetail = dataSet;
    newState.showModal = !newState.showModal;

    this.setState(newState);
  };

  changeScreen = (screen) => {
    const newState = Object.assign({}, this.state);
    newState.screen = screen;
    this.setState(newState);
  };

  render() {
    const {showModal} = this.state;

    return (
      <>
        <div className="app">
          <Menu event={this.changeScreen}></Menu>
          {this.state.screen === "product" && (
            <Product
              sendData={this.changeModel}
              eventChange={this.changeModel.bind()}
            />
          )}
          {this.state.screen === "order" && <Order />}
          {this.state.screen === "bill" && <Bill />}
          {this.state.screen === "notification" && <Notification />}
          {this.state.screen === "store" && <Store />}
          {this.state.screen === "type-product" && <TypeProduct />}
          {this.state.screen === "evaluate" && <Evaluate />}
        </div>
        {showModal ? (
          <div className="modal" style={{ display: "flex" }}>
            <div class="modal__overlay"></div>
            <div class="modal__body">
              <FormProduct
                param={this.state.dataDetail}
                eventChange={this.changeModel.bind()}
                eventScreen={this.changeScreen}
              />
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default ManageAdmin;