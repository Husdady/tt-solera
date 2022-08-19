// React
import React from 'react'

// Librarys
import { IconProp } from '@fortawesome/fontawesome-svg-core'

// Types
import { MultiLangType } from '%types%/useForm.type'

export interface PageTabsType {
  skills: React.ReactNode
  proyects: React.ReactNode
  galery: React.ReactNode
  contact: React.ReactNode
}

export interface TabType {
  name: string
  icon: IconProp
  dictionaryKey: string
}

export interface SocialType {
  name: string
  icon: IconProp
  accountLink: string
}

export interface SkillType {
  name: string
  level: number
}

export interface Grids {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  xxl: number
}

export interface ProyectsTabProps {
  defaultResponsiveGrids: Grids
}

export interface ProyectType {
  id: string
  url?: string
  type?: string
  proyectImg: string
  name: string | MultiLangType
}

export interface ProyectNameProps {
  value: string | MultiLangType
}
