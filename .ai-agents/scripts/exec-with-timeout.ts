import { spawn } from "child_process";
import * as fs from "fs";
import * as path from "path";
import fg from "fast-glob";
import kill from "tree-kill";
import os from "os";

function parseArgs(argv: string[]) {
  const out: any = { cmd: [], timeout: 120, logfile: "run.log" };
  let parsingCmd = false;

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];

    if (!parsingCmd) {
      if (a === "--timeout" && argv[i + 1]) {
        out.timeout = parseInt(argv[++i], 10);
      } else if (a.startsWith("--timeout=")) {
        out.timeout = parseInt(a.split("=")[1], 10);
      } else if (a === "--logfile" && argv[i + 1]) {
        out.logfile = argv[++i];
      } else if (a.startsWith("--logfile=")) {
        out.logfile = a.split("=")[1];
      } else if (a === "--") {
        parsingCmd = true; // everything after this is command
      } else {
        parsingCmd = true;
        out.cmd.push(a);
      }
    } else {
      out.cmd.push(a);
    }
  }

  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.cmd.length) {
    console.error(
      "Usage: exec-with-timeout <cmd> [args...] [--timeout 120] [--logfile run.log]"
    );
    process.exit(2);
  }

  const logPath = path.resolve(process.cwd(), args.logfile);
  const out = fs.createWriteStream(logPath, { flags: "a" });
  out.write(
    `\n--- RUN: ${args.cmd.join(" ")} @ ${new Date().toISOString()} (timeout ${
      args.timeout
    }s) ---\n`
  );

  // Expand globs (e.g. test*.ts)
  let [cmd, ...argv] = args.cmd;
  let expanded: string[] = [];
  for (const a of argv) {
    if (a.includes("*")) {
      const matches = await fg(a);
      expanded.push(...matches);
    } else {
      expanded.push(a);
    }
  }

  let child;
  if (os.platform() === "win32" && (cmd === "npm" || cmd === "npx")) {
    // On Windows, run the full command line with shell
    const fullCommand = [cmd, ...expanded].join(" ");
    child = spawn(fullCommand, { stdio: ["ignore", "pipe", "pipe"], shell: true });
  } else {
    // On Linux/Mac, do it the normal way
    child = spawn(cmd, expanded, { stdio: ["ignore", "pipe", "pipe"] });
  }



  child.stdout.on("data", (d) => {
    process.stdout.write(d);
    out.write(d);
  });

  child.stderr.on("data", (d) => {
    process.stderr.write(d);
    out.write(d);
  });

  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    out.write(
      `\n[exec-with-timeout] TIMEOUT after ${args.timeout}s → killing process tree\n`
    );
    kill(child.pid!, "SIGTERM");

    setTimeout(() => {
      try {
        kill(child.pid!, "SIGKILL");
      } catch {}
    }, 2000);
  }, args.timeout * 1000);

  child.on("exit", (code, signal) => {
    clearTimeout(timer);
    out.write(
      `\n--- EXIT: code=${code} signal=${signal} timedOut=${timedOut} ---\n`
    );
    out.end();

    if (timedOut) {
      console.error(`[guard] Command timed out: ${args.cmd.join(" ")}`);
      process.exit(124);
    }
    process.exit(code === null ? 1 : code);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});