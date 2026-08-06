import type { Request, Response } from "express";
import { seedAdmin } from "../../../seeds/admin.seeder.js";

export async function seedAdminHandler(_req: Request, res: Response) {
  try {
    const admin = await seedAdmin();
    res.status(200).json({
      message: "Admin seeder executed successfully.",
      admin: { id: admin.id, email: admin.email, role: admin.role },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Seeder failed.";
    res.status(500).json({ message });
  }
}