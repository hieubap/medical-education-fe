import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api_place } from "./API";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import PlaceForm from "./PlaceForm";
import BaseComponent from "./BaseComponent";

class Place extends BaseComponent {
  afterInit() {
    this.nameComponent = "Quản Lý Địa Điểm";
    this.api_get = api_place;
    this.api_delete = api_place + "/";
  }

  headTable() {
    return (
      <tr>
        <th>stt</th>
        <th>địa điểm</th>
        <th>Ngày tạo</th>
        <th>Ngày sửa</th>
        <th></th>
      </tr>
    );
  }

  bodyTable(o, index) {
    return (
      <tr key={o.id} style={{ fontSize: "17px" }}>
        <td>
          {index + 1}
        </td>
        <td>{o.address}</td>
        <td>{o.createAt}</td>
        <td>{o.updateAt}</td>
        <td style={{ width: "10%" }}>
          <button className="but btn-red" onClick={() => this.delete(o.id,index)}>
            <FontAwesomeIcon icon={faTrashAlt} className="icon" />
          </button>
          <button
            className="but btn-blue"
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
      <PlaceForm
        dataDetail={this.state.dataDetail}
        eventBack={this.changeModel}
        updateDataRender={this.updateDataRender}
        indexDetail={this.state.indexDetail}
      ></PlaceForm>
    );
  }
}

export default Place;
