import { DeleteOutlined } from "@ant-design/icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import subjectProvider from "@data-access/subject-provider";
import courseProvider from "@data-access/course-provider";
import Form from "@items/form";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FormCourse = (props) => {
  const [data,setData] = useState(props.data || {});
  const [subjects, setSubjects] = useState([]);
  const [selects, setSelects] = useState(data.listSubject || []);
  const [subjectIds, setSubjectIds] = useState((data.listSubject && data.listSubject.map((item) => {return item.id})) || []);
  
  console.log(data);
  console.log(subjectIds);
  console.log(selects);
  
  useEffect(() => {
    subjectProvider.search({ page: 0, size: 1000 }).then((json) => {
      if (json && json.code === 200) {
        setSubjects([{}, ...json.data]);
      }
    });
    courseProvider.detail(data.id).then((json) => {
      if (json && json.code === 200) {
        setData(json.data);
        setSelects(json.data.listSubject);
        setSubjectIds(json.data.listSubject.map((item) => {return item.id}));
      }
    });
  }, []);

  const child = (props) => {
    const { change } = props;
    const data = props.data || { name: "", price: "" };

    const handleDelete = (index) => {
      let newSelects = Object.assign([],selects);
      subjectIds.splice(index,1);
      newSelects.splice(index,1);
      setSelects(newSelects);
      change("subjectIds",JSON.stringify(subjectIds));
    }

    let list = [];
    for (let i = 0; i< selects.length ; i++) {
      list.push(
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{i+1}</div>
          <div>{selects[i].name}</div>
          <div>{selects[i].code}</div>
          <div className="i" onClick={() => {handleDelete(i)}}>
            <FontAwesomeIcon icon={faTrashAlt} className="icon-red" />
          </div>
        </li>
      );
    }

    return (
      <div className="body-form course-form">
        <div className="head-info">
          <label>Thông tin</label>
        </div>
        <div className="head-subject">
          <label>Môn</label>
        </div>

        <div className="base-content">
          <div>
            <label>Tên khóa học</label>
            <label>Cơ sở đào tạo</label>
            <label>Khai giảng</label>
            <label>Kết thúc</label>
            <label>Học phí</label>
            <label>Số tín chỉ</label>
            <label>Giới hạn đăng ký</label>
          </div>
          <div>
            <input
              name="name"
              type="text"
              value={data.name || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="healthFacilityId"
              type="number"
              value={data.healthFacilityId || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="startTime"
              type="text"
              value={data.startTime || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="endTime"
              type="text"
              value={data.endTime || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="price"
              type="number"
              value={data.price || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="numberLesson"
              type="number"
              value={data.numberLesson || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="limitRegister"
              type="number"
              value={data.limitRegister || ""}
              onChange={(e) => change(e)}
            />
          </div>
        </div>

        <div className="subject">
          <div className="search">
            <label>Mã môn</label>
            <select
              type="text"
              onChange={(e) => {
                const value = JSON.parse(e.target.value);
                let add = true;
                for (let id of subjectIds) {
                  if (id === value.id) {
                    add = false;
                    toast.warn(
                      "môn '" + value.name + "' đã tồn tại trong khóa học"
                    );
                    break;
                  }
                }
                if (add) {
                  const newSubjectIds = [value.id,...subjectIds];
                  setSubjectIds(newSubjectIds);
                  setSelects([value,...selects]);
                  change("subjectIds", JSON.stringify(newSubjectIds));
                }
              }}
            >
              {subjects.map((obj) => {
                return <option value={JSON.stringify(obj)}>{obj.name}</option>;
              })}
            </select>
          </div>
          <div className="list">
            <ul>{list}</ul>
          </div>
        </div>
      </div>
    );
  };
  return <Form bundle={props}>{child}</Form>;
};

export default FormCourse;
