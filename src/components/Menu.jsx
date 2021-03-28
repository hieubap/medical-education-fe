import React, { Component } from "react";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [
        "bar",
        "bar active",
        "bar",
        "bar",
        "bar",
        "bar",
        "bar",
        "bar",
        "bar",
        "bar",
        "bar",
        "bar"
      ],
    };
  }

  setActive = (index,component) => {
    this.props.event(component);
    var newState = Object.assign({}, this.state);
    newState.status.fill("bar");
    newState.status[index] = "bar active";
    console.log(newState);
    this.setState(newState);
  };

  render() {
    return (
      <div class="menu">
        <div class="head-menu">Menu</div>
        <button
          id="m1"
          class={this.state.status[0]}
          onClick={() => this.setActive(0,'chart')}
        >
          Thống kê
        </button>
        <button
          id="m2"
          class={this.state.status[1]}
          onClick={() => this.setActive(1,'course')}
        >
          Quản lý khóa học
        </button>
        <button
          id="m8"
          class={this.state.status[2]}
          onClick={() => this.setActive(2,'subject')}
        >
          Quản lý môn học
        </button>
        <button
          id="m5"
          class={this.state.status[5]}
          onClick={() => this.setActive(5,'room')}
        >
          Quản lý lớp
        </button>
        <button
          id="m7"
          class={this.state.status[7]}
          onClick={() => this.setActive(7,'infrastructure')}
        >
          Quản lý địa điểm
        </button>
        <button
          id="m3"
          class={this.state.status[3]}
          onClick={() => this.setActive(3,'student')}
        >
          Quản lý học viên
        </button>
        <button
          id="m9"
          class={this.state.status[8]}
          onClick={() => this.setActive(8,'order')}
        >
          Đăng ký
        </button>

        <button
          id="m4"
          class={this.state.status[4]}
          onClick={() => this.setActive(4,'schedule')}
        >
          Lịch
        </button>
        <button
          id="m6"
          class={this.state.status[6]}
          onClick={() => this.setActive(6,'history')}
        >
          Kết quả học tập
        </button>
        <button
          id="m10"
          class={this.state.status[9]}
          onClick={() => this.setActive(9,'user')}
        >
          Quản Lý Tài khoản
        </button>
        <button
          id="m11"
          class={this.state.status[10]}
          onClick={() => this.setActive(10,'feedback')}
        >
          Phản hồi
        </button>
        <button
          id="m11"
          class={this.state.status[11]}
          onClick={() => this.setActive(11,'notification')}
        >
          Thông báo
        </button>
      </div>
    );
  }
}

export default Menu;
