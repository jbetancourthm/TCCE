import { HelmetProvider } from 'react-helmet-async'
import LandingPage from './app/LandingPage'
import SecurityHead from './shared/components/SecurityHead'

export default function App() {
  return (
    <HelmetProvider>
      <SecurityHead />
      <LandingPage />
    </HelmetProvider>
  )
}

