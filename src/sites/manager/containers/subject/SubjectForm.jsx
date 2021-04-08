import React from "react";
import { api_subject } from "@utils/API.js";
import "react-toastify/dist/ReactToastify.css";

import "@src/CSS/manageAdmin.css";
import "@src/CSS/base.css";
import "@src/CSS/grid.css";
import "@src/CSS/responsive.css";
import BaseFormComponent from "@utils/BaseFormComponent";

class SubjectForm extends BaseFormComponent {
  constructor(props) {
    super(props);
    this.api_create = api_subject + "/";
    this.api_update = api_subject + "/";
  }

  element() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flexBasis: "100%" }}>
          <div className="create_groups">
            <label>Tên</label>
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
          </div>
          <div className="create_groups">
            <label>Loại</label>
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
      </div>
    );
  }
}

export default SubjectForm;
