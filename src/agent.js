import { OpenAIClient } from "./client.js";
import { OllamaClient } from "./ollama.js";
import { ConversationMemory } from "./memory.js";

export class AIAgent {
  constructor(systemPrompt = "You are a helpful conversational AI assistant.", client = null) {
    this.memory = new ConversationMemory();
    this.client = client || new OpenAIClient();
    this.systemPrompt = systemPrompt;
  }

  async ask(userInput) {
    this.memory.addUserMessage(userInput);
    const messages = [
      { role: "system", content: this.systemPrompt },
      ...this.memory.getHistory(),
    ];
    const assistantText = await this.client.sendMessage(messages);
    this.memory.addAssistantMessage(assistantText);
    return assistantText;
  }

  reset() {
    this.memory.clear();
  }
}
