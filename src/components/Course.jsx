import React, { Component, useState } from "react";
import CourseForm from "./CourseForm";
import {api_course} from './API'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./../CSS/manageAdmin.css";
import "./../CSS/main.css";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: 0,
      size: 10,
      sizePage: 0,
      data: [],
      index:-1,
      showModal: false,
    };
  }

  componentDidMount() {
    fetch(api_course)
      .then((res) => res.json())
      .then((json) => {
        const size = parseInt(json.totalElements / this.state.size) + 1;
        console.log(json.data);
        this.setState({
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

  setData = (data,index) =>{
    var newData = Object.assign([], this.state.data);
    
    if(index === -1)
    {
      console.log("***********");
      console.log(newData.length);
      newData = [data,...newData];
      console.log(newData.length);

    }
    else
    newData[index] = data;

    const newState = {...this.state,data: newData};
    this.setState(newState);
  }

  delete = (index, id) => {
    const newState = Object.assign({}, this.state);
    newState.data = newState.data.splice(index, 1);
    this.setState(newState);
  };

  changeModel = (dataSet,index) => {
    var newState = Object.assign({}, this.state);
    newState.showModal = !newState.showModal;
    if(dataSet != null)
    newState = { ...newState, param: dataSet,index : index };
    else
    newState = { ...newState, param: dataSet, isCreate: true };

    this.setState(newState);
  };

  render() {
    var listPage = [];
    for (let i = 0; i < 5; i++) {
      listPage.push(
        <li>
          <a href="#" onClick={() => this.setPage(i)}>
            {i + 1}
          </a>
        </li>
      );
    }

    return (
      <div
        id="screen4"
        className="container screen"
        style={{ fontSize: "17px" }}
      >
        {this.state.loading && <div class="loader" id="loader"></div>}
        <button class="dropbtn dropup" onClick={() => this.changeModel()}>
          Thêm mới
        </button>
        <h2
          className=" text-center head_tag"
          data-wow-duration="1s"
          data-wow-delay="0.1s"
        >
          Thông báo
        </h2>
        <div>
          <table>
            <tr>
              <th>ID</th>
              <th>Mã khóa học</th>
              <th>Tên khóa học</th>
              <th>Người tạo</th>
              <th>Giá</th>
              <th></th>
            </tr>
            {this.state.data.map((feedback, index) => {
              if (
                this.state.page * this.state.size <= index &&
                index < (this.state.page + 1) * this.state.size
              )
                return (
                  <tr style={{ fontSize: "17px" }}>
                    <td
                      style={{
                        width: "5%",
                        fontSize: "17px",
                      }}
                      onClick={() => this.read(index, feedback.id)}
                    >
                      {feedback.id}
                    </td>
                    <td style={{ width: "15%" }}>{feedback.value}</td>
                    <td style={{ width: "15%" }}>{feedback.name}</td>
                    <td style={{ width: "15%" }}>{feedback.createdBy}</td>
                    <td>{feedback.price}</td>
                    <td style={{ width: "17%" }}>
                      <button
                        style={{ marginRight: "20px" }}
                        class="btn btn-default btn-rm"
                        onclick="deleteProduct(${product.id});"
                      >
                        <FontAwesomeIcon icon="trash-alt" className="icon" />
                      </button>
                      <button
                        class="btn btn-default btn-ud"
                        onClick={() => this.changeModel(feedback,index)}
                      >
                        <FontAwesomeIcon icon="edit" className="icon" />
                      </button>
                      <button
                        class="btn btn-default btn-dt"
                        onClick={() => this.setDetail(feedback.id)}
                      >
                        <FontAwesomeIcon icon="eye" className="icon" />
                      </button>
                    </td>
                  </tr>
                );
            })}
          </table>
        </div>
        <ul class="pagination" id="pageTag1">
          {listPage}
        </ul>
        {this.state.showModal ? (
          <div className="modal" style={{ display: "flex" }}>
            <div class="modal__overlay"></div>
            <div class="modal__body">
              <CourseForm
                param={this.state.param}
                eventBack={() => this.changeModel()}
                setData={this.setData}
                index={this.state.index}
              ></CourseForm>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Course;
