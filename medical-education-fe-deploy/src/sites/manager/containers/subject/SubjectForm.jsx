import { api_subject } from "@utils/API.js";
import { BaseFormComponent,connect } from "@utils/BaseFormComponent";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

class SubjectForm extends BaseFormComponent {
  constructor(props) {
    super(props);
    this.api_create = api_subject + "/";
    this.api_update = api_subject + "/";
    this.title = "môn học";
  }

  element() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="group-label">
          <label>Tên môn học</label>
          <label>Loại</label>
        </div>
        <div className="group-input">
          <input
            name="name"
            type="text"
            value={
              this.state.dataDetail != null
                ? this.state.dataDetail.name
                : ""
            }
            onChange={this.change.bind(this)}
          />
          <input
            name="type"
            type="text"
            value={
              this.state.dataDetail != null
                ? this.state.dataDetail.type
                : ""
            }
            onChange={this.change.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default connect(SubjectForm);
