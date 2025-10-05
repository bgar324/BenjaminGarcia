import { NextResponse } from 'next/server'

export async function GET() {
  const p = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID as string,
    response_type: 'code',
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI as string,
    scope: process.env.SPOTIFY_SCOPES as string,
  }).toString()
  return NextResponse.redirect(`https://accounts.spotify.com/authorize?${p}`)
}
