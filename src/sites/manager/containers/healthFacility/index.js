import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import healthFacilityProvider from "@data-access/health-facility-provider";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Pagination from "@items/pagination";
import Tooltip from "@items/tooltip";
import "@items/style.scss";
import Table from "@items/table/Table";
import constants from "@src/resourses/const";
import { convertPrice, defaultState } from "@utils/common";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Input } from "reactstrap";
import HealthForm from "./health-facility-form.js";
import "./style.scss";

const HealthFacility = (props) => {
  const userApp = useSelector((state) => state.userApp);
  const [state, setState] = useState(defaultState);
  const [param, setParam] = useState({ page: 0, size: 10 });
  const timeout = useRef(null);

  const setPage = (value) => {
    setState({ ...state, page: value });
    console.log(state);
  };
  const setSize = (value) => {
    setState({ ...state, size: value, page: 0 });
  };
  const changeModal = (data, index) => {
    setState({
      ...state,
      showModal: !state.showModal,
      dataDetail: data,
      indexDetail: index,
    });
  };
  const search = (e) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setParam({ ...param, page: 0, [e.target.name]: e.target.value });
      clearTimeout(timeout);
    }, 500);
  };
  const create = (body) => {
    healthFacilityProvider.create(body).then((json) => {
      if (json && json.code === 200 && json.data) {
        const size =
          json.totalElements % state.size === 0
            ? parseInt(json.totalElements / state.size)
            : parseInt(json.totalElements / state.size) + 1;
        setState({
          ...state,
          loading: false,
          dataRender: [json.data, ...state.dataRender],
          role: userApp.currentUser.role,
          token: userApp.token,
          totalPage: size,
          totalElements: json.totalElements,
          showModal: false,
        });
        toast.success("Thêm thành công");
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };
  const update = (body, index) => {
    healthFacilityProvider.update(body, body.id).then((json) => {
      if (json && json.code === 200 && json.data) {
        var newData = Object.assign([], state.dataRender);
        newData[index] = json.data;
        setState({
          ...state,
          loading: false,
          dataRender: newData,
          showModal: false,
        });

        toast.success(json.message);
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };

  const handleDelete = (id) => {
    healthFacilityProvider.delete(id).then((json) => {
      console.log(json);
      if (json && json.code === 200) {
        toast.success("Xóa thành công");
        loadPage();
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };

  const fields = [
    "STT",
    "Tên cơ sở",
    "Địa chỉ",
    "Cấp cơ sở",
    "Người tạo",
    "Ngày tạo",
    "Người sửa",
    "Ngày sửa",
    "",
  ];

  const loadPage = () => {
    healthFacilityProvider.search(param).then((json) => {
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

  useEffect(() => {
    loadPage();
  }, [state.size, state.page, param]);

  const detail = (id) => {
    var newState = Object.assign({}, state);
    newState.isDetail = true;
    newState.idDetail = id;
    setState(newState);
  };

  return (
    <>
      <Head title="Danh mục cơ sở" changeModal={() => changeModal()}></Head>
      <Loading loading={state.loading}></Loading>
      <div className="content" style={{ fontSize: "15px" }}>
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th style={{ minWidth: "200px" }}>Tên cơ sở</th>
                <th style={{ minWidth: "200px" }}>Địa chỉ</th>
                <th style={{ minWidth: "200px" }}>Cấp cơ sở</th>
                <th style={{ minWidth: "200px" }}>Ngày tạo</th>
                <th style={{ minWidth: "200px" }}>Người tạo</th>
                <th style={{ minWidth: "200px" }}>Ngày sửa</th>
                <th style={{ minWidth: "200px" }}>Người sửa</th>
                <th style={{ minWidth: "100px" }}>Tiện ích</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <Input
                    placeholder="Tìm kiếm ..."
                    name="name"
                    onChange={(e) => search(e)}
                  ></Input>
                </td>
                <td>
                  <Input
                    placeholder="Tìm kiếm ..."
                    name="address"
                    onChange={(e) => search(e)}
                  ></Input>
                </td>
                <td>
                  {" "}
                  <Input
                    placeholder="Tìm kiếm ..."
                    name="level"
                    onChange={(e) => search(e)}
                  ></Input>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {state.dataRender &&
                state.dataRender.map((data, index) => (
                  <tr>
                    <td style={{ minWidth: "50px" }}>{index + 1}</td>
                    <td style={{ minWidth: "150px" }}>{data.name}</td>
                    <td style={{ minWidth: "150px" }}>{data.address}</td>
                    <td style={{ minWidth: "150px" }}>{data.level}</td>
                    <td style={{ minWidth: "150px" }}>{data.createdAt}</td>
                    <td style={{ minWidth: "100px" }}>{data.createdBy}</td>
                    <td style={{ minWidth: "150px" }}>{data.updatedAt}</td>
                    <td style={{ minWidth: "100px" }}>{data.updatedBy}</td>
                    {state.role !== constants.role.admin ? (
                      <td>
                        <div className="i" onClick={() => detail(data.id)}>
                          <EyeOutlined className="icon-green" />
                        </div>
                      </td>
                    ) : (
                      <td style={{ minWidth: "80px" }}>
                        <div
                          className="i"
                          onClick={() => changeModal(data, index)}
                        >
                          <Tooltip placement="top" tooltip="Sửa">
                            <EditOutlined className="icon-blue" />
                          </Tooltip>
                        </div>
                        <div
                          className="i"
                          onClick={() => handleDelete(data.id, index)}
                        >
                          <Tooltip placement="top" tooltip="Xóa">
                            <DeleteOutlined
                              icon={faTrashAlt}
                              className="icon-red"
                            />
                          </Tooltip>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPage={state.totalPage}
          totalElements={state.totalElements}
          page={state.page}
          size={state.size}
          changeSize={setSize}
          changePage={setPage}
        ></Pagination>
      </div>
      {state.showModal ? (
        <HealthForm
          title="khóa học"
          eventBack={() => changeModal()}
          create={create}
          update={update}
          data={state.dataDetail}
          index={state.indexDetail}
        />
      ) : null}
    </>
  );
};

export default HealthFacility;
