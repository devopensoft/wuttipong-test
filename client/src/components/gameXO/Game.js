import React, { useState } from "react";
import Board from "./Board";

export default function Game(parentProps) {
  const [player1, setPlayer1] = useState(true);
  const [player2, setPlayer2] = useState(false);

  const handlePlayer1Turn = () => {
    setPlayer1(true);
    setPlayer2(false);
  };

  const handlePlayer2Turn = () => {
    setPlayer1(false);
    setPlayer2(true);
  };

  return (
    <div className="game">
      <p>{player1 ? parentProps.userName1 : parentProps.userName2} เล่น</p>
      <Board
        player1Turn={handlePlayer1Turn}
        player2Turn={handlePlayer2Turn}
        player1={player1}
        player2={player2}
        handleScore={parentProps.handleScore}
        endgame={parentProps.endgame}
      />
    </div>
  );
}
