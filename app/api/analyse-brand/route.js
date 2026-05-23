export async function POST(request) {
  try {
    const { url } = await request.json()
    console.log('1. Got URL:', url)

    let websiteText = ''
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(8000)
      })
      const html = await res.text()
      websiteText = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 4000)
      console.log('2. Website fetched, length:', websiteText.length)
    } catch (e) {
      console.log('2. Website fetch failed:', e.message)
      websiteText = `Website URL: ${url}`
    }

    console.log('3. Calling Claude API...')
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
       model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Analyse this website and extract brand information. Return ONLY a JSON object, no other text, no markdown.

Website content:
${websiteText}

Return exactly this JSON structure:
{
  "brandName": "name of the brand",
  "tagline": "their main value proposition in one sentence",
  "tone": "describe tone in 3 words e.g. professional, friendly, bold",
  "audience": "who their target customer is in one sentence",
  "painPoints": ["pain point 1", "pain point 2", "pain point 3"],
  "products": ["product or service 1", "product or service 2"],
  "cta": "their main call to action phrase"
}`
        }]
      })
    })

    const data = await response.json()
    console.log('4. Claude response:', JSON.stringify(data).slice(0, 200))

    if (data.error) {
      console.log('Claude error:', data.error)
      return Response.json({ success: false, error: data.error.message })
    }

    const text = data.content[0].text
    const brand = JSON.parse(text.replace(/```json\n?|\n?```/g, '').trim())
    console.log('5. Brand extracted:', brand.brandName)

    return Response.json({ success: true, brand })
  } catch (error) {
    console.log('FATAL ERROR:', error.message)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}