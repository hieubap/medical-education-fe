import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import courseProvider from "@data-access/course-provider";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Pagination from "@items/pagination";
import "@items/style.scss";
import Table from "@items/table/Table";
import constants from "@src/resourses/const";
import { convertPrice, defaultState } from "@utils/common";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Input } from "reactstrap";
import CourseForm from "./course-form.js";
import "./style.scss";

const Course = (props) => {
  const userApp = useSelector((state) => state.userApp);
  const [state, setState] = useState(defaultState);
  const [param, setParam] = useState({ page: 0, size: 10 });
  const timeout = useRef(null);

  const setPage = (value) => {
    setState({ ...state, page: value });
    setParam({ ...param, page: value });
    console.log(state);
  };
  const setSize = (value) => {
    setState({ ...state, size: value, page: 0 });
    setParam({ ...param, size: value, page: 0 });
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
    courseProvider.create(body).then((json) => {
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
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };
  const update = (body, index) => {
    courseProvider.update(body, body.id).then((json) => {
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
    courseProvider.delete(id).then((json) => {
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
    "ID",
    "Mã khóa học",
    "Tên khóa học",
    "Cơ sở đào tạo",
    "Người tạo",
    "Giá",
    "Số lượng đăng kí",
    "Giới hạn đăng kí",
    "Số tiết",
    "Trạng thái",
    "",
  ];

  const loadPage = () => {
    courseProvider.search(param).then((json) => {
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

  const child = (props) => {
    const { data, index } = props;

    return (
      <tr>
        <td style={{ minWidth: "80px" }}>{data.id}</td>
        <td style={{ minWidth: "150px" }}>{data.code}</td>
        <td style={{ minWidth: "200px" }}>{data.name}</td>
        <td style={{ minWidth: "300px" }}>
          {data.healthFacility && data.healthFacility.name}
        </td>
        <td style={{ minWidth: "150px" }}>
          {data.userCreated && data.userCreated.fullName}
        </td>
        <td style={{ minWidth: "150px" }}>{convertPrice(data.price)}</td>
        <td style={{ minWidth: "150px" }}>
          {data.numberRegister
            ? data.numberRegister
            : "0/" + (data.limitRegister || 0)}
        </td>
        <td style={{ minWidth: "150px" }}>{data.limitRegister}</td>
        <td style={{ minWidth: "150px" }}>{data.numberLesson}</td>
        <td style={{ minWidth: "150px" }}>{data.status}</td>
        {state.role !== constants.role.admin ? (
          <td>
            <div className="i" onClick={() => detail(data.id)}>
              <EyeOutlined className="icon-green" />
            </div>
          </td>
        ) : (
          <td style={{ minWidth: "100px" }}>
            <div className="i" onClick={() => detail(data.id)}>
              <EyeOutlined className="icon-green" />
            </div>
            <div className="i" onClick={() => changeModal(data, index)}>
              <EditOutlined className="icon-blue" />
            </div>
            <div className="i" onClick={() => handleDelete(data.id, index)}>
              <DeleteOutlined icon={faTrashAlt} className="icon-red" />
            </div>
          </td>
        )}
      </tr>
    );
  };

  return (
    <>
      {state.role !== constants.role.admin ? (
        <Head title="Danh mục khóa học"></Head>
      ) : (
        <Head
          title="Danh mục khóa học"
          changeModal={() => changeModal()}
        ></Head>
      )}

      <Loading loading={state.loading}></Loading>
      <div className="content" style={{ fontSize: "15px" }}>
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th style={{ minWidth: "150px" }}>Mã khóa học</th>
                <th style={{ minWidth: "220px" }}>Tên khóa học</th>
                <th style={{ minWidth: "220px" }}>Cơ sở đào tạo</th>
                <th style={{ minWidth: "150px" }}>Người tạo</th>
                <th style={{ minWidth: "150px" }}>Học phí</th>
                <th style={{ minWidth: "150px" }}>Số lượng đăng ký</th>
                <th style={{ minWidth: "150px" }}>Giới hạn đăng ký</th>
                <th style={{ minWidth: "150px" }}>Số tiết</th>
                <th style={{ minWidth: "150px" }}>Trạng thái</th>
                <th style={{ minWidth: "120px" }}>Tiện ích</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <Input
                    placeholder="Tên khóa học"
                    name="name"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => search(e)}
                  ></Input>
                </td>
                <td>
                  <Input
                    placeholder="Tên cơ sở"
                    name="nameFacility"
                    onChange={(e) => search(e)}
                  ></Input>
                </td>
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
                    <td>{data.id}</td>
                    <td>{data.code}</td>
                    <td>{data.name}</td>
                    <td>{data.healthFacility && data.healthFacility.name}</td>
                    <td>{data.userCreated && data.userCreated.fullName}</td>
                    <td>{convertPrice(data.price)}</td>
                    <td>
                      {data.numberRegister
                        ? data.numberRegister
                        : "0/" + (data.limitRegister || 0)}
                    </td>
                    <td>{data.limitRegister}</td>
                    <td>{data.numberLesson}</td>
                    <td>{data.status}</td>
                    {state.role !== constants.role.admin ? (
                      <td>
                        <div className="i" onClick={() => detail(data.id)}>
                          <EyeOutlined className="icon-green" />
                        </div>
                      </td>
                    ) : (
                      <td>
                        <div className="i" onClick={() => detail(data.id)}>
                          <EyeOutlined className="icon-green" />
                        </div>
                        <div
                          className="i"
                          onClick={() => changeModal(data, index)}
                        >
                          <EditOutlined className="icon-blue" />
                        </div>
                        <div
                          className="i"
                          onClick={() => handleDelete(data.id, index)}
                        >
                          <DeleteOutlined
                            icon={faTrashAlt}
                            className="icon-red"
                          />
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
        <CourseForm
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

export default Course;
