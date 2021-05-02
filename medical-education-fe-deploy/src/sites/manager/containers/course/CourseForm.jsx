import React from "react";
import {BaseFormComponent, connect} from "@utils/BaseFormComponent.jsx";
import { api_course } from "@utils/API.js";
class CourseForm extends BaseFormComponent {
  constructor(props) {
    super(props);
    this.api_create = api_course;
    this.api_update = api_course + "/";
    this.title = "khóa học";
  }

  element() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="group-label">
          <label>Tên khóa học</label>
          <label>Giá</label>
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
            onChange={(e) => this.change(e)}
          />
          <input
            name="price"
            type="number"
            value={
              this.state.dataDetail != null
                ? this.state.dataDetail.price
                : ""
            }
            onChange={(e) => this.change(e)}
          />
        </div>
      </div>
    );
  }
}

export default connect(CourseForm);
