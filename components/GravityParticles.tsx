'use client';

import { useEffect, useRef } from 'react';

interface Vector {
  x: number;
  y: number;
}

class VectorClass {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static add(a: VectorClass, b: VectorClass): VectorClass {
    return new VectorClass(a.x + b.x, a.y + b.y);
  }

  static sub(a: VectorClass, b: VectorClass): VectorClass {
    return new VectorClass(a.x - b.x, a.y - b.y);
  }

  static scale(v: VectorClass, s: number): VectorClass {
    return v.clone().scale(s);
  }

  static random(): VectorClass {
    return new VectorClass(Math.random() * 2 - 1, Math.random() * 2 - 1);
  }

  set(x: number | VectorClass, y?: number): VectorClass {
    if (typeof x === 'object') {
      this.y = x.y;
      this.x = x.x;
    } else {
      this.x = x || 0;
      this.y = y || 0;
    }
    return this;
  }

  add(v: VectorClass): VectorClass {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v: VectorClass): VectorClass {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  scale(s: number): VectorClass {
    this.x *= s;
    this.y *= s;
    return this;
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): VectorClass {
    const m = Math.sqrt(this.x * this.x + this.y * this.y);
    if (m) {
      this.x /= m;
      this.y /= m;
    }
    return this;
  }

  distanceTo(v: VectorClass): number {
    const dx = v.x - this.x;
    const dy = v.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  clone(): VectorClass {
    return new VectorClass(this.x, this.y);
  }
}

class GravityPoint extends VectorClass {
  radius: number;
  currentRadius: number;
  gravity: number;
  isMouseOver: boolean;
  dragging: boolean;
  destroyed: boolean;
  private _targets: {
    particles: Particle[];
    gravities: GravityPoint[];
  };
  private _speed: VectorClass;
  private _easeRadius: number;
  private _dragDistance: VectorClass | null;
  private _collapsing: boolean;

  static RADIUS_LIMIT = 100;
  static interferenceToPoint = true;

  constructor(
    x: number,
    y: number,
    radius: number,
    targets: { particles: Particle[]; gravities: GravityPoint[] }
  ) {
    super(x, y);
    this.radius = radius;
    this.currentRadius = radius * 0.5;
    this.gravity = 0.1;
    this.isMouseOver = false;
    this.dragging = false;
    this.destroyed = false;
    this._targets = targets;
    this._speed = new VectorClass();
    this._easeRadius = 0;
    this._dragDistance = null;
    this._collapsing = false;
  }

  hitTest(p: VectorClass): boolean {
    return this.distanceTo(p) < this.radius;
  }

  startDrag(dragStartPoint: VectorClass): void {
    this._dragDistance = VectorClass.sub(dragStartPoint, this);
    this.dragging = true;
  }

  drag(dragToPoint: VectorClass): void {
    if (this._dragDistance) {
      this.x = dragToPoint.x - this._dragDistance.x;
      this.y = dragToPoint.y - this._dragDistance.y;
    }
  }

  endDrag(): void {
    this._dragDistance = null;
    this.dragging = false;
  }

  addSpeed(d: VectorClass): void {
    this._speed = this._speed.add(d);
  }

  collapse(): void {
    this.currentRadius *= 1.75;
    this._collapsing = true;
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (this.destroyed) return;

    const particles = this._targets.particles;
    for (let i = 0; i < particles.length; i++) {
      particles[i].addSpeed(
        VectorClass.sub(this, particles[i])
          .normalize()
          .scale(this.gravity)
      );
    }

    this._easeRadius =
      (this._easeRadius + (this.radius - this.currentRadius) * 0.07) * 0.95;
    this.currentRadius += this._easeRadius;
    if (this.currentRadius < 0) this.currentRadius = 0;

    if (this._collapsing) {
      this.radius *= 0.75;
      if (this.currentRadius < 1) this.destroyed = true;
      this._draw(ctx);
      return;
    }

    const gravities = this._targets.gravities;
    const area = this.radius * this.radius * Math.PI;

    for (let i = 0; i < gravities.length; i++) {
      const g = gravities[i];

      if (g === this || g.destroyed) continue;

      if (
        (this.currentRadius >= g.radius || this.dragging) &&
        this.distanceTo(g) < (this.currentRadius + g.radius) * 0.85
      ) {
        g.destroyed = true;
        this.gravity += g.gravity;

        const absorp = VectorClass.sub(g, this).scale(g.radius / this.radius * 0.5);
        this.addSpeed(absorp);

        const garea = g.radius * g.radius * Math.PI;
        this.currentRadius = Math.sqrt((area + garea * 3) / Math.PI);
        this.radius = Math.sqrt((area + garea) / Math.PI);
      }

      g.addSpeed(
        VectorClass.sub(this, g)
          .normalize()
          .scale(this.gravity)
      );
    }

    if (GravityPoint.interferenceToPoint && !this.dragging) {
      this.add(this._speed);
    }

    this._speed = new VectorClass();

    if (this.currentRadius > GravityPoint.RADIUS_LIMIT) {
      this.collapse();
    }

    this._draw(ctx);
  }

  private _draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    // Outer glow - using theme colors with pulsing effect
    const pulseIntensity = 0.8 + 0.4 * Math.sin(Date.now() * 0.003);
    const grd1 = ctx.createRadialGradient(
      this.x,
      this.y,
      this.radius * 0.5,
      this.x,
      this.y,
      this.radius * 6
    );
    grd1.addColorStop(0, `rgba(99, 102, 241, ${0.15 * pulseIntensity})`);
    grd1.addColorStop(0.3, `rgba(139, 92, 246, ${0.1 * pulseIntensity})`);
    grd1.addColorStop(1, 'rgba(99, 102, 241, 0)');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 6, 0, Math.PI * 2, false);
    ctx.fillStyle = grd1;
    ctx.fill();

    // Middle ring
    const grd2 = ctx.createRadialGradient(
      this.x,
      this.y,
      this.radius * 0.3,
      this.x,
      this.y,
      this.radius * 2
    );
    grd2.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
    grd2.addColorStop(1, 'rgba(139, 92, 246, 0)');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2, false);
    ctx.fillStyle = grd2;
    ctx.fill();

