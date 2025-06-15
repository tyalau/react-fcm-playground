import { useEffect } from 'react'
import { onMessage } from 'firebase/messaging'
import { DataMessage } from '@/types/notification'
import { composeNotification } from '@/utils/notification'
import { messaging } from '@/lib/firebase'

export default function useFcm() {
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
        if (!payload.notification && !payload.data) return
        const { title, body } = payload.notification ?? composeNotification(payload.data as DataMessage)
        if (!title) return
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, {
            body,
          })
        })
      })
      return () => unsubscribe()
    }
    setUpMessaging()
  }, [])
}
