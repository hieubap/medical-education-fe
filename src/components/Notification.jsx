import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { url_notification, url_notification_read, token } from "./API";
import BaseComponent from "./BaseComponent";

class Notification extends BaseComponent {
  afterInit() {
    this.nameComponent = "Thông Báo";
  }

  componentDidMount() {
    fetch(url_notification + "&size=10000")
      .then((res) => res.json())
      .then((json) => {
        const size = parseInt(json.totalElements / this.state.size);
        this.setState({
          loading: false,
          data: json.data,
          detail: new Array(json.data.length).fill(false),
          sizePage: size,
        });
      });
  }

  read = (index, id) => {
    fetch(url_notification_read + id, {
      method: "put",
      headers: {
        Authorization: token,
      },
    });
    const newState = Object.assign({}, this.state);
    newState.data[index].isRead = 0;
    this.setState(newState);
  };

  headTable() {
    return (
      <tr>
        <th>stt</th>
        <th>Thời gian</th>
        <th>Nội dung</th>
        <th></th>
      </tr>
    );
  }

  bodyTable(o, index) {
    return (
      <tr key={o.id} style={{ fontSize: "17px" }}>
        <td>{index + 1}</td>
        <td>{o.createAt}</td>
        <td>{o.content}</td>
        <td>
          <button class="but btn-green">
            <FontAwesomeIcon icon={faEye} className="icon" />
          </button>
          <button
            style={{ marginRight: "20px" }}
            class="but btn-red"
            onClick={() => this.delete(index, 1)}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="icon" />
          </button>
        </td>
      </tr>
    );
  }
}

export default Notification;
