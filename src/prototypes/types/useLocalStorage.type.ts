// React
import React from 'react'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface WindowEventMap {
    'local-storage': CustomEvent
  }
}

export type SetValue<T> = React.Dispatch<React.SetStateAction<T>>
