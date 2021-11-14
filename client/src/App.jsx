import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './utils/auth'
import { EnhancedApolloProvider } from './utils/apollo'
import Routes from './Routes'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EnhancedApolloProvider>
          <Routes />
        </EnhancedApolloProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
