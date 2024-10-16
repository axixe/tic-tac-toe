import React, { Component } from "react";
import './style.css';

export default class GameField extends Component {
    state = {
        turn: true,
        matchResult: null,
        win: null,
        board: Array(9).fill('free')
    }

    handleClick = (index) => {
        const { turn, matchResult, board } = this.state;

        if (!turn || board[index] !== 'free' || matchResult !== 'pending') return;

        const newBoard = [...board];
        newBoard[index] = 'ex';

        this.setState({
            turn: false,
            board: newBoard
        }, () => {
            this.props.status(this.state.turn);
            this.checkGameResult();
            if (this.state.matchResult === 'pending') {
                setTimeout(this.makeBotMove, 500);
            }
        });
    }

    makeBotMove = () => {
        const { matchResult, board } = this.state;
    
        if (matchResult !== 'pending') return;
    
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
    
        const evaluate = (board) => {
            for (let pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (board[a] === 'oh' && board[b] === 'oh' && board[c] === 'oh') return 10;
                if (board[a] === 'ex' && board[b] === 'ex' && board[c] === 'ex') return -10;
            }
            return 0;
        };
    
        const findImmediateWin = (newBoard, player) => {
            for (let pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (newBoard[a] === player && newBoard[b] === player && newBoard[c] === 'free') return c;
                if (newBoard[a] === player && newBoard[c] === player && newBoard[b] === 'free') return b;
                if (newBoard[b] === player && newBoard[c] === player && newBoard[a] === 'free') return a;
            }
            return null;
        };
    
        let botMove = findImmediateWin(board, 'oh');
        if (botMove === null) {
            botMove = findImmediateWin(board, 'ex');
        }
        if (botMove === null) {
            
            const minimax = (newBoard, isMaximizing) => {
                const score = evaluate(newBoard);
                if (score === 10) return score;
                if (score === -10) return score;
                if (!newBoard.includes('free')) return 0;
    
                if (isMaximizing) {
                    let best = -Infinity;
                    for (let i = 0; i < 9; i++) {
                        if (newBoard[i] === 'free') {
                            newBoard[i] = 'oh';
                            best = Math.max(best, minimax(newBoard, false));
                            newBoard[i] = 'free';
                        }
                    }
                    return best;
                } else {
                    let best = Infinity;
                    for (let i = 0; i < 9; i++) {
                        if (newBoard[i] === 'free') {
                            newBoard[i] = 'ex';
                            best = Math.min(best, minimax(newBoard, true));
                            newBoard[i] = 'free';
                        }
                    }
                    return best;
                }
            };
    
            const findBestMove = (board) => {
                let bestVal = -Infinity;
                let bestMove = -1;
    
                for (let i = 0; i < 9; i++) {
                    if (board[i] === 'free') {
                        board[i] = 'oh';
                        const moveVal = minimax(board, false);
                        board[i] = 'free';
    
                        if (moveVal > bestVal) {
                            bestMove = i;
                            bestVal = moveVal;
                        }
                    }
                }
                return bestMove;
            };
    
            botMove = findBestMove(board);
        }
    
        if (botMove !== null) {
            const newBoard = [...board];
            newBoard[botMove] = 'oh';
    
            this.setState({
                turn: true,
                board: newBoard
            }, () => {
                this.props.status(this.state.turn);
                this.checkGameResult();
            });
        }
    }
      

    checkGameResult = () => {
        const { board } = this.state,
            winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
    
        let matchResult = null;
        let win = null;
    
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
    
            if (board[a] === 'ex' && board[b] === 'ex' && board[c] === 'ex') {
                matchResult = 'end';
                win = true;
                break;
            } else if (board[a] === 'oh' && board[b] === 'oh' && board[c] === 'oh') {
                matchResult = 'end';
                win = false;
                break;
            }
        }
    
        if (!matchResult && !board.includes('free')) {
            matchResult = 'end';
            win = null;
        }

        if (matchResult) {
            this.setState({
                matchResult,
                win
            }, () => {
                this.props.status(undefined, matchResult);
            });
        }
    }
    
    resetGame = () => {
        this.setState({
            matchResult: 'pending',
            turn: true,
            win: null,
            board: Array(9).fill('free')
        }, () => {
            const { turn, matchResult } = this.state;

            console.log(this.state);

            this.props.status(turn, matchResult);
        });
    }

    componentDidMount() {
        this.setState({
            matchResult: 'pending'
        }, () => {
            const { turn, matchResult } = this.state;

            this.props.status(turn, matchResult);
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.overtime !== this.props.overtime && this.props.overtime === true) {
            this.setState({
                matchResult: 'end',
                win: false
            });
        }

        if (this.props.reset) {
            this.resetGame();
        }
    }

    render() {
        const { turn, board, win, matchResult } = this.state;

        return (
            <div className='game-field'>
                {board.map((cell, i) => (
                    <GameCell 
                        key={i} 
                        click={() => this.handleClick(i)}
                        turn={turn}
                        cellClass={cell}
                    />
                ))}
                {matchResult === 'end' && <GameEnd status={win} />}
            </div>
        )
    }
}

function GameEnd({ status }) {
    let result
    
    if (status === true || status === false) {
        result = status === true ? 'won' : 'lost';
    } else {
        result = 'draw';
    }

    return (
        <div className='game-field__end-menu-wrapper'>
            <div className='game-field__end-text'>
                {result === 'draw'
                ? <span className='game-field__result game-field__result--tie'>TIE</span>
                : <>YOU <span className={`game-field__result game-field__result--${result}`}>{result.toUpperCase()}</span></>
                }
            </div>
        </div>
    )
}

function GameCell({ click, turn, cellClass }) {
    const handleClick = () => {
        if (!turn || cellClass !== 'free') return;

        click();
    }

    return (
        <>
            <button className={`game-cell game-cell--${cellClass}`} onClick={handleClick}></button>
        </>
    )
}