import { api_class, api_place, api_subject, api_user } from "@utils/API";
import { BaseFormComponent, connect } from "@utils/BaseFormComponent";
import FormClass from "@components/form";

class ClassForm extends BaseFormComponent {
  constructor(props) {
    super(props);
    this.api_create = api_class;
    this.api_update = api_class + "/";
    console.log(this.state);
  }

  componentDidMount() {
    fetch(api_subject + "?size=1000", {
      headers: {
        "content-type": "application/json",
        Authorization: this.token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          this.setState({
            ...this.state,
            loading: false,
            subjects: json.data,
          });
        }
      });
    fetch(api_place + "?size=1000", {
      headers: {
        "content-type": "application/json",
        Authorization: this.token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          this.setState({
            ...this.state,
            loading: false,
            places: json.data,
          });
        }
      });
    fetch(api_user + "?role=2&size=1000", {
      headers: {
        "content-type": "application/json",
        Authorization: this.token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          this.setState({
            ...this.state,
            loading: false,
            teachers: json.data,
          });
        }
      });
  }

  element() {
    if (
      this.state.places == undefined ||
      this.state.subjects == undefined ||
      this.state.teachers == undefined
    )
      return "";

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="group-label">
          <label>Môn</label>
          <label>Địa điểm</label>
          <label>Giáo viên</label>
          <label>Thời gian</label>
          <label>Số lượng</label>
        </div>
        <div className="group-input">
          <select
            class="create_input select-type-product"
            name="subjectId"
            form="carform"
            value={this.state.dataDetail.subjectId}
            onChange={(e) => this.change(e)}
          >
            {this.state.subjects.map((subject, index) => {
              return <option value={subject.id}>{subject.name}</option>;
            })}
          </select>
          <select
            class="create_input select-type-product"
            name="placeId"
            form="carform"
            value={this.state.dataDetail.placeId}
            onChange={(e) => this.change(e)}
          >
            {this.state.places.map((place, index) => {
              return <option value={place.id}>{place.address}</option>;
            })}
          </select>
          <select
            class="create_input select-type-product"
            name="teacherId"
            form="carform"
            value={this.state.dataDetail.teacherId}
            onChange={(e) => this.change(e)}
          >
            {this.state.teachers.map((teacher, index) => {
              return <option value={teacher.id}>{teacher.fullName}</option>;
            })}
          </select>
          <select
            class="create_input select-type-product"
            name="time"
            form="carform"
            value={this.state.dataDetail.time}
            onChange={(e) => this.change(e)}
          >
            <option value="6:00 - 8:00">6:00 - 8:00</option>
            <option value="8:00 - 10:00">8:00 - 10:00</option>
            <option value="10:00 - 12:00">13:00 - 15:00</option>
            <option value="13:00 - 15:00">13:00 - 15:00</option>
            <option value="15:00 - 17:00">13:00 - 15:00</option>
          </select>
          <input
            type="number"
            name="limitRegister"
            value={
              this.state.dataDetail != null
                ? this.state.dataDetail.limitRegister
                : ""
            }
            onChange={this.change.bind(this)}
          />
        </div>
      </div>
    );
  }
  // render(){
  //   return(
  //     <FormClass></FormClass>
  //   )
  // }
}

export default connect(ClassForm);
