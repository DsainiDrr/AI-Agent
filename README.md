# AI-Agent

A Node.js package scaffold for an AI agent using the OpenAI Chat API.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Choose your provider:

   **Option A: OpenAI (Recommended for production)**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   OPENAI_API_KEY=sk-...
   ```

   **Option B: Ollama (Free, local, no API key needed)**
   - Download Ollama from https://ollama.ai
   - Run `ollama serve` in a terminal (keep it running)
   - Pull a model: `ollama pull mistral` (or `ollama pull llama2`)
   - Leave `OPENAI_API_KEY` blank in `.env`


## Usage

**Using OpenAI (default):**
```bash
node src/cli.js "Hello, how can you help me?"
```

**Using Ollama (local):**
```bash
node src/cli.js --provider ollama --model mistral "Tell me a joke"
```

**Other examples:**
```bash
# Use a different OpenAI model
node src/cli.js --model gpt-4 "What is AI?"

# Use Ollama with llama2
node src/cli.js --provider ollama --model llama2 "Explain quantum computing"

# Via npm script
npm start -- "Tell me a joke"
```

## Testing

Run the built-in Node.js test runner:
```bash
npm test
```

## Project structure

- `src/client.js` — OpenAI API wrapper
- `src/agent.js` — agent orchestration
- `src/memory.js` — conversation memory
- `src/cli.js` — command-line entrypoint
- `tests/agent.test.js` — sample test
