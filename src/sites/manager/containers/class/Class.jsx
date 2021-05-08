import {
  faCheckCircle,
  faEdit,
  faTrashAlt,
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api_class } from "@utils/API";
import { BaseComponent,connect } from "@utils/BaseComponent";
import ClassForm from "./ClassForm";
import "./style.scss";

class Class extends BaseComponent {
  constructor(props) {
    super(props);
    this.nameComponent = "Quản lý lớp học";
    this.api_get = api_class + "?size=10";
    this.api_delete = api_class + "/";
  }

  setPage = (index) => {
    this.setState({ ...this.state, loading: true });
    fetch(this.api_get + "page=" + this.state.page)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          ...this.state,
          loading: false,
          dataRender: json.data,
          page: index,
        });
      });
  };

  headTable() {
    return (
      <>
        <th>stt</th>
        <th>Mã lớp</th>
        <th>Tên Môn</th>
        <th>Mã Môn</th>
        <th>Giáo viên</th>
        <th>Thời gian</th>
        <th>Địa điểm</th>
        <th>Số lượng đăng kí</th>
        <th>Trạng thái</th>
      </>
    );
  }

  bodyTable(o, index) {
    return (
      <>
        <td>{index + 1}</td>
        <td>{o.code}</td>
        <td>{o.subject.name}</td>
        <td>{o.subject.code}</td>
        <td>{o.teacher.fullName}</td>
        <td>{o.time}</td>
        <td>{o.place.address}</td>
        <td>
          {o.numberRegister}/{o.limitRegister}
        </td>
        <td>{o.status}</td>
      </>
    );
  }
  action(o, index) {
    return (
      <td>
        <div className="i">
          <FontAwesomeIcon icon={faCheckCircle} className="icon-yellow" />
        </div>
        <div className="i" onClick={() => this.delete(o.id, index)}>
          <FontAwesomeIcon icon={faWindowClose} className="icon-mangeto" />
        </div>
        <div className="i" onClick={() => this.changeModel(o.id, index)}>
          <FontAwesomeIcon icon={faEdit} className="icon-blue" />
        </div>
        <div className="i" onClick={() => this.delete(o.id, index)}>
          <FontAwesomeIcon icon={faTrashAlt} className="icon-red" />
        </div>
      </td>
    );
  }
  form() {
    return (
      <ClassForm
        dataDetail={this.state.dataDetail}
        eventBack={() => this.changeModel()}
        updateDataRender={this.updateDataRender}
        indexDetail={this.state.indexDetail}
      ></ClassForm>
    );
  }
  setSelectSubject = (e) =>{
    e.preventDefault();
  }

  beforeTable() {
    return (
      <div className="search-class">
        <div>
          {/* <label>Khóa</label>
          <select
            name="carlist"
            form="carform"
            onChange={(e) => this.setSelectSubject(e.target.value)}
          >
            {this.state.subjects != null &&
              this.state.subjects.map((subject, index) => {
                return <option value={subject.id}>{subject.name}</option>;
              })}
          </select> */}
          <label>Môn</label>
          <select
            name="carlist"
            form="carform"
            onChange={(e) => this.setSelectSubject(e)}
          >
            {this.state.subjects != null &&
              this.state.subjects.map((subject, index) => {
                return <option value={subject.id}>{subject.name}</option>;
              })}
          </select>
          <label>Lớp</label>
          <select
            name="carlist"
            form="carform"
            onChange={(e) => this.setSelectSubject(e)}
          >
            {this.state.subjects != null &&
              this.state.subjects.map((subject, index) => {
                return <option value={subject.id}>{subject.name}</option>;
              })}
          </select>
        </div>
        <div>
          {/* <label>Mã Khóa</label>
          <input
            name="carlist"
            form="carform"
            type="text"
            sty
            onChange={(e) => this.setSelectSubject(e.target.value)}
          ></input> */}
          <label>Mã Môn</label>
          <input
            name="carlist"
            form="carform"
            type="text"
            onChange={(e) => this.setSelectSubject(e)}
          ></input>
          <label>Mã Lớp</label>
          <input
            name="carlist"
            form="carform"
            type="text"
            onChange={(e) => this.setSelectSubject(e)}
          ></input>
        </div>
      </div>
    );
  }

  // render() {
  //   var listPage = [];
  //   for (let i = 0; i < this.state.totalPage; i++) {
  //     listPage.push(
  //       <li key={i}>
  //         <button onClick={() => this.setPage(i)}>{i + 1}</button>
  //       </li>
  //     );
  //   }

    // return (
    //   <>
    //     {this.state.loading && <div className="loader" id="loader"></div>}
    //     <Head title={this.nameComponent} changeModel={this.changeModel}></Head>
    //     <div className="content">
    //       {this.beforeTable()}
    //       <table>
    //         <tbody>
    //           {this.headTable()}
    //           {this.state.dataRender != null &&
    //             this.state.dataRender
    //               .filter((o, index) => {
    //                 return (
    //                   this.state.page * this.state.size <= index &&
    //                   index < (this.state.page + 1) * this.state.size
    //                 );
    //               })
    //               .map((o, index) => {
    //                 return this.bodyTable(
    //                   o,
    //                   index + this.state.page * this.state.size
    //                 );
    //               })}
    //         </tbody>
    //       </table>
    //     </div>
    //     <ul className="pagination">{listPage}</ul>
    //     {this.state.showModal ? (
    //       <div className="modal" style={{ display: "flex" }}>
    //         <div className="modal__overlay"></div>
    //         <div className="modal__body">{this.form()}</div>
    //       </div>
    //     ) : null}
    //   </>
    // );
  // }
}

export default connect(Class);