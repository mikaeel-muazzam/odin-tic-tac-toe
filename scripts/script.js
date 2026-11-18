console.log("Hello world");

// create the (blank) gameboard
const gameBoard = (() => {
    function generateEmptyBoard () {
        const rows = columns = 3;
        let board = [];

        for (let i = 0; i < rows; i++) {
            let boardRow = [];
            for (let j = 0; j < columns; j++) {
                boardRow.push(0);
            }
            board.push(boardRow);
        }

        return board;
    };

    function resetBoard () {
        board = generateEmptyBoard();
    }
    
    function viewBoard () {
        return board;
    }

    // allow the current player to place a mark
    function placeMark (mark, row, column) {
        // correct row and column to match 0 indices
        row--;
        column--;

        // check if such a mark already exists
        if (board[row][column] === mark) {
            row++;
            column++;
            throw Error(`${mark} already exists at row ${row}, column ${column}`)
        }

        board[row][column] = mark;
    }

    let board = generateEmptyBoard();

    return {viewBoard, placeMark, resetBoard};
})();


// create the two players
const players = (() => {
    // create a player object
    function newPlayer (playerNumber, name, marker) {
        return {playerNumber, name, marker}
    }

    const player1 = newPlayer(1, 'John', "X");
    const player2 = newPlayer(2, 'Alex', "O");

    return [player1, player2];
})();

const game = (() => {
    // pvt variables
    let currentPlayerTurn = 1;
    let winner;

    // check whose turn it is
    function checkTurn () {
        return currentPlayerTurn - 1;
    }

    function playTurn (row, column) {
        if (winner) return;

        const currentPlayer = players[checkTurn()];
        const mark = currentPlayer.marker;

        console.log(`It's ${currentPlayer.name}'s turn!`);

        gameBoard.placeMark(mark, row, column);

        currentPlayerTurn = currentPlayerTurn === 1 ? 2 : 1;

        if (gameIsOver()) {
            announceWinner();
        }
    }

    // check for victory after every turn
    function checkWinState (boardArray) {
        //gameboard flattener
        function flatten (arr) {
            let flatArr = [];
            arr.forEach(row => {
                row.forEach(cell => {
                    flatArr.push(cell);
                })
            });
            return flatArr;
        }

        //check if 3 spots have the same mark which isn't 0;
        function check(arr, spots) {
            let [a, b, c] = spots;

            if (arr[a] === 0 || arr[b] === 0 || arr[c] === 0) return false;
            if (arr[a] === arr[b] && arr[b] === arr[c]) return true;
        }

        let didSomeoneWin;
        //all possible win positons
        const winPositions = [
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        boardArray = flatten(boardArray);

        //iterate over every possible win position
        winPositions.forEach(position => {
            if (check(boardArray, position)) didSomeoneWin = true;
        });

        return didSomeoneWin;
    }
    
    function gameIsOver () {
        if (checkWinState(gameBoard.viewBoard())) {
            winner = true;
            return true;
        }
        return false;
    }

    function announceWinner () {
        // announce the winner!!!
        if (winner) {
            console.log(`The winner is ${players[checkTurn()+1].name} (${players[checkTurn()+1].marker})!`)
        } else {
            console.log(`It's a tie!`)
        }
    }

    // START GAME (reset the board)
    gameBoard.resetBoard();

    // return the game flow as an object
    return {playTurn}
})();

const display = (() => {
    const container = document.querySelector(".ttt-container");

    function showBoardCells () {
        const board = gameBoard.viewBoard();
        console.log('rendering', board.slice());

        container.replaceChildren();;

        board.forEach((row, i) => {
            row.forEach((cell, j) => {
                const btn = document.createElement("button");

                btn.dataset.row = i + 1;
                btn.dataset.column = j + 1;

                btn.textContent = (cell !== 0) ? cell : "";

                btn.className = "ttt-btn";

                btn.addEventListener("click", clickHandler);

                container.appendChild(btn);
            });
        });
    }

    function clickHandler (ev) {
        const row = ev.target.dataset.row;
        const column = ev.target.dataset.column;

        game.playTurn(row, column);

        showBoardCells();
    }

    return {showBoardCells};
})();

//quickstart
display.showBoardCells();