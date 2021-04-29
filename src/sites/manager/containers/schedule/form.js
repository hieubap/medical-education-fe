import Form from "@items/form";
import React, { useEffect, useState } from "react";
import courseProvider from "@data-access/course-provider";
import subjectProvider from "@data-access/subject-provider";
import userProvider from "@data-access/user-provider";

const FormSchedule = (props) => {
  const [state,setState] = useState({});

  useEffect(() => {
    subjectProvider.search({ page: 0, size: 1000 }).then((json) => {
      if (json && json.code === 200) {
        setState({...state,subject:[{}, ...json.data]});
      }
    });
    // courseProvider.detail(data.id).then((json) => {
    //   if (json && json.code === 200) {
    //     setState({...state,subject:[{}, ...json.data]});
    //   }
    // });
  }, []);

  const child = (props) => {
    const { change } = props;
    const data = props.data || { name: "", price: "" };

    let list = [];
    for (let i = 0; i < 100; i++) {
      list.push(<li>Môn học {i}</li>);
    }
    return (
      <div className="body-form">
        <div className="base-content">
          <div>
            <label>Khóa học</label>
            <label>Môn học</label>
            <label>Địa điểm</label>
            <label>Giảng viên</label>
            <label>Thứ</label>
            <label>Bắt đầu</label>
            <label>Kết thúc</label>
          </div>
          <div>
            <input
              name="healthFacilityId"
              type="text"
              value={data.healthFacilityId || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="subjectId"
              type="text"
              value={data.subjectId || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="address"
              type="text"
              value={data.address || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="teacher"
              type="text"
              value={data.teacher || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="day"
              type="text"
              value={data.day || ""}
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
            
          </div>
        </div>
      </div>
    );
  };
  return <Form bundle={props}>{child}</Form>;
};

export default FormSchedule;
