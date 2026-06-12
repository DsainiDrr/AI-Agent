import process from "process";
import { AIAgent } from "./agent.js";

const help = `Usage: node src/cli.js [--model MODEL] [--reset] prompt...`;

function parseArgs(argv) {
  let model = "gpt-4o-mini";
  let reset = false;
  const promptParts = [];

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--model") {
      if (i + 1 >= argv.length) {
        throw new Error("--model requires a value");
      }
      model = argv[++i];
    } else if (arg === "--reset") {
      reset = true;
    } else if (arg === "--help" || arg === "-h") {
      console.log(help);
      process.exit(0);
    } else {
      promptParts.push(arg);
    }
  }

  if (promptParts.length === 0) {
    throw new Error(`Missing prompt. ${help}`);
  }

  return { model, reset, prompt: promptParts.join(" ") };
}

async function main() {
  try {
    const { model, reset, prompt } = parseArgs(process.argv.slice(2));
    const agent = new AIAgent("You are a helpful AI assistant.");
    agent.client.model = model;

    if (reset) {
      agent.reset();
    }

    const response = await agent.ask(prompt);
    console.log(response);
  } catch (err) {
    console.error("Error:", err.message || err);
    process.exit(1);
  }
}

if (process.argv[1]?.endsWith("cli.js")) {
  main();
}
