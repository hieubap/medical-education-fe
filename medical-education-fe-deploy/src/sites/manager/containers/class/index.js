import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import classProvider from "@data-access/class-provider";
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

const Class = (props) => {
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

  const fields = [
    "Stt",
    "Mã lớp",
    "Tên môn",
    "Mã môn",
    "Giảng viên",
    "Thời gian",
    "Địa điểm",
    "Số lượng đăng kí",
    "Trạng thái"
  ];

  const loadPage = () => {
    classProvider
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
  }, [state.size,state.page]);

  const child = (props) => {
    const { data, index } = props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{data.code}</td>
        <td>{data.subject.name}</td>
        <td>{data.subject.code}</td>
        <td>{data.teacher.fullName}</td>
        <td>{data.time}</td>
        <td>{data.place.address}</td>
        <td>
          {data.numberRegister}/{data.limitRegister}
        </td>
        <td>{data.status}</td>
      </tr>
    );
  };
  return (
    <>
      <Head title="Danh mục lớp học"></Head>
      <Loading loading={state.loading}></Loading>
      <div className="content">
        <div className="search"></div>
        <div>
          <Table fields={fields} data={state.dataRender}>
            {child}
          </Table>
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

export default Class;
