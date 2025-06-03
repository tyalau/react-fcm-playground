import { useEffect, useState } from 'react'
import { getToken } from 'firebase/messaging'
import useFcm from '@/hooks/useFcm'
import reactLogo from '@/assets/img/react.svg'
import '@/App.css'
import { messaging } from '@/lib/firebase'
import viteLogo from '/vite.svg'

const App = () => {
  const [permission, setPermission] = useState(Notification.permission)

  const requestNotificationPermission = async () => {
    try {
      const result = await Notification.requestPermission()
      setPermission(result)
    } catch (error) {
      console.error('Error getting notification permission: ', error)
    }
  }
  useFcm()

  useEffect(() => {
    if (permission !== 'granted') return
    const generateToken = () => {
      getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      })
        .then((token) => {
          if (token) {
            console.log('[debug] token: ', token)
          } else {
            console.warn('No registration token available. Request permission to generate one.')
          }
        })
        .catch((error) => {
          console.error('Error when retrieving token: ', error)
        })
    }
    generateToken()
  }, [permission])

  useEffect(() => {}, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" disabled={permission !== 'default'} onClick={requestNotificationPermission}>
          Request Notification Permission
        </button>
      </div>
    </>
  )
}

export default App
