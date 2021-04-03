import { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state={
        name:''
    }
  }
  render() {
    return (
      <div style={{ display: "flex" }}>
        <label style={{ textAlign: "center", width: "8%", padding: "20px 0" }}>
          Tìm kiếm
        </label>
        <input
          class="create_input select-type-product"
          name="carlist"
          form="carform"
          type="text"
          onChange={(e) => {
            this.props.search(e.target.value);
            this.setState({ name: e.target.value });
          }}
        ></input>

        <button
          style={{ marginLeft: "5%" }}
          className="default-btn"
          onClick={() => this.props.search(this.state.name)}
        >
          Tìm kiếm
        </button>
      </div>
    );
  }
}
export default Search;
