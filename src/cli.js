import process from "process";
import { AIAgent } from "./agent.js";
import { OpenAIClient } from "./client.js";
import { OllamaClient } from "./ollama.js";

const help = `Usage: node src/cli.js [--provider openai|ollama] [--model MODEL] [--reset] prompt...
Providers:
  openai    OpenAI API (requires OPENAI_API_KEY)
  ollama    Local Ollama (requires Ollama running on localhost:11434)`;

function parseArgs(argv) {
  let provider = "openai";
  let model = "gpt-4o-mini";
  let reset = false;
  const promptParts = [];

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--provider") {
      if (i + 1 >= argv.length) {
        throw new Error("--provider requires a value (openai or ollama)");
      }
      provider = argv[++i];
      if (!["openai", "ollama"].includes(provider)) {
        throw new Error(`Unknown provider: ${provider}. Use openai or ollama.`);
      }
    } else if (arg === "--model") {
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

  return { provider, model, reset, prompt: promptParts.join(" ") };
}

async function main() {
  try {
    const { provider, model, reset, prompt } = parseArgs(process.argv.slice(2));

    let client;
    if (provider === "openai") {
      client = new OpenAIClient(model);
    } else if (provider === "ollama") {
      client = new OllamaClient(model);
    }

    const agent = new AIAgent("You are a helpful AI assistant.", client);

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
