import firebase from 'firebase/app'
import 'firebase/storage'

interface IConfig {
  apiKey: string
  appId: string
  authDomain: string
  measurementId: string
  messagingSenderId: string
  projectId: string
  storageBucket: string
}

const storageBaseUrl = `https://firebasestorage.googleapis.com/v0/b/mu-nakama.appspot.com/o/`

export const HolyfansStorage = {
  getUrl: (filePath: string) =>
    `${storageBaseUrl}${encodeURIComponent(`holyfans/`)}${encodeURIComponent(
      filePath
    )}?alt=media`,
}
const config: IConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env
    .VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string,
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
} else {
  firebase.app()
}

export const storage = firebase.storage()
