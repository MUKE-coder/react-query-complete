import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar";
import { getContactById } from "@/actions/actions";
import { DeleteButton } from "@/components/delete-button";
import { notFound } from "next/navigation";
import ContactDetailPage from "@/components/contact-detail";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const contactId = (await params).id;

  if (!contactId) {
    return notFound();
  }

  return <ContactDetailPage id={contactId} />;
}
