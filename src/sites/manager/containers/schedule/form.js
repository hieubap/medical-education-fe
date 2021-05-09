import Form from "@items/form";
import React, { useEffect, useState } from "react";
import placeProvider from "@data-access/place-provider";
import subjectProvider from "@data-access/subject-provider";
import userProvider from "@data-access/user-provider";
import constants from "@src/resourses/const";
import { toast } from "react-toastify";
const FormSchedule = (props) => {
  const [state, setState] = useState({});
  const [teachers, setTeachers] = useState([]);
  const { data } = props || {};

  useEffect(() => {
    placeProvider.search({ page: 0, size: 1000 }).then((json) => {
      if (json && json.code === 200) {
        setState({
          ...state,
          places: [{ id: -1, address: "-- Chọn địa điểm --" }, ...json.data],
        });
      }
    });

    // getTeacher();
    // courseProvider.detail(data.id).then((json) => {
    //   if (json && json.code === 200) {
    //     setState({...state,subject:[{}, ...json.data]});
    //   }
    // });
  }, []);

  let init = true;
  const child = (props) => {
    const { change } = props;
    const { listSubject, dataRender } = props.bundle;
    const data = props.data || { name: "", price: "" };

    const getTeacher = (subjectId) => {
      change("subjectId", subjectId);
      userProvider
        .search({
          page: 0,
          size: 1000,
          subjectId,
          role: constants.roles.teacher.value,
        })
        .then((json) => {
          if (json && json.code === 200 && json.data) {
            setTeachers([
              { id: -1, fullName: "-- Chọn giảng viên --" },
              ...json.data,
            ]);
            if (json.data.length === 0)
              toast.error("Không có giảng viên nào dạy môn này");
          }
        });
    };

    console.log(data);
    if (init) {
      change("courseId", dataRender.id);
      init = false;
    }

    return (
      <div className="body-form">
        <div className="base-content">
          <div>
            <label>Môn học</label>
            <label>Địa điểm</label>
            <label>Giảng viên</label>
            <label>Thứ</label>
            <label>Thời gian</label>
          </div>
          <div>
            <select
              name="subjectId"
              type="text"
              value={data.subjectId || ""}
              onChange={(e) => getTeacher(e.target.value)}
            >
              {listSubject &&
                [{ id: -1, name: "-- Chọn Môn --" }, ...listSubject].map(
                  (data, index) => (
                    <option key={index} value={data.id}>
                      {" "}
                      {data.name}
                    </option>
                  )
                )}
            </select>
            <select
              name="placeId"
              type="text"
              value={data.placeId || ""}
              onChange={(e) => change(e)}
            >
              {state.places &&
                state.places.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.address}
                  </option>
                ))}
            </select>
            <select
              name="teacherId"
              value={data.teacherId || ""}
              onChange={(e) => change(e)}
            >
              {teachers.map((data, index) => (
                <option key={index} value={data.id}>
                  {data.fullName}
                </option>
              ))}
            </select>
            <select
              name="day"
              type="text"
              value={data.day || ""}
              onChange={(e) => change(e)}
              defaultValue={8}
            >
              <option value={-1}>-- Chọn ngày --</option>
              <option value={2}>Thứ 2</option>
              <option value={3}>Thứ 3</option>
              <option value={4}>Thứ 4</option>
              <option value={5}>Thứ 5</option>
              <option value={6}>Thứ 6</option>
              <option value={7}>Thứ 7</option>
              <option value={8}>Chủ nhật</option>
            </select>
            <select
              name="kipHoc"
              type="text"
              value={data.kipHoc || ""}
              onChange={(e) => change(e)}
            >
              <option value="">-- chọn thời gian --</option>
              <option value="1">07:00 - 09:00</option>
              <option value="2">09:00 - 11:00</option>
              <option value="3">12:00 - 15:00</option>
              <option value="4">15:00 - 17:00</option>
            </select>
          </div>
        </div>
      </div>
    );
  };
  return <Form bundle={props}>{child}</Form>;
};

export default FormSchedule;
