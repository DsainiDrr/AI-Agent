/**
 * Ollama client for local LLM inference.
 * Requires Ollama to be running locally on http://localhost:11434
 */

export class OllamaClient {
  constructor(model = "mistral") {
    this.model = model;
    this.baseUrl = process.env.OLLAMA_URL || "http://localhost:11434";
  }

  async sendMessage(messages) {
    /**
     * Ollama API expects messages in a specific format.
     * We convert from OpenAI format to Ollama format.
     */
    const formattedMessages = messages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: this.model,
          prompt: formattedMessages,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.response.trim();
    } catch (err) {
      throw new Error(
        `Ollama error (${this.baseUrl}): ${err.message}. Make sure Ollama is running.`
      );
    }
  }
}
