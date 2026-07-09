import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";

/**
 * Create a new user with email/password and immediately send a verification email.
 * Returns the Firebase User object.
 */
export async function signUpWithEmail(
  email: string,
  password: string,
): Promise<User> {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  // Send verification email right after account creation
  await sendEmailVerification(credential.user);
  return credential.user;
}

/**
 * Sign in an existing user with email/password.
 * Returns the Firebase User object.
 */
export async function loginWithEmail(
  email: string,
  password: string,
): Promise<User> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

/**
 * Sign out the current user. Clears all in-memory auth state.
 */
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Send a password reset email to the given address.
 * Does not reveal whether the email exists (Firebase default behavior).
 */
export async function resetUserPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Re-send the verification email to the currently signed-in user.
 * Throws if no user is signed in.
 */
export async function resendVerification(): Promise<void> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No authenticated user to send verification email to.");
  }
  await sendEmailVerification(user);
}

/**
 * Get a fresh Firebase ID token for the current user.
 * Automatically refreshes if the token is expired.
 * Returns null if no user is signed in.
 */
export async function getIdToken(
  forceRefresh = false,
): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken(forceRefresh);
}
