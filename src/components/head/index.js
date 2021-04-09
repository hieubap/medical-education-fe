import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";

class Head extends Component {
  
  render() {
    return (
      <div className="head-body">
        <div>
          <FontAwesomeIcon
            icon={faDatabase}
            className="head-icon"
          ></FontAwesomeIcon>
        </div>

        <h2
          //   className="text-center head_tag"
          data-wow-duration="1s"
          data-wow-delay="0.1s"
        >
          {this.props.title}
        </h2>
        <div>

        </div>
      </div>
    );
  }
}

export default Head;
