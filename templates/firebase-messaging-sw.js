importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js')
importScripts('/utils/notification.js') // Ensure this path matches your build output

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

firebase.initializeApp({
  apiKey: '__FIREBASE_API_KEY__',
  authDomain: '__FIREBASE_AUTH_DOMAIN__',
  projectId: '__FIREBASE_PROJECT_ID__',
  storageBucket: '__FIREBASE_STORAGE_BUCKET__',
  messagingSenderId: '__FIREBASE_MESSAGING_SENDER_ID__',
  appId: '__FIREBASE_APP_ID__',
})

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging()

self.addEventListener('install', () => {
  console.log('Installed fcm service worker!')
})

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload)
  if (payload.notification) return
  // Customize notification here
  const { title, body } = NotificationUtils.composeNotification(payload.data)
  const notificationOptions = {
    body,
  }

  // Show the notification with custom data
  self.registration.showNotification(title, notificationOptions)
})
