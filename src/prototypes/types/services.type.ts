// Types
import { MultiLangType } from './useForm.type'

export type ServiceType = {
  id: string
  categories: string[]
  description: string
  name: string | MultiLangType
}
