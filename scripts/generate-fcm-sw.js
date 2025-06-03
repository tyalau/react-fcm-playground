import fs from 'fs'
import path from 'path'

const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID,
} = process.env

const templatePath = path.resolve(import.meta.dirname, '../templates/firebase-messaging-sw.js')
const outputPath = path.resolve(import.meta.dirname, '../public/firebase-messaging-sw.js')

const template = fs.readFileSync(templatePath, 'utf8')

const result = template
  .replace(/__FIREBASE_API_KEY__/g, VITE_FIREBASE_API_KEY)
  .replace(/__FIREBASE_AUTH_DOMAIN__/g, VITE_FIREBASE_AUTH_DOMAIN)
  .replace(/__FIREBASE_PROJECT_ID__/g, VITE_FIREBASE_PROJECT_ID)
  .replace(/__FIREBASE_STORAGE_BUCKET__/g, VITE_FIREBASE_STORAGE_BUCKET)
  .replace(/__FIREBASE_MESSAGING_SENDER_ID__/g, VITE_FIREBASE_MESSAGING_SENDER_ID)
  .replace(/__FIREBASE_APP_ID__/g, VITE_FIREBASE_APP_ID)

fs.writeFileSync(outputPath, result)

console.log('firebase-messaging-sw.js generated.')
