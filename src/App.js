import "./App.css";

import { Component } from "react";
import ManageAdmin from './components/ManageAdmin.jsx'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <ManageAdmin></ManageAdmin>
      </div>
    );
  }
}

export default App;
