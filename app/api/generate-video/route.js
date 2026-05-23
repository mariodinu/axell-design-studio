export async function POST(request) {
  try {
    const { brand, format, style } = await request.json()

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2500,
        messages: [{
          role: 'user',
          content: `You are an expert short-form video scriptwriter. Generate 3 video ad scripts for this brand.

Brand: ${brand.brandName}
Tagline: ${brand.tagline}
Tone of voice: ${brand.tone}
Target audience: ${brand.audience}
Pain points: ${brand.painPoints?.join(', ')}
Products/services: ${brand.products?.join(', ')}
Main CTA: ${brand.cta}

Video format: ${format}
Video style: ${style}

Return ONLY a JSON array, no other text, no markdown:
[
  {
    "hook": "the opening line or action that grabs attention in the first 2 seconds",
    "scenes": [
      "Scene 1 description — what happens visually and what is said or shown",
      "Scene 2 description",
      "Scene 3 description",
      "Scene 4 description"
    ],
    "voiceover": "the full voiceover script spoken throughout the video",
    "cta": "the closing call to action"
  }
]

Generate exactly 3 scripts. Each should have a distinct hook and narrative approach. Write for ${format} (vertical, fast-paced, 15-30 seconds). Tailor the style to ${style} conventions.`
        }]
      })
    })

    const data = await response.json()

    if (data.error) {
      return Response.json({ success: false, error: data.error.message })
    }

    const text = data.content[0].text
    const scripts = JSON.parse(text.replace(/```json\n?|\n?```/g, '').trim())

    return Response.json({ success: true, scripts })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
