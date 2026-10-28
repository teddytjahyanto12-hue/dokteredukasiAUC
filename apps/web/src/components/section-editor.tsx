"use client";

import { useState } from "react";

type Row = { key: number; title: string; body: string };

// Editor bagian isi artikel: tiap bagian punya judul (tampil besar & tebal) dan isi.
// Admin bisa menambah, menghapus, dan menggeser urutan; dikirim sebagai sectionTitle[]/sectionBody[].
export function SectionEditor({ initial }: { initial: { title: string; body: string }[] }) {
  const [rows, setRows] = useState<Row[]>(() => initial.map((s, i) => ({ key: i, ...s })));
  const [next, setNext] = useState(initial.length);
  const update = (key: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  const move = (i: number, d: number) =>
    setRows((rs) => {
      const j = i + d;
      if (j < 0 || j >= rs.length) return rs;
      const copy = [...rs];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });

  return (
    <div className="space-y-4">
      {rows.length === 0 && <p className="text-sm text-slate-500">Belum ada bagian. Klik “Tambah bagian”.</p>}
      {rows.map((r, i) => (
        <div key={r.key} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Bagian {i + 1}</span>
            <div className="ml-auto flex gap-1">
              <button type="button" className="btn-secondary btn-sm" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Geser ke atas">↑</button>
              <button type="button" className="btn-secondary btn-sm" onClick={() => move(i, 1)} disabled={i === rows.length - 1} aria-label="Geser ke bawah">↓</button>
              <button type="button" className="btn-danger btn-sm" onClick={() => setRows((rs) => rs.filter((x) => x.key !== r.key))}>Hapus</button>
            </div>
          </div>
          <input className="input mb-2 text-base font-bold" name="sectionTitle" value={r.title} onChange={(e) => update(r.key, { title: e.target.value })} placeholder="Judul bagian, mis. Pendahuluan" />
          <textarea className="input" name="sectionBody" rows={7} value={r.body} onChange={(e) => update(r.key, { body: e.target.value })} placeholder="Isi bagian…" />
        </div>
      ))}
      <button
        type="button"
        className="btn-secondary"
        onClick={() => {
          setRows((rs) => [...rs, { key: next, title: "", body: "" }]);
          setNext((n) => n + 1);
        }}
      >
        + Tambah bagian
      </button>
    </div>
  );
}
