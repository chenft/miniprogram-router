
export function stringify (originStr, obj) {
	const keys = Object.getOwnPropertyNames(obj)
	let str = ''
	keys.forEach(key => {
		str += str.length ? `&${key}=${obj[key]}` : `${ key }=${ obj[key] }`
	})
	const result = originStr + (/\?/.test(originStr) ? str : `?${str}`)
	return result
}