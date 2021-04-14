import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api_class_register } from "@utils/API";
import { BaseComponent,connect } from "@utils/BaseComponent";
import { toast } from "react-toastify";
import "./style.scss";
class RegisterClass extends BaseComponent {
  afterInit() {
    this.nameComponent = "Đăng kí Lớp học";
    this.api_get = api_class_register;
    this.api_post = api_class_register;
    this.api_delete = api_class_register + "/";
    this.state = {
      ...this.state,
      dataDetail: { ...this.state.dataDetail, codeClass: null },
      token: this.props.userApp.token
    };
  }

  afterDidMount() {
    if (this.state.data != null) {
      var newData = Object.assign([], this.state.data);
      for (let i = 0; i < this.state.data.length; i++) {
        newData[i] = { ...newData[i], status: "Thành Công" };
      }
      this.setState({ ...this.state, data: newData });
    }
  }

  addClass() {
    if (this.state.dataDetail.codeClass === null)
      toast.warning("Mã lớp không để trống");
    else {
      fetch(this.api_post, {
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization:this.state.token
        },
        body: JSON.stringify({
          codeClass: this.state.dataDetail.codeClass,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.code === 200) {
            if (json.data.length === 0) {
              toast.info(
                "Không tồn tại mã lớp '" + this.state.dataDetail.codeClass + "'"
              );
              return;
            }
            console.log(json.data[0]);
            this.setState({
              ...this.state,
              loading: false,
              dataRender: [
                { ...json.data, status: "Mới thêm" },
                ...this.state.dataRender,
              ],
            });
            toast.success("Thêm thành công");
          } else {
            toast.error(json.message);
          }
        });
    }
  }

  headTable() {
    return (
      <tr>
        <th>stt</th>
        <th>Mã lớp</th>
        <th>Mã môn học</th>
        <th>Tên môn học</th>
        <th>Giáo viên</th>
        <th>Thời gian</th>
        <th>Địa điểm</th>
        <th>Ngày đăng kí</th>
        <th>Trạng thái</th>
        <th></th>
      </tr>
    );
  }

  bodyTable(o, index) {
    if (o != null)
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{o.classInfo.code}</td>
          <td>{o.classInfo.subject.code}</td>
          <td>{o.classInfo.subject.name}</td>
          <td>{o.classInfo.teacher.fullName}</td>
          <td>{o.classInfo.time}</td>
          <td>{o.classInfo.place.address}</td>
          <td>{o.createAt}</td>
          <td>{o.status}</td>
          <td>
            <div className="i" onClick={() => this.delete(o.id, index)}>
              <FontAwesomeIcon icon={faWindowClose} className="icon-red" />
            </div>
          </td>
        </tr>
      );
  }

  beforeTable() {
    return (
      <>
        <div className="registry">
          <div>
            <label>Mã Lớp</label>
          </div>
          <input
            name="codeClass"
            form="carform"
            type="text"
            onChange={(e) => this.changeData(e)}
          ></input>
          <button className="default-btn" onClick={() => this.addClass()}>
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
      <>
        {this.state.loading && <Loading></Loading>}
        <Head title={this.nameComponent}></Head>
        {this.beforeTable()}
        <div className="content">
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
          <ul className="pagination">{listPage}</ul>
        </div>
        {this.state.showModal ? (
          <div className="modal" style={{ display: "flex" }}>
            <div className="modal__overlay"></div>
            <div className="modal__body">{this.form()}</div>
          </div>
        ) : null}
      </>
    );
  }
}

export default connect(RegisterClass);
