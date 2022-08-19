// React
import React from 'react'

export default function useMounted(
  callback: Function,
  arrDependency: Array<string | number>
): boolean {
  let isMounted: boolean = true

  React.useEffect(() => {
    if (isMounted) {
      callback()
    }

    return () => {
      isMounted = false
    }
  }, arrDependency)

  return isMounted
}
