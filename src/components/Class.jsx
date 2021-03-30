import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api_class } from "./API";
import {
  faCheckCircle,
  faEdit,
  faEye,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import ClassDetail from "./ClassDetail.jsx";
import BaseComponent from "./BaseComponent";

class Class extends BaseComponent {
  afterInit() {
    this.nameComponent = 'Quản lý lớp';
    this.api_get = api_class;
    this.api_delete = api_class + "/";
  }
  // componentDidMount() {
  //   fetch(url_class)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       const size = parseInt(json.totalElements / this.state.size) + 1;
  //       console.log(json.data);
  //       this.setState({
  //         loading: false,
  //         data: json.data,
  //         isDetail: false,
  //         sizePage: size,
  //       });
  //     });

  //   console.log("call api product");
  // }

  // detail = (id) => {
  //   var newState = Object.assign({}, this.state);
  //   newState.isDetail = true;
  //   newState.idDetail = id;
  //   this.setState(newState);
  // };

  // setPage = (index) => {
  //   const newState = Object.assign({}, this.state);
  //   newState.page = index;
  //   this.setState(newState);
  // };

  // read = (index, id) => {
  //   const newState = Object.assign({}, this.state);
  //   newState.data[index].isRead = 0;
  //   this.setState(newState);
  // };

  // delete = (index, id) => {
  //   const newState = Object.assign({}, this.state);
  //   newState.data = newState.data.splice(index, 1);
  //   this.setState(newState);
  // };

  // back = () => {
  //   this.setState({ ...this.state, isDetail: false });
  // };
  render(){
    return super.render();
  }

  headTable() {
    return (
      <tr>
        <th>stt</th>
        <th>Mã lớp</th>
        <th>Tên lớp</th>
        <th>Khóa học</th>
        <th>Giáo viên</th>
        <th>Băt đầu</th>
        <th>Kết thúc</th>
        <th>Số lượng đăng kí</th>
        <th>Trạng thái</th>
        <th></th>
      </tr>
    );
  }

  form(){
    return (
      <ClassDetail></ClassDetail>
    )
  }

  bodyTable(o, index) {
    return (
      <tr style={{ fontSize: "17px" }}>
        <td>{index+1}</td>
        <td>{o.subject.code}</td>
        <td style={{ width: "15%" }}>{o.subject.name}</td>
        <td>{o.subject.name}</td>
        <td>{o.teacher}</td>
        <td>{o.start}</td>
        <td>{o.end}</td>
        <td>{o.numberRegister}</td>
        <td>{o.status}</td>
        <td style={{ width: "17%" }}>
          <button
            style={{ marginRight: "20px" }}
            class="btn btn-default btn-rm"
          >
            <FontAwesomeIcon icon={faWindowClose} className="icon" />
          </button>
          <button
            class="btn btn-default btn-ud"
            // onClick={() => this.changeModel()}
          >
            <FontAwesomeIcon icon={faEdit} className="icon" />
          </button>
          <button
            class="btn btn-default btn-dt"
            onClick={() => this.detail(o.id)}
          >
            <FontAwesomeIcon icon={faEye} className="icon" />
          </button>
          <button class="btn btn-default btn-ck">
            <FontAwesomeIcon icon={faCheckCircle} className="icon" />
          </button>
        </td>
      </tr>
    );
  }
  render() {
    var listPage = [];
    for (let i = 0; i < 5; i++) {
      listPage.push(
        <li>
          <a href="#" onClick={() => this.setPage(i)}>
            {i + 1}
          </a>
        </li>
      );
    }

    if(this.state.isDetail){
      return (
        <ClassDetail id={this.state.idDetail} back={() => this.back()} ></ClassDetail>
      );
    }
    else
    return (
      <div
        id="screen4"
        className="container screen"
        style={{ fontSize: "17px" }}
      >
        {/* {this.state.loading && <div class="loader" id="loader"></div>} */}
        <h2
          className=" text-center head_tag"
          data-wow-duration="1s"
          data-wow-delay="0.1s"
        >
          Lớp
        </h2>
        <div>
          <table>
            <tr>
              <th>ID</th>
              <th>Tên lớp</th>
              <th>Khóa học</th>
              <th>Giáo viên</th>
              <th>Băt đầu</th>
              <th>Kết thúc</th>
              <th>Số lượng đăng kí</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
            {this.state.data!=null && this.state.data.map((feedback, index) => {
              if (
                this.state.page * this.state.size <= index &&
                index < (this.state.page + 1) * this.state.size
              )
                return (
  <tr style={{ fontSize: "17px" }}>
    <td>{feedback.id}</td>
    <td style={{ width: "15%" }}>{feedback.subject.name}</td>
    <td>{feedback.subject.name}</td>
    <td>{feedback.teacher}</td>
    <td>{feedback.start}</td>
    <td>{feedback.end}</td>
    <td>{feedback.numberRegister}</td>
    <td>{feedback.status}</td>
    <td style={{ width: "17%" }}>
      <button
        style={{ marginRight: "20px" }}
        class="btn btn-default btn-rm"
        onclick="deleteProduct(${product.id});"
      >
        <FontAwesomeIcon icon={faWindowClose} className="icon" />
      </button>
      <button
        class="btn btn-default btn-ud"
        // onClick={() => this.changeModel()}
      >
        <FontAwesomeIcon icon={faEdit} className="icon" />
      </button>
      <button
        class="btn btn-default btn-dt"
        onClick={() => this.detail(feedback.id)}
      >
        <FontAwesomeIcon icon={faEye} className="icon" />
      </button>
      <button
        class="btn btn-default btn-ck"
      >
        <FontAwesomeIcon icon={faCheckCircle} className="icon" />
      </button>
    </td>
  </tr>
      );
  })}
          </table>
        </div>
        <ul class="pagination" id="pageTag1">
          {listPage}
        </ul>
      </div>
    );
  }
}

export default Class;
