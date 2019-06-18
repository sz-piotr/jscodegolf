import { Challenge } from './Challenge'

export const divisors: Challenge = {
  id: 'divisors',
  title: 'Divisors',
  description: 'Write a function that returns all of the divisors of a given number, sorted in ascending order.',
  tests: [
    [3, [1, 3]],
    [4, [1, 2, 4]],
    [18, [1, 2, 3, 6, 9, 18]],
    [12, [1, 2, 3, 4, 6, 12]],
    [159, [1, 3, 53, 159]],
    [2137, [1, 2137]],
    [2140, [1, 2, 4, 5, 10, 20, 107, 214, 428, 535, 1070, 2140]],
    [1, [1]],
    [0, []],
  ].map(
    ([a, b]) => ({ type: 'FUNCTION', args: [a], expected: b })
  )
}
