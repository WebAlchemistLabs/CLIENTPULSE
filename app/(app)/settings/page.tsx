"use client";

import { FormEvent, useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { PageHeader } from "@/components/layout/page-header";
import { SettingsSectionCard } from "@/components/settings/settings-section-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";

export default function SettingsPage() {
  const { appUser, user, refreshAppUser } = useAuth();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (appUser?.name) {
      setName(appUser.name);
    }
  }, [appUser?.name]);

  async function handleProfileSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (!user || !appUser) {
        throw new Error("No active user found.");
      }

      const cleanName = name.trim();

      await updateDoc(doc(db, "users", user.uid), {
        name: cleanName,
      });

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: cleanName,
        });
      }

      await refreshAppUser(user.uid);
      setMessage("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Manage account preferences, workspace identity, and profile settings for your ClientPulse environment."
      />

      {error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      ) : null}

      {message ? (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          {message}
        </div>
      ) : null}

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SettingsSectionCard
            title="Profile Information"
            description="Update the personal details shown in your ClientPulse workspace."
          >
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <Input value={appUser?.email ?? ""} disabled readOnly />
              </div>

              <div className="flex justify-start">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </SettingsSectionCard>
        </div>

        <div className="space-y-4">
          <SettingsSectionCard
            title="Account Role"
            description="Your current access level inside this workspace."
          >
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/40 p-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Access Role
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Role-based access is now active across ClientPulse.
                </p>
              </div>

              <Badge variant="secondary">
                {appUser?.role ?? "unknown"}
              </Badge>
            </div>
          </SettingsSectionCard>

          <SettingsSectionCard
            title="Workspace"
            description="Current workspace context for this account."
          >
            <div className="rounded-2xl border border-border bg-background/40 p-4">
              <p className="text-sm text-muted-foreground">Workspace ID</p>
              <p className="mt-2 text-sm font-medium text-foreground">
                {appUser?.workspaceId ?? "unknown-workspace"}
              </p>
            </div>
          </SettingsSectionCard>
        </div>
      </section>
    </div>
  );
}