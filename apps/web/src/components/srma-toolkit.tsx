"use client";
import { useEffect, useRef, useState } from "react";
import { saveResearchProject } from "@/app/actions/srma";
import type { SrmaConfig, ToolId } from "@/lib/srma-config";
import { parseReferences, deduplicateReferences, referencesRis, screeningCsv, continuousEffect, changeSd, type Reference } from "@/lib/research-tools";
import { wordTemplate } from "@/lib/word-template";
type Project = { id: string; tool: ToolId; title: string; data: string; updatedAt: string };
function download(name: string, data: string | Uint8Array, type = "text/plain;charset=utf-8") {
  const blob = new Blob([typeof data === "string" ? data : new Uint8Array(data).buffer], { type });
  const url = URL.createObjectURL(blob), a = document.createElement("a"); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function SrmaToolkit({ config, initialProjects }: { config: SrmaConfig; initialProjects: string[] }) {
  const visible = config.tools.filter(t => t.published);
  const [active, setActive] = useState<ToolId | null>(null);
  const [projects, setProjects] = useState(initialProjects);
  const [projectId, setProjectId] = useState(""); const [revision, setRevision] = useState<string | null>(null);
  const [title, setTitle] = useState(""); const [answers, setAnswers] = useState<string[]>([]); const [step, setStep] = useState(0);
  const [refs, setRefs] = useState<Reference[]>([]); const [duplicates, setDuplicates] = useState<{ kept: Reference; removed: Reference }[]>([]);
  const [index, setIndex] = useState(0); const [query, setQuery] = useState(""); const [group, setGroup] = useState("");
  const [status, setStatus] = useState(""); const [busy, setBusy] = useState(false); const [dirty, setDirty] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);
  const latest = useRef("");
  latest.current = JSON.stringify({ active, title, data: active === "idea" ? { answers } : { refs, index } });
  const tool = visible.find(t => t.id === active), current = refs[index];
  const parsed: Project[] = projects.map(p => JSON.parse(p));
  function choose(id: ToolId | null) {
    if (busy) return false;
    if (dirty && !window.confirm("Ada perubahan yang belum disimpan. Tetap berpindah?")) return false;
    setActive(id); setProjectId(""); setRevision(null); setTitle(""); setAnswers([]); setStep(0); setStatus(""); setQuery(""); setGroup(""); setDirty(false); setAutoPaused(false);
    return true;
  }
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener("beforeunload", warn); return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  function decide(decision: Reference["decision"]) {
    if (!current) return;
    setRefs(list => list.map((r, i) => i === index ? { ...r, decision } : r)); setDirty(true);
    setIndex(Math.min(index + 1, refs.length - 1));
  }
  useEffect(() => {
    if (active !== "screening") return;
    function key(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey || (e.target instanceof HTMLElement && (e.target.matches("input,textarea,select,button") || e.target.isContentEditable))) return;
      const value = ({ i: "include", m: "maybe", e: "exclude" } as const)[e.key.toLowerCase() as "i" | "m" | "e"];
      if (value) { e.preventDefault(); decide(value); }
    }
    window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key);
    // State is intentionally captured for the displayed reference.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, index, refs]);
  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setStatus("");
    try {
      if (Array.from(files).some(f => !/\.(ris|nbib|txt)$/i.test(f.name)) || Array.from(files).reduce((n, f) => n + f.size, 0) > 50 * 1024 * 1024) throw Error("Pilih RIS/NBIB/TXT dengan total maksimal 50 MB.");
      const all = (await Promise.all(Array.from(files).map(async f => parseReferences(await f.text())))).flat();
      if (!all.length || all.length > 10000) throw Error("Tidak ada referensi terbaca atau jumlah melebihi 10.000.");
      const result = deduplicateReferences(all); setRefs(result.unique); setDuplicates(result.duplicates); setIndex(0); setDirty(active === "screening");
      setStatus(`${all.length} referensi terbaca; ${result.unique.length} unik, ${result.duplicates.length} duplikat.`);
    } catch (e) { setStatus(e instanceof Error ? e.message : "Berkas gagal dibaca."); }
  }
  function restoreDuplicate(index: number) {
    const pair = duplicates[index];
    if (!pair) return;
    setRefs(list => [...list, { ...pair.removed, id: `restored-${crypto.randomUUID()}` }]);
    setDuplicates(list => list.filter((_, i) => i !== index));
    setStatus("Referensi dikembalikan ke daftar. Tinjau pasangan lain sebelum screening.");
  }
  async function save() {
    if (!active || !["idea", "screening"].includes(active)) return;
    setBusy(true); setStatus("");
    const snapshot = latest.current;
    try {
      const id = projectId || crypto.randomUUID();
      const value = await saveResearchProject({ id, tool: active, title, data: JSON.stringify(active === "idea" ? { answers } : { refs, index }), revision });
      setProjects(p => [...p.filter(v => JSON.parse(v).id !== id), value]); setProjectId(id); setRevision(value); setDirty(latest.current !== snapshot); setAutoPaused(false); setStatus("Proyek tersimpan.");
    } catch (e) { setAutoPaused(true); setStatus(e instanceof Error ? e.message : "Penyimpanan gagal."); } finally { setBusy(false); }
  }
  useEffect(() => {
    if (!dirty || busy || autoPaused || !title.trim() || !active || !["idea", "screening"].includes(active)) return;
    const timer = setTimeout(() => { void save(); }, 1500);
    return () => clearTimeout(timer);
    // Re-arm only when editable data changes, not on unrelated renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirty, busy, autoPaused, title, active, answers, refs]);
  function load(id: string) {
    if (busy) return;
    if (dirty && !window.confirm("Ada perubahan belum disimpan. Muat proyek lain?")) return;
    const value = projects.find(p => JSON.parse(p).id === id);
    if (!value) { setProjectId(""); setRevision(null); setTitle(""); setAnswers([]); setRefs([]); setIndex(0); setDirty(false); return; }
    const p: Project = JSON.parse(value), data = JSON.parse(p.data);
    setProjectId(p.id); setRevision(value); setTitle(p.title); setAnswers(data.answers ?? []); setRefs(data.refs ?? []); setIndex(data.index ?? 0); setDirty(false); setStatus(""); setAutoPaused(false);
  }
  if (!tool) return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{visible.map((t, i) => <button key={t.id} onClick={() => choose(t.id)} className="card text-left transition hover:border-mascot"><span className="badge-brand">{i + 1}</span><h2 className="h2 mt-3">{t.title}</h2><p className="mt-2 text-sm text-slate-600">{t.description}</p><span className="mt-5 block text-sm font-semibold text-brand">Buka alat →</span></button>)}</div>;
  const entries = active === "faq" ? config.faq : config.templates;
  return <div className="space-y-5">
    <button className="btn-secondary" onClick={() => choose(null)}>← Semua alat</button>
    <section className="card"><h2 className="h2">{tool.title}</h2><p className="mt-2 text-slate-600">{tool.description}</p><details className="mt-4 text-sm"><summary className="cursor-pointer font-semibold">Cara menggunakan</summary><p className="mt-2 whitespace-pre-line">{tool.help}</p></details></section>
    {status && <p role="status" className="rounded-xl bg-brand-soft p-4 text-sm">{status}</p>}
    {(active === "idea" || active === "screening") && <section className="card grid gap-3 sm:grid-cols-2"><label>Proyek tersimpan<select className="input mt-1" value={projectId} onChange={e => load(e.target.value)}><option value="">Proyek baru</option>{parsed.filter(p => p.tool === active).map(p => <option key={p.id} value={p.id}>{p.title}</option>)}</select></label><label>Nama proyek<input className="input mt-1" maxLength={150} value={title} onChange={e => { setTitle(e.target.value); setDirty(true); }} /></label><p className="text-xs text-slate-500">Maksimal 5 proyek per alat. Tersimpan otomatis setelah nama proyek diisi.</p><button className="btn-primary" disabled={busy || !title.trim()} onClick={save}>{busy ? "Menyimpan…" : dirty ? "Simpan perubahan" : "Simpan proyek"}</button></section>}
    {active === "idea" && <section className="card"><p className="text-sm text-brand">Langkah {step + 1} dari {config.questions.length}</p><h3 className="mt-3 text-lg font-semibold">{config.questions[step]}</h3><textarea aria-label="Jawaban ide riset" className="input mt-4" rows={7} value={answers[step] ?? ""} onChange={e => { setAnswers(a => { const n = [...a]; n[step] = e.target.value; return n; }); setDirty(true); }} /><div className="mt-4 flex flex-wrap gap-3"><button className="btn-secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>Sebelumnya</button><button className="btn-primary" disabled={step === config.questions.length - 1} onClick={() => setStep(step + 1)}>Berikutnya</button><button className="btn-secondary" onClick={() => download("ide-riset.txt", config.questions.map((q, i) => `${q}\n${answers[i] ?? ""}`).join("\n\n"))}>Unduh rangkuman</button></div></section>}
    {(active === "dedup" || active === "screening") && <section className="card"><label className="label">Impor referensi RIS atau NBIB<input className="input mt-2" type="file" multiple accept=".ris,.nbib,.txt" onChange={e => { void upload(e.target.files); e.target.value = ""; }} /></label><p className="mt-2 text-xs text-slate-500">Deduplikasi diproses di browser. Screening dikirim ke server saat penyimpanan otomatis atau manual. Impor mengganti daftar yang sedang dibuka.</p>{refs.length > 0 && <div className="mt-4 flex flex-wrap gap-3"><button className="btn-secondary" onClick={() => download("referensi-unik.ris", referencesRis(refs))}>Unduh RIS</button>{active === "dedup" && <button className="btn-primary" onClick={() => { if (choose("screening")) setDirty(true); }}>Lanjut ke screening</button>}{active === "screening" && <><button className="btn-secondary" onClick={() => download("screening.csv", screeningCsv(refs), "text/csv;charset=utf-8")}>Unduh keputusan CSV</button><button className="btn-secondary" onClick={() => download("included.ris", referencesRis(refs.filter(r => r.decision === "include")))}>RIS yang dimasukkan</button></>}</div>}</section>}
    {active === "dedup" && refs.length > 0 && <section className="card"><h3 className="h2">Tinjau hasil</h3><p className="mt-2 text-sm">{refs.length} referensi dipertahankan · {duplicates.length} duplikat disisihkan. Metadata tanpa DOI, penulis, atau tahun perlu pemeriksaan manual.</p><details className="mt-4"><summary>Pasangan duplikat</summary><ul className="mt-3 space-y-3">{duplicates.slice(0, 100).map((d, i) => <li key={i} className="text-sm">Dipertahankan: {d.kept.title}<br />Digabung: {d.removed.title}<button className="btn-secondary btn-sm mt-2 block" onClick={() => restoreDuplicate(i)}>Pertahankan terpisah</button></li>)}</ul></details></section>}
    {active === "screening" && current && <section className="card"><div className="flex flex-wrap gap-3 text-sm">{["include", "maybe", "exclude", ""].map(d => <span key={d}>{d || "Belum dinilai"}: {refs.filter(r => r.decision === d).length}</span>)}</div><label className="mt-4 block text-sm">Referensi<select className="input mt-1" value={index} onChange={e => setIndex(Number(e.target.value))}>{refs.map((r, i) => <option key={r.id} value={i}>{i + 1}. {r.title.slice(0, 100)} [{r.decision || "belum"}]</option>)}</select></label><h3 className="mt-5 text-xl font-semibold">{current.title}</h3><p className="mt-2 text-sm text-slate-500">{current.authors.join("; ")} · {current.year}</p><p className="mt-4 whitespace-pre-line leading-relaxed">{current.abstract || "Abstrak tidak tersedia. Periksa sumber asli."}</p><label className="mt-4 block text-sm">Alasan / catatan seleksi<textarea className="input mt-1" value={current.reason} onChange={e => { setRefs(r => r.map((v, i) => i === index ? { ...v, reason: e.target.value } : v)); setDirty(true); }} /></label><div className="mt-4 flex flex-wrap gap-3"><button className="btn-primary" onClick={() => decide("include")}>Masukkan (I)</button><button className="btn-secondary" onClick={() => decide("maybe")}>Tinjau lagi (M)</button><button className="btn-secondary" onClick={() => decide("exclude")}>Keluarkan (E)</button><button className="btn-secondary" disabled={!index} onClick={() => setIndex(index - 1)}>← Sebelumnya</button></div><p className="mt-3 text-xs text-slate-500">Keputusan tersimpan otomatis setelah proyek diberi nama; tombol Simpan perubahan juga tersedia. Rating AI belum diaktifkan.</p></section>}
    {active === "converter" && <EffectConverter />}
    {(active === "faq" || active === "templates") && <section className="card"><div className="grid gap-3 sm:grid-cols-2"><input aria-label="Cari pustaka" className="input" placeholder="Cari topik atau judul…" value={query} onChange={e => setQuery(e.target.value)} /><select aria-label="Kelompok pustaka" className="input" value={group} onChange={e => setGroup(e.target.value)}><option value="">Semua kelompok</option>{[...new Set(entries.map(e => e.group))].map(g => <option key={g}>{g}</option>)}</select></div><div className="mt-4 space-y-3">{entries.filter(e => (!group || e.group === group) && `${e.title} ${e.body}`.toLowerCase().includes(query.toLowerCase())).map((entry, i) => <details key={i} className="rounded-xl border p-4"><summary className="cursor-pointer font-semibold">{entry.title}<span className="ml-2 text-xs font-normal text-slate-500">{entry.group}</span></summary><p className="mt-3 whitespace-pre-line text-sm leading-relaxed">{entry.body}</p><div className="mt-4 flex gap-3">{entry.url && <a className="link" href={entry.url} target="_blank" rel="noopener noreferrer">Buka sumber / berkas ↗</a>}{active === "templates" && <button className="btn-secondary btn-sm" onClick={() => download("template-srma.docx", wordTemplate(entry.title, entry.body), "application/vnd.openxmlformats-officedocument.wordprocessingml.document")}>Unduh kerangka DOCX</button>}</div></details>)}</div>{!entries.some(e => (!group || e.group === group) && `${e.title} ${e.body}`.toLowerCase().includes(query.toLowerCase())) && <p className="mt-4 text-sm">Tidak ada hasil yang cocok.</p>}</section>}
  </div>;
}
function EffectConverter() {
  const [mode, setMode] = useState("effect"), [values, setValues] = useState<Record<string, string>>({}), [result, setResult] = useState("");
  const modes: Record<string, { title: string; fields: string[]; formula: string }> = {
    effect: { title: "MD dan SMD", fields: ["n1", "mean1", "sd1", "n2", "mean2", "sd2"], formula: "MD = mean1 − mean2; Cohen d = MD / SD pooled; Hedges g = d × [1 − 3/(4df − 1)]. Dua kelompok independen; orientasi efek mengikuti kelompok 1 dikurangi kelompok 2." },
    se: { title: "SE menjadi SD", fields: ["n", "se"], formula: "SD = SE × √n. SE harus berasal dari mean satu kelompok, bukan SE selisih dua kelompok." },
    ci: { title: "CI menjadi SD", fields: ["n", "lower", "upper", "critical"], formula: "SD = (batas atas − batas bawah) × √n / (2 × nilai kritis). Isi t kritis sesuai df=n−1 dan confidence level. Untuk sampel besar, CI 95% memakai z=1,959964. Jangan memakai z untuk sampel kecil." },
    median: { title: "Median dan IQR", fields: ["q1", "median", "q3"], formula: "Pendekatan distribusi normal: mean ≈ median; SD ≈ (Q3 − Q1) / 1,34898. Ini perkiraan sederhana, bukan implementasi Wan/Luo/Hozo; tidak sesuai untuk distribusi miring. Pertimbangkan sensitivitas dan konsultasi metode." },
    arms: { title: "Rekonstruksi dua kelompok", fields: ["n1", "n2", "seMD"], formula: "SD bersama = SE(MD) / √(1/n1 + 1/n2). Mengasumsikan kelompok independen dan SD kedua kelompok sama. Tidak berlaku untuk desain berpasangan atau data tersesuaikan." },
    change: { title: "Sebelum dan sesudah", fields: ["meanPre", "meanPost", "sdPre", "sdPost", "r"], formula: "Perubahan = meanPost − meanPre; SD perubahan = √(SDpre² + SDpost² − 2r × SDpre × SDpost). Korelasi harus beralasan dan diuji lewat analisis sensitivitas; tidak diisi otomatis." },
  };
  const labels: Record<string, string> = { n1: "Jumlah sampel kelompok 1", n2: "Jumlah sampel kelompok 2", mean1: "Mean kelompok 1", mean2: "Mean kelompok 2", sd1: "SD kelompok 1", sd2: "SD kelompok 2", n: "Jumlah sampel", se: "SE mean", lower: "Batas bawah CI mean", upper: "Batas atas CI mean", critical: "Nilai kritis t atau z", q1: "Kuartil 1", median: "Median", q3: "Kuartil 3", seMD: "SE selisih mean", meanPre: "Mean sebelum", meanPost: "Mean sesudah", sdPre: "SD sebelum", sdPost: "SD sesudah", r: "Korelasi sebelum-sesudah" };
  function calculate() {
    try {
      const v: Record<string, number> = {};
      for (const f of modes[mode].fields) { if (!values[f]?.trim()) throw Error("Lengkapi semua kolom."); v[f] = Number(values[f]); if (!Number.isFinite(v[f])) throw Error("Isi angka yang valid."); if (f.startsWith("n") && (!Number.isInteger(v[f]) || v[f] < 2)) throw Error("Jumlah sampel harus bilangan bulat ≥ 2."); if ((f.startsWith("sd") || f.startsWith("se") || f === "critical") && v[f] <= 0) throw Error("SD, SE, dan nilai kritis harus positif."); }
      let out: Record<string, number>;
      if (mode === "effect") out = continuousEffect(v.n1, v.mean1, v.sd1, v.n2, v.mean2, v.sd2);
      else if (mode === "se") out = { SD: v.se * Math.sqrt(v.n) };
      else if (mode === "ci") { if (v.upper <= v.lower) throw Error("Batas atas harus lebih besar dari batas bawah."); out = { SD: (v.upper - v.lower) * Math.sqrt(v.n) / (2 * v.critical) }; }
      else if (mode === "median") { if (v.q1 > v.median || v.median > v.q3 || v.q1 === v.q3) throw Error("Pastikan Q1 ≤ median ≤ Q3 dan IQR positif."); out = { meanPerkiraan: v.median, SDPerkiraan: (v.q3 - v.q1) / 1.3489795 }; }
      else if (mode === "arms") out = { SDAnggapanKeduaKelompok: v.seMD / Math.sqrt(1 / v.n1 + 1 / v.n2) };
      else out = { meanPerubahan: v.meanPost - v.meanPre, SDPerubahan: changeSd(v.sdPre, v.sdPost, v.r) };
      if (!Object.values(out).every(Number.isFinite)) throw Error("Hasil di luar batas perhitungan.");
      setResult(Object.entries(out).map(([k, n]) => `${k}: ${n.toFixed(6)}`).join("\n"));
    } catch (e) { setResult(e instanceof Error ? e.message : "Perhitungan gagal."); }
  }
  return <section className="card"><label className="label">Jenis perhitungan<select className="input mt-2" value={mode} onChange={e => { setMode(e.target.value); setValues({}); setResult(""); }}>{Object.entries(modes).map(([key, m]) => <option key={key} value={key}>{m.title}</option>)}</select></label><p className="my-4 rounded-xl bg-brand-soft p-4 text-sm leading-relaxed">{modes[mode].formula}</p><div className="grid gap-3 sm:grid-cols-2">{modes[mode].fields.map(f => <label key={f} className="text-sm">{labels[f]}<input className="input mt-1" type="number" step="any" value={values[f] ?? ""} onChange={e => { setValues(v => ({ ...v, [f]: e.target.value })); setResult(""); }} /></label>)}</div><button className="btn-primary mt-4" onClick={calculate}>Hitung</button>{result && <pre role="status" className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm">{result}</pre>}<a className="link mt-4 block text-xs" href="https://training.cochrane.org/handbook/current/chapter-06" target="_blank" rel="noopener noreferrer">Rujukan metode: Cochrane Handbook Bab 6 ↗</a></section>;
}




