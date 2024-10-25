import React, { useEffect, useState } from 'react';
import './App.css';


function XObutton ({value , clickSquare}){
  return (
    <button onClick={clickSquare} className="XObuton">{value}</button>
  );
}
// to check if there winner 
function checkWinner(board){
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];  // Return 'X' or 'O' (the winner)
    }
  }
  return null;  // No winner
};





function App() {
  const [valueGame ,  setValueGame] = useState(Array(9).fill(null)); // Array for xo in 9 Square
  const [nextPlayer , setNextplayer] = useState(true);
  let textGame; // for datils text like winner or next player 
  let winner = checkWinner(valueGame);



// Check the value of valuegame if all of them are null or not
  useEffect(()=>{
    const checkValues = valueGame.every(value=> value !== null);
    if(checkValues && !winner){
      const timer = setTimeout(playAgain , 400);
    }
  },[valueGame , winner]) // !  This Line will work when changes happen in value game or winner 

  // Play Again
  function playAgain(){
    setValueGame(Array(9).fill(null));
  }

  // Datils text function
  if(winner){
    textGame = "WINNER: " + winner;
  } else {
    textGame = "Next Player: " + (nextPlayer ? "X" : "O")
  }


  // Function to handle square
  function handleSquare(targetSquare){
    // Cope of array
    const copySquare = valueGame.slice();
        // Check if the squara have value or not || check if there winner 
        if(copySquare[targetSquare] || checkWinner(valueGame)){
          return;
        }
        //! if squara have value , this code will not work 


    // Check who is the next player 
    if(nextPlayer){
      copySquare[targetSquare] = "X";
    } else {
      copySquare[targetSquare] = "O";
    }
    setNextplayer(!nextPlayer);
    setValueGame(copySquare);

  }



  return (
    <div className='Container'>
      <div className='gameHead'>
      <div className='TEXT'>{textGame}</div>
      {/* Will appear if there winner */}
      {winner && <button onClick={playAgain} className='playAgainbutton'>Play Again</button>}
      </div>
      {/* XO GAME */}
      <div className="App">
      <div className="ContainerXO">
      <XObutton clickSquare={()=> handleSquare(0)} value={valueGame[0]}/>
      <XObutton clickSquare={()=> handleSquare(1)} value={valueGame[1]}/>
      <XObutton clickSquare={()=> handleSquare(2)} value={valueGame[2]}/>
      </div>
      <div className="ContainerXO">
      <XObutton clickSquare={()=> handleSquare(3)} value={valueGame[3]}/>
      <XObutton clickSquare={()=> handleSquare(4)} value={valueGame[4]}/>
      <XObutton clickSquare={()=> handleSquare(5)} value={valueGame[5]}/>
      </div>
      <div className="ContainerXO">
      <XObutton clickSquare={()=> handleSquare(6)} value={valueGame[6]}/>
      <XObutton clickSquare={()=> handleSquare(7)} value={valueGame[7]}/>
      <XObutton clickSquare={()=> handleSquare(8)} value={valueGame[8]}/>
      </div>
    </div>
    </div>
  );
}

export default App;
