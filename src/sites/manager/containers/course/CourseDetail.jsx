import React, { Component } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  url_course_subject,
  token,
  api_subject,
  api_course_delete,
} from "@utils/API.js";
import { api_course } from "../../../../utils/API";

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      subjectId: 3,
    };
    console.log(this.state);
  }

  componentDidMount() {
    fetch(api_course + "/" + this.props.id)
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
    fetch(api_subject)
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
        Authorization: token,
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
          Authorization: token,
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
      return <div class="loader" id="loader"></div>;
    else
      return (
        <div>
          <button class="default-btn" onClick={() => this.props.back()}>
            Trở lại
          </button>

          <h2
            className=" text-center head_tag"
            data-wow-duration="1s"
            data-wow-delay="0.1s"
          >
            Khóa học \ {this.state.data.name}
          </h2>
          <select
            class="create_input select-type-product"
            name="carlist"
            form="carform"
            onChange={(e) => this.setSelectSubject(e.target.value)}
          >
            {this.state.subjects.map((subject, index) => {
              return <option value={subject.id}>{subject.name}</option>;
            })}
          </select>
          <button class="default-btn" onClick={() => this.add()}>
            Thêm Môn
          </button>

          <div style={{ width: "100%", display: "inline-flex" }}>
            <div style={{ backgroundColor: "#ddd", width: "50%" }}>
              <table>
                <tr>
                  <td>Mã khóa học</td>
                  <td>{this.state.data.id}</td>
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
            <div style={{ backgroundColor: "#ddd", width: "50%" }}>
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
                  {
                    (console.log(this.state.data != undefined),
                    console.log(this.state.data))
                  }
                  {this.state.data.listSubject.map((subject, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{subject.id}</td>
                        <td>{subject.name}</td>
                        <td>{subject.id}</td>
                        <td>
                          <button
                            style={{ marginRight: "20px" }}
                            class="but btn-red"
                            onClick={() => this.remove(subject.id, index)}
                          >
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              className="icon"
                            />
                          </button>
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

export default CourseDetail;
