"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { NotificationRecord } from "@/types/notification";

export function useNotifications() {
  const { appUser } = useAuth();
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!appUser?.workspaceId) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const notificationsQuery = query(
      collection(db, "notifications"),
      where("workspaceId", "==", appUser.workspaceId)
    );

    const unsubscribe = onSnapshot(
      notificationsQuery,
      (snapshot) => {
        const results = snapshot.docs.map((docItem) => {
          return docItem.data() as NotificationRecord;
        });

        results.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

        setNotifications(results);
        setLoading(false);
      },
      (error) => {
        console.error("Failed to load notifications:", error);
        setNotifications([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [appUser?.workspaceId]);

  const unreadCount = notifications.filter((item) => !item.read).length;

  return {
    notifications,
    setNotifications,
    unreadCount,
    loading,
  };
}