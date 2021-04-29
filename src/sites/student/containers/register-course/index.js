import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import courseProvider from "@data-access/course-provider";
import registerCourseProvider from "@data-access/register-course-provider";
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

  const add = (code) => {
    courseProvider.search({ code: code }).then((json) => {
      if (json && json.code === 200 && json.data) {
        console.log(userApp.currentUser.full_name);
        const courseAdd = {
          student: {
            fullName: userApp.currentUser.full_name,
          },
          course: {
            code: json.data[0].code,
            name: json.data[0].name,
          },
          ...json.data[0],
          status: "Mới thêm",
        };
        setState({
          ...state,
          loading: false,
          dataRender: [courseAdd, ...state.dataRender],
        });
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };
  const registerCourse = () => {
    if (this.state.dataDetail.code === null)
      toast.warning("Mã khóa không để trống");
    else {
      var bodyRequest = JSON.stringify(this.state.dataDetail);
      fetch(this.api_create, {
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: this.state.token,
        },
        body: bodyRequest,
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.code === 200) {
            this.setState({
              ...this.state,
              loading: false,
              dataRender: [
                { ...json.data, status: "Mới thêm" },
                ...this.state.dataRender,
              ],
            });
            toast.success("Đăng ký thành công");
          } else {
            toast.error(json.message);
          }
          this.setState({ ...this.state, loading: false });
        });
    }
  };

  const handleAdd = (e) => {
    if (e.which === 13) {
      add(e.target.value);
      // add();
    } else console.log("handle: " + e.keyCode);
  };

  const child = (props) => {
    const { data, index } = props;
    return (
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
              <CloseCircleOutlined onClick={() => {}} className="icon-red" />
            </Tooltip>
          )}
        </td>
      </tr>
    );
  };
  return (
    <>
      <Head title="Danh mục môn học"></Head>
      <Loading loading={state.loading}></Loading>
      <div className="content">
        <div className="search">
          <div>
            <label>Tên khóa học</label>
            <input
              placeholder="Tên khóa học"
              onKeyDown={(e) => handleAdd(e)}
            ></input>
          </div>
          <div>
            <label>Cơ sở đào tạo</label>
            <input placeholder="Tên cơ sở đào tạo"></input>
          </div>
        </div>
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

export default RegisterCourse;
