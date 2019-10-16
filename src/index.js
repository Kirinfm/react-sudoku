import React from 'react';
import ReactDOM from 'react-dom';
import {InputNumber, Button} from 'antd';
import {InputItem} from 'antd-mobile';
import 'antd/dist/antd.css';
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
class Number extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changedValue: props.value,
            disabled: !!(props.value !== '')
        }
    }

    handleValue(e) {
        this.setState(() => ({changedValue: e === '' ? '' : e > 9 ? 9 : e < 1 ? 1 : e}));
    }

    componentWillReceiveProps(props) {
        this.setState({
            changedValue: props.value,
            disabled: !!(props.value !== '')
        });
    }

    render() {
        return (
            <InputItem type={"number"} className={this.props.className} disabled={this.state.disabled}
                       value={this.state.changedValue}
                       style={this.props.className === 'squareGrey' ? {background: '#cfcfcf'} : {}}
                       onChange={(e) => this.handleValue(e)}/>
        );
    }
}

class Numbers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: null,
        };
        this.generateSudokuSuccess = false;
        this.avalibleIdx = this.avalibleIdx.bind(this);
        this.generateSudoku = this.generateSudoku.bind(this);
    }

    renderNumber(i, className) {
        return (
            <Number
                value={i}
                className={className}
            />
        );
    }

    // 每行分为3块，idx在三行内不处于同一块
    /**
     *
     * @param {Array} rowList - 当前行的数字填充情况
     * @param {Number} idxOfRowList - 数独第几行
     * @param {Array} idxInList - 同一数字在每行所处位置
     */
    avalibleIdx(rowList, idxOfRowList, idxInList) {
        let avalibleList = []
        for (let m = 0; m < 9; m++) {
            if (rowList[m] === undefined && idxInList.indexOf(m) === -1) {
                if (idxOfRowList % 3 === 0) {
                    avalibleList.push(m)
                } else {
                    let blockLastIndex = idxInList[idxInList.length - 1]
                    if ((blockLastIndex < 3 && m < 3) || ((blockLastIndex >= 3 && blockLastIndex < 6) && (m >= 3 && m < 6)) || (blockLastIndex >= 6 && m >= 6)) {
                        continue
                    } else {
                        if (idxOfRowList % 3 === 2) {
                            let blockAheadIdx = idxInList[idxInList.length - 2]
                            if ((blockAheadIdx < 3 && m < 3) || ((blockAheadIdx >= 3 && blockAheadIdx < 6) && (m >= 3 && m < 6)) || (blockAheadIdx >= 6 && m >= 6)) {
                                continue
                            }
                        }
                        avalibleList.push(m)
                    }
                }
            }
        }
        let resultList = Array.from(new Set(avalibleList))
        return resultList[Math.floor(Math.random() * resultList.length)]

    }

    generateSudoku() {
        let array = new Array(9)
        for (let i = 0; i < 9; i++) {
            array[i] = new Array(9)
        }
        let time = new Date().getTime()
        for (let j = 0; j < 9; j++) {
            let idxInList = []
            let notComplete = true

            while (notComplete) {
                idxInList = []
                for (let k = 0; k < 9; k++) {
                    let avalibIdx = this.avalibleIdx(array[k], k, idxInList)
                    if (avalibIdx !== undefined) {
                        idxInList.push(avalibIdx)
                    }
                }
                if (idxInList.length === 9) {
                    notComplete = false
                } else if (new Date().getTime() - time > 1000) {
                    return
                }
            }
            // 要return，不map
            for (let n = 0; n < idxInList.length; n++) {
                array[n][idxInList[n]] = j + 1;
                if (j === 8 && n === 8) {
                    this.generateSudokuSuccess = true;
                    return array
                }
            }
        }
    }

    render() {
        this.generateSudokuSuccess = false;
        let result = null;
        while (!this.generateSudokuSuccess) {
            result = this.generateSudoku()
        }
        result = this.state.array ? this.state.array : result;
        /*const boards = Array(9);
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
        }*/
        return (
            <div>
                <div className="board-row">
                    <Button type="primary" style={{marginRight: 5, marginBottom: 5}}>
                        提交
                    </Button>
                    <Button type="primary" style={{marginRight: 5, marginBottom: 5}}>
                        重置
                    </Button>
                    <Button type="primary" style={{marginRight: 5, marginBottom: 5}} onClick={() => {
                        this.generateSudokuSuccess = false;
                        this.setState({
                            array: null
                        });
                        let result = null;
                        while (!this.generateSudokuSuccess) {
                            result = this.generateSudoku()
                        }
                        this.setState({
                            array: result
                        });
                    }}>
                        重新生成
                    </Button>
                </div>
                {/*{boards.map((value, index) => {
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
                })}*/}
                {result.map((value, index) => {
                    let changeClassName = false;
                    if ((index / 3) % 2 >= 1) {
                        changeClassName = true;
                    }
                    const renderHtml = Array(value.length);
                    value.map((v, i) => {
                        if (i % 3 === 0) {
                            changeClassName = !changeClassName;
                        }
                        renderHtml[i] = this.renderNumber((Math.random() >= .3 ? v : ''), changeClassName ? 'square' : 'squareGrey');
                    });
                    if (index !== (result.length - 1)) {
                        return (
                            <div className="board-row">
                                {renderHtml}
                            </div>
                        );
                    } else {
                        return (
                            <div className="board-board">
                                {renderHtml}
                            </div>
                        );
                    }
                })}
                <div className="board-row">
                    {Array(9).fill(0).map((value, index) => {
                        return (<button className="square">{index + 1}</button>);
                    })}
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
            </div>
        );
    }
}

// ======================================= 数独 end

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
