const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function getChallenges () {
  await sleep(500)
  return [
    {
      id: 0,
      title: 'Introduction',
      description: 'Write a function that returns true'
    },
    {
      id: 1,
      title: 'Format number',
      description: 'Write a function that formats the given number'
    },
    {
      id: 2,
      title: 'undefined',
      description: 'Write a function that deletes all undefined properties from an object'
    },
  ]
}

export async function getScores (challengeId: number) {
  await sleep(500)
  return [
    {
      name: 'Helen',
      score: 30 + challengeId,
    },
    {
      name: 'Lucy',
      score: 31 + challengeId * 2,
    },
    {
      name: 'Martin',
      score: 34 + challengeId * 3,
    }
  ]
}
