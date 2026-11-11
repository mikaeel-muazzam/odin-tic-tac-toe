console.log("Hello world");

// create the (blank) gameboard
const gameBoard = (() => {
    let board = [];
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
        console.log(board);
    }

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
    let gameLength = 0;
    let currentPlayerTurn = 1;
    let winner;

    // check whose turn it is
    function checkTurn () {
        return currentPlayerTurn - 1;
    }

    function playTurn (row, column) {
        const currentPlayer = players[checkTurn()];
        const mark = currentPlayer.marker;

        gameBoard.placeMark(mark, row, column);

        currentPlayerTurn = currentPlayerTurn === 1 ? 2 : 1;
        gameLength++;
    }

    // check for victory after every turn
    function checkWinState (boardArray) {
        console.log(`checking victory on board with state: ${boardArray}`);
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
        if (gameLength >= 9) return true;
        if (checkWinState(gameBoard.viewBoard())) {
            winner = true;
            return true;
        }
        return false;
    }

    // START GAME
    function start () {
        //reset the board
        gameBoard.resetBoard();

        //core game loop
        do {
            console.log(`It's ${players[currentPlayerTurn - 1].name}'s turn!`);
            // play a turn
            playTurn(prompt('row'), prompt('column'));

            // check if game is over
        } while (!gameIsOver());

        // announce the winner!!!
        if (winner) {
            console.log(`The winner is ${players[checkTurn()-1].name} (${players[checkTurn()-1].marker})!`)
        } else {
            console.log(`It's a tie!`)
        }
    }

    // return the game flow as an object
    return {start}
})();