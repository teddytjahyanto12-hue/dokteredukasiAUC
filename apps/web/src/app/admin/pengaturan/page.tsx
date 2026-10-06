import { requirePermission } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { SETTING_DEFAULTS, SETTING_LABEL, type SettingKey } from "@/lib/constants";
import { saveSettingsAction } from "@/app/actions/admin";
import { Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Pengaturan" };

const LONG: SettingKey[] = ["heroSubtitle", "paymentInstructions", "offerSubtitle", "offerBenefits"];
const TALL: SettingKey[] = ["waConfirmTemplate"];
const YES_NO: SettingKey[] = ["sendReceiptEmail"];
const CHOICES: Partial<Record<SettingKey, [string, string][]>> = {
  reportEmailSchedule: [
    ["tidak", "Tidak dikirim"],
    ["mingguan", "Mingguan"],
    ["bulanan", "Bulanan"],
    ["keduanya", "Mingguan dan bulanan"],
  ],
};

export default async function AdminSettings({ searchParams }: { searchParams: SearchParams }) {
  await requirePermission("admin.settings");
  const { pesan, tipe } = await readFlash(searchParams);
  const s = await getSettings();
  return (
    <>
      <PageHeader title="Pengaturan situs" subtitle="Teks dan kontak yang tampil di website. Perubahan langsung berlaku." />
      <Flash pesan={pesan} tipe={tipe} />
      <form action={saveSettingsAction} className="card space-y-4">
        {(Object.keys(SETTING_DEFAULTS) as SettingKey[]).map((key) => (
          <Field key={key} label={SETTING_LABEL[key]}>
            {YES_NO.includes(key) ? (
              <select className="input max-w-xs" name={key} defaultValue={s[key]}>
                <option value="ya">Ya</option>
                <option value="tidak">Tidak</option>
              </select>
            ) : CHOICES[key] ? (
              <select className="input max-w-xs" name={key} defaultValue={s[key]}>
                {CHOICES[key]!.map(([v, label]) => (
                  <option key={v} value={v}>
                    {label}
                  </option>
                ))}
              </select>
            ) : TALL.includes(key) ? (
              <textarea className="input font-mono text-xs" name={key} rows={18} defaultValue={s[key]} />
            ) : LONG.includes(key) ? (
              <textarea className="input" name={key} rows={key === "offerBenefits" ? 6 : 3} defaultValue={s[key]} />
            ) : (
              <input className="input" name={key} defaultValue={s[key]} />
            )}
          </Field>
        ))}
        <button className="btn" type="submit">
          Simpan pengaturan
        </button>
      </form>
    </>
  );
}
