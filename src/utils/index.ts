import { useEffect, useRef, useState } from 'react'

export const isFalsy = (value: unknown) =>
  value === 0 ? false : !value

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === ''

export const cleanObject = (object: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// export const debounce = (func, delay) => {
//   let timeout

//   return (...param) => {
//     if (timeout) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(function () {
//       func(...param)
//     }, delay)
//   }
// }
// const log = debounce(() => console.log('call'), 5000)
// log()
// log()
// log()
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debounceValue
}

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
  }, [title])
  useEffect(() => {
    if (!keepOnUnmount) {
      document.title = oldTitle
    }
  }, [keepOnUnmount, oldTitle])
}
