// React
import React from 'react'

// Hooks
import useLanguages from '@hooks/useLanguages'

// Interfaces
import { MultiLangTextProps } from '@interfaces/Languages.interfaces'

const MultiLangText: React.FC<MultiLangTextProps> = ({
  dictionaryKey
}: MultiLangTextProps) => {
  const { dictionary } = useLanguages()

  return <>{dictionary[dictionaryKey]}</>
}

export default React.memo(MultiLangText)
