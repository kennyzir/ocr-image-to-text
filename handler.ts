// ClawHub Local Skill - runs in your agent (requires Node.js + tesseract.js)
// OCR Image to Text - Extract text from images, screenshots, scanned docs
// Note: Requires `npm install tesseract.js` in your agent environment

async function extractTextFromBuffer(buffer: Buffer): Promise<{
  text: string; confidence: number; lines: string[]; words: number;
}> {
  const { createWorker } = await import('tesseract.js');
  const worker = await createWorker('eng');
  const { data } = await worker.recognize(buffer);
  await worker.terminate();
  const lines = data.text.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0);
  return {
    text: data.text.trim(), confidence: Math.round(data.confidence), lines,
    words: data.text.trim().split(/\s+/).filter((w: string) => w.length > 0).length,
  };
}

export async function run(input: { image_url?: string; image_base64?: string; language?: string }) {
  if (!input.image_url && !input.image_base64) throw new Error('Either image_url or image_base64 is required');
  let buffer: Buffer;
  if (input.image_base64) {
    const base64Data = input.image_base64.replace(/^data:image\/\w+;base64,/, '');
    buffer = Buffer.from(base64Data, 'base64');
    if (buffer.length > 10 * 1024 * 1024) throw new Error('Image too large (max 10MB)');
  } else {
    const response = await fetch(input.image_url!, {
      headers: { 'User-Agent': 'Claw0x-OCR/1.0' },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.status}`);
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) throw new Error('Image too large (max 10MB)');
    buffer = Buffer.from(await response.arrayBuffer());
  }
  const startTime = Date.now();
  const result = await extractTextFromBuffer(buffer);
  return {
    text: result.text, confidence: result.confidence, lines: result.lines,
    line_count: result.lines.length, word_count: result.words, language: input.language || 'eng',
    _meta: { skill: 'ocr-image-to-text', latency_ms: Date.now() - startTime, image_source: input.image_url ? 'url' : 'base64' },
  };
}
export default run;
