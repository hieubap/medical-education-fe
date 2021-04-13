import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Base from "@utils/common";
import { useSelector } from "react-redux";
import { api_class_register } from "@utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import HeadTable from '@components/head-table'

const Schedule = (props) => {
  const headTable = () => {
    return (
      // <HeadTable props={}></HeadTable>
      <>
        <th>stt</th>
        <th>Thời gian</th>
        <th>Lớp</th>
        <th>Địa điểm</th>
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

  const userApp = useSelector((state) => state.userApp);
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
