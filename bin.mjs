#!/usr/bin/env node
// Selectic MCP connector: bridges a local stdio MCP client (e.g. Claude Desktop)
// to Selectic's hosted MCP endpoint, authenticated with your API key.
import { createRequire } from "node:module";
import { spawn } from "node:child_process";

const KEY = (process.env.SELECTIC_API_KEY || "").trim();
if (!KEY.startsWith("slc_")) {
  console.error("Set SELECTIC_API_KEY to your Selectic key (slc_…). Get one at https://selectic.ai/dashboard");
  process.exit(1);
}
const URL = process.env.SELECTIC_MCP_URL || "https://selectic.ai/api/mcp";
const require = createRequire(import.meta.url);
const proxy = require.resolve("mcp-remote/dist/proxy.js");
// Note: no space after the colon — mcp-remote splits the header on the first ":".
const child = spawn(process.execPath, [proxy, URL, "--header", `Authorization:Bearer ${KEY}`], { stdio: "inherit" });
child.on("exit", (code) => process.exit(code ?? 0));
