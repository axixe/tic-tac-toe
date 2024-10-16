import React, { useContext, useState, useEffect } from "react";
import { HeaderContext } from "../../context/HeaderContext";
import { Link } from "react-router-dom";
import './style.css';

import Header from "../../components/Header";
import GameField from "../../components/GameField";
import Button from '../../components/Button';

export default function SinglePlayer() {
    const { setHeaderData } = useContext(HeaderContext),
          [ time, setTime ] = useState(60),
          [ gameStatus, setGameStatus ] = useState({
            turn: null,
            matchResult: null,
            overtime: false,
            reset: false
          });

    // ВЫСТАВЛЕНИЕ ТАЙМЕРА ДЛЯ ХОДА В ЗАГОЛОВКЕ

    useEffect(() => {
        const { turn, matchResult } = gameStatus;

        if (!turn) {
            setTime(60)
            return;
        }

        const timerId = setInterval(() => {
            setTime(prevTime => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(timerId);
                    setGameStatus(prevState => ({
                        ...prevState,
                        matchResult: 'lost',
                        overtime: true
                    }));
                    return 0;
                }
            });
        }, 1000);

        if (matchResult !== 'pending') {
            clearInterval(timerId);
        }

        return () => clearInterval(timerId);
    }, [gameStatus, time]);

    useEffect(() => {
        const subtitle = gameStatus.matchResult === 'end' ? '' : gameStatus.turn === false ? 'THE ENEMY\'S MOVE' : `YOUR TURN: ${time} SEC`;

        setHeaderData({
            title: 'SINGLEPLAYER',
            subtitle
        })
    }, [time, setHeaderData, gameStatus]);

    function updateGameStatus(turn, result) {
        setGameStatus(prevState => ({
            turn: turn === undefined ? prevState.turn : turn,
            matchResult: result === undefined ? 'pending' : result
        }));
    };

    const handleResetClick = () => {
        resetGame();
    };

    function resetGame() {
        setGameStatus({
            turn: null,
            matchResult: null,
            overtime: false,
            reset: true
        });
    }    

    return (
        <>
            <Header />
            <GameField status={updateGameStatus} overtime={gameStatus.overtime} reset={gameStatus.reset} />
            <Button click={handleResetClick} btnName='PLAY AGAIN' pageClass='singleplayer-restart' disabled={!gameStatus.turn} />
            <Link to='/'>
                <button className='to-hub-button'>EXIT TO HUB</button>
            </Link>

            {/* <button>hello</button> */}
        </>
    )
}