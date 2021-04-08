import {
  api_class,
  api_place,
  api_subject,
  api_user,
} from "@utils/API";
import BaseFormComponent from "@utils/BaseFormComponent";
import FormClass from "@components/form";

class ClassForm extends BaseFormComponent {
  constructor(props) {
    super(props);
    this.api_create = api_class;
    this.api_update = api_class + "/";
  }

  componentDidMount() {
    fetch(api_subject)
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
    fetch(api_place)
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
    fetch(api_user + "?role=2")
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
        <div style={{ flexBasis: "100%" }}>
          <div className="create_groups">
            <label>Môn</label>
            <select
              class="create_input select-type-product"
              name="subjectId"
              form="carform"
              onChange={(e) => this.setSelect(e.target.name, e.target.value)}
            >
              {this.state.subjects.map((subject, index) => {
                return <option value={subject.id}>{subject.name}</option>;
              })}
            </select>
            <label>Địa điểm</label>
            <select
              class="create_input select-type-product"
              name="placeId"
              form="carform"
              onChange={(e) => this.setSelect(e.target.name, e.target.value)}
            >
              {this.state.places.map((place, index) => {
                return <option value={place.id}>{place.address}</option>;
              })}
            </select>
            <label>Giáo viên</label>
            <select
              class="create_input select-type-product"
              name="teacherId"
              form="carform"
              onChange={(e) => this.setSelect(e.target.name, e.target.value)}
            >
              {this.state.teachers.map((teacher, index) => {
                return <option value={teacher.id}>{teacher.fullName}</option>;
              })}
            </select>
            <label>Thời gian</label>
            <select
              class="create_input select-type-product"
              name="time"
              form="carform"
              onChange={(e) => this.setSelect(e.target.name, e.target.value)}
            >
              <option value="6:00 - 8:00">6:00 - 8:00</option>
              <option value="8:00 - 10:00">8:00 - 10:00</option>
              <option value="10:00 - 12:00">13:00 - 15:00</option>
              <option value="13:00 - 15:00">13:00 - 15:00</option>
              <option value="15:00 - 17:00">13:00 - 15:00</option>
            </select>
            <label>Số lượng đăng kí</label>
            <input
              type="number"
              name="limitRegister"
              value={
                this.state.props.dataDetail != null
                  ? this.state.props.dataDetail.value
                  : ""
              }
              onChange={this.change.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
  render(){
    return(
      <FormClass></FormClass>
    )
  }
}

export default ClassForm;
