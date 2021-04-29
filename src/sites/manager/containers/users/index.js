import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LockOutlined,
} from "@ant-design/icons";
import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import userProvider from "@data-access/user-provider";
import {
  faCheckCircle,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "@items/pagination";
import "@items/style.scss";
import Table from "@items/table/Table";
import constants from "@src/resourses/const";
import { defaultState } from "@utils/common";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./style.scss";
import UserForm from "./user-form";

const User = (props) => {
  const userApp = useSelector((state) => state.userApp);
  const [state, setState] = useState(defaultState);
  const [param, setParam] = useState({ page: 0, size: 10 });
  const timeout = useRef(null);

  const setSize = (value) => {
    setParam({ ...param, size: value, page: 0 });
  };
  const setPage = (value) => {
    setParam({ ...param, page: value });
  };
  const changeModal = (data, index) => {
    setState({
      ...state,
      showModal: !state.showModal,
      dataDetail: data,
      indexDetail: index,
    });
  };
  const create = () => {};
  const update = () => {};
  const search = (e) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setParam({ ...param, page: 0, [e.target.name]: e.target.value });
      clearTimeout(timeout);
    }, 500);
  };

  useEffect(() => {
    loadPage();
    console.log("use effect");
  }, [state.page, state.size, param]);

  const fields = [
    "Stt",
    "ID",
    "Tên",
    "Tên đăng nhập",
    "Trạng thái",
    "Vai trò",
    "Giới tính",
    "Tuổi",
    "Địa chỉ",
    "SĐT",
    "Email",
    "Ngày tạo",
    "Ngày cập nhật",
    "",
  ];

  const loadPage = () => {
    userProvider.search(param).then((json) => {
      if (json && json.code === 200 && json.data) {
        const size =
          json.totalElements % param.size === 0
            ? parseInt(json.totalElements / param.size)
            : parseInt(json.totalElements / param.size) + 1;
        setState({
          ...state,
          loading: false,
          dataRender: json.data,
          role: userApp.currentUser.role,
          token: userApp.token,
          totalPage: size,
          totalElements: json.totalElements,
        });
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };

  const child = (props) => {
    const { data, index } = props;
    return (
      <tr>
        <td style={{minWidth:"50px"}}>{index + 1}</td>
        <td style={{minWidth:"50px"}}>{data.id}</td>
        <td style={{minWidth:"150px"}}>{data.fullName}</td>
        <td style={{minWidth:"150px"}}>{data.username}</td>
        <td>{data.status}</td>
        <td>{data.role}</td>
        <td>{data.gender}</td>
        <td>{data.age}</td>
        <td style={{minWidth:"150px"}}>{data.address}</td>
        <td style={{minWidth:"150px"}}>{data.phoneNumber}</td>
        <td style={{minWidth:"150px"}}>{data.email}</td>
        <td style={{minWidth:"250px"}}>{data.createAt}</td>
        <td style={{minWidth:"250px"}}>{data.updateAt}</td>
        <td style={{minWidth:"150px"}}>
          {data.idChange && (
            <div className="i">
              <CheckCircleOutlined
                icon={faCheckCircle}
                className="icon-yellow"
              />
            </div>
          )}
          <div className="i">
            <EyeOutlined icon={faEye} className="icon-green" />
          </div>
          <div className="i">
            <LockOutlined className="icon-mangeto" />
          </div>
          <div className="i" onClick={() => changeModal(data, index)}>
            <EditOutlined className="icon-blue" />
          </div>
          <div className="i">
            <DeleteOutlined icon={faTrashAlt} className="icon-red" />
          </div>
        </td>
      </tr>
    );
  };
  return (
    <>
      <Head title="Quản lý tài khoản" changeModal={changeModal}></Head>
      <Loading loading={state.loading}></Loading>
      <div className="content">
        <div className="search">
          <div>
            <label>Tên người dùng</label>
            <input name="fullName" onChange={(e) => search(e)}></input>
          </div>
          <div>
            <label>Tên đăng nhập</label>
            <input name="username" onChange={(e) => search(e)}></input>
          </div>
          <div>
            <label>Trạng thái</label>
            <input name="status" onChange={(e) => search(e)}></input>
          </div>
          <div>
            <label>Vai trò</label>
            <select name="roles" onChange={(e) => search(e)}>
              <option value={""}>TẤT CẢ</option>
              <option value={constants.roles.admin}>ADMIN</option>
              <option value={constants.roles.teacher}>GIẢNG VIÊN</option>
              <option value={constants.roles.student}>SINH VIÊN</option>
            </select>
          </div>
          <div>
            <label>Địa chỉ</label>
            <input name="address" onChange={(e) => search(e)}></input>
          </div>
        </div>
        <div>
          <Table fields={fields} data={state.dataRender}>
            {child}
          </Table>
        </div>
        <Pagination
          totalPage={state.totalPage}
          totalElements={state.totalElements}
          page={param.page}
          size={param.size}
          changeSize={setSize}
          changePage={setPage}
        ></Pagination>
      </div>
      {state.showModal && (
        <UserForm
          title="tài khoản"
          eventBack={() => changeModal()}
          create={create}
          update={update}
          data={param.dataDetail}
          index={param.indexDetail}
        ></UserForm>
      )}
    </>
  );
};

export default User;
