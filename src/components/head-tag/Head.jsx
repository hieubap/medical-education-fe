import { Component } from "react";
import './style.scss';

class Head extends Component {
  render() {
    return (
      <div className="head-tag">
        {this.props.changeModel != null && (
          <button class="default-btn" onClick={() => this.props.changeModel()}>
            Thêm mới
          </button>
        )}

        <h2
          className="text-center head_tag"
          data-wow-duration="1s"
          data-wow-delay="0.1s"
        >
          {this.props.title}
        </h2>
      </div>
    );
  }
}

export default Head;