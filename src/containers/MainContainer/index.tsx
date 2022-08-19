// Containers
import TabsContainer from '@containers/CategoriesContainer'

// Components
import Footer from '@components/Footer'
import AppLogo from '@components/AppLogo'
import MultiLang from '@components/MultiLang'

export default function MainContainer() {
  return (
    <main id="main-container">
      {/* Application Logo */}
      <AppLogo />

      {/* Tabs */}
      <TabsContainer />

      {/* MultiLang */}
      <MultiLang />

      {/* Footer */}
      <Footer />
    </main>
  )
}
