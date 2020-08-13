import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

const firebaseConfig = {
    apiKey: 'AIzaSyDujc3dEGQRXIGacm5JFiVHjgJbKt1Kw-4',
    authDomain: 'streak-stat.firebaseapp.com',
    databaseURL: 'https://streak-stat.firebaseio.com',
    projectId: 'streak-stat',
    storageBucket: 'streak-stat.appspot.com',
    messagingSenderId: '1042290280505',
    appId: '1:1042290280505:web:9f1d628e20a58d8337e5e8',
    measurementId: 'G-6WN3WHYD79',
  }

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''
export const auth = firebase.auth()