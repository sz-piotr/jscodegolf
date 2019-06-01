import { Challenge } from './Challenge'

export const divisors: Challenge = {
  id: 'divisors',
  title: 'Divisors',
  description:
    'Write a function that returns all of the divisors of a given number.\n\n' +
    'For example:\n' +
    'fn(3) = [1, 3]\n' +
    'fn(12) = [1, 2, 3, 4, 6, 12]'
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
