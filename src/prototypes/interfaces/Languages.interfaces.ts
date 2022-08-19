export interface FlagType {
  id: string
  country: string
  imgSrc: string
  imgAlt: string
  language: string
}

export interface FlagProps {
  alt: string
  url: string
  title: string
  language: string
  currentLanguage: string
  onChangeLanguage: (language: string) => void
}

export interface LanguageType {
  language: string
  dictionary: {
    [key: string]: string
  }
}

export interface MultiLangTextProps {
  dictionaryKey: string
}
