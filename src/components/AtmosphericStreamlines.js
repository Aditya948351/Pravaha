/**
 * PRAVAHA - Interactive Atmospheric Streamlines & Particle Canvas
 * Renders regional meteorological advection streamlines across northern India.
 */

export function initAtmosphericCanvas(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Check if canvas already exists
  let canvas = document.getElementById('atmospheric-flow-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'atmospheric-flow-canvas';
    container.style.position = 'relative';
    container.insertBefore(canvas, container.firstChild);
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = container.offsetWidth || window.innerWidth);
  let height = (canvas.height = container.offsetHeight || window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = container.offsetWidth || window.innerWidth;
    height = canvas.height = container.offsetHeight || window.innerHeight;
  });

  // Particle Streamlines
  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      length: 40 + Math.random() * 80,
      speed: 0.8 + Math.random() * 1.6,
      opacity: 0.1 + Math.random() * 0.35,
      hue: Math.random() > 0.6 ? 190 : 35 // Cyan or Amber smoke tint
    });
  }

  let animationFrameId;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Flow angle: ~310 degrees (North-West to South-East typical post-monsoon Delhi advection)
    const angle = 0.55; // Radians (~32 degrees downward slope from left to right)
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Draw flowing streamline
      const grad = ctx.createLinearGradient(p.x, p.y, p.x - p.length * cosA, p.y - p.length * sinA);
      grad.addColorStop(0, `hsla(${p.hue}, 90%, 65%, ${p.opacity})`);
      grad.addColorStop(1, `hsla(${p.hue}, 90%, 65%, 0)`);

      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.4;
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.length * cosA, p.y - p.length * sinA);
      ctx.stroke();

      // Draw particle head glow
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 100%, 75%, ${p.opacity * 1.5})`;
      ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Move particle along flow vector
      p.x += p.speed * cosA;
      p.y += p.speed * sinA;

      // Wrap around edges
      if (p.x > width + p.length) {
        p.x = -p.length;
        p.y = Math.random() * height;
      }
      if (p.y > height + p.length) {
        p.y = -p.length;
        p.x = Math.random() * width;
      }
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}
