import { NextResponse } from 'next/server'

async function getAccessToken() {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: process.env.SPOTIFY_REFRESH_TOKEN as string,
  }).toString()

  const res = await fetch('https://accounts.spotify.com/api/token', {
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
    cache: 'no-store',
  })

  if (!res.ok) throw new Error('token_refresh_failed')
  const json = await res.json()
  return json.access_token as string
}

export async function GET() {
  try {
    const token = await getAccessToken()
    const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })

    if (res.status === 204) {
      return NextResponse.json({ isPlaying: false }, { status: 200 })
    }

    if (!res.ok) {
      return NextResponse.json({ isPlaying: false }, { status: 200 })
    }

    const now = await res.json()
    const item = now?.item
    if (!item) return NextResponse.json({ isPlaying: false }, { status: 200 })

    const title = item.name as string
    const artists = (item.artists || []).map((a: any) => a.name).join(', ')
    const albumArt =
      (item.album?.images?.find((i: any) => i.width >= 200)?.url ||
        item.album?.images?.[0]?.url) ?? ''
    const url = item.external_urls?.spotify as string
    const isPlaying = now?.is_playing === true
    const progressMs = now?.progress_ms ?? 0
    const durationMs = item?.duration_ms ?? 0

    return NextResponse.json(
      { isPlaying, title, artists, albumArt, url, progressMs, durationMs, ts: Date.now() },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    )
  } catch {
    return NextResponse.json({ isPlaying: false }, { status: 200 })
  }
}
