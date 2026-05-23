export async function POST(request) {
  try {
    const { brand, emailType, tone } = await request.json()

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
          content: `You are an expert email copywriter. Generate 3 marketing emails for this brand.

Brand: ${brand.brandName}
Tagline: ${brand.tagline}
Tone of voice: ${brand.tone}
Target audience: ${brand.audience}
Pain points: ${brand.painPoints?.join(', ')}
Products/services: ${brand.products?.join(', ')}
Main CTA: ${brand.cta}

Email type: ${emailType}
Tone: ${tone}

Return ONLY a JSON array, no other text, no markdown:
[
  {
    "subject": "email subject line, compelling and under 60 characters",
    "preview": "preview text shown in inbox, under 90 characters",
    "body": "full email body copy, 3-5 paragraphs, written in the brand voice",
    "cta": "call to action button text"
  }
]

Generate exactly 3 emails. Each should have a distinct angle or hook. Write body copy that feels human and on-brand, not generic.`
        }]
      })
    })

    const data = await response.json()

    if (data.error) {
      return Response.json({ success: false, error: data.error.message })
    }

    const text = data.content[0].text
    const emails = JSON.parse(text.replace(/```json\n?|\n?```/g, '').trim())

    return Response.json({ success: true, emails })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
