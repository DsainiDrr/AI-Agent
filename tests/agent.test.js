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

  expect(response).toBe("dummy response");
  expect(agent.memory.getHistory()).toEqual([
    { role: "user", content: "Hello" },
    { role: "assistant", content: "dummy response" },
  ]);
});
