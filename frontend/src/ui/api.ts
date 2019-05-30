const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export interface ApiChallenge {
  id: number,
  title: string,
  description: string,
}

export interface ApiScore {
  name: string,
  score: number,
}

export async function getChallenges(): Promise<ApiChallenge[]> {
  const res = await fetch('/api/challenges')
  return res.json()
}

export async function getScores(challengeId: number): Promise<ApiScore[]> {
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

export async function submitSolution(challengeId: number, solution: string) {
  if (Math.random() < 0.5) {
    return {
      success: true as const,
      scores: [
        {
          name: localStorage.getItem('name'),
          score: solution.length,
        },
        ...await getScores(challengeId)
      ] as ApiScore[]
    }
  } else {
    return {
      success: false as const,
      error: 'Something went wrong. The tests are failing.\nError at line 1:4'
    }
  }
}
