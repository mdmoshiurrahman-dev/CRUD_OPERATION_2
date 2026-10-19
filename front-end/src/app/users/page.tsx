import UserCart from "@/components/UserCart";
import { Button } from "@/components/ui/button";
import { userData } from "@/types/userData";
import { Plus, Users } from "lucide-react";
import Link from "next/link";

const DisplayUsersData = async () => {
  const res = await fetch("http://localhost:5000/", { cache: "no-store" });
  const users: userData = await res.json();

  return (
    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Users
          </h1>
          <p className="text-sm text-muted-foreground">
            {users.length} {users.length === 1 ? "user" : "users"} in total
          </p>
        </div>
        <Link href="/users/add">
          <Button>
            <Plus />
            Add user
          </Button>
        </Link>
      </header>

      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Users className="size-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">No users yet</p>
            <p className="text-sm text-muted-foreground">
              Add your first user to get started.
            </p>
          </div>
          <Link href="/users/add">
            <Button variant="outline" size="sm">
              <Plus />
              Add user
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users.map((user) => (
            <UserCart key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayUsersData;
