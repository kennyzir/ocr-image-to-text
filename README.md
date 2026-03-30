# "OCR Image to Text"

> Extract text from images, screenshots, and scanned documents. Use when users need to digitize printed text, process receipts, read screenshots, or extract content from photos. Handles English text with confidence scoring.

[![License: MIT-0](https://img.shields.io/badge/License-MIT--0-blue.svg)](LICENSE)
[![Claw0x](https://img.shields.io/badge/Powered%20by-Claw0x-orange)](https://claw0x.com)
[![OpenClaw Compatible](https://img.shields.io/badge/OpenClaw-Compatible-green)](https://openclaw.org)

## What is This?

This is a native skill for **OpenClaw** and other AI agents. Skills are modular capabilities that agents can install and use instantly - no complex API setup, no managing multiple provider keys.

Built for OpenClaw, compatible with Claude, GPT-4, and other agent frameworks.

## Installation

### For OpenClaw Users

Simply tell your agent:

```
Install the ""OCR Image to Text"" skill from Claw0x
```

Or use this connection prompt:

```
Add skill: ocr-image-to-text
Platform: Claw0x
Get your API key at: https://claw0x.com
```

### For Other Agents (Claude, GPT-4, etc.)

1. Get your free API key at [claw0x.com](https://claw0x.com) (no credit card required)
2. Add to your agent's configuration:
   - Skill name: `ocr-image-to-text`
   - Endpoint: `https://claw0x.com/v1/call`
   - Auth: Bearer token with your Claw0x API key

### Via CLI

```bash
npx @claw0x/cli add ocr-image-to-text
```

---


# OCR Image to Text

Extract text from any image — screenshots, scanned documents, receipts, photos with text. Server-side processing using Tesseract OCR with confidence scoring.

## Prerequisites

1. **Sign up at [claw0x.com](https://claw0x.com)**
2. **Create API key** in Dashboard
3. **Set environment variable**:
   ```bash
   export CLAW0X_API_KEY="ck_live_..."
   ```

## Quick Reference

| When This Happens | Do This | What You Get |
|-------------------|---------|--------------|
| Need text from screenshot | Send image URL or base64 | Full text + confidence |
| Processing receipts | Send receipt image | Extracted text + line count |
| Digitizing scanned docs | Send document image | Structured text output |
| Reading photos with text | Send photo URL | Text + word count |

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `image_url` | string | No* | Public URL of image (max 10MB) |
| `image_base64` | string | No* | Base64-encoded image data |
| `language` | string | No | OCR language code (default: `eng`) |

*One of `image_url` or `image_base64` is required.

## Output Format

```json
{
  "success": true,
  "data": {
    "text": "Invoice #12345\nDate: 2026-03-30\nTotal: $150.00",
    "confidence": 92,
    "lines": ["Invoice #12345", "Date: 2026-03-30", "Total: $150.00"],
    "line_count": 3,
    "word_count": 6,
    "language": "eng",
    "_meta": {
      "skill": "ocr-image-to-text",
      "latency_ms": 1200,
      "image_source": "url"
    }
  }
}
```

## Example Usage

### Via Claw0x Gateway
```bash
curl -X POST https://api.claw0x.com/v1/call \
  -H "Authorization: Bearer $CLAW0X_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "skill": "ocr-image-to-text",
    "input": {
      "image_url": "https://example.com/receipt.png"
    }
  }'
```

### Via SDK
```typescript
const result = await claw0x.call('ocr-image-to-text', {
  image_url: 'https://example.com/screenshot.png'
});
console.log(result.data.text);
```

## Error Handling

| Code | Error | Cause |
|------|-------|-------|
| 400 | Missing image | Neither `image_url` nor `image_base64` provided |
| 400 | Image too large | Image exceeds 10MB limit |
| 400 | Failed to fetch | URL unreachable or invalid |
| 401 | Unauthorized | Missing or invalid API key |
| 500 | OCR processing failed | Internal processing error (not billed) |

## Pricing

**FREE.** No charge per call.

- Requires Claw0x API key for authentication
- No usage charges (price_per_call = 0)
- Unlimited calls

- Pay only for successful responses (2xx status)
- No monthly fees, no subscriptions
- Images up to 10MB supported


---

## About Claw0x

Claw0x is the native skills layer for AI agents - not just another API marketplace.

**Why Claw0x?**
- **One key, all skills** - Single API key for 50+ production-ready skills
- **Pay only for success** - Failed calls (4xx/5xx) are never charged
- **Built for OpenClaw** - Native integration with the OpenClaw agent framework
- **Zero config** - No upstream API keys to manage, we handle all third-party auth

**For Developers:**
- [Browse all skills](https://claw0x.com/skills)
- [Sell your own skills](https://claw0x.com/docs/sell)
- [API Documentation](https://claw0x.com/docs/api-reference)
- [OpenClaw Integration Guide](https://claw0x.com/docs/openclaw)

## Links

- [Claw0x Platform](https://claw0x.com)
- [OpenClaw Framework](https://openclaw.org)
- [Skill Documentation](https://claw0x.com/skills/ocr-image-to-text)
