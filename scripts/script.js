console.log("Hello world");

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

function newPlayer (playerNumber, name, marker) {
    return {playerNumber, name, marker}
}

// create the two players
const players = (() => {
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
        console.log({mark, row, column});
        console.log(gameBoard);
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