import React from "react";
import Switch from "@material-ui/core/Switch";

export default function SwitchButton(props) {
  const { buttonState, setButton } = props;

  const handleChange = (event) => {
    setButton(!buttonState);
  };

  return (
    <div>
      <Switch
        onChange={() => handleChange()}
        color="primary"
        value="checkedB"
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </div>
  );
}
