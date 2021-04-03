import { Component } from "react";

class Head extends Component {
  render() {
    return (
      <>
        {this.props.changeModel != null && (
          <button class="default-btn" onClick={() => this.props.changeModel()}>
            Thêm mới
          </button>
        )}

        <h2
          className=" text-center head_tag"
          data-wow-duration="1s"
          data-wow-delay="0.1s"
        >
          {this.props.title}
        </h2>
      </>
    );
  }
}

export default Head;
