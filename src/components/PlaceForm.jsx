import { api_place } from "./API.js";
import "react-toastify/dist/ReactToastify.css";
import BaseFormComponent from "./BaseFormComponent.jsx";

class PlaceForm extends BaseFormComponent {
  afterInit() {
    super.afterInit();
    this.api_create = api_place;
    this.api_update = api_place + "/";
    this.setState({isCreate:true,...this.state});
  }

  element() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flexBasis: "100%" }}>
          <div className="create_groups">
            <label>Địa điểm</label>
            <input
              type="text"
              name="address"
              value={
                this.state.props.param != null
                  ? this.state.props.param.value
                  : ""
              }
              onChange={this.change.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PlaceForm;
