import React, { useState } from 'react';
import {calculateWinner} from '../../helpers';
import Board from './Board';
import './Style.css';

function Game() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setxIsNext] = useState(true);
    const winner = calculateWinner(board);
    const handleClick = (index) => {
        const boardCopy = [ ...board];
        if(winner || boardCopy[index]) return;
        boardCopy[index] = xIsNext ? "X" : "O";
        setBoard(boardCopy);
        setxIsNext(!xIsNext);
    };
    const handleResetGame = () => {
        setBoard(Array(9).fill(null));
    }
    return (
        <div>
            <Board cells={board} onClick={handleClick}></Board>
            {winner && <div className='game-winner'>
                Winner is {winner}
            </div>}
            
            <button className='game-resetgame' onClick={handleResetGame}>Lam Moi</button>
        </div>
    );
}

export default Game;