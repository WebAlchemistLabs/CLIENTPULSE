"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Building2, Shield, Users } from "lucide-react";
import { AdminClientRow } from "@/components/admin/admin-client-row";
import { UserCard } from "@/components/admin/user-card";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { PageSkeleton } from "@/components/shared/page-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { AppUser, UserRole } from "@/types/auth";
import { ClientRecord } from "@/types/client";

interface FirestoreUserRecord {
  name: string;
  email: string;
  role: UserRole;
  workspaceId: string;
  avatarUrl?: string;
}

const statCards = [
  {
    title: "Active Users",
    icon: Users,
  },
  {
    title: "Managed Clients",
    icon: Building2,
  },
  {
    title: "Admin Access",
    icon: Shield,
  },
];

export default function AdminPage() {
  const { appUser } = useAuth();
  const [users, setUsers] = useState<AppUser[]>([]);
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAdminData() {
      if (!appUser?.workspaceId) return;

      setLoading(true);
      setError("");

      try {
        const [usersSnapshot, clientsSnapshot] = await Promise.all([
          getDocs(
            query(
              collection(db, "users"),
              where("workspaceId", "==", appUser.workspaceId)
            )
          ),
          getDocs(
            query(
              collection(db, "clients"),
              where("workspaceId", "==", appUser.workspaceId)
            )
          ),
        ]);

        const userResults = usersSnapshot.docs.map((docItem) => {
          const data = docItem.data() as FirestoreUserRecord;

          return {
            id: docItem.id,
            name: data.name,
            email: data.email,
            role: data.role,
            workspaceId: data.workspaceId,
            avatarUrl: data.avatarUrl ?? "",
          } satisfies AppUser;
        });

        const clientResults = clientsSnapshot.docs.map((docItem) => {
          return docItem.data() as ClientRecord;
        });

        setUsers(userResults);
        setClients(clientResults);
      } catch (err) {
        console.error(err);
        setError("Failed to load admin workspace data.");
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, [appUser?.workspaceId]);

  const totalUsers = users.length;
  const totalClients = clients.length;
  const adminAccess = appUser?.role === "admin" ? "Enabled" : "Restricted";

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin"
        description="Review workspace-level users, client accounts, and internal administrative visibility across ClientPulse."
      />

      {loading ? (
        <PageSkeleton cards={3} layout="grid" />
      ) : error ? (
        <ErrorState
          title="Admin Workspace Unavailable"
          description={error}
        />
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-3">
            {statCards.map((item) => {
              const Icon = item.icon;

              let value = "";
              if (item.title === "Active Users") value = String(totalUsers);
              if (item.title === "Managed Clients") value = String(totalClients);
              if (item.title === "Admin Access") value = adminAccess;

              return (
                <Card key={item.title} className="border-white/10 bg-card/80">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div>
                      <CardDescription>{item.title}</CardDescription>
                      <CardTitle className="mt-2 text-2xl">{value}</CardTitle>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </section>

          <section className="grid gap-4 xl:grid-cols-3">
            <Card className="xl:col-span-2 border-white/10 bg-card/80">
              <CardHeader>
                <CardTitle>User Directory</CardTitle>
                <CardDescription>
                  Members currently associated with this ClientPulse workspace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {users.length === 0 ? (
                  <EmptyState
                    title="No Users Found"
                    description="No users were found in this workspace."
                  />
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {users.map((userItem) => (
                      <UserCard key={userItem.id} user={userItem} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-card/80">
              <CardHeader>
                <CardTitle>Workspace Summary</CardTitle>
                <CardDescription>
                  High-level operational view of this admin environment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-xl border border-border bg-background/50 p-4">
                  <p className="text-sm text-muted-foreground">Workspace ID</p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {appUser?.workspaceId ?? "unknown"}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-background/50 p-4">
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {totalUsers}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-background/50 p-4">
                  <p className="text-sm text-muted-foreground">Total Clients</p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {totalClients}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card className="border-white/10 bg-card/80">
              <CardHeader>
                <CardTitle>Client Management</CardTitle>
                <CardDescription>
                  View performance and health across active client accounts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {clients.length === 0 ? (
                  <EmptyState
                    title="No Client Records Found"
                    description="No client records were found in this workspace."
                  />
                ) : (
                  <div className="space-y-3">
                    {clients.map((client) => (
                      <AdminClientRow key={client.id} client={client} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </>
      )}
    </div>
  );
}