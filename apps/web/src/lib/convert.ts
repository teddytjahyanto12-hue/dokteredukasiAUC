import "server-only";
import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

// Konversi PPTX/PPT → PDF memakai LibreOffice (headless) agar slide bisa
// ditampilkan di website. Lokasi soffice bisa diatur lewat SOFFICE_PATH.

const CANDIDATES = [
  process.env.SOFFICE_PATH,
  "C:\\Program Files\\LibreOffice\\program\\soffice.exe",
  "C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe",
  "/usr/bin/soffice",
  "/usr/lib/libreoffice/program/soffice",
  "/Applications/LibreOffice.app/Contents/MacOS/soffice",
].filter((p): p is string => !!p);

export function findSoffice() {
  return CANDIDATES.find((p) => existsSync(p)) ?? null;
}

export async function convertToPdf(input: Buffer, originalName: string): Promise<Buffer> {
  const soffice = findSoffice();
  if (!soffice) throw new Error("LIBREOFFICE_MISSING");

  const dir = await mkdtemp(path.join(os.tmpdir(), "de-convert-"));
  try {
    const ext = path.extname(originalName).toLowerCase() || ".pptx";
    const src = path.join(dir, `slide${ext}`);
    await writeFile(src, input);
    // Profil terpisah per konversi supaya beberapa konversi bersamaan tidak saling mengunci.
    const profile = pathToFileURL(path.join(dir, "profile")).href;
    await new Promise<void>((resolve, reject) => {
      execFile(
        soffice,
        [`-env:UserInstallation=${profile}`, "--headless", "--norestore", "--convert-to", "pdf", "--outdir", dir, src],
        { timeout: 180_000, windowsHide: true },
        (err) => (err ? reject(err) : resolve()),
      );
    });
    return await readFile(path.join(dir, "slide.pdf"));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}
