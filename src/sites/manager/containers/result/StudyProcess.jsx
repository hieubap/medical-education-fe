import React, { Component } from "react";

import "@src/CSS/manageAdmin.css";
import "@src/CSS/main.css";
import { api_study_process } from "@utils/API.js";
import Loading from '@components/loading';
import Head from "../../../../components/head-tag/Head";

class StudyProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: 0,
      size: 10,
      sizePage: 0,
      data: [],
    };
  }

  componentDidMount() {
    fetch(api_study_process)
      .then((res) => res.json())
      .then((json) => {
        const size = parseInt(json.totalElements / this.state.size) + 1;
        console.log(json.data);
        this.setState({
          ...this.state,
          loading: false,
          data: json.data,
          detail: new Array(json.data.length).fill(true),
          sizePage: size,
        });
      });

    console.log("call api product");
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

  render() {
    var listPage = [];
    for (let i = 0; i < 5; i++) {
      listPage.push(
        <li key={i}>
          <button onClick={() => this.setPage(i)}>
            {i + 1}
          </button>
        </li>
      );
    }

    return (
      <>
        {this.state.loading && <Loading></Loading>}
        <Head title="Kết quả học tập"></Head>
        <div>
          <table>
            <tr>
              <th style={{padding:"0"}}>stt</th>
              <th>Mã Môn học</th>
              <th>Môn học</th>
              <th>Điểm danh</th>
              <th>Điểm giữa kì</th>
              <th>Điểm cuối kì</th>
              <th>Trung bình</th>
              <th>Điểm</th>
            </tr>
            {this.state.data
              .filter(
                (o, index) =>
                  this.state.page * this.state.size <= index &&
                  index < (this.state.page + 1) * this.state.size
              )
              .map((feedback, index) => {
                return (
                  <tr style={{ fontSize: "17px" }}>
                    <td>{index + 1}</td>
                    <td>{feedback.subject.code}</td>
                    <td>{feedback.subject.name}</td>
                    <td>{feedback.muster}</td>
                    <td>{feedback.midPoint}</td>
                    <td>{feedback.endPoint}</td>
                    <td>{feedback.total}</td>
                    <td>{feedback.time}</td>
                  </tr>
                );
              })}
          </table>
        </div>
        <ul class="pagination" id="pageTag1">
          {listPage}
        </ul>
      </>
    );
  }
}

export default StudyProcess;
