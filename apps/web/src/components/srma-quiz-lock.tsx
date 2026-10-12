import Link from "next/link";
import type { ProgressTopic } from "@/lib/srma-progression-rules";

export function SrmaQuizLock({ prerequisite, categoryId }: { prerequisite: ProgressTopic; categoryId: string }) {
  return <div className="rounded-xl border-2 border-mascot bg-brand-soft p-6">
    <h2 className="text-lg font-bold">Kelompok ini belum terbuka</h2>
    <p className="mt-2 text-sm text-slate-700">Lulus {prerequisite.quiz?.title || `kuis ${prerequisite.title}`} dengan nilai minimal 80 untuk melanjutkan. Bila belum lulus, pelajari kembali bab dalam kelompok tersebut dan ulangi kuis.</p>
    <div className="mt-4 flex flex-wrap gap-3"><Link href={`/quiz/${prerequisite.id}`} className="btn">Kerjakan ulang kuis</Link><Link href={`/materi/${prerequisite.id}`} className="btn-secondary">Pelajari kembali</Link><Link href={`/kelas/${categoryId}`} className="link self-center text-sm">Kurikulum</Link></div>
  </div>;
}
