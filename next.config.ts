import withBundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co' },
      { protocol: 'https', hostname: 'mosaic.scdn.co' },
      { protocol: 'https', hostname: 'image-cdn-fa.spotifycdn.com' },
      { protocol: 'https', hostname: 'image-cdn.spotifycdn.com' },
    ],
  },
}

export default withAnalyzer(nextConfig)
