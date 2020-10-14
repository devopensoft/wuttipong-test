import React, { useState } from "react";

export default function EndGame(parentProps) {
  const [tied] = useState("เสมอ !!");
  const [playerWin] = useState(parentProps.winner + " ชนะ !!`");

  const handleClick = () => {
    parentProps.endgame(false);
  };

  return (
    <div className="wrapper">
      <div className="screen">
        <p> {parentProps.winner === "Draw" ? tied : playerWin} </p>
        <button className="btn btn-primary" onClick={handleClick}>
          อยากลองอีกครั้งมั้ย?
        </button>
      </div>
    </div>
  );
}
