import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import scheduleProvider from "@data-access/schedule-provider";
import { faEdit, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "@items/table/Table";
import Pagination from "@items/pagination";
import constants from "@src/resourses/const";
import { changeModal, convertPrice, defaultState } from "@utils/common";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./style.scss";
import "@items/style.scss";
import { Badge } from "reactstrap";
import Tooltip from "@items/tooltip";
import {
  EditOutlined,
  ScheduleOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const Student = (props) => {
  const userApp = useSelector((state) => state.userApp);
  const [state, setState] = useState(defaultState);

  const setSize = (value) => {
    setState({ ...state, size: value, page: 0 });
  };
  const setPage = (value) => {
    setState({ ...state, page: value });
  };
  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = () => {
    scheduleProvider
      .search({ page: state.page, size: state.size })
      .then((json) => {
        if (json && json.code === 200 && json.data) {
          const size =
            json.totalElements % state.size === 0
              ? parseInt(json.totalElements / state.size)
              : parseInt(json.totalElements / state.size) + 1;
          setState({
            ...state,
            loading: false,
            dataRender: json.data,
            role: userApp.currentUser.role,
            token: userApp.token,
            totalPage: size,
          });
        } else if (json && json.code === 401) {
          window.location.href = "/login";
        } else {
          setState({ ...state, loading: false });
          toast.error(json.message);
        }
      });
  };

  useEffect(() => {
    loadPage();
  }, [state.size, state.page]);

  return (
    <>
      <Head title="Danh mục lớp học"></Head>
      <Loading loading={state.loading}></Loading>
      <div className="content">
        <div className="search"></div>
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th style={{ minWidth: "150px" }}>STT</th>
                <th style={{ minWidth: "150px" }}>Mã sinh viên</th>
                <th style={{ minWidth: "150px" }}>Tên sinh viên</th>
                <th style={{ minWidth: "150px" }}>Điểm giữa kì</th>
                <th style={{ minWidth: "150px" }}>Điểm cuối</th>
                <th style={{ minWidth: "150px" }}>Tổng kết</th>
                <th style={{ minWidth: "180px", textAlign: "center" }}>
                  Trạng thái
                </th>
                <th style={{ minWidth: "100px" }}>Tiện ích</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {state.dataRender &&
                state.dataRender.map((data, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data.course && data.course.code}</td>
                    <td>{data.course && data.course.name}</td>
                    <td>{data.subject && data.subject.code}</td>
                    <td>{data.subject && data.subject.name}</td>
                    <td>{data.course && data.course.numberRegister}</td>
                    <td style={{ textAlign: "center" }}>
                      {data.course &&
                        ((data.course.status ===
                          constants.courseStatus.timeRegister.value && (
                          <Badge
                            color={constants.courseStatus.timeRegister.color}
                          >
                            {constants.courseStatus.timeRegister.name}
                          </Badge>
                        )) ||
                          (data.course.status ===
                            constants.courseStatus.studying.value && (
                            <Badge
                              color={constants.courseStatus.studying.color}
                            >
                              {constants.courseStatus.studying.name}
                            </Badge>
                          )) ||
                          (data.course.status ===
                            constants.courseStatus.done.value && (
                            <Badge color={constants.courseStatus.done.color}>
                              {constants.courseStatus.done.name}
                            </Badge>
                          )))}
                    </td>
                    <td>
                      <div
                        className="i"
                        onClick={() => changeModal(data, index)}
                      >
                        <Tooltip placement="top" tooltip="Danh sách lớp">
                          <TeamOutlined className="icon-green" />
                        </Tooltip>
                      </div>
                      <div
                        className="i"
                        onClick={() => changeModal(data, index)}
                      >
                        <Tooltip placement="top" tooltip="Điểm danh">
                          <ScheduleOutlined className="icon-yellow" />
                        </Tooltip>
                      </div>
                      <div
                        className="i"
                        onClick={() => changeModal(data, index)}
                      >
                        <Tooltip placement="top" tooltip="Nhập điểm">
                          <SolutionOutlined className="icon-blue" />
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPage={state.totalPage}
          page={state.page}
          size={state.size}
          changeSize={setSize}
          changePage={setPage}
        ></Pagination>
      </div>
    </>
  );
};

export default Student;
