#!/usr/bin/env node
// Read { password, text } as JSON from stdin. Never store plaintext in the site.
import { pbkdf2Sync, randomBytes, createCipheriv } from 'node:crypto';
import { writeFile } from 'node:fs/promises';

let input = '';
for await (const chunk of process.stdin) input += chunk;
const { password, text } = JSON.parse(input);
if (typeof password !== 'string' || !password || typeof text !== 'string' || !text.trim()) {
  throw new Error('Provide a nonempty password and letter text.');
}
const salt = randomBytes(16);
const iv = randomBytes(12);
const iterations = 600000;
const key = pbkdf2Sync(password, salt, iterations, 32, 'sha256');
const cipher = createCipheriv('aes-256-gcm', key, iv);
const ciphertext = Buffer.concat([cipher.update(text, 'utf8'), cipher.final(), cipher.getAuthTag()]);
await writeFile(new URL('../ben-and-jadyns-future/letter.json', import.meta.url), JSON.stringify({
  iterations,
  salt: salt.toString('base64'),
  iv: iv.toString('base64'),
  ciphertext: ciphertext.toString('base64'),
}) + '\n');
console.log('Encrypted letter written. No plaintext saved.');
