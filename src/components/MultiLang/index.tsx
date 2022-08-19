// React
import React from 'react'

// Hooks
import useLanguages from '@hooks/useLanguages'

const esFlag = require('@images/es.png')
const enFlag = require('@images/en.png')

export default function MultiLang() {
  const { lang, setLang } = useLanguages()

  // Change current language, if language is SPANISH, show USA flag and viceserve
  const handleChangeLanguage = React.useCallback((currentLang: string) => {
    return () => {
      setLang(currentLang)
    }
  }, [])

  return (
    <button
      className="multi-lang cursor-pointer"
      onClick={handleChangeLanguage(lang === 'es' ? 'EN' : 'ES')}
    >
      <img
        src={lang === 'es' ? enFlag : esFlag}
        width={15}
        height={15}
        alt="flag"
      />

      <span>{lang === 'es' ? 'EN' : 'ES'}</span>
    </button>
  )
}
