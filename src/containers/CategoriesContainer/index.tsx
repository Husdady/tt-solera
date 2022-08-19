// Components
import Category from '@components/Category'
import ServiceForm from '@components/ServiceForm'

// Containers
import ServicesContainer from '@containers/ServicesContainer'

// Hooks
import useLocalStorage from '@hooks/useLocalStorage'

// Types
import { CategoryType } from '%types%/categories.type'

// Utils
import { DEFAULT_CATEGORY } from '@utils/statics'

const categories: CategoryType[] = require('@data/categories.json')

export default function CategoriesContainer() {
  const [activeCategory, setActiveCategory] = useLocalStorage(
    DEFAULT_CATEGORY,
    categories[0].id
  )

  return (
    <section className="tabs">
      {/* <CategoriesList /> */}
      <ul className="categories">
        {categories.map((category: CategoryType) => (
          <Category
            key={category.id}
            updateCategory={setActiveCategory}
            isActive={activeCategory === category.id}
            {...category}
          />
        ))}
      </ul>

      <div className="tab-content">
        <ServicesContainer activeCategory={activeCategory} />
        <ServiceForm activeCategory={activeCategory} />
      </div>
    </section>
  )
}
