export async function analyzeImage(imageBase64, prompt) {
  const res = await fetch('/api/gemini-vision', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64, prompt })
  });
  if (!res.ok) throw new Error('Gemini request failed');
  return res.json();
}