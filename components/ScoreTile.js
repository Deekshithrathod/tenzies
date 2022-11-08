import React from "react";

export default function ScoreTile(props) {
  const { rolls, time } = props.data;
  return (
    <div className="score-tile">
      <div>{props.rank}</div>
      <div>{rolls}</div>
      <div>
        {time}
        <sub>ms</sub>
      </div>
    </div>
  );
}
