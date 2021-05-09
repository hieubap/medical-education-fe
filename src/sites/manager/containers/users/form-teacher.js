import Form from "@items/form";
import React, { useEffect, useState } from "react";
import { api_images } from "@utils/API";
import subjectProvider from "@data-access/subject-provider";
import userProvider from "@data-access/user-provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "@items/style.scss";
import { toast } from "react-toastify";

const FormUser = (props) => {
  const { change, eventBack, update } = props;
  const data = props.data || { name: "", price: "" };
  const [state, setState] = useState({ data: [] });

  useEffect(() => {
    subjectProvider.search({ page: 0, size: 999999 }).then((json) => {
      if (json && json.data && json.code === 200) {
        setState({
          ...state,
          subjects: [{ id: -1, name: "chọn môn" }, ...json.data],
        });
      }
    });
  }, []);

  const addSubject = (index) => {
    if (state.subjects[index].id === -1) {
      return;
    }
    for (let i of state.data) {
      if (i.id === state.subjects[index].id) {
        toast.info("môn học đã được chọn");
        return;
      }
    }
    let newData = Object.assign([], state.data);
    newData.push(state.subjects[index]);

    setState({ ...state, data: newData });
  };

  const handleDelete = (index) => {
    let newData = Object.assign([], state.data);
    newData.splice(index, 1);

    setState({ ...state, data: newData });
  };

  const submit = () => {
    userProvider.approveTeacher(data.id, state.data.map(data => data.id)).then((json) => {
      if (json && json.code === 200) {
        toast.success("Xác nhận quyền giáo viên cho tài khoản thành công");
      } else {
        toast.error("Xác nhận không thành công \n" + json.message);
      }
    });
  };
  return (
    <div className="modal" style={{ display: "flex", position: "fixed" }}>
      <div className="overlay" style={{ position: "fixed" }}></div>
      <div className="body">
        <div className="form-base">
          <div className="head-form">Chọn môn giảng dạy</div>
          <div className="body-form">
            <div className="base-content">
              <div className="label">
                <label>Họ tên</label>
                <label>Tên đăng nhập</label>
                <label>Chọn môn</label>
              </div>
              <div className="input">
                <label>{data.name}</label>
                <label>{data.username}</label>
                <select
                  name="subjectId"
                  onChange={(e) => addSubject(e.target.value)}
                >
                  {state.subjects &&
                    state.subjects.map((data, index) => (
                      <option key={index} value={index}>
                        {data.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className="list-subject">
            <label>Danh sách môn giảng dạy:</label>
            <div className="list">
              <ul>
                {state.data &&
                  state.data.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>{index + 1}</div>
                      <div className="name">{item.name}</div>
                      <div>{item.code}</div>
                      <div
                        className="i"
                        onClick={() => {
                          handleDelete(index);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="icon-red"
                        />
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="btn">
            <button className="default-btn" onClick={eventBack}>
              TRỞ LẠI
            </button>
            <button className="default-btn" onClick={(e) => {submit()}}>
              XÁC NHẬN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormUser;
