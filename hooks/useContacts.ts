// app/hooks/useContacts.ts
"use client";

import { createContact, getContactById, getContacts } from "@/actions/actions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useContacts() {
  const queryClient = useQueryClient();

  // Query for fetching all contacts
  const contactsQuery = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  // Create contact mutation
  const createContactMutation = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  // Update contact mutation
  // const updateContactMutation = useMutation({
  //   mutationFn: ({ id, data }: { id: string; data: Partial<Contact> }) =>
  //     updateContact(id, data),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["contacts"] });
  //   },
  // });

  // Delete contact mutation
  // const deleteContactMutation = useMutation({
  //   mutationFn: deleteContact,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["contacts"] });
  //   },
  // });

  return {
    // Queries
    contacts: contactsQuery.data?.data ?? [],
    isLoading: contactsQuery.isLoading,
    error: contactsQuery.error || contactsQuery.data?.error,

    // Mutations
    createContact: createContactMutation.mutate,
    // updateContact: updateContactMutation.mutate,
    // deleteContact: deleteContactMutation.mutate,

    // Mutation states
    isCreating: createContactMutation.isPending,
    // isUpdating: updateContactMutation.isPending,
    // isDeleting: deleteContactMutation.isPending,
  };
}

// Hook for fetching a single contact
export function useContact(id: string) {
  const queryClient = useQueryClient();
  const contactQuery = useQuery({
    queryKey: ["contact", id],
    queryFn: () => getContactById(id),
    select: (response) => ({
      contact: response.data,
      error: response.error,
    }),
  });
  return {
    contact: contactQuery.data?.contact,
    error: contactQuery.error || contactQuery.data?.error,
    isLoading: contactQuery.isLoading,
  };
}
