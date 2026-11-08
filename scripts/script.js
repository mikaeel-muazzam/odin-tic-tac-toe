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