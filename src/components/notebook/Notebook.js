import React from "react";

export default function Notebook(props) {
  return (
    <div>
      <h4>Name:</h4>
      <div>{props.name}</div>
    </div>
  );
}
