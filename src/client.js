import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export class OpenAIClient {
  constructor(model = "gpt-4o-mini") {
    this.model = model;
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "OPENAI_API_KEY is not set. Export it or create a .env file with OPENAI_API_KEY=."
      );
    }

    this.client = new OpenAI({ apiKey });
  }

  async sendMessage(messages) {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages,
      temperature: 0.7,
    });

    return response.choices?.[0]?.message?.content?.trim() ?? "";
  }
}
