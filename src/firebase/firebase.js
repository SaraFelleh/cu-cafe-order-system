import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8G7KzmX0o4D-18Na7j8KhGXDxkaLsxhw",
  authDomain: "cu-cafe-ordering.firebaseapp.com",
  projectId: "cu-cafe-ordering",
  storageBucket: "cu-cafe-ordering.firebasestorage.app",
  messagingSenderId: "187192002804",
  appId: "1:187192002804:web:ea9c7560bf7144fa4336a1",
  measurementId: "G-3LG8HHV0Y8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);