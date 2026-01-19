import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { generateWithOpenAI } from "./services/openai.js";
import { analyzeWithGemini } from "./services/gemini.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* ---------- API ROUTES ---------- */

app.post("/api/openai-generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await generateWithOpenAI(prompt);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/gemini-vision", async (req, res) => {
  try {
    const { imageBase64, prompt } = req.body;
    const result = await analyzeWithGemini(imageBase64, prompt);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* ---------- FRONTEND ROUTES ---------- */

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
