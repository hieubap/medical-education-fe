import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api_class_register } from "@utils/API";
import Base from "@utils/common";
import React from "react";

const Schedule = (props) => {
  const headTable = () => {
    return (
      // <HeadTable props={}></HeadTable>
      <>
        <th>stt</th>
        <th>Thời gian</th>
        <th>Lớp</th>
        <th>Địa điểm</th>
        <th>Giảng viên</th>
      </>
    );
  };

  const bodyTable = (obj, index) => {
    return (
      <>
        <td>{index + 1}</td>
        <td>{obj.classInfo.time}</td>
        <td>{obj.classInfo.subject.name}</td>
        <td>{obj.classInfo.place.address}</td>
      </>
    );
  };
  const action = (obj, index) => {
    return (
      <td>
        <div class="i">
          <FontAwesomeIcon icon={faEye} className="icon-green" />
        </div>
      </td>
    );
  };

  return (
    <Base
      name="Lịch dạy"
      headTable={() => headTable()}
      bodyTable={(obj, index) => bodyTable(obj, index)}
      api={api_class_register}
      action={(obj, index) => action(obj, index)}
    ></Base>
  );
};

export default Schedule;
