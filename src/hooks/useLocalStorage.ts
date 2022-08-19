import React from 'react'

// Hooks
import useMounted from './useMounted'
import useEventListener from './useEventListener'

// Types
import { SetValue } from '%types%/useLocalStorage.type'

// Utils
import Helper from '@utils/Helper'

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = React.useCallback((): T => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (Helper.parseJSON(item) as T) : initialValue
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValue
    }
  }, [initialValue, key])

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = React.useState<T>(readValue)

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = React.useCallback((value: unknown) => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === 'undefined') {
      // eslint-disable-next-line no-console
      console.warn(
        `Tried setting localStorage key "${key}" even though environment is not a client`
      )
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(newValue))

      // Save state
      setStoredValue(newValue)

      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event('local-storage'))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [])

  useMounted(() => {
    setStoredValue(readValue)
  }, [])

  const handleStorageChange = React.useCallback(
    (event: Event) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return
      }

      setStoredValue(readValue())
    },
    [key, readValue]
  )

  // this only works for other documents, not the current one
  useEventListener('storage', handleStorageChange)

  // this is a custom event, triggered in writeValueToLocalStorage
  // See: useLocalStorage()
  useEventListener('local-storage', handleStorageChange)

  return [storedValue, setValue]
}
