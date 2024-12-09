import { Contact } from "@prisma/client";

// Server action return types
export type QueriesResponse = {
  data: Contact[];
  error?: string;
};

// For single contact queries
export type SingleQueryResponse = {
  data: Contact | null;
  error?: string;
};

// For mutation operations
export type MutationResponse = {
  success: boolean;
  data?: Contact;
  error?: string;
};
