import app from "../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

export const createUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      return resolve(user);
    } catch (err) {
      console.log(err.message);
      return reject(err.message);
    }
  });
};

export const signInUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      return resolve(user);
    } catch (err) {
      console.log(err.message);
      return reject(err.message);
    }
  });
};

export const signOutUser = () => {
  localStorage.clear();
  auth.signOut();
  window.location.reload();
};
