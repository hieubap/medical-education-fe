import React, { Component } from "react";
import { api_class_register } from "@utils/API.js";
import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import { BaseComponent, connect } from "@utils/BaseComponent";

class Schedule extends BaseComponent {
  constructor(props) {
    super(props);
    this.api_get = api_class_register;
    this.nameComponent = "Lịch";
    this.has_action = false;
  }

  read = (index, id) => {
    const newState = Object.assign({}, this.state);
    newState.data[index].isRead = 0;
    this.setState(newState);
  };

  headTable() {
    return (
      <>
        <th>stt</th>
        <th>Thời gian</th>
        <th>Lớp</th>
        <th>Địa điểm</th>
      </>
    );
  }

  bodyTable(obj, index) {
    return (
      <>
        <td>{index + 1}</td>
        <td>{obj.classInfo.time}</td>
        <td>{obj.classInfo.subject.name}</td>
        <td>{obj.classInfo.place.address}</td>
      </>
    );
  }
}

export default connect(Schedule);
