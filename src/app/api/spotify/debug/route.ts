import { NextResponse } from 'next/server'

let cache: { accessToken: string; expiresAt: number } | null = null

async function getAccessToken() {
  if (cache && Date.now() < cache.expiresAt - 30_000) return cache.accessToken
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: process.env.SPOTIFY_REFRESH_TOKEN as string,
  })
  const r = await fetch('https://accounts.spotify.com/api/token', {
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
  const j = await r.json()
  if (!r.ok) throw new Error(`token_refresh_failed: ${JSON.stringify(j)}`)
  cache = { accessToken: j.access_token, expiresAt: Date.now() + (j.expires_in ?? 3600) * 1000 }
  return cache.accessToken
}

export async function GET() {
  try {
    const token = await getAccessToken()

    // Who am I?
    const meRes = await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    const me = await meRes.json()

    // What are my token scopes?
    const scopes = (await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.headers.get('x-spotify-scopes'))) || 'unknown'

    // Currently playing raw status
    const nowRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    const status = nowRes.status
    const etag = nowRes.headers.get('etag')
    const ct = nowRes.headers.get('content-type') || ''
    const body = status === 200 ? await nowRes.json() : null

    return NextResponse.json({
      envPresent: {
        id: !!process.env.SPOTIFY_CLIENT_ID,
        secret: !!process.env.SPOTIFY_CLIENT_SECRET,
        refresh: !!process.env.SPOTIFY_REFRESH_TOKEN,
      },
      me: { id: me?.id, display_name: me?.display_name },
      tokenScopesHeader: scopes,
      currentlyPlaying: {
        status, etag, contentType: ct,
        sample: body ? {
          is_playing: body?.is_playing,
          type: body?.currently_playing_type,
          track: body?.item?.name,
          artists: (body?.item?.artists || []).map((a:any)=>a.name).join(', ')
        } : null
      }
    })
  } catch (e:any) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
