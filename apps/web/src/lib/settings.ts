import "server-only";
import { cache } from "react";
import { db } from "./db";
import { SETTING_DEFAULTS, type SettingKey } from "./constants";

export type Settings = Record<SettingKey, string>;

export const getSettings = cache(async (): Promise<Settings> => {
  const rows = await db.setting.findMany();
  const result: Settings = { ...SETTING_DEFAULTS };
  for (const row of rows) {
    if (row.key in result) result[row.key as SettingKey] = row.value;
  }
  return result;
});

export function whatsappLink(number: string, text?: string) {
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
