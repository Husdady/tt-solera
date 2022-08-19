// Components
import MultiLangText from '@components/MultiLangText'

export default function Footer() {
  return (
    <footer>
      <span>
        &copy; <MultiLangText dictionaryKey="footer-ps912x" />
      </span>
      &nbsp;
      <a href="https://husdady.netlify.app/" target="_blank" rel="noreferrer">
        Husdady
      </a>
    </footer>
  )
}
