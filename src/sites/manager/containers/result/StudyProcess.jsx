import React, { Component } from "react";
import { api_study_process } from "@utils/API.js";
import Loading from "@components/loading";
import Head from "@components/head-tag/Head";
import { BaseComponent, connect } from "@utils/BaseComponent";

class StudyProcess extends BaseComponent {
  constructor(props) {
    super(props);
    this.api_get = api_study_process;
    this.has_action = false;
    this.nameComponent="Kết quả học tập";
  }
  
  setPage = (index) => {
    const newState = Object.assign({}, this.state);
    newState.page = index;
    this.setState(newState);
  };

  read = (index, id) => {
    const newState = Object.assign({}, this.state);
    newState.data[index].isRead = 0;
    this.setState(newState);
  };

  delete = (index, id) => {
    const newState = Object.assign({}, this.state);
    newState.data = newState.data.splice(index, 1);
    this.setState(newState);
  };

  headTable() {
    return (
      <>
        <th style={{ padding: "0" }}>stt</th>
        <th>Mã Môn học</th>
        <th>Môn học</th>
        <th>Điểm danh</th>
        <th>Điểm giữa kì</th>
        <th>Điểm cuối kì</th>
        <th>Trung bình</th>
        <th>Điểm</th>
      </>
    );
  }

  bodyTable(o, index) {
    return (
      <>
        <td>{index + 1}</td>
        <td>{o.subject.code}</td>
        <td>{o.subject.name}</td>
        <td>{o.muster}</td>
        <td>{o.midPoint}</td>
        <td>{o.endPoint}</td>
        <td>{o.total}</td>
        <td>{o.time}</td>
      </>
    );
  }
}

export default connect(StudyProcess);
