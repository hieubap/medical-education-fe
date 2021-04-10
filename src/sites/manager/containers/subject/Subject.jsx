import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api_subject } from "@utils/API";

import "@src/CSS/manageAdmin.css";
import "@src/CSS/main.css";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import SubjectForm from "./SubjectForm";
import {BaseComponent,connect} from "@utils/BaseComponent";

class Subject extends BaseComponent {
  constructor(props) {
    super(props);
    this.api_get = api_subject;
    this.api_delete = api_subject + "/";
    this.nameComponent = "Quản lý môn học";
    console.log(props);
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
        <td style={{ width: "7%" }}>
          <div
            class="i"
            onClick={() => this.changeModel(o.id, index)}
          >
            <FontAwesomeIcon icon={faEdit} className="icon-blue" />
          </div>
          <div
            class="i"
            onClick={() => this.delete(o.id, index)}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="icon-red" />
          </div>
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

export default connect(Subject);
