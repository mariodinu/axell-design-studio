export async function POST(request) {
  try {
    const { brand, platform, tone } = await request.json()

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: `You are an expert social media copywriter. Generate 5 social media posts for this brand.

Brand: ${brand.brandName}
Tagline: ${brand.tagline}
Tone of voice: ${brand.tone}
Target audience: ${brand.audience}
Pain points: ${brand.painPoints?.join(', ')}
Products/services: ${brand.products?.join(', ')}
Main CTA: ${brand.cta}

Platform: ${platform}
Post tone: ${tone}

Return ONLY a JSON array, no other text, no markdown:
[
  {
    "caption": "the full post caption optimised for ${platform}",
    "hashtags": ["hashtag1", "hashtag2", "hashtag3", "hashtag4", "hashtag5"]
  }
]

Generate exactly 5 posts. Each should feel distinct — vary the hook, angle, and format. Write captions in the brand's tone of voice. Mix popular and niche hashtags.`
        }]
      })
    })

    const data = await response.json()

    if (data.error) {
      return Response.json({ success: false, error: data.error.message })
    }

    const text = data.content[0].text
    const posts = JSON.parse(text.replace(/```json\n?|\n?```/g, '').trim())

    return Response.json({ success: true, posts })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
