import React, { useEffect, useState } from "react";

export default function Board(parentProps) {
  const [boardValue] = useState(new Array(9).fill(""));
  const huPlayerValue = "X";
  const aiPlayerValue = "O";

  useEffect(() => {
    if (parentProps.player2) {
      setTimeout(() => {
        play(processAiMove());
      }, 1000);
    }
  }, [parentProps.player2]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = (clickIndex) => {
    const { player2, handleScore, endgame } = parentProps;

    if (!boardValue[clickIndex] && !player2) {
      play(clickIndex);
    }

    if (!boardValue.includes("")) {
      handleScore("ties");
      endgame(true);
      reset();
    }
  };

  const play = (clickIndex) => {
    const {
      player1,
      player2,
      player1Turn,
      player2Turn,
      handleScore,
      endgame,
    } = parentProps;
    if (player1) {
      boardValue[clickIndex] = huPlayerValue;
      player2Turn();
      if (isWinner(boardValue, huPlayerValue)) {
        handleScore("player1");
        endgame(true);
        reset();
      }
    }
    if (player2) {
      boardValue[clickIndex] = aiPlayerValue;
      player1Turn();
      if (isWinner(boardValue, aiPlayerValue)) {
        handleScore("player2");
        endgame(true);
        reset();
      }
    }
  };

  const processAiMove = () => {
    let bestMoveScore = 100;
    let moveIndex = null;

    for (var i = 0; i < boardValue.length; i++) {
      const currentBoardValue = boardValue;
      let newBoardValue = validMove(i, aiPlayerValue, currentBoardValue);
      if (newBoardValue) {
        const moveScore = maxScore(newBoardValue);
        if (moveScore < bestMoveScore) {
          bestMoveScore = moveScore;
          moveIndex = i;
        }
      }
    }
    return moveIndex;
  };

  const isWinner = (board, player) => {
    if (
      (board[0] === player && board[1] === player && board[2] === player) ||
      (board[3] === player && board[4] === player && board[5] === player) ||
      (board[6] === player && board[7] === player && board[8] === player) ||
      (board[0] === player && board[3] === player && board[6] === player) ||
      (board[1] === player && board[4] === player && board[7] === player) ||
      (board[2] === player && board[5] === player && board[8] === player) ||
      (board[0] === player && board[4] === player && board[8] === player) ||
      (board[2] === player && board[4] === player && board[6] === player)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const tie = (board) => {
    var moves = board.join("").replace(/ /g, "");
    if (moves.length === 9) {
      return true;
    }
    return false;
  };

  const copyBoard = (board) => {
    return board.slice(0);
  };

  const validMove = (move, player, board) => {
    var newBoard = copyBoard(board);
    if (newBoard[move] === "") {
      newBoard[move] = player;
      return newBoard;
    } else {
      return null;
    }
  };

  const maxScore = (board) => {
    if (isWinner(board, huPlayerValue)) {
      return 10;
    } else if (isWinner(board, aiPlayerValue)) {
      return -10;
    } else if (tie(board)) {
      return 0;
    } else {
      let bestMoveValue = -100;
      for (var i = 0; i < board.length; i++) {
        var newBoard = validMove(i, huPlayerValue, board);
        if (newBoard) {
          var predictedMoveValue = minScore(newBoard);
          if (predictedMoveValue > bestMoveValue) {
            bestMoveValue = predictedMoveValue;
          }
        }
      }
      return bestMoveValue;
    }
  };

  const minScore = (board) => {
    if (isWinner(board, huPlayerValue)) {
      return 10;
    } else if (isWinner(board, aiPlayerValue)) {
      return -10;
    } else if (tie(board)) {
      return 0;
    } else {
      var bestMoveValue = 100;
      for (var i = 0; i < board.length; i++) {
        var newBoard = validMove(i, aiPlayerValue, board);
        if (newBoard) {
          var predictedMoveValue = maxScore(newBoard);
          if (predictedMoveValue < bestMoveValue) {
            bestMoveValue = predictedMoveValue;
          }
        }
      }
      return bestMoveValue;
    }
  };

  const reset = () => {
    boardValue.fill("");
  };

  return (
    <div className="board">
      {boardValue.map((element, i) => {
        return (
          <div
            id={`tile${i}`}
            key={i}
            className="tile"
            onClick={() => handleClick(i)}
          >
            {boardValue[i]}
          </div>
        );
      })}
    </div>
  );
}
