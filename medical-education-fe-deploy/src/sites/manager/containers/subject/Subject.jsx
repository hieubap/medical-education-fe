import { faEdit,faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api_subject } from "@utils/API";
import { BaseComponent,connect } from "@utils/BaseComponent";
import React from "react";
import SubjectForm from "./SubjectForm";

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
      <>
        <th>ID</th>
        <th>Mã môn học</th>
        <th>Tên môn học</th>
        <th>loại môn học</th>
      </>
    );
  }

  bodyTable(o, index) {
    return (
      <>
        <td>{o.id}</td>
        <td style={{ width: "15%" }}>{o.code}</td>
        <td>{o.name}</td>
        <td style={{ width: "15%" }}>{o.type}</td>
      </>
    );
  }

  action(o, index) {
    return (
      <td style={{ width: "7%" }}>
        <div class="i" onClick={() => this.changeModel(o.id, index)}>
          <FontAwesomeIcon icon={faEdit} className="icon-blue" />
        </div>
        <div class="i" onClick={() => this.delete(o.id, index)}>
          <FontAwesomeIcon icon={faTrashAlt} className="icon-red" />
        </div>
      </td>
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
