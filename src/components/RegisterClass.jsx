import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api_class_register } from "./API";
import BaseComponent from "./BaseComponent";

class RegisterClass extends BaseComponent {
  afterInit() {
    this.nameComponent = "Đăng kí Môn học";
    this.api_get = api_class_register;
  }

  headTable() {
    return (
      <tr>
        <th>stt</th>
        <th>Mã môn học</th>
        <th>Tên môn học</th>
        <th>Ngày đăng kí</th>
        <th></th>
      </tr>
    );
  }

  bodyTable(o, index) {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{o.code}</td>
        <td>{o.subjectName}</td>
        <td>{o.createAt}</td>
        <td>
          <button
            style={{ marginRight: "20px" }}
            className="but btn-red"
            onClick={() => this.delete(index, 1)}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="icon" />
          </button>
        </td>
      </tr>
    );
  }
}

export default RegisterClass;
