import { Challenge } from './Challenge'

export const introduction: Challenge = {
  id: 'introduction',
  title: 'Introduction',
  description: 'Write a function that returns true.',
  tests: [
    {
      type: 'FUNCTION',
      args: [],
      expected: true,
    },
  ]
}
