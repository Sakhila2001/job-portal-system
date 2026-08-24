import { z } from "zod";
import { Prisma } from "@prisma/client";

export function formatErrorMessage(error: unknown, defaultMessage = "Request failed."): string {
  if (error instanceof z.ZodError) {
    return error.issues
      .map((issue) => {
        const fieldName = issue.path.filter((p) => typeof p === "string").pop();
        const prefix = fieldName ? `${String(fieldName)}: ` : "";
        return `${prefix}${issue.message}`;
      })
      .join(". ");
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const target = Array.isArray(error.meta?.target)
        ? (error.meta.target as string[]).join(", ")
        : (error.meta?.target as string) || "field";
      if (target.includes("slug") || target.includes("displayName") || target.includes("legalName")) {
        return "A company with this name is already registered.";
      }
      if (target.includes("email")) {
        return "This email is already registered.";
      }
      return `A record with this ${target} already exists.`;
    }
  }

  if (error instanceof Error) {
    const msg = error.message;
    if (typeof msg === "string") {
      if (msg.includes("Unique constraint failed on the fields")) {
        if (msg.includes("slug") || msg.includes("displayName")) {
          return "A company with this name is already registered.";
        }
        return "A record with this information already exists.";
      }

      if (msg.trim().startsWith("[") && msg.trim().endsWith("]")) {
        try {
          const parsed = JSON.parse(msg) as Array<{ path?: Array<string | number>; message?: string }>;
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed
              .map((p) => {
                const fieldName = p.path ? p.path.filter((x) => typeof x === "string").pop() : "";
                const prefix = fieldName ? `${String(fieldName)}: ` : "";
                return `${prefix}${p.message || "Invalid input"}`;
              })
              .filter(Boolean)
              .join(". ");
          }
        } catch {
          // Fallback
        }
      }
    }
    return msg;
  }

  return defaultMessage;
}
