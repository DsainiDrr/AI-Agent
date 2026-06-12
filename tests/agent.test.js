import { test } from "node:test";
import assert from "node:assert";
import { AIAgent } from "../src/agent.js";

class DummyClient {
  constructor() {
    this.model = "gpt-4o-mini";
  }

  async sendMessage(messages) {
    return "dummy response";
  }
}

test("agent asks and stores history", async () => {
  const agent = new AIAgent();
  agent.client = new DummyClient();

  const response = await agent.ask("Hello");

  assert.strictEqual(response, "dummy response");
  assert.deepStrictEqual(agent.memory.getHistory(), [
    { role: "user", content: "Hello" },
    { role: "assistant", content: "dummy response" },
  ]);
});
