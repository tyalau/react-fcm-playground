import { createRoot } from 'react-dom/client'
import { Provider } from '@/containers/Provider'
import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <Provider>
    <App />
  </Provider>
)
