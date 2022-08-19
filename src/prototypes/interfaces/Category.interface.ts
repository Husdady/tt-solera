// Types
import { CategoryType } from '%types%/categories.type'

export interface CategoryProps extends CategoryType {
  isActive: boolean
  updateCategory: Function
}
