"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import {
  User,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { AppUser, UserRole } from "@/types/auth";

interface AuthContextValue {
  user: User | null;
  appUser: AppUser | null;
  role: UserRole | null;
  loading: boolean;
  signup: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadAppUser(firebaseUser: User) {
    const userRef = doc(db, "users", firebaseUser.uid);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      const data = snapshot.data();

      setAppUser({
        id: firebaseUser.uid,
        name: data.name ?? firebaseUser.displayName ?? "ClientPulse User",
        email: data.email ?? firebaseUser.email ?? "",
        role: (data.role as UserRole) ?? "viewer",
        workspaceId: data.workspaceId ?? "default-workspace",
        avatarUrl: data.avatarUrl ?? "",
      });
    } else {
      setAppUser(null);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      setUser(firebaseUser);

      if (firebaseUser) {
        await loadAppUser(firebaseUser);
      } else {
        setAppUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      appUser,
      role: appUser?.role ?? null,
      loading,
      signup: async (name: string, email: string, password: string) => {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const cleanName = name.trim();

        if (cleanName) {
          await updateProfile(result.user, {
            displayName: cleanName,
          });
        }

        await setDoc(doc(db, "users", result.user.uid), {
          name: cleanName || "ClientPulse User",
          email,
          role: "admin",
          workspaceId: "northstar-media",
          avatarUrl: "",
          createdAt: serverTimestamp(),
        });

        await loadAppUser(result.user);
      },
      login: async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
      },
      logout: async () => {
        await signOut(auth);
      },
    }),
    [user, appUser, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}