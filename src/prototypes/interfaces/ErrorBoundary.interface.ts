import React from "react"

export interface BoundaryProps {
  children: React.ReactNode
}

export interface BoundaryState {
  error: null | string
}
