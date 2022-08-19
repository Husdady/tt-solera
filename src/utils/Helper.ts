// Interfaces
import { LanguageType } from '@interfaces/Languages.interfaces'

// Types
import { CategoryType } from '%types%/categories.type'

// Utils
import Validations from './Validations'

const languages: LanguageType[] = require('@data/languages.json')
const categories: CategoryType[] = require('@data/categories.json')

export default class Helper {
  /**
   * Define classes to component
   * @param {classes: (string|undefined|null)[]}
   * @return {string}
   */
  static classnames(classes: (string | undefined | null)[]) {
    return classes.filter((cls?: string | null) => !!cls).join(' ')
  }

  /**
   * Truncate text
   * @param {str: string, limit: number}
   * @return {string}
   */
  static truncate(str: string, limit: number = 100) {
    if (str.length > limit) {
      return str.substring(0, limit) + '...'
    }

    return str
  }

  /**
   * Copy an object
   * @param {obj: Object}
   * @return {object}
   */
  static copyObject(obj: Object) {
    if (!Validations.isObject(obj)) {
      return obj
    }

    return JSON.parse(JSON.stringify(obj))
  }

  /**
   *  A wrapper for "JSON.parse()"" to support "undefined" value
   * @param {value: string|null}
   * @return {string|undefined}
   */
  static parseJSON<T>(value: string | null): T | undefined {
    try {
      return value === 'undefined' ? undefined : JSON.parse(value ?? '')
    } catch {
      // eslint-disable-next-line no-console
      console.warn('Parsing error on', { value: value })
      return undefined
    }
  }

  /**
   *  Parse language, for example: es-489 ==> ES
   * @param {language: string}
   * @return {string}
   */
  static parseLanguage(language: string): string {
    const el: LanguageType | undefined = languages.find((item: LanguageType) =>
      language.includes(item.language.toLowerCase())
    )

    if (el) {
      return el.language.toUpperCase()
    } else {
      return 'EN'
    }
  }

  /**
   *  Get all Select values from Service categories
   * @param {currentLang: string, serviceCategories: string[]}
   * @return {value: string, label: string}
   */
  static getSelectValues(currentLang: string, serviceCategories: string[]) {
    return serviceCategories.map((serviceCategoryId: string) => {
      // Filter category by id
      const filterCategory = categories.find(
        (category: CategoryType) => category.id === serviceCategoryId
      )

      if (filterCategory) {
        return {
          value: filterCategory.id,
          label:
            typeof filterCategory.name === 'string'
              ? filterCategory.name
              : filterCategory.name[
                  currentLang as keyof typeof filterCategory.name
                ]
        }
      }

      return {}
    })
  }
}
