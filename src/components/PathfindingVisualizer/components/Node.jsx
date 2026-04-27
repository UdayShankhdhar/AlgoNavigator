import React from "react";
import "../PathfindingVisualizer.css";

function Node({ node, onMouseDown, onMouseEnter, onMouseUp }) {
  const { row, col, isStart, isFinish, isWall } = node;
  let extraClassName = "";
  if (isStart) extraClassName = "node-start";
  else if (isFinish) extraClassName = "node-finish";
  else if (isWall) extraClassName = "node-wall";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
      role="button"
      tabIndex={0}
    />
  );
}

export default Node;
