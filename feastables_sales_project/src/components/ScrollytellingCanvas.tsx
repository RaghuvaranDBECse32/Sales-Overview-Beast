'use client';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface SalesData {
  revenue_2024: string;
  revenue_2025_target: string;
  stores: string;
  valuation: string;
  ingredients: string[];
}

export default function ScrollytellingCanvas({ salesData }: { salesData: SalesData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [scrollPct, setScrollPct] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80, damping: 25, restDelta: 0.001,
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, 119]);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => setScrollPct(Math.round(v * 100)));
  }, [scrollYProgress]);

  useEffect(() => {
    const preload = async () => {
      const loaded: HTMLImageElement[] = [];
      for (let i = 0; i < 120; i++) {
        const img = new Image();
        img.src = `/assets/frames/frame_${String(i).padStart(3, '0')}.webp`;
        loaded.push(img);
      }
      setImages(loaded);
    };
    preload();
  }, []);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const idx = Math.min(119, Math.max(0, Math.floor(frameIndex.get())));
      if (ctx && images[idx]?.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[idx], 0, 0, canvas.width, canvas.height);
      }
    };
    return frameIndex.on('change', render);
  }, [images, frameIndex]);

  return (
    <>
      {/* Starburst background */}
      <div className="starburst-bg" />

      {/* Navbar */}
      <nav className="navbar">
        <span className="nav-logo">FEASTABLES</span>
        <ul className="nav-links">
          <li><a href="#">Chocolate</a></li>
          <li><a href="#">Our Story</a></li>
          <li><a href="#">Find A Store</a></li>
        </ul>
        <button className="nav-cta">Shop Now</button>
      </nav>

      {/* Scrollytelling */}
      <div ref={containerRef} className="scrolly-container">
        <div className="scrolly-sticky">
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className="scrolly-canvas"
          />
          <Overlays progress={smoothProgress} data={salesData} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </div>

      {/* Side progress */}
      <div className="progress-track">
        <div className="progress-dot" />
        <div className="progress-track-inner">
          <div className="progress-fill" style={{ height: `${scrollPct}%` }} />
        </div>
      </div>
    </>
  );
}

function Overlays({ progress, data }: { progress: any; data: SalesData }) {
  // Hero: fades out as you scroll away
  const heroOpacity = useTransform(progress, [0, 0.08, 0.2], [1, 1, 0]);
  const heroY = useTransform(progress, [0, 0.2], [0, -50]);
  const heroScale = useTransform(progress, [0, 0.2], [1, 0.95]);

  // Growth stats
  const growthOpacity = useTransform(progress, [0.28, 0.4, 0.65, 0.75], [0, 1, 1, 0]);
  const growthX = useTransform(progress, [0.28, 0.42], [-80, 0]);
  const barWidth = useTransform(progress, [0.42, 0.68], ['0%', '100%']);

  // Deconstructed
  const deconOpacity = useTransform(progress, [0.76, 0.88, 1], [0, 1, 1]);
  const deconY = useTransform(progress, [0.76, 0.88], [40, 0]);

  return (
    <div className="overlays-container">

      {/* === HERO === */}
      <motion.div
        className="hero-overlay"
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
      >
        <div className="hero-eyebrow">MrBeast × Premium Chocolate</div>
        <h1 className="hero-title">FEASTABLES</h1>
        <p className="hero-sub">The {data.valuation} Revolution</p>
        <div className="hero-valuation-badge">
          Valued at <span className="val-num">{data.valuation}</span>
        </div>
      </motion.div>

      {/* === GROWTH STATS === */}
      <motion.div
        className="growth-overlay"
        style={{ opacity: growthOpacity, x: growthX }}
      >
        <span className="growth-tag">◆ Sales Performance</span>
        <h2 className="growth-title">Explosive<br />Growth.</h2>

        <div className="stats-block">
          <div className="stat-item">
            <span className="stat-year">Revenue 2024</span>
            <span className="stat-num">{data.revenue_2024}</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-year">Target 2025</span>
            <span className="stat-num target">{data.revenue_2025_target}</span>
          </div>
        </div>

        <div className="growth-bar-wrap">
          <span className="growth-bar-label">Revenue growth trajectory</span>
          <div className="growth-bar-track">
            <motion.div className="growth-bar-fill" style={{ width: barWidth }} />
          </div>
        </div>

        <div className="stores-chip">📍 {data.stores} Retail Locations</div>
      </motion.div>

      {/* === DECONSTRUCTED === */}
      <motion.div
        className="deconstructed-overlay"
        style={{ opacity: deconOpacity, y: deconY }}
      >
        <span className="decon-label">— What's Inside —</span>
        <h2 className="decon-title">DECONSTRUCTED</h2>
        <div className="ingredients-wrap">
          {data.ingredients?.map((ing: string, i: number) => (
            <motion.span
              key={ing}
              className="ing-pill"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.12, type: 'spring', bounce: 0.5 }}
            >
              {ing}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
