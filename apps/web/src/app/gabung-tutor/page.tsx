import { getSettings, whatsappLink } from "@/lib/settings";

export const metadata = { title: "Jadi Tutor" };

const TRACKS = [
  { title: "Clinical Practice (spesialis)", end: "Penetapan rate bimbingan clinical." },
  { title: "Preklinik", end: "Penetapan rate bimbingan materi preklinik, lalu akses materi Preklinik." },
  { title: "Research: Review / Original Research", end: "Penetapan rate bimbingan Zoom, lalu akses materi research yang dikuasai." },
];

const STEPS = ["Isi pendaftaran di Google Form", "Informasi seleksi via WhatsApp", "Interview Zoom", "Offering letter"];

export default async function JoinTutorPage() {
  const s = await getSettings();
  const wa = whatsappLink(s.adminWhatsapp, "Halo admin, saya ingin mendaftar sebagai tutor.");
  return (
    <div className="container-page py-10">
      <h1 className="h1">Bergabung sebagai tutor</h1>
      <p className="mt-2 max-w-2xl text-slate-600">Kami membuka seleksi tutor untuk tiga jalur. Alur seleksi sama untuk semua jalur.</p>

      <ol className="mt-8 grid gap-4 sm:grid-cols-4">
        {STEPS.map((step, i) => (
          <li key={step} className="card">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-mascot text-sm font-bold text-ink">{i + 1}</span>
            <p className="mt-3 font-medium text-slate-800">{step}</p>
          </li>
        ))}
      </ol>

      <h2 className="h2 mt-10">Jalur tutor</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {TRACKS.map((t) => (
          <div key={t.title} className="card">
            <h3 className="font-semibold text-slate-900">{t.title}</h3>
            <p className="mt-2 text-sm text-slate-600">Setelah offering letter: {t.end}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {s.tutorFormUrl ? (
          <a href={s.tutorFormUrl} target="_blank" rel="noopener noreferrer" className="btn">
            Isi formulir pendaftaran
          </a>
        ) : (
          <p className="rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-900">Formulir pendaftaran tutor akan segera dibuka.</p>
        )}
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            Tanya admin via WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
