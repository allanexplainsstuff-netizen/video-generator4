export async function generateVideoScript(prompt) {
  const res = await fetch('/api/openai-generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  if (!res.ok) throw new Error('OpenAI request failed');
  return res.json();
}