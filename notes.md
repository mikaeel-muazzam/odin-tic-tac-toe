Gameboard could look like this:
const gameBoard = [
    ["0", "0", "0"], 
    ["0", "0", "0"], 
    ["0", "0", "0"]
]

The outer array stores rows and inner arrays store columns
Therefore, the centre cell would be:
gameBoard[1][1]

We'll need a 2d array generator function somewhere.

## Game
- gameplay flow
- what round is it
- win check

## Player
- score
- marker

## Gameboard
- Gameboard array
- Generate a gameboard (IIFE)