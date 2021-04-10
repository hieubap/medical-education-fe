import React from "react";
import { api_subject } from "@utils/API.js";
import "react-toastify/dist/ReactToastify.css";
import { BaseFormComponent, connect } from "@utils/BaseFormComponent";

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
              this.state.props.dataDetail != null
                ? this.state.props.dataDetail.name
                : ""
            }
            onChange={this.change.bind(this)}
          />
          <input
            name="type"
            type="text"
            value={
              this.state.props.dataDetail != null
                ? this.state.props.dataDetail.type
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
