"use client";
import React from "react";
import { Sidebar } from "./sidebar";
import { Contact } from "@prisma/client";
import { Button } from "./ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { DeleteButton } from "./delete-button";
import { useContact } from "@/hooks/useContacts";
import { notFound } from "next/navigation";

export default function ContactDetailPage({ id }: { id: string }) {
  const { contact, isLoading, error } = useContact(id);
  console.log(contact, id);
  if (isLoading) {
    return (
      <>
        <Sidebar count={0} />
        <main className="flex-1 ml-64 flex items-center justify-center min-h-96">
          <div className="">
            <p>Loading...</p>
          </div>
        </main>
      </>
    );
  }
  if (error) {
    return <div>Error: {error as string}</div>;
  }
  if (!contact) {
    return notFound();
  }
  return (
    <>
      <Sidebar count={0} />
      <main className="flex-1 ml-64">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
                {contact.name[0]}
              </div>
              <h1 className="text-2xl font-semibold">{contact.name}</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/contacts/${contact.id}/edit`}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </Button>
              <DeleteButton id={contact.id} />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-medium text-muted-foreground mb-2">
                Contact details
              </h2>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="w-24 text-sm">Email</div>
                  <div>{contact.email}</div>
                </div>
                <div className="flex gap-2">
                  <div className="w-24 text-sm">Phone</div>
                  <div>{contact.phone}</div>
                </div>
                <div className="flex gap-2">
                  <div className="w-24 text-sm">Image URL</div>
                  <div>{contact.imageUrl || "N/A"}</div>
                </div>
                {contact.notes && (
                  <div className="flex gap-2">
                    <div className="w-24 text-sm">Notes</div>
                    <div>{contact.notes}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
