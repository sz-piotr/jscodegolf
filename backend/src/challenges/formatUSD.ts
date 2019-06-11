import { Challenge } from './Challenge'

export const formatUSD: Challenge = {
  id: 'formatUSD',
  title: 'Format USD',
  description:
    'Format a number so that it represents dollars. ' +
    'Separate thousands using a comma, always have two decimal ' +
    'places rounded down.',
  tests: [
    [0, '$0.00'],
    [1, '$1.00'],
    [12, '$12.00'],
    [123, '$123.00'],
    [1234, '$1,234.00'],
    [1000, '$1,000.00'],
    [12345, '$12,345.00'],
    [123456, '$123,456.00'],
    [1234567, '$1,234,567.00'],
    [10000000000, '$10,000,000,000.00'],
    [0.1, '$0.10'],
    [0.12, '$0.12'],
    [0.123, '$0.12'],
    [0.127, '$0.13'],
    [0.1234, '$0.12'],
    [12.1234, '$12.12'],
    [12.1278, '$12.12'],
    [123.1234, '$123.12'],
    [1234.9999, '$1,234.99'],
    [1234567.1234, '$1,234,567.12'],
  ].map(
    ([a, b]) => ({ args: [a], expected: b })
  )
}
