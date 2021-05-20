import React, { useState } from "react";

export default function Cell(props) {
  const x = props.x;
  const y = props.y;
  const [value, setValue] = useState(props.value);
  const edit = props.edit;

  function ChangeCell(e) {
    console.log(e);

    if (
      e.key === "Tab" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowLeft"
    ) {
      e.preventDefault();
    }

    if (e.key === "ArrowLeft" || (e.shiftKey && e.key === "Tab")) {
      props.clickHandler(x - 1, y);
    } else if (
      (e.key === "Tab" && e.shiftKey === false) ||
      e.key === "ArrowRight"
    ) {
      props.clickHandler(x + 1, y);
    } else if (e.key === "ArrowDown") {
      props.clickHandler(x, y + 1);
    } else if (e.key === "ArrowUp") {
      props.clickHandler(x, y - 1);
    }
  }

  return (
    <div
      onClick={() => {
        props.clickHandler(x, y);
      }}
    >
      {edit ? (
        <textarea
          autoFocus={true}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            props.changeHandler(x, y, value);
          }}
          placeholder="Enter some text..."
          onKeyDown={ChangeCell}
        ></textarea>
      ) : (
        <div>{value}</div>
      )}
    </div>
  );
}
