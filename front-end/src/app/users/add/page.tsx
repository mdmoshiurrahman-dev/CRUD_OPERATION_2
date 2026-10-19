"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AddUserPage() {
  const router = useRouter();
  const [values, setValues] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleChange =
    (field: "name" | "email") => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: { name?: string; email?: string } = {};
    if (values.name.trim().length < 3) {
      nextErrors.name = "Name must be at least 3 characters";
    }
    if (!EMAIL_REGEX.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address";
    }
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.email) return;

    setPending(true);
    setServerError(null);
    try {
      const res = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
        }),
      });
      const result = await res.json();
      setPending(false);
      if (result.insertedId) {
        router.refresh();
        router.push("/users");
      } else {
        setServerError("Could not add the user. Please try again.");
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
      setPending(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div className="mb-6 flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-sm">
            <UserPlus className="size-5" />
          </div>
          <div>
            <h1 className="font-heading text-xl font-semibold tracking-tight">
              Add user
            </h1>
            <p className="text-sm text-muted-foreground">
              Create a new user with a name and email.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={values.name}
                onChange={handleChange("name")}
                aria-invalid={!!errors.name}
                autoFocus
              />
              <FieldError>{errors.name}</FieldError>
            </Field>

            <Field data-invalid={!!errors.email}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={values.email}
                onChange={handleChange("email")}
                aria-invalid={!!errors.email}
              />
              <FieldError>{errors.email}</FieldError>
            </Field>
          </FieldGroup>

          {serverError && (
            <p role="alert" className="mt-4 text-sm text-destructive">
              {serverError}
            </p>
          )}

          <div className="mt-6 flex justify-end gap-2">
            <Link href="/users">
              <Button type="button" variant="outline" disabled={pending}>
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={pending}>
              {pending && <Loader2 className="animate-spin" />}
              Add user
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
