import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api_place } from "@utils/API";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import PlaceForm from "./PlaceForm";
import { BaseComponent, connect } from "@utils/BaseComponent";

class Place extends BaseComponent {
  constructor(props) {
    super(props);
    this.nameComponent = "Quản Lý Địa Điểm";
    this.api_get = api_place;
    this.api_delete = api_place + "/";
  }

  headTable() {
    return (
      <>
        <th>stt</th>
        <th>địa điểm</th>
        <th>Ngày tạo</th>
        <th>Ngày sửa</th>
      </>
    );
  }

  bodyTable(o, index) {
    return (
      <>
        <td>{index + 1}</td>
        <td>{o.address}</td>
        <td>{o.createAt}</td>
        <td>{o.updateAt}</td>
      </>
    );
  }

  action(o, index) {
    return (
      <td style={{ width: "7%" }}>
        <div className="i" onClick={() => this.delete(o.id, index)}>
          <FontAwesomeIcon icon={faTrashAlt} className="icon-red" />
        </div>
        <div className="i" onClick={() => this.changeModel(o.id, index)}>
          <FontAwesomeIcon icon={faEdit} className="icon-blue" />
        </div>
      </td>
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

export default connect(Place);
