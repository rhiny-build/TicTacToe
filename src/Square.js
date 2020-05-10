import React from "react";
import "./styles.css";

export function Square(props) {
  let styles = props.shouldHighlight ? "square win" : "square";
  return (
    <button className={styles} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// ========================================
