export function prettyPrint (value: any) {
  try {
    const x = JSON.parse(JSON.stringify(value))
    return prettyPrintSafe(x)
  } catch (e) {
    if (/circular/.test(e && e.message)) {
      return '<Circular>'
    }
    throw e
  }
}

function prettyPrintSafe (value: unknown): string {
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
    if (Array.isArray(value)) {
      return `[${value.map(prettyPrintSafe).join(', ')}]`
    }
    return `{ ${Object.entries(value).map(([key, value]) => {
      const keyStr = /\w+/.test(key) ? key : JSON.stringify(key)
      return `${keyStr}: ${prettyPrintSafe(value)}`
    }).join(', ')} }`
  }
  if (value === undefined) {
    return '' + value
  }
  return '<Unknown>'
}
