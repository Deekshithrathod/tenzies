import React from "react";
import ScoreTile from "./ScoreTile";
import { nanoid } from "nanoid";

export default function ScoreBoard(props) {
  const topFive = props.topFive;
  const sbElements = topFive.map((el, index) => (
    <ScoreTile key={nanoid()} data={el} rank={index + 1} />
  ));
  // return <div className="score-board">{sbElements}</div>;
  return (
    <div className="score-board">
      <h1>Score Board</h1>
      <hr />
      <div className="score-tiles">{sbElements}</div>
    </div>
  );
}
