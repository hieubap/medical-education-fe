import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { useSelector } from "react-redux";

const Head = (props) => {
  const userApp = useSelector((state) => state.userApp);
  console.log(userApp);

  return (
    <div className="head-body">
      <div className="head-icon" style={{ flexBasis: "5%" }}>
        <FontAwesomeIcon
          icon={faDatabase}
          className="head-icon"
        ></FontAwesomeIcon>
      </div>

      <div className="h" style={{ flexBasis: "80%" }}>
        <h2
          //   className="text-center head_tag"
          data-wow-duration="1s"
          data-wow-delay="0.1s"
        >
          {props.title}
        </h2>
      </div>
      <div className="name" style={{ flexBasis: "10%" }}>{userApp.currentUser.full_name}</div>
      <div className="tab" style={{ flexBasis: "5%" }}>
        <img
          src={"http://localhost:8082/images/Logo.png"}
          style={{ width: "70px" }}
        ></img>
      </div>
    </div>
  );
};

export default Head;
