// Penjadwal bawaan server: memeriksa tiap 10 menit apakah ada laporan berkala yang jatuh tempo.
// Berjalan selama website menyala; tidak membutuhkan AI atau layanan luar.
export async function register() {
  // Harus berbentuk blok if agar modul Node tidak ikut dibundel untuk runtime edge.
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const g = globalThis as { __reportScheduler?: boolean };
    if (g.__reportScheduler) return;
    g.__reportScheduler = true;
    const tick = async () => {
      try {
        const { runReportSchedule } = await import("./lib/report-email");
        await runReportSchedule();
      } catch (e) {
        console.error("[laporan berkala]", e);
      }
    };
    setTimeout(tick, 30_000);
    setInterval(tick, 10 * 60_000);
  }
}
