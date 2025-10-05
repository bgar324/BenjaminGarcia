import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'missing code' }, { status: 400 })

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI as string,
  }).toString()

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  const data = await tokenRes.json()
  return NextResponse.json({
    refresh_token: data.refresh_token,
    notice: 'Copy this refresh_token into SPOTIFY_REFRESH_TOKEN in .env.local, then delete these auth routes',
  })
}
