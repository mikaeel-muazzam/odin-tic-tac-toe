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

## Win condition
> ts is hardddd

How many options are there, really, that would be a winning condition?

3 columns + 3 rows + 2 diagonals = 8 possible win conditions per player

I suppose I could use .filter() to look at only just the X's or O's at a time (since winning three in a row is independent of the other player's positions), and then compare that with the winning board states

It does seem rather unsatisfying to hardcode the winstates, but I could always hardcode it now and then come back to this later after finishing everything else to write a more flexible solution

If any win is detected then I could just break; the loop

    If you knew there was some winner, could you find out if it's X or O that won?

WAIT!!
The winner would always be the last person who played because their move caused a winner to exist! 