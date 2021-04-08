import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { url_notification, url_notification_read, token } from "@utils/API";
import BaseComponent from "@utils/BaseComponent";

class Notification extends BaseComponent {
  afterInit() {
    this.nameComponent = "Thông Báo";
    this.api_get = url_notification;
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
        <th style={{width:"3%",padding:"0"}}>stt</th>
        <th style={{width:"17%",padding:"0"}}>Thời gian</th>
        <th>Nội dung</th>
        <th></th>
      </tr>
    );
  }

  bodyTable(o, index) {
    return (
      <tr key={o.id}>
        <td>{index + 1}</td>
        <td>{o.createAt}</td>
        <td>{o.content}</td>
        <td style={{width:"6%"}}>
          <button class="but btn-green">
            <FontAwesomeIcon icon={faEye} className="icon" />
          </button>
          <button
            class="but btn-red"
            onClick={() => this.delete(index, 1)}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="icon" />
          </button>
        </td>
      </tr>
    );
  }

  render(){
    return super.render();
  }
}

export default Notification;
