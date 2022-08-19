// Librarys
import { IconProp } from '@fortawesome/fontawesome-svg-core'

// Types
import { MultiLangType } from './useForm.type'

export type CategoryType = {
  id: string
  alt: string
  categoryIcon: IconProp
  name: string | MultiLangType
}
