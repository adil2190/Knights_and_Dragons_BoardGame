import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyASmMLpRtVHMVtQ7oQLmdi3iRt9PMB26MU",
  authDomain: "knightsanddragons-3.firebaseapp.com",
  projectId: "knightsanddragons-3",
  storageBucket: "knightsanddragons-3.appspot.com",
  messagingSenderId: "459556119503",
  appId: "1:459556119503:web:6a70a1ba60c799697a68ba",
  measurementId: "G-Z6Q3MXM4FW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
