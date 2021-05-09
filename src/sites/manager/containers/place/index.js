import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import placeProvider from "@data-access/place-provider";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Pagination from "@items/pagination";
import "@items/style.scss";
import Table from "@items/table/Table";
import constants from "@src/resourses/const";
import { defaultState } from "@utils/common";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Input } from "reactstrap";
import PlaceForm from "./place-form.js";
import "./style.scss";
import Tooltip from "@items/tooltip";

const Place = (props) => {
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
    placeProvider.create(body).then((json) => {
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
    placeProvider.update(body, body.id).then((json) => {
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
    placeProvider.delete(id).then((json) => {
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

  const fields = ["STT", "Địa điểm", "Ngày tạo", "Ngày sửa", ""];

  const loadPage = () => {
    placeProvider.search(param).then((json) => {
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
      <Head title="Danh mục địa điểm" changeModal={() => changeModal()}></Head>
      <Loading loading={state.loading}></Loading>
      <div className="content" style={{ fontSize: "15px" }}>
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>STT</th>
                <th style={{ width: "30%" }}>Địa chỉ</th>
                <th style={{ width: "25%" }}>Ngày tạo</th>
                <th style={{ width: "25%" }}>Ngày cập nhật</th>
                <th style={{ width: "10%" }}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <Input
                    placeholder="Tìm kiếm"
                    name="address"
                    onChange={(e) => search(e)}
                  ></Input>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {state.dataRender &&
                state.dataRender.map((data, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data.address}</td>
                    <td>{data.createdAt}</td>
                    <td>{data.updatedAt}</td>

                    {state.role !== constants.role.admin ? (
                      <td>
                        <div className="i" onClick={() => detail(data.id)}>
                          <EyeOutlined className="icon-green" />
                        </div>
                      </td>
                    ) : (
                      <td>
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
        <PlaceForm
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

export default Place;
