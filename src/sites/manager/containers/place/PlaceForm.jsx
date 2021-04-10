import { api_place } from "@utils/API.js";
import "react-toastify/dist/ReactToastify.css";
import { BaseFormComponent, connect } from "@utils/BaseFormComponent";

class PlaceForm extends BaseFormComponent {
  afterInit() {
    super.afterInit();
    this.api_create = api_place;
    this.api_update = api_place + "/";
    this.title = "địa điểm";
  }

  element() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="group-label">
          <label>Địa điểm</label>
        </div>
        <div className="group-input">
          <input
            type="text"
            name="address"
            value={
              this.state.props.dataDetail != null
                ? this.state.props.dataDetail.value
                : ""
            }
            onChange={this.change.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default connect(PlaceForm);
