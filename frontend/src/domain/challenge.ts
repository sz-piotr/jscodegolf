export interface ApiChallenge {
  id: string
  title: string
  description: string
  tests: TestCase[]
}

export type TestCase
  = FunctionTestCase
  | ValueTestCase
  | RegexTestCase

export interface FunctionTestCase {
  type: 'FUNCTION'
  args: any[],
  expected: any,
}

export interface ValueTestCase {
  type: 'VALUE',
  expected: any,
}

export interface RegexTestCase {
  type: 'REGEX',
  expected: string,
  flags: string,
}
