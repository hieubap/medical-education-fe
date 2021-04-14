import React, { Component } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { url_course_subject, api_subject } from "@utils/API.js";
import { api_course } from "../../../../utils/API";
import { connect } from "../../../../utils/BaseComponent";
import './style.scss';
class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      subjectId: 3,
      token: this.props.userApp.token,
    };
    console.log(this.state);
  }

  componentDidMount() {
    fetch(api_course + "/" + this.props.id,{
      headers:{
        "content-type": "application/json",
        Authorization: this.state.token,
      }
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          console.log("call api course detail");
          this.setState({
            ...this.state,
            data: json.data,
          });
          console.log(this.state.data);
        }
      });
    fetch(api_subject, {
      headers:{
        "content-type": "application/json",
        Authorization: this.state.token,
      }
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          console.log("call api course detail");
          this.setState({
            ...this.state,
            loading: false,
            subjects: json.data,
          });
        } else {
          toast.error(json.message);
        }
      });

    console.log("call api product");
  }

  setSelectSubject = (id) => {
    console.log(id);
    this.setState({ ...this.state, subjectId: id });
  };

  add = () => {
    fetch(url_course_subject, {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: this.state.token,
      },
      body: JSON.stringify({
        courseId: this.state.data.id,
        subjectId: this.state.subjectId,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          toast.success("add subject success");
          var subject = Object.assign([], this.state.data.listSubject);
          subject = [...subject, json.data.subject];
          this.setState({
            ...this.state,
            loading: false,
            data: { ...this.state.data, listSubject: subject },
          });
        } else {
          toast.error(json.message);
        }
      });
  };

  remove = (id, index) => {
    fetch(
      url_course_subject + "?courseId=" + this.props.id + "&subjectId=" + id,
      {
        method: "delete",
        headers: {
          "content-type": "application/json",
          Authorization: this.state.token,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          toast.success("delete subject success");
          var subject = Object.assign([], this.state.data.listSubject);
          console.log(subject);
          subject.splice(index, 1);
          console.log(subject);
          this.setState({
            ...this.state,
            loading: false,
            data: { ...this.state.data, listSubject: subject },
          });
        } else {
          toast.error(json.message);
        }
      });
  };

  render() {
    console.log("render");
    console.log(this.state.data);
    if (this.state.data == null || this.state.subjects == null)
      return <div className="loader" id="loader"></div>;
    else
      return (
        <div className="content detail-course">
          <button className="default-btn" onClick={() => this.props.back()}>
            Trở lại
          </button>

          <h2
            data-wow-duration="1s"
            data-wow-delay="0.1s"
          >
            Khóa học \ {this.state.data.name}
          </h2>

          <select
            className="create_input select-type-product"
            name="carlist"
            form="carform"
            onChange={(e) => this.setSelectSubject(e.target.value)}
          >
            {this.state.subjects.map((subject, index) => {
              return <option value={subject.id}>{subject.name}</option>;
            })}
          </select>
          <button className="default-btn" onClick={() => this.add()}>
            Thêm Môn
          </button>

          <div>
            <div>
              <table>
                <tr>
                  <td>Mã khóa học</td>
                  <td>{this.state.data.code}</td>
                </tr>
                <tr>
                  <td>Tên khóa học</td>
                  <td>{this.state.data.name}</td>
                </tr>
                <tr>
                  <td>Thời gian</td>
                  <td>{this.state.data.thoiGianHoc}</td>
                </tr>
                <tr>
                  <td>Số lượng đăng kí</td>
                  <td>1250</td>
                </tr>
              </table>
            </div>
            <div>
              <div>Các môn trong chương trình:</div>
              <table>
                <tbody>
                  <tr>
                    <th>stt</th>
                    <th>mã môn học</th>
                    <th>tên môn học</th>
                    <th>Thời gian học</th>
                    <th></th>
                  </tr>
                  {this.state.data.listSubject.map((subject, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{subject.code}</td>
                        <td>{subject.name}</td>
                        <td>{subject.id}</td>
                        <td>
                          <div
                            style={{ marginRight: "20px" }}
                            className="i"
                            onClick={() => this.remove(subject.id, index)}
                          >
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              className="icon-red"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
  }
}

export default connect(CourseDetail);
