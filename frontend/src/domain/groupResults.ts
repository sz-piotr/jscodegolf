import { TestResult } from './execute'
import { TestCase } from './api'

export interface ResultGroup {
  message: string,
  type: 'PASS' | 'FAIL',
  items: ResultGroupItem[],
}

export interface ResultGroupItem {
  test: TestCase,
  result: TestResult,
}

export function groupResults (cases: TestCase[], results: TestResult[]): ResultGroup[] {
  const { passes, errors, fails } = splitIntoTypes(cases, results)
  return [
    ...groupPasses(passes),
    ...groupErrors(errors),
    ...groupFails(fails),
  ]
}

function groupPasses (items: ResultGroupItem[]): ResultGroup[] {
  if (items.length === 0) {
    return []
  }
  return [{
    message: `${items.length} correct results`,
    type: 'PASS',
    items,
  }]
}

type ErrorItem = { test: TestCase, result: { type: 'ERROR', message: string } }
function groupErrors (input: ErrorItem[]) {
  const groups: ResultGroup[] = []
  for (const item of input) {
    const group = groups.find(x => x.message === item.result.message)
    if (group) {
      group.items.push(item)
    } else {
      groups.push({
        message: item.result.message,
        type: 'FAIL',
        items: [item],
      })
    }
  }
  return groups
}

function splitIntoTypes (cases: TestCase[], results: TestResult[]) {
  const passes = []
  const errors = []
  const fails = []

  for (let i = 0; i < cases.length; i++) {
    const test = cases[i]
    const result = results[i] || { type: 'ERROR', message: 'Missing result' }


    if (result.type === 'PASS') {
      passes.push({ test, result })
    } else if (result.type === 'ERROR') {
      errors.push({ test, result })
    } else if (result.type === 'FAIL') {
      fails.push({ test, result })
    }
  }

  return { passes, errors, fails }
}

type FailItem = { test: TestCase, result: { type: 'FAIL', result: any } }
function groupFails (items: FailItem[]): ResultGroup[] {
  if (items.length === 0) {
    return []
  }
  return [{
    message: `${items.length} incorrect results`,
    type: 'FAIL',
    items
  }]
}
