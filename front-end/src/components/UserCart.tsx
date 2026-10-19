"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { userSingleData } from "@/types/userData";
import { Mail } from "lucide-react";
import Link from "next/link";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { DialogBox } from "./UserEditDiaglog";

const GRADIENTS = [
  "from-violet-500 to-indigo-500",
  "from-sky-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-fuchsia-500 to-purple-500",
];

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const getGradient = (id: string) => {
  const hash = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return GRADIENTS[hash % GRADIENTS.length];
};

function UserCart({ user }: { user: userSingleData }) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-3">
        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${getGradient(
            user._id,
          )} text-sm font-medium text-white shadow-sm`}
        >
          {getInitials(user.name)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-heading font-medium">{user.name}</h3>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Mail className="size-3.5 shrink-0" />
            <span className="truncate">{user.email}</span>
          </p>
        </div>
      </div>

      <Separator />

      <div className="flex items-center gap-2">
        <Link href={`/users/${user._id}`} className="flex-1">
          <Button className="w-full" size="sm">
            View profile
          </Button>
        </Link>
        <DialogBox user={user} />
        <DeleteConfirmDialog user={user} />
      </div>
    </article>
  );
}

export default UserCart;
