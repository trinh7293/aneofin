import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAE0oUKe5a5Lbm9Mn7zjy-RgqSd5IQTf7M",
  authDomain: "aneofin.firebaseapp.com",
  databaseURL: "https://aneofin.firebaseio.com",
  projectId: "aneofin",
  storageBucket: "aneofin.appspot.com",
  messagingSenderId: "19657928195",
  appId: "1:19657928195:web:3dd93bae2ade51a33c2836",
  measurementId: "G-HK9P4QF09Q"
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''
export const auth = firebase.auth()