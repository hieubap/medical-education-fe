import React from "react";
import BaseFormComponent from "@utils/BaseFormComponent.jsx";
import { api_course } from "@utils/API.js";

class CourseForm extends BaseFormComponent {
  constructor(props){
    super(props);
    this.api_create = api_course + '/';
    this.api_update = api_course + '/';
  }

  element() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flexBasis: "100%" }}>
          <div className="create_groups">
            <label>Mã Khóa học</label>
            <input
              type="text"
              name="value"
              value={
                this.state.props.dataDetail != null
                  ? this.state.props.dataDetail.code
                  : ""
              }
              onChange={this.change.bind(this)}
            />
          </div>
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
            <label>Giá</label>
            <input
              name="price"
              type="number"
              value={
                this.state.props.dataDetail != null
                  ? this.state.props.dataDetail.price
                  : ""
              }
              onChange={this.change.bind(this)}
            />
          </div>
          <div className="create_groups">
            <label>Thời gian (tháng)</label>
            <select
              name="thoiGianHoc"
              class="create_input select-type-product"
              form="carform"
              onChange={this.change.bind(this)}
            >
              <option value="6:00 - 8:00">6:00 - 8:00</option>
              <option value="8:00 - 10:00">8:00 - 10:00</option>
              <option value="13:00 - 15:00">13:00 - 15:00</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseForm;
