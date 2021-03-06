import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api_subject } from "./API";

import "./../CSS/manageAdmin.css";
import "./../CSS/main.css";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import SubjectForm from "./SubjectForm";
import BaseComponent from "./BaseComponent";

class Subject extends BaseComponent {
  constructor(props) {
    super(props);
    this.api_get = api_subject;
    this.api_delete = api_subject + "/";
    this.nameComponent = "Quản lý môn học";
  }

  headTable() {
    return (
      <tr>
        <th>ID</th>
        <th>Mã môn học</th>
        <th>Tên môn học</th>
        <th>loại môn học</th>
        <th></th>
      </tr>
    );
  }

  bodyTable(o, index) {
    return (
      <tr style={{ fontSize: "17px" }}>
        <td
          style={{
            width: "5%",
            fontSize: "17px",
          }}
        >
          {o.id}
        </td>
        <td style={{ width: "15%" }}>{o.code}</td>
        <td>{o.name}</td>
        <td style={{ width: "15%" }}>{o.type}</td>
        <td style={{ width: "18%" }}>
          <button
            style={{ marginRight: "20px" }}
            class="btn btn-default btn-rm"
            onClick={() => this.delete(o.id, index)}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="icon" />
          </button>
          <button
            class="btn btn-default btn-ud"
            onClick={() => this.changeModel(o.id, index)}
          >
            <FontAwesomeIcon icon={faEdit} className="icon" />
          </button>
        </td>
      </tr>
    );
  }

  form() {
    return (
      <SubjectForm
        dataDetail={this.state.dataDetail}
        eventBack={this.changeModel}
        updateDataRender={this.updateDataRender}
        indexDetail={this.state.indexDetail}
      ></SubjectForm>
    );
  }
}

export default Subject;
