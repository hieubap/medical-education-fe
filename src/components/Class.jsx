import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api_class } from "./API";
import {
  faCheckCircle,
  faEdit,
  faEye,
  faTrashAlt,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import BaseComponent from "./BaseComponent";
import ClassForm from "./ClassForm";
import Head from "./Item/Head";

class Class extends BaseComponent {
  afterInit() {
    this.nameComponent = "Quản lý lớp học";
    this.api_get = api_class + "?size=10";
    this.api_delete = api_class + "/";
  }

  setPage = (index) => {
    this.setState({...this.state,loading:true});
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
      <tr>
        <th>stt</th>
        <th>Mã lớp</th>
        <th>Tên Môn</th>
        <th>Mã Môn</th>
        <th>Giáo viên</th>
        <th>Thời gian</th>
        <th>Địa điểm</th>
        <th>Số lượng đăng kí</th>
        <th>Trạng thái</th>
        <th></th>
      </tr>
    );
  }

  bodyTable(o, index) {
    return (
      <tr key={o.id} style={{ fontSize: "14px" }}>
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
        <td>
          <button class="but btn-yellow">
            <FontAwesomeIcon icon={faCheckCircle} className="icon" />
          </button>
          <button
            class="but btn-magenta"
            onClick={() => this.delete(o.id, index)}
          >
            <FontAwesomeIcon icon={faWindowClose} className="icon" />
          </button>
          <button class="but btn-blue" onClick={() => this.changeModel()}>
            <FontAwesomeIcon icon={faEdit} className="icon" />
          </button>
          <button class="but btn-red" onClick={() => this.delete(o.id, index)}>
            <FontAwesomeIcon icon={faTrashAlt} className="icon" />
          </button>
        </td>
      </tr>
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

  beforeTable() {
    return (
      <>
        <div style={{ display: "flex" }}>
          <label
            style={{ textAlign: "center", width: "8%", padding: "20px 0" }}
          >
            Khóa
          </label>
          <select
            class="create_input select-type-product"
            name="carlist"
            form="carform"
            style={{ width: "25%" }}
            onchange={(e) => this.setSelectSubject(e.target.value)}
          >
            {this.state.subjects != null &&
              this.state.subjects.map((subject, index) => {
                return <option value={subject.id}>{subject.name}</option>;
              })}
          </select>
          <label
            style={{ textAlign: "center", width: "8%", padding: "20px 0" }}
          >
            Môn
          </label>
          <select
            class="create_input select-type-product"
            name="carlist"
            form="carform"
            style={{ width: "25%" }}
            onchange={(e) => this.setSelectSubject(e.target.value)}
          >
            {this.state.subjects != null &&
              this.state.subjects.map((subject, index) => {
                return <option value={subject.id}>{subject.name}</option>;
              })}
          </select>
          <label
            style={{ textAlign: "center", width: "9%", padding: "20px 0" }}
          >
            Lớp
          </label>
          <select
            class="create_input select-type-product"
            name="carlist"
            form="carform"
            style={{ width: "25%" }}
            onchange={(e) => this.setSelectSubject(e.target.value)}
          >
            {this.state.subjects != null &&
              this.state.subjects.map((subject, index) => {
                return <option value={subject.id}>{subject.name}</option>;
              })}
          </select>
        </div>
        <div style={{ display: "flex" }}>
          <label
            style={{ textAlign: "center", width: "8%", padding: "20px 0" }}
          >
            Mã Khóa
          </label>
          <input
            class="create_input select-type-product"
            style={{ width: "20%" }}
            name="carlist"
            form="carform"
            type="text"
            sty
            onchange={(e) => this.setSelectSubject(e.target.value)}
          ></input>
          <label
            style={{ textAlign: "center", width: "8%", padding: "20px 0" }}
          >
            Mã Môn
          </label>
          <input
            class="create_input select-type-product"
            style={{ width: "20%" }}
            name="carlist"
            form="carform"
            type="text"
            sty
            onchange={(e) => this.setSelectSubject(e.target.value)}
          ></input>
          <label
            style={{ textAlign: "center", width: "8%", padding: "20px 0" }}
          >
            Mã Lớp
          </label>
          <input
            class="create_input select-type-product"
            style={{ width: "20%" }}
            name="carlist"
            form="carform"
            type="text"
            sty
            onchange={(e) => this.setSelectSubject(e.target.value)}
          ></input>
          <button
            style={{ marginLeft: "5%" }}
            className="default-btn"
            onclick={() => this.add()}
          >
            Đăng ký
          </button>
        </div>
      </>
    );
  }

  render() {
    var listPage = [];
    for (let i = 0; i < this.state.totalPage; i++) {
      listPage.push(
        <li key={i}>
          <button onClick={() => this.setPage(i)}>{i + 1}</button>
        </li>
      );
    }

    return (
      <div className="container screen" style={{ fontSize: "17px" }}>
        {this.state.loading && <div className="loader" id="loader"></div>}
        <Head title={this.nameComponent} changeModel={this.changeModel}></Head>
        {this.beforeTable()}
        <div>
          <table>
            <tbody>
              {this.headTable()}
              {this.state.dataRender != null &&
                this.state.dataRender
                  .filter((o, index) => {
                    return (
                      this.state.page * this.state.size <= index &&
                      index < (this.state.page + 1) * this.state.size
                    );
                  })
                  .map((o, index) => {
                    return this.bodyTable(
                      o,
                      index + this.state.page * this.state.size
                    );
                  })}
            </tbody>
          </table>
        </div>
        <ul className="pagination">{listPage}</ul>
        {this.state.showModal ? (
          <div className="modal" style={{ display: "flex" }}>
            <div className="modal__overlay"></div>
            <div className="modal__body">{this.form()}</div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Class;
