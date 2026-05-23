export async function POST(request) {
  try {
    const { brand, platform, goal } = await request.json()

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1500,
        messages: [{
          role: 'user',
          content: `You are an expert ad copywriter. Generate 5 ad variants for this brand.

Brand: ${brand.brandName}
Tagline: ${brand.tagline}
Tone: ${brand.tone}
Target audience: ${brand.audience}
Pain points: ${brand.painPoints?.join(', ')}
Products/services: ${brand.products?.join(', ')}
Main CTA: ${brand.cta}

Platform: ${platform}
Goal: ${goal}

Return ONLY a JSON array, no other text, no markdown:
[
  {
    "headline": "compelling headline under 10 words",
    "body": "ad body copy 2-3 sentences, persuasive and on-brand",
    "cta": "call to action button text"
  }
]

Generate exactly 5 variants. Each should feel distinct — vary the angle, hook, and emotional appeal.`
        }]
      })
    })

    const data = await response.json()

    if (data.error) {
      return Response.json({ success: false, error: data.error.message })
    }

    const text = data.content[0].text
    const ads = JSON.parse(text.replace(/```json\n?|\n?```/g, '').trim())

    return Response.json({ success: true, ads })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
