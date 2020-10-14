import React from "react";

export default function Scoreboard(parentProps) {
  const { player1, player2, ties, userName1, userName2 } = parentProps;

  return (
    <div className="navbar">
      <div className="statistics">
        <h2>
          {userName1} ชนะ {player1} ครั้ง
        </h2>
        <h2>
          {userName2} ชนะ {player2} ครั้ง
        </h2>
        <h2>เสมอ {ties} ครั้ง</h2>
      </div>
    </div>
  );
}
