import "server-only";
import { db } from "./db";
import { canAccessCategory } from "./access";
import type { CurrentUser } from "./auth";
import { TOOLKIT_SLUG, parseSrma } from "./srma-config";
export async function getSrmaConfig() {
  return parseSrma((await db.setting.findUnique({ where: { key: "srma.config" } }))?.value);
}
export async function toolkitCategory() {
  return db.category.findFirst({ where: { slug: TOOLKIT_SLUG, published: true, track: { published: true } } });
}
export async function requireToolkit(user: CurrentUser) {
  const category = await toolkitCategory();
  if (!category || !(await canAccessCategory(user, category.id))) throw new Error("Akses Toolkit SR-MA belum tersedia.");
  return category;
}
