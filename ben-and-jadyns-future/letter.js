const form = document.querySelector('#unlock');
const password = document.querySelector('#password');
const submit = form.querySelector('button');
const status = document.querySelector('#status');
const letter = document.querySelector('#letter');
const title = document.querySelector('#title');
const decode = (value) => Uint8Array.from(atob(value), (character) => character.charCodeAt(0));

if (!globalThis.crypto?.subtle) {
  status.textContent = 'Open this page over HTTPS in a current browser to unlock it.';
  submit.disabled = true;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (submit.disabled) return;
  submit.disabled = true;
  password.readOnly = true;
  password.removeAttribute('aria-invalid');
  status.textContent = 'Unlocking…';
  try {
    const response = await fetch('/ben-and-jadyns-future/letter.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Letter unavailable');
    const payload = await response.json();
    const material = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(password.value), 'PBKDF2', false, ['deriveKey'],
    );
    const key = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: decode(payload.salt), iterations: payload.iterations, hash: 'SHA-256' },
      material, { name: 'AES-GCM', length: 256 }, false, ['decrypt'],
    );
    let plaintext;
    try {
      plaintext = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: decode(payload.iv) }, key, decode(payload.ciphertext),
      );
    } catch (error) {
      if (error.name !== 'OperationError') throw error;
      status.textContent = 'Incorrect password. Try again.';
      password.setAttribute('aria-invalid', 'true');
      password.focus();
      password.select();
      return;
    }
    const paragraphs = new TextDecoder().decode(plaintext).split(/\n\s*\n/);
    letter.replaceChildren(...paragraphs.map((text) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      return paragraph;
    }));
    password.value = '';
    status.textContent = '';
    form.hidden = true;
    letter.hidden = false;
    title.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  } catch {
    status.textContent = 'The letter could not be loaded. Please try again.';
  } finally {
    submit.disabled = false;
    password.readOnly = false;
  }
});

function lockLetter() {
  letter.replaceChildren();
  letter.hidden = true;
  form.hidden = false;
  password.value = '';
  password.removeAttribute('aria-invalid');
  status.textContent = '';
}

// Do not retain the decrypted letter in a back/forward-cache snapshot.
window.addEventListener('pagehide', lockLetter);
