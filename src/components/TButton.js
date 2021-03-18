import React, { useState } from "react";

function TButton() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading ? <h1>Loading ...</h1> : <h1>Test button</h1>}
      <button onClick={setLoading(true)}> click </button>
    </div>
  );
}

export default TButton;
