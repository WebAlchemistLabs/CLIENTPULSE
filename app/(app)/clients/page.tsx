"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ClientCard } from "@/components/clients/client-card";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { PageSkeleton } from "@/components/shared/page-skeleton";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { ClientRecord } from "@/types/client";

export default function ClientsPage() {
  const { appUser } = useAuth();
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadClients() {
      if (!appUser?.workspaceId) return;

      setLoading(true);
      setError("");

      try {
        const clientsQuery = query(
          collection(db, "clients"),
          where("workspaceId", "==", appUser.workspaceId)
        );

        const snapshot = await getDocs(clientsQuery);
        const results = snapshot.docs.map((docItem) => {
          return docItem.data() as ClientRecord;
        });

        setClients(results);
      } catch (err) {
        console.error(err);
        setError("Failed to load clients.");
      } finally {
        setLoading(false);
      }
    }

    loadClients();
  }, [appUser?.workspaceId]);

  const filteredClients = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return clients;

    return clients.filter((client) => {
      return (
        client.name.toLowerCase().includes(term) ||
        client.industry.toLowerCase().includes(term) ||
        client.status.toLowerCase().includes(term)
      );
    });
  }, [clients, search]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Clients"
        description="Manage active client accounts, review performance health, and move into deeper reporting views."
      />

      <Card className="border-white/10 bg-card/80">
        <CardHeader>
          <CardTitle>Client Directory</CardTitle>
          <CardDescription>
            Search and review client performance snapshots across your workspace.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search clients, industries, or status..."
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <PageSkeleton cards={4} layout="grid" />
      ) : error ? (
        <ErrorState
          title="Clients Unavailable"
          description={error}
        />
      ) : filteredClients.length === 0 ? (
        <EmptyState
          title="No Clients Found"
          description="No clients matched your search. Try a different keyword."
        />
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </section>
      )}
    </div>
  );
}