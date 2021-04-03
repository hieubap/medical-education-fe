import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import "./../CSS/manageAdmin.css";
import "./../CSS/main.css";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import {
  api_course_register,
  token,
  url_course_register,
} from "./API.js";
import BaseComponent from "./BaseComponent";
import Head from "./Item/Head";
import { toast } from "react-toastify";

class RegistryCourse extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {...this.state,codeCourse:""}
    this.api_get = api_course_register + "?studentId=" + "1";
  }

  // componentDidMount() {
  //   fetch(url_course_register)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       const size = parseInt(json.totalElements / this.state.size) + 1;
  //       console.log(json.data);
  //       this.setState({
  //         ...this.state,
  //         loading: false,
  //         data: json.data,
  //         detail: new Array(json.data.length).fill(true),
  //         sizePage: size,
  //       });
  //     });

  //   console.log("call api product");
  // }

  // setPage = (index) => {
  //   const newState = Object.assign({}, this.state);
  //   newState.page = index;
  //   this.setState(newState);
  // };

  // read = (index, id) => {
  //   const newState = Object.assign({}, this.state);
  //   newState.data[index].isRead = 0;
  //   this.setState(newState);
  // };

  // delete = (index, id) => {
  //   const newState = Object.assign({}, this.state);
  //   newState.data = newState.data.splice(index, 1);
  //   this.setState(newState);
  // };

  registerCourse = () => {
    var json = JSON.stringify({code:this.state.dataDetail.codeCourse});
    fetch(url_course_register, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: json,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          toast.success(json.message);
          var newState = Object.assign({}, this.state);
          newState.dataRender = [json.data, ...newState.dataRender];
          this.setState(newState);
        } else {
          toast.error(json.message);
        }
      });
  };

  // change = (e) => {
  //   var newParam = Object.assign({}, this.state.props.param);
  //   newParam = { ...newParam, [e.target.name]: e.target.value };
  //   const newProps = { ...this.state.props, param: newParam };
  //   this.setState({ ...this.state, props: newProps });
  // };

  render() {
    var listPage = [];
    for (let i = 0; i < 5; i++) {
      listPage.push(
        <li key={i}>
          <button onClick={() => this.setPage(i)}>{i + 1}</button>
        </li>
      );
    }

    return (
      <div className="container screen" style={{ fontSize: "17px" }}>
        {this.state.loading && <div className="loader" id="loader"></div>}
        <Head
          title="Đăng kí khóa học"
        ></Head>
        <div style={{ display: "flex" }}>
          <label
            style={{ textAlign: "center", width: "8%", padding: "20px 0" }}
          >
            Mã Khóa
          </label>
          <input
            class="create_input select-type-product"
            style={{ width: "20%" }}
            name="codeCourse"
            form="carform"
            type="text"
            sty
            onChange={(e) => this.setSelect(e.target.name,e.target.value)}
          ></input>
          <button
            style={{ marginLeft: "3%" }}
            className="default-btn"
            onClick={() => this.registerCourse()}
          >
            Đăng ký
          </button>
        </div>
        <div>
          <table>
            <tr>
              <th>stt</th>
              <th>Ngày đăng kí</th>
              <th>Ngày cập nhật</th>
              <th>Tên sinh viên</th>
              <th>Mã Khóa học</th>
              <th>Khóa đăng kí</th>
              <th></th>
            </tr>
            {this.state.dataRender != null &&
              this.state.dataRender.map((o, index) => {
                if (
                  this.state.page * this.state.size <= index &&
                  index < (this.state.page + 1) * this.state.size
                ) {
                  console.log(o);
                }
                return (
                  <tr style={{ fontSize: "17px" }}>
                    <td>{index + 1}</td>
                    <td>{o.createAt}</td>
                    <td>{o.updateAt}</td>
                    <td>{o.student.fullName}</td>
                    <td>{o.course.code}</td>
                    <td>{o.course.name}</td>
                    <td>
                      <button
                        style={{ marginRight: "20px" }}
                        className="btn btn-default btn-rm"
                      >
                        <FontAwesomeIcon
                          icon={faWindowClose}
                          className="icon"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
        <ul className="pagination" id="pageTag1">
          {listPage}
        </ul>
      </div>
    );
  }
}

export default RegistryCourse;
