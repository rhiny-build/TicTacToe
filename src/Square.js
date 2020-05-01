import React from "react";
import "./styles.css";

export function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// ========================================
