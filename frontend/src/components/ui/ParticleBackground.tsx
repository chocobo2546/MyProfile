import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  glow: boolean;
  phase: number;
}

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number;
    let animId: number;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const NUM = 180;
    const CONN_DIST = 130;
    const MOUSE_RADIUS = 250;
    const MOUSE_FORCE = 0.06;

    const particles: Particle[] = [];

    for (let i = 0; i < NUM; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2.5 + 1,
        baseSize: 0,
        glow: Math.random() < 0.25,
        phase: Math.random() * Math.PI * 2,
      });
    }
    for (const p of particles) p.baseSize = p.size;

    const mouse = { x: -1, y: -1 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = -1;
      mouse.y = -1;
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.12)";
      ctx.fillRect(0, 0, W, H);

      for (const p of particles) {
        p.phase += 0.02;
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;

        if (mouse.x !== -1) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0.5) {
            const closeness = 1 - dist / MOUSE_RADIUS;
            const force = (dist / MOUSE_RADIUS) * MOUSE_FORCE;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
            p.size = p.baseSize + closeness * 3;
            const hitRad = 100;
            if (dist < hitRad) {
              const bounce = (1 - dist / hitRad) * 8;
              p.vx -= (dx / dist) * bounce;
              p.vy -= (dy / dist) * bounce;
            }
          } else {
            p.size += (p.baseSize - p.size) * 0.05;
          }
        } else {
          p.size += (p.baseSize - p.size) * 0.05;
        }

        if (p.glow) p.size = p.baseSize + Math.sin(p.phase) * 0.5;

        p.vx *= 0.95;
        p.vy *= 0.95;

        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 5) {
          p.vx = (p.vx / spd) * 5;
          p.vy = (p.vy / spd) * 5;
        }

        p.x += p.vx;
        p.y += p.vy;

        const m = 20;
        if (p.x < -m) p.x = W + m;
        if (p.x > W + m) p.x = -m;
        if (p.y < -m) p.y = H + m;
        if (p.y > H + m) p.y = -m;
      }

      if (mouse.x !== -1) {
        const cR = 30;
        const cGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, cR);
        cGrad.addColorStop(0, "rgba(0, 200, 83, 0.15)");
        cGrad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, cR, 0, Math.PI * 2);
        ctx.fillStyle = cGrad;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONN_DIST) {
            const alpha = (1 - dist / CONN_DIST) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 200, 83, ${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "#00c853";
        ctx.fill();

        if (p.glow || p.size > p.baseSize + 0.5) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
          grad.addColorStop(0, "rgba(0, 200, 83, 0.18)");
          grad.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
};
