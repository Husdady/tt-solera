// React
import { Suspense, lazy } from 'react'

// Components
import ErrorBoundary from '@components/ErrorBoundary'

// Librarys
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { library, IconPack } from '@fortawesome/fontawesome-svg-core'

// Styles
import '@styles/global.scss'

library.add(far as IconPack, fas as IconPack, fab as IconPack)

const MainContainer = lazy(() => import('@containers/MainContainer'))

export default function App() {
  return (
    <Suspense fallback="Loading...">
      <ErrorBoundary>
        <MainContainer />
      </ErrorBoundary>
    </Suspense>
  )
}
