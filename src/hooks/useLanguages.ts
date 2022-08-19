// Hooks
import useLocalStorage from '@hooks/useLocalStorage'

// Interfaces
import { LanguageType } from '@interfaces/Languages.interfaces'

// Utils
import Helper from '@utils/Helper'
import { LANG } from '@utils/statics'

const languages: LanguageType[] = require('@data/languages.json')

export default function useLanguages() {
  const [lang, setLang] = useLocalStorage(
    LANG,
    Helper.parseLanguage(navigator.language)
  )

  const currentLanguage = lang.toLowerCase()

  const language: LanguageType | undefined = languages.find(
    (item: LanguageType) => currentLanguage === item.language
  )

  return {
    setLang: setLang,
    lang: currentLanguage,
    dictionary: typeof language !== 'undefined' ? language.dictionary : {}
  }
}
