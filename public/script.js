import { generateVideoScript } from './ai-service.js';
import { analyzeImage } from './gemini-service.js';

document.getElementById('generateForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = document.getElementById('prompt').value.trim();
  const imageFile = document.getElementById('image').files[0];

  try {
    let finalPrompt = prompt;

if (imageFile) {
  try {
    const base64 = await fileToBase64(imageFile);
    const geminiRes = await analyzeImage(base64, prompt);
    finalPrompt = geminiRes.enhancedPrompt || prompt;
  } catch (err) {
    console.warn("Gemini failed, falling back to OpenAI:", err);
    finalPrompt = prompt;
  }
}

const openaiRes = await generateVideoScript(finalPrompt);

localStorage.setItem(
  'videoScript',
  openaiRes.script || openaiRes.text || JSON.stringify(openaiRes)
);

location.href = 'result.html';
  
  } catch (err) {
    alert('Error: ' + err.message);
  }
});

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

}

