import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertPrice } from "@components/common";
import { faEdit, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BaseComponent from "@utils/BaseComponent";
import CourseForm from "./CourseForm";
import { api_course } from "@utils/API";
import CourseDetail from "./CourseDetail";

class Course extends BaseComponent {
  constructor(props) {
    super(props);
    this.api_get = api_course;
    this.api_update = api_course + "/";
    this.api_delete = api_course + "/";
    this.nameComponent = 'Quản lý khóa học';
  }

  render() {
    var listPage = [];
    for (let i = 0; i < this.state.totalPage; i++) {
      listPage.push(
        <li key={i}>
          <button onClick={() => this.setPage(i)}>{i + 1}</button>
        </li>
      );
    }

    if (this.state.isDetail) {
      return <CourseDetail id={this.state.idDetail} back={() => this.back()} />;
    } else
    return super.render();
  }
  headTable() {
    return (
      <tr>
        <th>ID</th>
        <th>Mã khóa học</th>
        <th>Tên khóa học</th>
        <th>Người tạo</th>
        <th>Giá</th>
        <th>Số lượng đăng kí</th>
        <th>Số lượng đăng kí mới</th>
        <th></th>
      </tr>
    );
  }
  bodyTable(o, index) {
    return (
      <tr key={o.id} style={{ fontSize: "15px" }}>
        <td
          style={{
            width: "5%",
            fontSize: "17px",
          }}
        >
          {o.id}
        </td>
        <td>{o.code}</td>
        <td>{o.name}</td>
        <td>{o.createdBy}</td>
        <td>{convertPrice(o.price)}</td>
        <td></td>
        <td></td>
        <td>
          <button className="but btn-green" onClick={() => this.detail(o.id)}>
            <FontAwesomeIcon icon={faEye} className="icon" />
          </button>
          <button
            className="but btn-blue"
            onClick={() =>
              this.changeModel(o.id, index)
            }
          >
            <FontAwesomeIcon icon={faEdit} className="icon" />
          </button>
          <button
            className="but btn-red"
            onClick={() =>
              this.delete(o.id, index)
            }
          >
            <FontAwesomeIcon icon={faTrashAlt} className="icon" />
          </button>
        </td>
      </tr>
    );
  }
  form() {
    return (
      <CourseForm
        dataDetail={this.state.dataDetail}
        eventBack={() => this.changeModel()}
        updateDataRender={this.updateDataRender}
        indexDetail={this.state.indexDetail}
      ></CourseForm>
    );
  }
}

export default Course;