    // Inner core - theme colors with dynamic color shifts
    const r = Math.random() * this.currentRadius * 0.7 + this.currentRadius * 0.3;
    const grd3 = ctx.createRadialGradient(
      this.x,
      this.y,
      r * 0.3,
      this.x,
      this.y,
      this.currentRadius
    );
    
    const colorPhase = (Date.now() * 0.002 + this.x * 0.01) % (Math.PI * 2);
    const isDynamic = Math.sin(colorPhase) > 0;
    
    grd3.addColorStop(0, 'rgba(15, 15, 35, 1)');
    grd3.addColorStop(0.7, isDynamic 
      ? 'rgba(236, 72, 153, 0.9)'  // pink
      : 'rgba(139, 92, 246, 0.9)'  // purple
    );
    grd3.addColorStop(1, isDynamic 
      ? 'rgba(236, 72, 153, 0.3)'
      : 'rgba(139, 92, 246, 0.3)'
    );
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = grd3;
    ctx.fill();

    // Add sparkle effect
    if (Math.random() < 0.3) {
      const sparkleX = this.x + (Math.random() - 0.5) * this.currentRadius * 1.5;
      const sparkleY = this.y + (Math.random() - 0.5) * this.currentRadius * 1.5;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(sparkleX, sparkleY, 1, 0, Math.PI * 2, false);
      ctx.fill();
    }
    
    ctx.restore();
  }
}

class Particle extends VectorClass {
  radius: number;
  private _latest: VectorClass;
  private _speed: VectorClass;

  constructor(x: number, y: number, radius: number) {
    super(x, y);
    this.radius = radius;
    this._latest = new VectorClass();
    this._speed = new VectorClass();
  }

  addSpeed(d: VectorClass): void {
    this._speed.add(d);
  }

  update(): void {
    if (this._speed.length() > 12) {
      this._speed.normalize().scale(12);
    }

    this._latest.set(this.x, this.y);
    this.add(this._speed);
  }

  getLatest(): VectorClass {
    return this._latest;
  }
}

interface GravityParticlesProps {
  className?: string;
  particleCount?: number;
  gravity?: number;
  backgroundColor?: string;
}

