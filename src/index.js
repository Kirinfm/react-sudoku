import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}


// ======================================= 数独 start
function Number(props) {
    return (
        <button className={props.className ? props.className : 'square'}>
            {props.value}
        </button>
    );
}

class Numbers extends React.Component {
    renderNumber(i, className) {
        return (
            <Number
                value={i}
                className={className}
            />
        );
    }

    render() {
        const boards = Array(9);
        for (let x = 0; x < 9; x++) {
            boards[x] = Array(9);
            let changeClassName = false;
            if ((x / 3) % 2 >= 1) {
                changeClassName = true;
            }
            for (let y = 0; y < 9; y++) {
                if (y % 3 === 0) {
                    changeClassName = !changeClassName;
                }
                boards[x].push(this.renderNumber('', changeClassName ? 'square' : 'squareGrey'));
            }
        }
        return (
            <div>
                {boards.map((value, index) => {
                    if (index !== (boards.length - 1)) {
                        return (
                            <div className="board-row">
                                {value}
                            </div>
                        );
                    } else {
                        return (
                            <div className="board-board">
                                {value}
                            </div>
                        );
                    }
                })}
                <div className="board-row">
                    {this.renderNumber(1)}
                    {this.renderNumber(2)}
                    {this.renderNumber(3)}
                    {this.renderNumber(4)}
                    {this.renderNumber(5)}
                    {this.renderNumber(6)}
                    {this.renderNumber(7)}
                    {this.renderNumber(8)}
                    {this.renderNumber(9)}
                </div>
            </div>
        );
    }
}

class NumberGame extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Numbers
                    />
                </div>
                <div className="game-info">
                    <div></div>
                    <ol></ol>
                </div>
            </div>
        );
    }
}

// ========================================

const element = (
    <div>
        <NumberGame/>
    </div>
);

ReactDOM.render(
    element,
    document.getElementById('root')
);
