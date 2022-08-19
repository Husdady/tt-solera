// Components
import MultiLangText from '@components/MultiLangText'

const appLogoImg = require('@images/app-logo.png')

export default function AppLogo() {
  return (
    <div className="app-logo">
      <img src={appLogoImg} alt="app-logo" width={40} height={40} />
      <h2 className="app-logo-name">
        <MultiLangText dictionaryKey="app-logo-dajs10" />
      </h2>
    </div>
  )
}
