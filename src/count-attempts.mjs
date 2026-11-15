#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { countFixAttempts } from "./lib/attempts.mjs";
import { setOutput } from "./lib/github-output.mjs";

let log = "";
try {
  log = execFileSync("git", ["log", "--pretty=%s"], { encoding: "utf8" });
} catch {
  log = "";
}
const attempts = countFixAttempts(log);
setOutput("attempts", String(attempts));
console.log(`Existing receipt-fix attempts on this history: ${attempts}`);
