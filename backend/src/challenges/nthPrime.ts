import { Challenge } from './Challenge'

export const nthPrime: Challenge = {
  id: 'nthPrime',
  title: 'N-th Prime',
  description: 'Write a function that returns the n-th prime number.',
  tests: [
    [1, 2],
    [2, 3],
    [3, 5],
    [4, 7],
    [9, 23],
    [23, 83],
    [83, 431],
    [431, 3001],
    [511, 3659],
    [1000, 7919]
  ].map(
    ([a, b]) => ({ args: [a], expected: b })
  )
}
