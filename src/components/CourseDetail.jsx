import React, { Component } from "react";
import UniqueId from "react-html-id";
import { api_course, api_course_delete, api_course_update, token } from "./API.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./../CSS/manageAdmin.css";
import "./../CSS/base.css";
import "./../CSS/grid.css";
import "./../CSS/responsive.css";

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data:{}
    };
    console.log(this.state);
  }

  componentDidMount() {
    fetch(api_course+"?id="+this.props.id)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          loading: false,
          data: json.data[0]
        });
      });

    console.log("call api product");
  }

  render() {
    return (<div>
        <div>
            tên khóa học            
        </div>
        <div>
            Thời gian học            
        </div>
        <div>
            Số lượng người đã đăng kí
        </div>
        <div>
            Xếp hạng
        </div>
        <div>
            Các môn trong chương trình:

        </div>
    </div>
    );
  }
}

export default CourseDetail;
