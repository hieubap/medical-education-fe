import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
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
import { Badge, Input } from "reactstrap";
import "./style.scss";
import UserForm from "./user-form";
import Tooltip from "@items/tooltip";

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

  return (
    <>
      <Head title="Quản lý tài khoản" changeModal={changeModal}></Head>
      <Loading loading={state.loading}></Loading>
      <div className="content">
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th style={{ minWidth: "50px" }}>STT</th>
                <th style={{ minWidth: "100px" }}>ID</th>
                <th style={{ minWidth: "180px" }}>Họ tên</th>
                <th style={{ minWidth: "150px" }}>Tên đăng nhập</th>
                <th style={{ minWidth: "150px", textAlign: "center" }}>
                  Trạng thái
                </th>
                <th style={{ minWidth: "150px", textAlign: "center" }}>Loại</th>
                <th style={{ minWidth: "150px" }}>Giới tính</th>
                <th style={{ minWidth: "150px" }}>Tuổi</th>
                <th style={{ minWidth: "200px" }}>Địa chỉ</th>
                <th style={{ minWidth: "150px" }}>SĐT</th>
                <th style={{ minWidth: "150px" }}>Email</th>
                <th style={{ minWidth: "150px" }}>Ngày tạo</th>
                <th style={{ minWidth: "150px" }}>Ngày cập nhật</th>
                <th style={{ minWidth: "100px" }}>Tiện ích</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <Input
                    type="text"
                    name="id"
                    placeholder="Tìm kiếm ..."
                    onChange={(e) => search(e)}
                  ></Input>
                </td>
                <td>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Tìm kiếm ..."
                    onChange={(e) => search(e)}
                  ></Input>
                </td>
                <td>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Tìm kiếm ..."
                    onChange={(e) => search(e)}
                  ></Input>
                </td>
                <td>
                  <select
                    name="status"
                    placeholder="Tìm kiếm ..."
                    onChange={(e) => search(e)}
                  >
                    <option value="-1">Tất cả</option>
                    <option value="0">Hoạt động</option>
                    <option value="1">Khóa</option>
                  </select>
                </td>
                <td>
                  <select name="roles" onChange={(e) => search(e)}>
                    <option value={""}>TẤT CẢ</option>
                    <option value={constants.roles.admin.value}>ADMIN</option>
                    <option value={constants.roles.teacher.value}>
                      GIẢNG VIÊN
                    </option>
                    <option value={constants.roles.student.value}>
                      SINH VIÊN
                    </option>
                  </select>
                </td>
                <td>
                  {/* <select name="gender" onChange={(e) => search(e)}>
                    <option value={""}>TẤT CẢ</option>
                    <option value={"Nam"}>NAM</option>
                    <option value={"Nữ"}>NỮ</option>
                  </select> */}
                </td>
                <td>
                  <Input
                    type="number"
                    name="age"
                    placeholder="Tìm kiếm ..."
                    onChange={(e) => search(e)}
                  ></Input>
                </td>
                <td>
                  <Input
                    type="text"
                    name="address"
                    placeholder="Tìm kiếm ..."
                    onChange={(e) => search(e)}
                  ></Input>
                </td>
                <td>
                  <Input
                    type="text"
                    name="phoneNumber"
                    placeholder="Tìm kiếm ..."
                    onChange={(e) => search(e)}
                  ></Input>
                </td>
                <td>
                  <Input
                    type="text"
                    name="email"
                    placeholder="Tìm kiếm ..."
                    onChange={(e) => search(e)}
                  ></Input>
                </td>
              </tr>
              {state.dataRender &&
                state.dataRender.map((data, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data.id}</td>
                    <td>{data.fullName}</td>
                    <td>{data.username}</td>
                    <td style={{ textAlign: "center" }}>
                      {(data.status === 0 && (
                        <Badge color="success">Hoạt động</Badge>
                      )) ||
                        (data.status === 1 && (
                          <Badge color="danger">Khóa</Badge>
                        ))}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {(data.role === constants.roles.admin.value && (
                        <Badge color={constants.roles.admin.color}>
                          {constants.roles.admin.name}
                        </Badge>
                      )) ||
                        (data.role === constants.roles.teacher.value && (
                          <Badge color={constants.roles.teacher.color}>
                            {constants.roles.teacher.name}
                          </Badge>
                        )) ||
                        (data.role === constants.roles.student.value && (
                          <Badge color={constants.roles.student.color}>
                            {constants.roles.student.name}
                          </Badge>
                        ))}
                    </td>
                    <td>{data.gender}</td>
                    <td>{data.age}</td>
                    <td>{data.address}</td>
                    <td>{data.phoneNumber}</td>
                    <td>{data.email}</td>
                    <td>{data.createdAt}</td>
                    <td>{data.updatedAt}</td>
                    <td>
                      {data.idChange && (
                        <div className="i">
                          <CheckCircleOutlined
                            icon={faCheckCircle}
                            className="icon-yellow"
                          />
                        </div>
                      )}
                      <div className="i">
                        <Tooltip placement="top" tooltip="Chi tiết">
                          <EyeOutlined icon={faEye} className="icon-green" />
                        </Tooltip>
                      </div>
                      <div className="i">
                        {(data.status === 0 && (
                          <Tooltip placement="top" tooltip="Khóa">
                            <LockOutlined className="icon-mangeto" />
                          </Tooltip>
                        )) ||
                          (data.status === 1 && (
                            <Tooltip placement="top" tooltip="Khóa">
                              <UnlockOutlined className="icon-mangeto" />
                            </Tooltip>
                          ))}
                      </div>
                      <div
                        className="i"
                        onClick={() => changeModal(data, index)}
                      >
                        <Tooltip placement="top" tooltip="Sửa">
                          <EditOutlined className="icon-blue" />
                        </Tooltip>
                      </div>
                      <div className="i">
                        <Tooltip placement="top" tooltip="Xóa">
                          <DeleteOutlined
                            icon={faTrashAlt}
                            className="icon-red"
                          />
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* <Table fields={fields} data={state.dataRender}>
            {child}
          </Table> */}
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
