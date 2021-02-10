import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCCMzKlxe9xPtBapv6Qo--khsgdcmpoucY",
  authDomain: "ind-chats.firebaseapp.com",
  projectId: "ind-chats",
  storageBucket: "ind-chats.appspot.com",
  messagingSenderId: "504262492416",
  appId: "1:504262492416:web:f4ec0ff62fe119b6bb73e5",
};

const app = firebase.initializeApp(firebaseConfig);
const database = app.firestore();

export default database;
