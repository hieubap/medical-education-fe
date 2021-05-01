import Form from "@items/form";
import React, { useEffect, useState } from "react";
import placeProvider from "@data-access/place-provider";
import subjectProvider from "@data-access/subject-provider";
import userProvider from "@data-access/user-provider";

const FormSchedule = (props) => {
  const [state, setState] = useState({});

  useEffect(() => {
    placeProvider.search({ page: 0, size: 1000 }).then((json) => {
      if (json && json.code === 200) {
        setState({
          ...state,
          places: [{ id: -1, address: "-- Chọn địa điểm --" }, ...json.data],
        });
      }
    });

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
    
    console.log(data);
    if(init){
      change("courseId",dataRender.id);
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
            <label>Bắt đầu</label>
            <label>Kết thúc</label>
          </div>
          <div>
            <select
              name="subjectId"
              type="text"
              value={data.subjectId || ""}
              onChange={(e) => change(e)}
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
            <input
              name="teacher"
              type="text"
              value={data.teacher || ""}
              onChange={(e) => change(e)}
            />
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
