import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateVideoScript(prompt) {
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    return {
      text: response.output_text,
    };
  } catch (err) {
    console.error("OPENAI ERROR:", err);
    throw new Error("OpenAI request failed");
  }
}

