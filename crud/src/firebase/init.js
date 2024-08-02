import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBjiuowgOk2qlHSeFv7i4reHN9ZJGi-m10",
  authDomain: "micros-ce061.firebaseapp.com",
  projectId: "micros-ce061",
  storageBucket: "micros-ce061.appspot.com",
  messagingSenderId: "114931465561",
  appId: "1:114931465561:web:302fdb84d99df097052048",
  measurementId: "G-H7RBERQJNT"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
