// React
import React from 'react'

// Librarys
import { SizeProp, IconProp } from '@fortawesome/fontawesome-svg-core'

export interface IconType {
  name: IconProp
  size?: SizeProp
  color?: string
}

export interface ButtonProps {
  ref?: React.RefObject<HTMLElement>
  type?: 'button' | 'reset' | 'submit'
  title: string | React.ReactNode
  icon?: IconType | IconProp
  className?: string
  style?: React.CSSProperties
  backgroundColor?: string
  attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>
  onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
