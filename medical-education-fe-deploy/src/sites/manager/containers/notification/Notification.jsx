import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { url_notification, url_notification_read } from "@utils/API";
import {BaseComponent,connect} from "@utils/BaseComponent";

class Notification extends BaseComponent {
  constructor(props){
    super(props)
    this.nameComponent = "Thông Báo";
    this.api_get = url_notification;
  }

  read = (index, id) => {
    fetch(url_notification_read + id, {
      method: "put",
      headers: {
        // Authorization: token,
      },
    });
    const newState = Object.assign({}, this.state);
    newState.data[index].isRead = 0;
    this.setState(newState);
  };

  headTable() {
    return (
      <>
        <th style={{width:"3%",padding:"0"}}>stt</th>
        <th style={{width:"17%",padding:"0"}}>Thời gian</th>
        <th>Nội dung</th>
      </>
    );
  }

  bodyTable(o, index) {
    return (
      <>
        <td>{index + 1}</td>
        <td>{o.createAt}</td>
        <td>{o.content}</td>
        
      </>
    );
  }

  action(o,index){
    return(
      <td style={{width:"6%"}}>
          <div class="i">
            <FontAwesomeIcon icon={faEye} className="icon-green" />
          </div>
          <div
            class="i"
            onClick={() => this.delete(index, 1)}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="icon-red" />
          </div>
        </td>
    )
  }

  render(){
    return super.render();
  }
}

export default connect(Notification);
