import firebase from 'firebase/app'
import 'firebase/auth' // If you need it
import 'firebase/firestore' // If you need it
import 'firebase/storage' // If you need it
import 'firebase/analytics' // If you need it
import 'firebase/performance' // If you need it
import { env } from '../../conf'

const clientCredentials = {

  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: env.NEXT_PUBLIC_FIREBASE_MESERMENT

}

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials)
  // Check that `window` is in scope for the analytics module!
  if (typeof window !== 'undefined') {
    // Enable analytics. https://firebase.google.com/docs/analytics/get-started
    if ('measurementId' in clientCredentials) {
      firebase.analytics()
      firebase.performance()
    }
  }
  firebase.auth().signInAnonymously()
    .then(() => {
       console.log('anonimusly sign in')
    })
    .catch((error) => {

      console.log(error.message)
    });
}

export default firebase

