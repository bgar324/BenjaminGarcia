import sharp from "sharp";
import { siteConfig } from "../data/site";

const socialImageTheme = {
  background: "#050505",
  foreground: "#ffffff",
  muted: "#d4d4d8",
  subtle: "#a1a1aa",
} as const;

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export async function createSocialImage() {
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="${socialImageTheme.background}"/>
      <rect x="56" y="56" width="1088" height="518" rx="38" fill="${socialImageTheme.foreground}"/>
      <rect x="88" y="88" width="1024" height="454" rx="26" fill="${socialImageTheme.background}"/>
      <text x="128" y="246" fill="${socialImageTheme.foreground}" font-family="Arial, Helvetica, sans-serif" font-size="92" font-weight="700">${escapeHtml(siteConfig.name)}</text>
      <text x="132" y="318" fill="${socialImageTheme.muted}" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="500">${escapeHtml(siteConfig.jobTitle)}</text>
      <text x="132" y="392" fill="${socialImageTheme.subtle}" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="400">${escapeHtml(siteConfig.socialTagline)}</text>
      <text x="132" y="468" fill="${socialImageTheme.foreground}" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="600">${escapeHtml(new URL(siteConfig.url).hostname)}</text>
      <text x="910" y="462" fill="${socialImageTheme.foreground}" font-family="Arial, Helvetica, sans-serif" font-size="118" font-weight="800">bg</text>
    </svg>
  `;

  return sharp(Buffer.from(svg)).png().toBuffer();
}
