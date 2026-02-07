import { execFile } from "node:child_process";

export type ExecResult = { stdout: string; stderr: string; exitCode: number };

export async function execFileAsync(cmd: string, args: string[], opts?: { timeoutMs?: number; cwd?: string }): Promise<ExecResult> {
  const timeoutMs = opts?.timeoutMs ?? 20000;
  const cwd = opts?.cwd;

  return new Promise((resolve) => {
    const child = execFile(cmd, args, { timeout: timeoutMs, cwd }, (error, stdout, stderr) => {
      const exitCode = typeof (error as { code?: unknown } | null)?.code === "number"
        ? (error as { code: number }).code
        : 0;
      resolve({ stdout: String(stdout ?? ""), stderr: String(stderr ?? ""), exitCode: Number(exitCode) || 0 });
    });
    child.on("error", (e) => {
      resolve({ stdout: "", stderr: String(e?.message || e), exitCode: 127 });
    });
  });
}
