import React, { useState, Fragment } from "react";
import Scoreboard from "./gameXO/Scoreboard";
import Game from "./gameXO/Game";
import EndGame from "./gameXO/EndGame";
import "./GameXO.css";

export default function GameXO() {
  const [ties, setTies] = useState(0);
  const [userName1] = useState("คุณ");
  const [userName2] = useState("คอมพิวเตอร์");
  const [winner, setWinner] = useState("");
  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);
  const [showEndGame, setShowEndGame] = useState(false);

  const handleScore = (player) => {
    if (player === "player1") {
      setPlayer1(player1 + 1);
      setWinner(userName1);
    } else if (player === "player2") {
      setPlayer2(player2 + 1);
      setWinner(userName2);
    } else {
      setTies(ties + 1);
      setWinner("Draw");
    }
  };

  const handleEndGame = (input) => {
    setShowEndGame(input);
  };

  return (
    <Fragment>
      {showEndGame ? <EndGame winner={winner} endgame={handleEndGame} /> : null}
      <Scoreboard
        ties={ties}
        userName1={userName1}
        userName2={userName2}
        player1={player1}
        player2={player2}
      />
      <Game
        userName1={userName1}
        userName2={userName2}
        endgame={handleEndGame}
        handleScore={handleScore}
      />
    </Fragment>
  );
}