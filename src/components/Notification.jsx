import React, { Component, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertPrice } from "./common.js";
import {
  url_notification,
  url_notification_read,
  url_notification_count_read,
  url_notification_delete,
  token,
} from "./API";

import "./../CSS/manageAdmin.css";
import "./../CSS/main.css";
import { faFontAwesomeLogoFull } from "@fortawesome/free-solid-svg-icons";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: 0,
      size: 30,
      sizePage: 0,
    };
  }

  componentDidMount() {
    fetch(url_notification+"&size=10000")
      .then((res) => res.json())
      .then((json) => {
        const size = parseInt(json.totalElements / this.state.size);
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

  read = (index, id) => {
    fetch(url_notification_read + id, {
      method: "put",
      headers: {
        Authorization:token
      },
    });
    const newState = Object.assign({}, this.state);
    newState.data[index].isRead = 0;
    this.setState(newState);
  };

  delete = (index, id) => {
    fetch(url_notification_delete + id, {
      method: "delete",
      headers: {
        Authorization:token
      },
    });
    const newState = Object.assign({}, this.state);
    newState.data = newState.data.splice(index, 1);
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
          id="screen4"
          className="container screen"
          style={{ fontSize: "17px" }}
        >
          <h2
            className=" text-center head_tag"
            data-wow-duration="1s"
            data-wow-delay="0.1s"
          >
            Thông báo
          </h2>
          <div id="list_notification">
            {this.state.data.map((notification, index) => {
              if (
                this.state.page * this.state.size <= index &&
                index < (this.state.page + 1) * this.state.size
              )
                return (
                  <div
                    className="list_product_order"
                    onClick={() => this.read(index, notification.id)}
                    style={
                      notification.isRead == 1 ? { fontWeight: "bold" } : {}
                    }
                  >
                    <div
                      style={{
                        width: "25%",
                        float: "left",
                        marginLeft: "20px",
                      }}
                    >
                      <div style={{ float: "top", fontSize: "17px" }}>
                        id: {notification.id}
                      </div>
                    </div>
                    <div style={{ float: "left", marginLeft: "20px" }}>
                      <div style={{ float: "top", fontSize: "17px" }}>
                        {" "}
                        {notification.content}{" "}
                      </div>
                      <div style={{ float: "top", fontSize: "17px" }}>
                        {notification.createdAt}
                      </div>
                    </div>
                    <div>
                      <button
                        className="btn btn-default btn-rm"
                        onClick={() => this.delete(index, notification.id)}
                        style={{ content: "f2ed", marginRight: "20px" }}
                      >
                        <FontAwesomeIcon icon="window-close" className="icon" />
                      </button>
                    </div>
                  </div>
                );
            })}
          </div>
          <ul class="pagination" id="pageTag1">
            {listPage}
          </ul>
        </div>
      );
  }
}

export default Notification;
