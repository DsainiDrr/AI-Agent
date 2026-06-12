# AI-Agent

A Node.js package scaffold for an AI agent using the OpenAI Chat API.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set your OpenAI API key:
   ```bash
   export OPENAI_API_KEY="your_api_key"
   ```
   or create a `.env` file with:
   ```text
   OPENAI_API_KEY=your_api_key
   ```

## Usage

Run the CLI:
```bash
node src/cli.js "Hello, how can you help me?"
```

or use npm script:
```bash
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
