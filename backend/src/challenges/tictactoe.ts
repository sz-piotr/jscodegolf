import { Challenge } from './Challenge'

export const ticTacToe: Challenge = {
  id: 'ticTacToe',
  title: 'Tic-tac-toe',
  description: 'Given a tic-tac-toe board return the winning player: ' +
    '"X", "O" or "." in case of draw.\n' +
    'Example: "XXX\\nO.O\\n.O." -> "X"',
  tests: [
    ...permutations('XXX\nOO.\nX.O', 'X'), // outer
    ...permutations('XO.\n.XO\nOXX', 'X'), // cross
    ...permutations('.XO\n.XO\nOXX', 'X'), // middle
    ...permutations('XXX\nOOO\n.XO', '.'), // 2 wins
    ...permutations('X..\n.OO\n.XO', '.'), // no win
    ['...\n...\n...', '.'],
  ].map(
    ([a, b]) => ({ type: 'FUNCTION', args: [a], expected: b })
  )
}

function permutations (board: string, winner: string) {
  const swapped = swap(board)
  const swappedWinner = swap(winner)
  return [
    [rotate(board, 0), winner],
    [rotate(board, 1), winner],
    [rotate(board, 2), winner],
    [rotate(board, 3), winner],
    [rotate(swapped, 0), swappedWinner],
    [rotate(swapped, 1), swappedWinner],
    [rotate(swapped, 2), swappedWinner],
    [rotate(swapped, 3), swappedWinner],
  ]
}

function rotate (board: string, n: number) {
  let rotated = board
  for (let i = 0; i < n; i++) {
    rotated = rotateOnce(rotated)
  }
  return rotated
}

function rotateOnce (board: string) {
  return [8, 4, 0, 3, 9, 5, 1, 3, 10, 6, 2]
    .map(x => board[x])
    .join('')
}

function swap (board: string) {
  return board
    .replace(/X/g, 'a')
    .replace(/O/g, 'X')
    .replace(/a/g, 'O')
}
