import { Challenge } from './Challenge'

export const colors: Challenge = {
  id: 'colors',
  title: 'Colors',
  description: 'Write a function that transforms hex encoded colors to rgb ' +
    'encoded colors. It should support both #FFF and #FFFFFF.',
  tests: [
    ['#B04B4B', 'rgb(176,75,75)'],
    ['#7E88E6', 'rgb(126,136,230)'],
    ['#1FA11F', 'rgb(31,161,31)'],
    ['#123', 'rgb(17,34,51)'],
    ['#7FFFD4', 'rgb(127,255,212)'],
    ['#B0E0E6', 'rgb(176,224,230)'],
    ['#5F9EA0', 'rgb(95,158,160)'],
    ['#4682B4', 'rgb(70,130,180)'],
    ['#6495ED', 'rgb(100,149,237)'],
    ['#00BFFF', 'rgb(0,191,255)'],
    ['#1E90FF', 'rgb(30,144,255)'],
    ['#ADD8E6', 'rgb(173,216,230)'],
    ['#87CEEB', 'rgb(135,206,235)'],
    ['#87CEFA', 'rgb(135,206,250)'],
    ['#666', 'rgb(102,102,102)'],
    ['#F00', 'rgb(255,0,0)'],
  ].map(
    ([a, b]) => ({ type: 'FUNCTION', args: [a], expected: b })
  )
}
