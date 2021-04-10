import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { api_course_register } from "@utils/API.js";
import { BaseComponent, connect } from "@utils/BaseComponent";
import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import './../class-register/style.scss';
class RegistryCourse extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { ...this.state, codeCourse: "" };
    this.api_get = api_course_register + "?studentId=" + "1";
  }

  registerCourse(){
    
  }

  beforeTable() {
    return (
      <div className="registry">
        <label>Mã Khóa</label>
        <input
          name="codeCourse"
          form="carform"
          type="text"
          onChange={(e) => this.setSelect(e.target.name, e.target.value)}
        ></input>
        <button className="default-btn" onClick={() => this.registerCourse()}>
          Đăng ký
        </button>
      </div>
    );
  }

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
      <>
        {this.state.loading && <Loading></Loading>}
        <Head title="Đăng kí khóa học"></Head>
        {this.beforeTable()}
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
                      <div className="i">
                        <FontAwesomeIcon
                          icon={faWindowClose}
                          className="icon-red"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
        <ul className="pagination" id="pageTag1">
          {listPage}
        </ul>
      </>
    );
  }
}

export default connect(RegistryCourse);
