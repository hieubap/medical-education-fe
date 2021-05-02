import { Component } from "react";
import './style.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state={
        name:''
    }
  }
  render() {
    return (
      <div className="search">
        <input
          name="carlist"
          form="carform"
          type="text"
          placeholder="Tìm kiếm"
          onChange={(e) => {
            this.props.search(e.target.value);
            this.setState({ name: e.target.value });
          }}
        ></input>

        <button
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
