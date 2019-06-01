import { Challenge } from './Challenge'

export const divisors: Challenge = {
  id: 'DIVISORS',
  title: 'Divisors',
  description:
    'Write a function that returns all of the divisors of a given number. ' +
    'For example:\n' +
    'Input: 3, Ouput: 1, 3\n' +
    'Input: 12, Ouput: 1, 2, 3, 4, 6, 12'
  ,
  tests: [
    {
      args: [3],
      expected: [1, 3],
    },
    {
      args: [12],
      expected: [1, 2, 3, 4, 6, 12],
    },
  ]
}
