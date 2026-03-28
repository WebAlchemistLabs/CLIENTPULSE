import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsZCev3zKXb7DCTIIjAeuwPv1a4coNSWY",
  authDomain: "clientpulse-eba9e.firebaseapp.com",
  projectId: "clientpulse-eba9e",
  storageBucket: "clientpulse-eba9e.firebasestorage.app",
  messagingSenderId: "274688032050",
  appId: "1:274688032050:web:c5b3ca0995123f92f4eb2b",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export { app };