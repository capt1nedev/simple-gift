const notes = [
  "I thank God for your kind and gentle heart.",
  "You make my days better in the simplest ways.",
  "I am grateful for your love, your patience, and your support.",
  "Being with you gives me peace and joy.",
  "I always pray for you and for our future together.",
  "I am thankful we are growing side by side.",
];

const noteBtn = document.getElementById("love-note-btn");
const noteEl = document.getElementById("love-note");

if (noteBtn && noteEl) {
  noteBtn.addEventListener("click", () => {
    const pick = notes[Math.floor(Math.random() * notes.length)];
    noteEl.textContent = pick;
  });
}

const canvas = document.getElementById("heart-canvas");
const ctx = canvas.getContext("2d");

let hearts = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function makeHeart() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 10,
    size: 8 + Math.random() * 14,
    speedY: 0.5 + Math.random() * 1.3,
    drift: -0.6 + Math.random() * 1.2,
    alpha: 0.2 + Math.random() * 0.55,
  };
}

function drawHeart(x, y, size, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 16, size / 16);
  ctx.beginPath();
  ctx.moveTo(0, 5);
  ctx.bezierCurveTo(0, -3, -12, -3, -12, 6);
  ctx.bezierCurveTo(-12, 12, -6, 16, 0, 20);
  ctx.bezierCurveTo(6, 16, 12, 12, 12, 6);
  ctx.bezierCurveTo(12, -3, 0, -3, 0, 5);
  ctx.closePath();
  ctx.fillStyle = `rgba(232, 93, 136, ${alpha})`;
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (hearts.length < 45 && Math.random() > 0.7) {
    hearts.push(makeHeart());
  }

  hearts.forEach((heart, i) => {
    heart.y -= heart.speedY;
    heart.x += heart.drift;
    drawHeart(heart.x, heart.y, heart.size, heart.alpha);

    if (heart.y < -30) {
      hearts.splice(i, 1);
    }
  });

  requestAnimationFrame(animate);
}

resize();
window.addEventListener("resize", resize);
animate();


