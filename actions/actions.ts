"use server";

import { db } from "@/prisma/db";
import {
  MutationResponse,
  QueriesResponse,
  SingleQueryResponse,
} from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createContact(data: {
  name: string;
  email: string;
  phone: string;
  imageUrl?: string;
  notes?: string;
}): Promise<MutationResponse> {
  try {
    const contact = await db.contact.create({
      data,
    });
    return { success: true, data: contact };
  } catch (error) {
    console.error("Failed to create contact:", error);
    return { success: false, error: "Failed to create contact" };
  }
}

export async function getContacts(): Promise<QueriesResponse> {
  try {
    const contacts = await db.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { data: contacts };
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return { data: [], error: "Failed to fetch contacts" };
  }
}

export async function getContactById(id: string): Promise<SingleQueryResponse> {
  try {
    const contact = await db.contact.findUnique({
      where: { id },
    });
    if (!contact) {
      return { data: null, error: "Contact not found" };
    }
    return { data: contact };
  } catch (error) {
    console.error("Failed to fetch contact:", error);
    return { error: "Failed to fetch contact", data: null };
  }
}

export async function deleteContact(id: string) {
  try {
    await db.contact.delete({
      where: { id },
    });
    revalidatePath("/contacts");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete contact:", error);
    return { success: false, error: "Failed to delete contact" };
  }
}
