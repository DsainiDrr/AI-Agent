export class ConversationMemory {
  constructor() {
    this.history = [];
  }

  addUserMessage(content) {
    this.history.push({ role: "user", content });
  }

  addAssistantMessage(content) {
    this.history.push({ role: "assistant", content });
  }

  getHistory() {
    return [...this.history];
  }

  clear() {
    this.history = [];
  }
}
