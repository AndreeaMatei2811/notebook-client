import React from "react";
import Switch from "@material-ui/core/Switch";

export default function SwitchButton(props) {
  const { setGraph, graphType } = props;
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setGraph(!graphType);
    setState({ ...state, [event.target.value]: event.target.checked });
  };

  return (
    <div>
      <Switch
        checked={state.checkedB}
        onChange={(e) => handleChange(e)}
        color="primary"
        value="checkedB"
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </div>
  );
}
