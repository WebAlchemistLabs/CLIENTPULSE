import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SettingsSectionCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function SettingsSectionCard({
  title,
  description,
  children,
}: SettingsSectionCardProps) {
  return (
    <Card className="border-white/10 bg-card/80">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}