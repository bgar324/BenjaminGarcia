(() => {
  const button = document.querySelector('.snoopy');
  if (!button) return;
  const image = button.querySelector('img');
  const poses = [
    { src: '/static/snoopy/0.png', alt: 'Snoopy wearing glasses' },
    { src: '/static/snoopy/1.png', alt: 'Snoopy dancing with his eyes closed' },
    { src: '/static/snoopy/2.png', alt: 'Snoopy wearing a bow tie and holding a teacup' },
    { src: '/static/snoopy/3.png', alt: 'Snoopy in profile' },
  ];
  const storageKey = 'snoopy-last-pose';
  let previous = -1;
  try {
    const saved = sessionStorage.getItem(storageKey);
    if (saved !== null && /^[0-3]$/.test(saved)) previous = Number(saved);
  } catch {
    // The button still works when browser storage is unavailable.
  }
  let current = previous < 0
    ? Math.floor(Math.random() * poses.length)
    : (previous + 1 + Math.floor(Math.random() * (poses.length - 1))) % poses.length;
  function showPose() {
    image.src = poses[current].src;
    image.alt = poses[current].alt;
    try {
      sessionStorage.setItem(storageKey, String(current));
    } catch {
      // Reload non-repetition requires session storage; clicking does not.
    }
  }
  showPose();
  for (const pose of poses) {
    const preload = new Image();
    preload.src = pose.src;
  }
  button.hidden = false;
  button.addEventListener('click', () => {
    current = (current + 1) % poses.length;
    showPose();
  });
})();

(() => {
  const clock = document.querySelector('.local-clock');
  if (!clock) return;
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  });
  const timeFormat = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
  });
  function updateClock() {
    const now = new Date();
    clock.dateTime = now.toISOString();
    clock.textContent = `${dateFormat.format(now).replaceAll(',', '')} ${timeFormat.format(now)}`;
    clock.hidden = false;
  }
  updateClock();
  setInterval(updateClock, 60_000);
})();
