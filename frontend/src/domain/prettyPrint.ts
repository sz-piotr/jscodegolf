export function prettyPrint (value: unknown, stack: any[] = []): string {
  if (stack.includes(value)) {
    return '<Circular>'
  }
  if (typeof value === 'string') {
    return JSON.stringify(value)
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return value.toString()
  }
  if (typeof value === 'object') {
    if (value === null) {
      return '' + value
    }
    if (value instanceof Date) {
      return `Date(${value.toISOString()})`
    }
    if (Array.isArray(value)) {
      stack.push(value)
      const result = `[${value.map(x => prettyPrint(x, stack)).join(', ')}]`
      stack.pop()
      return result
    } else {
      stack.push(value)
      const result = `{ ${Object.entries(value).map(([key, value]) => {
        const keyStr = /\w+/.test(key) ? key : JSON.stringify(key)
        return `${keyStr}: ${prettyPrint(value, stack)}`
      }).join(', ')} }`
      stack.pop()
      return result
    }
  }
  if (value === undefined) {
    return '' + value
  }
  return '<Unknown>'
}
