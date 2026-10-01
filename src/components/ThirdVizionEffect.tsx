"use client";

import React, { useEffect, useRef, useState } from "react";

export default function ThirdVizionEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Lightning states (to randomly show/hide)
  const [showLightning1, setShowLightning1] = useState(false);
  const [showLightning2, setShowLightning2] = useState(false);

  // Lightning effect loop
  useEffect(() => {
    let cancelled = false;
    const triggerLightning = (setFn: React.Dispatch<React.SetStateAction<boolean>>, delayRange: [number, number]) => {
      if (cancelled) return;
      const nextDelay = Math.random() * (delayRange[1] - delayRange[0]) + delayRange[0];
      setTimeout(() => {
        if (cancelled) return;
        setFn(true);
        setTimeout(() => {
          if (!cancelled) setFn(false);
        }, 150 + Math.random() * 200); // flash duration
        triggerLightning(setFn, delayRange);
      }, nextDelay);
    };

    triggerLightning(setShowLightning1, [2000, 5000]);
    triggerLightning(setShowLightning2, [3000, 6000]);

    return () => {
      cancelled = true;
    };
  }, []);

  // Canvas Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    window.addEventListener("resize", resize);
    resize();

    // prefers-reduced-motion check
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      color: string;

      constructor(w: number, h: number) {
        const isLeft = Math.random() > 0.5;
        const centerX = w / 2;
        const spread = (Math.random() * w) / 2; // Normal spread
        const tightSpread = (Math.random() * w) / 8; // Dense near beam
        
        // 60% chance to spawn near the center beam
        const nearBeam = Math.random() > 0.4;
        
        if (isLeft) {
          this.x = nearBeam ? centerX - tightSpread : centerX - spread;
          this.color = `rgba(255, 165, 0, ${Math.random() * 0.8 + 0.2})`;
          this.vx = (Math.random() - 0.2) * 1.5; // drift mostly left
        } else {
          this.x = nearBeam ? centerX + tightSpread : centerX + spread;
          this.color = `rgba(0, 255, 255, ${Math.random() * 0.8 + 0.2})`;
          this.vx = (Math.random() + -0.8) * 1.5; // drift mostly right
        }
        
        // spawn along the bottom 80% of height
        this.y = h - Math.random() * (h * 0.8);
        this.vy = -Math.random() * 2 - 0.5; // float up
        this.size = Math.random() * 2 + 0.5;
        this.life = 0;
        this.maxLife = Math.random() * 100 + 50;
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (this.life >= this.maxLife || this.y < 0) {
          // respawn
          Object.assign(this, new Particle(w, h));
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        // Fade in and out based on life
        context.globalAlpha = Math.sin((this.life / this.maxLife) * Math.PI);
        context.fill();
        context.globalAlpha = 1.0;
      }
    }

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min((canvas.width * canvas.height) / 8000, 300);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };
    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section 
      aria-label="THIRDVIZION"
      className="relative w-full overflow-hidden bg-transparent flex flex-col items-center justify-center min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[350px] 2xl:min-h-[450px] z-0"
    >
      
      {/* Background Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Vertical Light Beam */}
      <div 
        className="absolute left-1/2 top-0 bottom-0 w-[4px] md:w-[8px] -translate-x-1/2 pointer-events-none z-10 opacity-80 animate-pulse"
        style={{
          background: 'radial-gradient(ellipse at center, #ffffff 0%, rgba(255,255,255,0.8) 20%, rgba(255,165,0,0.5) 40%, rgba(0,255,255,0.5) 60%, transparent 100%)',
          filter: 'blur(20px)',
          boxShadow: '0 0 40px 10px #ffffff, -20px 0 40px 10px #ffa500, 20px 0 40px 10px #00ffff',
          animationDuration: '3s',
        }}
      />
      <div 
        className="absolute left-1/2 top-0 bottom-0 w-[1px] md:w-[2px] -translate-x-1/2 pointer-events-none z-10 bg-white opacity-90 blur-[1px]"
      />

      {/* SVG Lightning - Left (Orange) */}
      <svg
        className={`absolute left-[30%] top-[30%] w-[100px] md:w-[150px] h-[150px] md:h-[200px] pointer-events-none z-10 transition-opacity duration-75 ${showLightning1 ? 'opacity-100' : 'opacity-0'}`}
        viewBox="0 0 100 100"
        style={{ filter: "drop-shadow(0 0 8px #FFA500)" }}
      >
        <path
          d="M50 0 L40 20 L60 40 L30 60 L45 80 L20 100"
          fill="none"
          stroke="#FFA500"
          strokeWidth="1.5"
        />
        <path
          d="M50 0 L40 20 L60 40 L30 60 L45 80 L20 100"
          fill="none"
          stroke="#FFF"
          strokeWidth="0.5"
        />
      </svg>

      {/* SVG Lightning - Right (Cyan) */}
      <svg
        className={`absolute right-[30%] bottom-[10%] w-[80px] md:w-[120px] h-[120px] md:h-[180px] pointer-events-none z-10 transition-opacity duration-75 ${showLightning2 ? 'opacity-100' : 'opacity-0'}`}
        viewBox="0 0 100 100"
        style={{ filter: "drop-shadow(0 0 8px #00FFFF)" }}
      >
        <path
          d="M20 0 L30 25 L10 50 L40 75 L25 100"
          fill="none"
          stroke="#00FFFF"
          strokeWidth="1.5"
        />
        <path
          d="M20 0 L30 25 L10 50 L40 75 L25 100"
          fill="none"
          stroke="#FFF"
          strokeWidth="0.5"
        />
      </svg>

      {/* Text Container */}
      <div className="relative z-20 w-full flex items-center justify-center pointer-events-none select-none overflow-hidden">
        {/* Left Side: THIRD */}
        <div 
          className="font-inter font-medium text-[42px] sm:text-[64px] md:text-[90px] lg:text-[140px] xl:text-[180px] 2xl:text-[200px] tracking-tight uppercase"
          style={{
            WebkitTextStroke: "1.5px #FFA500", // Orange outline
            WebkitTextFillColor: "transparent",
            color: "transparent", // Fallback
            filter: "drop-shadow(0 0 12px rgba(255, 165, 0, 0.6)) drop-shadow(0 0 30px rgba(255, 165, 0, 0.3))",
          }}
        >
          THIRD
        </div>

        {/* Right Side: VIZION */}
        <div 
          className="font-inter font-medium text-[42px] sm:text-[64px] md:text-[90px] lg:text-[140px] xl:text-[180px] 2xl:text-[200px] tracking-tight uppercase"
          style={{
            WebkitTextStroke: "1.5px #00FFFF", // Cyan outline
            WebkitTextFillColor: "transparent",
            color: "transparent", // Fallback
            filter: "drop-shadow(0 0 12px rgba(0, 255, 255, 0.6)) drop-shadow(0 0 30px rgba(0, 255, 255, 0.3))",
          }}
        >
          VIZION
        </div>
      </div>

    </section>
  );
}
