import * as firebase from "firebase";
import { firebaseConfig } from "./secretKey";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

/**
 *
 * @param email The user's email
 * @param password The user's password
 *
 * @returns {string} Firebase JWT Token
 *
 * @throws `invalid-email` if the email address is not valid.
 * @throws `user-disabled` Thrown if the user corresponding to the given email has been disabled.
 * @throws `user-not-found` Thrown if there is no user corresponding to the given email.
 * @throws `wrong-password` Thrown if the password is invalid for the given email, or the account corresponding to the email does not have a password set.
 */
export async function signIn(email: string, password: string) {
  try {
    const u = await auth.signInWithEmailAndPassword(email, password);

    /**safas */
    return await u.user?.getIdToken(true);
  } catch (e) {
    if (e.code) {
      //get the last part of "auth/what-went-wrong"
      throw e.code.split("/").pop();
    } else {
      throw e;
    }
  }
}
