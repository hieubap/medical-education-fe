import { DeleteOutlined,EditOutlined } from "@ant-design/icons";
import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import courseProvider from "@data-access/course-provider";
import scheduleProvider from "@data-access/schedule-provider";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Pagination from "@items/pagination";
import "@items/style.scss";
import { defaultState } from "@utils/common";
import React,{ useEffect,useRef,useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import FormSchedule from "./form";
import "./style.scss";

const Schedule = (props) => {
  const userApp = useSelector((state) => state.userApp);
  const [state, setState] = useState({ ...defaultState, id: -1, loading: false });
  const [courses, setCourse] = useState([]);
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
      setState({ ...state, id: e.target.value, loading: true });
      clearTimeout(timeout);
    }, 500);
  };
  const create = (body) => {
    scheduleProvider.create(body).then((json) => {
      if (json && json.code === 200 && json.data) {
        const size =
          json.totalElements % state.size === 0
            ? parseInt(json.totalElements / state.size)
            : parseInt(json.totalElements / state.size) + 1;
        setState({
          ...state,
          loading: false,
          totalPage: size,
          totalElements: json.totalElements,
          showModal: false,
          dataRender: {
            ...state.dataRender,
            listSchedules: [...state.dataRender.listSchedules, json.data],
          },
        });
        toast.success("tạo mới thành công");
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };
  const update = (body, index) => {
    scheduleProvider.update(body, body.id).then((json) => {
      if (json && json.code === 200 && json.data) {
        var newData = Object.assign([], state.dataRender);
        newData.listSchedules[index] = json.data;

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
    scheduleProvider.delete(id).then((json) => {
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

  const loadPage = () => {
    courseProvider.detail(state.id).then((json) => {
      if (json && json.code === 200) {
        const size =
          json.totalElements % state.size === 0
            ? parseInt(json.totalElements / state.size)
            : parseInt(json.totalElements / state.size) + 1;
        setState({
          ...state,
          loading: false,
          dataRender: json.data,
          role: userApp.currentUser.role,
          totalPage: size,
          totalElements: json.totalElements,
        });
      }
    });
    // const param = {
    //   page: state.page,
    //   size: state.size,
    //   courseId: state.courseId,
    // };
    // scheduleProvider.search(param).then((json) => {
    //   if (json && json.code === 200 && json.data) {
    //     const size =
    //       json.totalElements % state.size === 0
    //         ? parseInt(json.totalElements / state.size)
    //         : parseInt(json.totalElements / state.size) + 1;
    //     setState({
    //       ...state,
    //       loading: false,
    //       dataRender: json.data,
    //       role: userApp.currentUser.role,
    //       token: userApp.token,
    //       totalPage: size,
    //       totalElements: json.totalElements,
    //     });
    //   } else if (json && json.code === 401) {
    //     window.location.href = "/login";
    //   } else {
    //     setState({ ...state, loading: false });
    //     toast.error(json.message);
    //   }
    // });
    courseProvider.search({ page: 0, size: 1000 }).then((json) => {
      if (json && json.code === 200 && json.data) {
        setCourse([{ id: "-1", name: "-- chọn khóa học --" }, ...json.data]);
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
  }, [state.size, state.page, state.id]);

  const detail = (id) => {
    var newState = Object.assign({}, state);
    newState.isDetail = true;
    newState.idDetail = id;
    setState(newState);
  };
  console.log(state);
  return (
    <>
      <Head title="Xếp lịch"></Head>
      <Loading loading={state.loading}></Loading>
      <div className="content schedule" style={{ fontSize: "15px" }}>
        <h3 title="Lịch học">Danh sách các môn</h3>
        <div className="search">
          <div>
            <label>Khóa học</label>
            <select
              placeholder="Chọn khóa học"
              name="name"
              onChange={(e) => search(e)}
            >
              {courses &&
                courses.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
            </select>
          </div>
        </div>
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã môn</th>
                <th>Tên môn</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {state.dataRender && state.dataRender.listSubject ? (
                state.dataRender.listSubject.map((data, index) => (
                  <tr>
                    <td style={{ minWidth: "80px" }}>{data.id}</td>
                    <td style={{ minWidth: "150px" }}>{data.code}</td>
                    <td style={{ minWidth: "200px" }}>{data.name}</td>
                    <td style={{ minWidth: "200px" }}>Chưa xếp lịch</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-data">
                    Không có dữ liệu. Vui lòng chọn khóa học
                  </td>
                </tr>
              )}
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
      <br></br>
      <div className="content schedule" style={{ fontSize: "15px" }}>
        <div>
          <Button
            className="default-btn"
            disabled={!state.dataRender}
            onClick={() => changeModal()}
          >
            Tạo lịch
          </Button>
          <h3 className="title">Lịch dạy</h3>
        </div>
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th style={{ minWidth: "3%" }}>STT</th>
                <th style={{ minWidth: "20%" }}>Mã môn</th>
                <th style={{ minWidth: "20%" }}>Tên môn</th>
                <th style={{ minWidth: "20%" }}>Thứ</th>
                <th style={{ minWidth: "20%" }}>Thời gian</th>
                <th style={{ minWidth: "20%" }}>Giảng viên</th>
                <th style={{ minWidth: "20%" }}>Địa điểm</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.dataRender && state.dataRender.listSchedules ? (
                state.dataRender.listSchedules.map((data, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data.subject.code}</td>
                    <td>{data.subject.name}</td>
                    <td>{data.day || ""}</td>
                    <td>{data.startTime + " - " + data.endTime}</td>
                    <td>{data.teacher || ""}</td>
                    <td>{data.place.address}</td>

                    <td>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-data">
                    Không có dữ liệu. Vui lòng chọn khóa học
                  </td>
                </tr>
              )}
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
        <FormSchedule
          title="lịch"
          eventBack={() => changeModal()}
          create={create}
          update={update}
          data={state.dataDetail}
          dataRender={state.dataRender}
          index={state.indexDetail}
          listSubject={state.dataRender.listSubject}
        />
      ) : null}
    </>
  );
};

export default Schedule;
