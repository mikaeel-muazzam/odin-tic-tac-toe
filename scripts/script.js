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

    // check whose turn it is
    function checkTurn () {
        console.log({currentPlayerTurn});
    }

    // allow the current player to place a mark
    function placeMark (mark, row, column) {
        // correct row and column to math 0 indices
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

    // check for victory after every turn
    function checkWinState() {
        console.log({gameBoard});
    }

    // START GAME
    function start () {

    }

    // return the game flow as an object
    return {start, checkTurn, placeMark, checkWinState}
})();