export default function GravityParticles({ 
  className = '', 
  particleCount = 150,
  gravity = 0.05,
  backgroundColor = 'rgba(15, 15, 35, 0.95)'
}: GravityParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const gravitiesRef = useRef<GravityPoint[]>([]);
  const mouseRef = useRef(new VectorClass());
  const bufferCanvasRef = useRef<HTMLCanvasElement>();
  const gradientRef = useRef<CanvasGradient>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Create buffer canvas
    const bufferCanvas = document.createElement('canvas');
    const bufferCtx = bufferCanvas.getContext('2d');
    if (!bufferCtx) return;
    bufferCanvasRef.current = bufferCanvas;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      bufferCanvas.width = rect.width;
      bufferCanvas.height = rect.height;

      // Create gradient for vignette effect
      const cx = canvas.width * 0.5;
      const cy = canvas.height * 0.5;
      const gradient = context.createRadialGradient(
        cx, cy, 0,
        cx, cy, Math.sqrt(cx * cx + cy * cy)
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      gradientRef.current = gradient;
    };

    const addParticles = (num: number) => {
      for (let i = 0; i < num; i++) {
        const p = new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          1
        );
        p.addSpeed(VectorClass.random());
        particlesRef.current.push(p);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.set(e.clientX - rect.left, e.clientY - rect.top);

      let hit = false;
      for (let i = gravitiesRef.current.length - 1; i >= 0; i--) {
        const g = gravitiesRef.current[i];
        if ((!hit && g.hitTest(mouseRef.current)) || g.dragging) {
          g.isMouseOver = hit = true;
        } else {
          g.isMouseOver = false;
        }
      }

      canvas.style.cursor = hit ? 'pointer' : 'crosshair';
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mousePos = new VectorClass(e.clientX - rect.left, e.clientY - rect.top);

      for (let i = gravitiesRef.current.length - 1; i >= 0; i--) {
        if (gravitiesRef.current[i].isMouseOver) {
          gravitiesRef.current[i].startDrag(mousePos);
          return;
        }
      }

      // Create new gravity point
      const newGravity = new GravityPoint(
        mousePos.x,
        mousePos.y,
        10,
        {
          particles: particlesRef.current,
          gravities: gravitiesRef.current
        }
      );
      newGravity.gravity = gravity;
      gravitiesRef.current.push(newGravity);
    };

    const handleMouseUp = () => {
      for (const g of gravitiesRef.current) {
        if (g.dragging) {
          g.endDrag();
          break;
        }
      }
    };

    const handleDoubleClick = () => {
      for (let i = gravitiesRef.current.length - 1; i >= 0; i--) {
        if (gravitiesRef.current[i].isMouseOver) {
          gravitiesRef.current[i].collapse();
          break;
        }
      }
    };

    // Initialize
    resize();
    addParticles(particleCount);

    // Event listeners
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('dblclick', handleDoubleClick);

    // Animation loop
    const animate = () => {
      // Clear main canvas
      context.save();
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
      if (gradientRef.current) {
        context.fillStyle = gradientRef.current;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
      context.restore();

      // Update and render gravity points
      for (let i = 0; i < gravitiesRef.current.length; i++) {
        const g = gravitiesRef.current[i];
        if (g.dragging) {
          g.drag(mouseRef.current);
        }
        g.render(context);
        if (g.destroyed) {
          gravitiesRef.current.splice(i, 1);
          i--;
        }
      }

      // Clear buffer with fade effect
      bufferCtx.save();
      bufferCtx.globalCompositeOperation = 'destination-out';
      bufferCtx.globalAlpha = 0.08; // Slower fade for longer trails
      bufferCtx.fillRect(0, 0, canvas.width, canvas.height);
      bufferCtx.restore();

      // Update and draw particles to buffer
      const particles = particlesRef.current;
      bufferCtx.save();
      
      // Draw particle trails with gradient
      for (const p of particles) {
        p.update();
        const latest = p.getLatest();
        const distance = Math.sqrt((p.x - latest.x) ** 2 + (p.y - latest.y) ** 2);
        
        if (distance > 0.5) {
          const gradient = bufferCtx.createLinearGradient(latest.x, latest.y, p.x, p.y);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
          gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.4)');
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0.8)');
          
          bufferCtx.strokeStyle = gradient;
          bufferCtx.lineWidth = Math.min(distance * 0.3, 3);
          bufferCtx.lineCap = 'round';
          bufferCtx.beginPath();
          bufferCtx.moveTo(latest.x, latest.y);
          bufferCtx.lineTo(p.x, p.y);
          bufferCtx.stroke();
        }
      }
      
      // Draw particle cores with glow
      for (const p of particles) {
        const intensity = Math.random() * 0.5 + 0.5;
        
        // Outer glow
        const glowGrad = bufferCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        glowGrad.addColorStop(0, `rgba(255, 255, 255, ${0.3 * intensity})`);
        glowGrad.addColorStop(0.5, `rgba(139, 92, 246, ${0.2 * intensity})`);
        glowGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
        
        bufferCtx.fillStyle = glowGrad;
        bufferCtx.beginPath();
        bufferCtx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2, false);
        bufferCtx.fill();
        
        // Core particle
        bufferCtx.fillStyle = `rgba(255, 255, 255, ${0.9 * intensity})`;
        bufferCtx.beginPath();
        bufferCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        bufferCtx.fill();
      }
      
      bufferCtx.restore();

      // Draw buffer to main canvas
      context.drawImage(bufferCanvas, 0, 0);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [particleCount, gravity, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ 
        pointerEvents: 'auto',
        cursor: 'crosshair'
      }}
    />
  );
}