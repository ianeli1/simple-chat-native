import * as firebase from "firebase";
import { firebaseConfig } from "./secretKey";

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const db = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();

//TODO: create a proxy object between the firebase SDK and the hook for caching

export class Handler3 {}
