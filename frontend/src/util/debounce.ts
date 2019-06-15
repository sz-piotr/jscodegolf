// Taken from https://davidwalsh.name/javascript-debounce-function
export function debounce <T, A extends any[]>(
  func: (this: T, ...args: A) => void,
  waitMs: number,
  immediate: boolean,
) {
	let timeout: any
	return function (this: T, ...args: A) {
		const callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			timeout = null
			if (!immediate) func.apply(this, args)
		}, waitMs)
		if (callNow) func.apply(this, args)
	}
}
