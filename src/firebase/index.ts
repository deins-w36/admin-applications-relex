import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: 'AIzaSyDtYlNL6qfaTe1eGu8W2Ar3uPt6NLz-M44',
    authDomain: 'react-relex-test.firebaseapp.com',
    projectId: 'react-relex-test',
    storageBucket: 'react-relex-test.appspot.com',
    messagingSenderId: '839973955344',
    appId: '1:839973955344:web:b11f61ca4259b9e80ca795'
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
