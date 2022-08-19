// React
import React from 'react'

// Librarys
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Hooks
import useLanguages from '@hooks/useLanguages'

// Types
import { CategoryProps } from '@interfaces/Category.interface'

const Category: React.FC<CategoryProps> = ({
  id,
  alt,
  name,
  isActive,
  categoryIcon,
  updateCategory
}: CategoryProps) => {
  const { lang } = useLanguages()

  // Actualizar categoría
  const handleChangeCategory = React.useCallback(() => {
    updateCategory(id)
  }, [])

  // Get current category name, when category name is object, like as { es: ..., en: ... }, get current language or if category name is string, return it
  const ctgName = React.useMemo(() => {
    if (typeof name === 'string') {
      return name
    }

    return name[lang as keyof typeof name]
  }, [lang])

  return (
    <li
      onClick={handleChangeCategory}
      className={`category cursor-pointer ${alt} ${
        isActive ? 'active' : 'desactive'
      } `}
    >
      <FontAwesomeIcon icon={categoryIcon} />
      <span className="category-name">{ctgName}</span>
    </li>
  )
}

const callback = (prevProps: CategoryProps, nextProps: CategoryProps) => {
  return prevProps.isActive === nextProps.isActive
}

export default React.memo(Category, callback)
