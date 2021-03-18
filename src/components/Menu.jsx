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
          onClick={() => this.setActive(0)}
        >
          Thống kê
        </button>
        <button
          id="m2"
          class={this.state.status[1]}
          onClick={() => this.setActive(1,'product')}
        >
          Khóa Học
        </button>
        <button
          id="m8"
          class={this.state.status[2]}
          onClick={() => this.setActive(2,'order')}
        >
          Kết Quả
        </button>
        <button
          id="m3"
          class={this.state.status[3]}
          onClick={() => this.setActive(3,'bill')}
        >
          Điểm danh
        </button>
        <button
          id="m4"
          class={this.state.status[4]}
          onClick={() => this.setActive(4,'notification')}
        >
          Thông báo
        </button>
        <button
          id="m5"
          class={this.state.status[5]}
          onClick={() => this.setActive(5,'store')}
        >
          Đăng ký
        </button>
        <button
          id="m6"
          class={this.state.status[6]}
          onClick={() => this.setActive(6,'type-product')}
        >
          Thông tin học viên
        </button>
        <button
          id="m7"
          class={this.state.status[7]}
          onClick={() => this.setActive(7,'evaluate')}
        >
          Thời Khóa Biểu
        </button>
        <button
          id="m9"
          class={this.state.status[8]}
          onClick={() => this.setActive(8)}
        >
          Quản lý Khóa học
        </button>
        <button
          id="m10"
          class={this.state.status[9]}
          onClick={() => this.setActive(9)}
        >
          Quản Lý Lớp
        </button>
        <button
          id="m11"
          class={this.state.status[10]}
          onClick={() => this.setActive(10)}
        >
          Đánh giá
        </button>
        <button
          id="m11"
          class={this.state.status[11]}
          onClick={() => this.setActive(11)}
        >
          Xếp hạng
        </button>
      </div>
    );
  }
}

export default Menu;
