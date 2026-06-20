import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.MODEL;

export async function askLLM(prompt) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `OpenRouter Error ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();

    return data.choices[0].message.content;
  } catch (error) {
    console.error("LLM Request Failed:");
    console.error(error.message);

    return null;
  }
}
