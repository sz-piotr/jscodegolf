export interface Challenge {
  id: string
  title: string
  description: string
  tests: TestCase[]
}

export interface TestCase {
  args: any[],
  expected: any,
}
