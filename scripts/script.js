console.log("Hello world");

// create the (blank) gameboard
const gameBoard = (() => {
    function generateBoard () {
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
    }
    
    board = generateBoard();

    return {board};
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

    // allow the current player to place a mark
    function placeMark (mark, row, column) {
        // correct row and column to match 0 indices
        row--;
        column--;

        // check if such a mark already exists
        if (gameBoard.board[row][column] === mark) {
            row++;
            column++;
            throw Error(`${mark} already exists at row ${row}, column ${column}`)
        }

        gameBoard.board[row][column] = mark;
        console.log(gameBoard.board);
    }

    function playTurn (row, column) {
        const currentPlayer = players[checkTurn()];
        const mark = currentPlayer.marker;

        placeMark(mark, row, column);

        currentPlayerTurn = currentPlayerTurn === 1 ? 2 : 1;
        gameLength++;
    }

    // check for victory after every turn
    function checkWinState () {
        console.log(`checking victory on board with state: ${gameBoard.board}`);
    }
    
    function gameIsOver () {
        if (gameLength >= 9) return true;
        if (checkWinState()) return true;
        return false;
    }

    // START GAME
    function start () {
        do {
            console.log(`It's ${players[currentPlayerTurn - 1].name}'s turn!`);
            // play a turn
            playTurn(prompt('row'), prompt('column'));

            // check for victory
        } while (!gameIsOver());

        // announce the winner!!!
    }

    // return the game flow as an object
    return {start, playTurn}
})();