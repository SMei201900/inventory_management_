// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCABbKrd1YtkkW_6Es6mTgw6S8nkKzJ8C0",
	authDomain: "inventory-management-29355.firebaseapp.com",
	projectId: "inventory-management-29355",
	storageBucket: "inventory-management-29355.appspot.com",
	messagingSenderId: "717078527862",
	appId: "1:717078527862:web:0832783c17742fd2634457",
	measurementId: "G-R7LMM5HFKK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { firestore }; //allows us to use it outside
