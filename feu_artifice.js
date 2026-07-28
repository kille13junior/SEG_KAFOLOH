// Confetti façon feu d'artifice (explosions)
const canvas = document.getElementById('feu-artifice-canvas');
const ctx = canvas.getContext('2d');
let W = window.innerWidth, H = window.innerHeight;
canvas.width = W; canvas.height = H;

window.addEventListener('resize', () => {
  W = window.innerWidth; H = window.innerHeight;
  canvas.width = W; canvas.height = H;
});

function randomColor() {
  const palette = ['#ff5e62','#ffcc70','#00b8a9','#fffbe7','#7cf6d5','#e88600','#ffede9','#bc6ff1','#f9f871'];
  return palette[Math.floor(Math.random() * palette.length)];
}
class Particle {
  constructor(x, y, angle, speed, color) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.color = color;
    this.alpha = 1;
    this.radius = Math.random() * 2.5 + 1.5;
    this.life = 0;
  }
  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.speed *= 0.97;
    this.alpha -= 0.014 + Math.random()*0.015;
    this.life++;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(this.alpha, 0);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.restore();
  }
}
function createExplosion(x, y) {
  const particles = [];
  const count = 32 + Math.floor(Math.random()*16);
  for(let i=0; i<count; i++) {
    let angle = (Math.PI * 2) * (i/count);
    let speed = 2 + Math.random()*4;
    let color = randomColor();
    particles.push(new Particle(x, y, angle, speed, color));
  }
  return particles;
}
let explosions = [];
function launchFirework() {
  let x = 80 + Math.random()*(W-160);
  let y = 80 + Math.random()*120;
  explosions.push(createExplosion(x, y));
}
let fireworkStartedAt = Date.now();
let fireworkDuration = 2000;
for(let i=0; i<5; i++) {
  setTimeout(launchFirework, 250*i);
}
function animateFireworks() {
  ctx.clearRect(0,0,W,H);
  for(let i=0; i<explosions.length; i++) {
    let arr = explosions[i];
    for(let j=0; j<arr.length; j++) {
      arr[j].update();
      arr[j].draw(ctx);
    }
    explosions[i] = arr.filter(p => p.alpha > 0.01);
  }
  explosions = explosions.filter(arr => arr.length>0);
  if(Date.now() - fireworkStartedAt < fireworkDuration || explosions.length>0) {
    requestAnimationFrame(animateFireworks);
  } else {
    ctx.clearRect(0,0,W,H);
  }
}
animateFireworks();