import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import subjectProvider from "@data-access/subject-provider";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Pagination from "@items/pagination";
import "@items/style.scss";
import constants from "@src/resourses/const";
import { defaultState } from "@utils/common";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Input } from "reactstrap";
import SubjectForm from "./subject-form";
import Tooltip from "@items/tooltip";

const Subject = (props) => {
  const userApp = useSelector((state) => state.userApp);
  const [state, setState] = useState(defaultState);
  const [param, setParam] = useState({ page: 0, size: 10 });
  const timeout = useRef(null);

  const setPage = (value) => {
    setState({ ...state, page: value });
  };
  const setSize = (value) => {
    setState({ ...state, size: value, page: 0 });
  };
  const changeModal = (data, index) => {
    setState({
      ...state,
      dataDetail: data,
      indexDetail: index,
      showModal: !state.showModal,
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
    subjectProvider.create(body).then((json) => {
      if (json && json.code === 200 && json.data) {
        setState({
          ...state,
          loading: false,
          dataRender: [json.data, ...state.dataRender],
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
  const update = (body, index) => {
    subjectProvider.update(body, body.id).then((json) => {
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
    subjectProvider.delete(id).then((json) => {
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

  useEffect(() => {
    loadPage();
  }, [state.page, state.size, param]);

  const loadPage = () => {
    subjectProvider.search(param).then((json) => {
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

  return (
    <>
      <Head title="Danh mục môn học" changeModal={changeModal}></Head>
      <Loading loading={state.loading}></Loading>
      <div className="content">
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th style={{ width: "10%" }}>Mã môn</th>
                <th style={{ width: "20%" }}>Tên môn</th>
                <th style={{ width: "20%" }}>Loại môn</th>
                <th style={{ width: "10%" }}>Số tiết</th>
                <th style={{ width: "15%" }}>Ngày tạo</th>
                <th style={{ width: "15%" }}>Ngày sửa</th>
                <th style={{ width: "10%" }}>Tiện ích</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <Input
                    placeholder="nhập mã môn"
                    name="code"
                    onChange={(e) => search(e)}
                  ></Input>
                </td>
                <td>
                  <Input
                    name="name"
                    placeholder="nhập tên môn"
                    onChange={(e) => search(e)}
                  ></Input>
                </td>
                <td></td>
                <td>
                  <Input
                    name="numberLesson"
                    type="number"
                    placeholder="Tìm kiếm ..."
                    onChange={(e) => search(e)}
                  ></Input>
                </td>
                <td></td>
              </tr>
              {state.dataRender &&
                state.dataRender.map((data, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data.code}</td>
                    <td>{data.name}</td>
                    <td>{data.type}</td>
                    <td>{data.lesson}</td>
                    <td>{data.createdAt}</td>
                    <td>{data.updatedAt}</td>
                    {state.role !== constants.role.admin ? (
                      <td></td>
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
      {state.showModal && (
        <SubjectForm
          title="môn học"
          eventBack={() => changeModal()}
          create={create}
          update={update}
          data={state.dataDetail}
          index={state.indexDetail}
        ></SubjectForm>
      )}
    </>
  );
};

export default Subject;
