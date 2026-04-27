// src/components/SortingVisualizer/utils/confetti.js

export class ConfettiAnimation {
  constructor(canvasId = 'confetti-canvas') {
    this.canvas = document.getElementById(canvasId);
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
    this.isRunning = false;
    
    this.initCanvas();
  }

  initCanvas() {
    if (!this.canvas) {
      this.createCanvas();
    }
    
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'confetti-canvas';
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(this.canvas);
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles(count = 150) {
    const colors = [
      '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
      '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
    ];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: -20,
        size: Math.random() * 12 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        shape: Math.random() > 0.5 ? 'circle' : 'rect'
      });
    }
  }

  drawParticle(particle) {
    this.ctx.save();
    this.ctx.translate(particle.x, particle.y);
    this.ctx.rotate(particle.rotation);
    
    this.ctx.fillStyle = particle.color;
    this.ctx.globalAlpha = 0.8;

    if (particle.shape === 'circle') {
      this.ctx.beginPath();
      this.ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
      this.ctx.fill();
    } else {
      this.ctx.fillRect(
        -particle.size / 2,
        -particle.size / 2,
        particle.size,
        particle.size
      );
    }

    this.ctx.restore();
  }

  updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      
      // Update position
      particle.y += particle.speed;
      particle.x += Math.sin(particle.angle) * 2;
      particle.angle += 0.05;
      particle.rotation += particle.rotationSpeed;

      // Remove particles that are out of view
      if (particle.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
      }
    }
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.updateParticles();
    
    this.particles.forEach(particle => this.drawParticle(particle));

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.stop();
    }
  }

  start(duration = 3000) {
    if (this.isRunning) return;

    this.isRunning = true;
    this.createParticles(200);
    this.animate();

    // Auto-stop after duration
    setTimeout(() => {
      this.stop();
    }, duration);
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.particles = [];
    
    // Clear canvas
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  // Quick celebration method
  static celebrate(duration = 3000) {
    const confetti = new ConfettiAnimation();
    confetti.start(duration);
    return confetti;
  }
}

// Green wave animation for sorted array
export class GreenWaveAnimation {
  constructor(container) {
    this.container = container;
    this.isRunning = false;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    const bars = this.container.querySelectorAll('.array-element');
    
    bars.forEach((bar, index) => {
      setTimeout(() => {
        bar.style.transform = 'scale(1.1)';
        bar.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
          bar.style.transform = 'scale(1)';
        }, 300);
      }, index * 100);
    });

    setTimeout(() => {
      this.isRunning = false;
    }, bars.length * 100 + 500);
  }
}