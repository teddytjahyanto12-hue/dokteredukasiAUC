"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export async function toggleAcceptingAction() {
  const user = await requireUser(["TUTOR"]);
  const profile = await db.tutorProfile.findUnique({ where: { userId: user.id } });
  if (!profile) return;
  await db.tutorProfile.update({ where: { id: profile.id }, data: { acceptingClients: !profile.acceptingClients } });
  revalidatePath("/tutor-panel");
}
