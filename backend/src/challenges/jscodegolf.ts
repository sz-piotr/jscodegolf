import { Challenge } from './Challenge'

export const jscodegolf: Challenge = {
  id: 'jscodegolf',
  title: 'jscodegolf',
  description: 'Write an expression that evaluates to "jscodegolf" ' +
    'without using any of the letters ' +
    '"J", "S", "C", "O", "D", "E", "G", "L", "F".',
  tests: [
    {
      type: 'VALUE',
      expected: 'jscodegolf',
    },
    {
      type: 'REGEX',
      expected: '^[^jscodeglf]*$',
      flags: 'i'
    }
  ]
}
