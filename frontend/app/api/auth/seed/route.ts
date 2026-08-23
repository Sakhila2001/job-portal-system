import { NextResponse } from "next/server";
import { seedAdmin } from "@/scripts/seeds/admin.seeder";

export async function POST() {
  try {
    const admin = await seedAdmin();
    return NextResponse.json({
      message: "Admin seeder executed successfully.",
      admin: { id: admin.id, email: admin.email, role: admin.role },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Seeder failed.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
