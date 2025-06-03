import { useEffect } from 'react'
import { onMessage } from 'firebase/messaging'
import { messaging } from '@/lib/firebase'

const useFcm = () => {
  useEffect(() => {
    // check if browser support service worker
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope)
      })
      .catch((err) => {
        console.error('Service Worker registration failed:', err)
      })

    const setUpMessaging = async () => {
      const unsubscribe = onMessage(messaging, (payload) => {
        if (Notification.permission !== 'granted') return
        console.log('Received foreground message', payload)
        const { title, body } = payload.notification || payload.data || {}
        if (title && body) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(title, {
              body,
            })
          })
        }
      })
      return () => unsubscribe()
    }
    setUpMessaging()
  }, [])
}

export default useFcm
