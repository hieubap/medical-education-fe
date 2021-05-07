import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import courseProvider from "@data-access/course-provider";
import registerCourseProvider from "@data-access/register-course-provider";
import healthFacilityProvider from "@data-access/health-facility-provider";
import Pagination from "@items/pagination";
import "@items/style.scss";
import Table from "@items/table/Table";
import constants from "@src/resourses/const";
import { defaultState } from "@utils/common";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./style.scss";

const RegisterCourse = (props) => {
  const userApp = useSelector((state) => state.userApp);
  const [state, setState] = useState(defaultState);
  const [body, setBody] = useState({});
  const [course, setCourse] = useState([]);
  const [healthFacility, setHealthFacility] = useState([]);

  const setPage = (value) => {
    setState({ ...state, page: value });
  };
  const setSize = (value) => {
    setState({ ...state, size: value, page: 0 });
  };

  const fields = [
    "STT",
    "Ngày đăng ký",
    "Tên sinh viên",
    "Mã khóa học",
    "Khóa đăng ký",
    "Số tiết",
    "Trạng thái",
    "",
  ];

  useEffect(() => {
    loadPage();
  }, [state.page, state.size]);

  const getCourse = (id) => {
    courseProvider
      .search({ page: 0, size: 999999, healthFacilityId: id })
      .then((json) => {
        if (json && json.code === 200 && json.data) {
          setCourse([{ id: -1, name: "-- chọn khóa học --" }, ...json.data]);
        }
      });
  };

  const loadPage = () => {
    registerCourseProvider
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
            totalPage: size,
          });
        } else if (json && json.code === 401) {
          window.location.href = "/login";
        } else {
          setState({ ...state, loading: false });
          toast.error(json.message);
        }
      });
    healthFacilityProvider.search({ page: 0, size: 999999 }).then((json) => {
      if (json && json.code === 200 && json.data) {
        setHealthFacility([
          { id: -1, name: "-- chọn cơ sở y tế --" },
          ...json.data,
        ]);
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };
  const registerCourse = () => {
    if (course.length < 2) {
      toast.info("Vui lòng chọn cơ sở y tế");
    } else if (!body.courseId) {
      toast.info("Vui lòng chọn khóa học");
    } else {
      registerCourseProvider.register(body).then((json) => {
        if (json.code === 200) {
          setState({
            ...state,
            dataRender: [
              { ...json.data, status: "Mới thêm" },
              ...state.dataRender,
            ],
          });
          toast.success("Đăng ký thành công");
        } else {
          toast.error(json.message);
        }
      });
    }
  };
  const cancelRegister = (id, index) => {
    registerCourseProvider.delete(id).then((json) => {
      if (json.code === 200) {
        let newData = Object.assign([], state.dataRender);
        newData.splice(index, 1);

        setState({
          ...state,
          dataRender: newData,
        });
        toast.success("Hủy thành công");
      } else {
        toast.error(json.message);
      }
    });
  };

  return (
    <>
      <Head title="Đăng ký khóa học"></Head>
      <Loading loading={state.loading}></Loading>
      <div className="content register">
        <div className="search">
          <div>
            <label>Cơ sở đào tạo</label>
            <select
              placeholder="Chọn cơ sở"
              onChange={(e) => getCourse(e.target.value)}
            >
              {healthFacility.map((data, index) => (
                <option key={index} value={data.id}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Tên khóa học</label>
            <select
              name="code"
              placeholder="Tên khóa học"
              onChange={(e) => setBody({ ...body, courseId: e.target.value })}
            >
              {course &&
                course.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.name}
                  </option>
                ))}
            </select>
          </div>
          <button className="default-btn" onClick={() => registerCourse()}>
            Đăng ký
          </button>
        </div>
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th style={{ minWidth: "50px" }}>STT</th>
                <th style={{ minWidth: "180px" }}>Ngày đăng ký</th>
                <th style={{ minWidth: "180px" }}>Tên sinh viên</th>
                <th style={{ minWidth: "180px" }}>Mã khóa học</th>
                <th style={{ minWidth: "180px" }}>Khóa đăng ký</th>
                <th style={{ minWidth: "180px" }}>Số tiết</th>
                <th style={{ minWidth: "180px" }}>Trạng thái</th>
                <th style={{ minWidth: "80px" }}>Tiện ích</th>
              </tr>
            </thead>
            <tbody>
              {state.dataRender &&
                state.dataRender.map((data, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data.createAt}</td>
                    <td>{data.student.fullName}</td>
                    <td>{data.course.code}</td>
                    <td>{data.course.name}</td>
                    <td></td>
                    <td>{data.status}</td>
                    <td style={{ textAlign: "center" }}>
                      {data.status === constants.courseRegister.status.new ? (
                        <div className="i">
                          <Tooltip title="hủy đăng ký" visible={true}>
                            <CheckCircleOutlined
                            // onClick={() => {}}
                            // className="icon-yellow"
                            />
                          </Tooltip>
                        </div>
                      ) : (
                        <Tooltip title="hủy đăng ký">
                          <CloseCircleOutlined
                            onClick={() => cancelRegister(data.id, index)}
                            className="icon-red"
                          />
                        </Tooltip>
                      )}
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
          page={state.page}
          size={state.size}
          changeSize={setSize}
          changePage={setPage}
        ></Pagination>
      </div>
    </>
  );
};

export default RegisterCourse;
