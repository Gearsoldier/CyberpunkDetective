import { useEffect, useState } from "react";

// Glitch effect component
export function GlitchText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 100);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`${className} ${isGlitching ? 'glitch-effect' : ''}`}>
      {children}
    </span>
  );
}

// Data stream effect
export function DataStream() {
  const [streams, setStreams] = useState<Array<{ id: number; left: string; delay: number }>>([]);

  useEffect(() => {
    const newStreams = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 3
    }));
    setStreams(newStreams);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {streams.map((stream) => (
        <div
          key={stream.id}
          className="data-stream"
          style={{
            left: stream.left,
            animationDelay: `${stream.delay}s`
          }}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="text-primary/20 font-mono text-xs">
              {Math.random().toString(36).substring(2, 8)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Hacking progress animation
export function HackingAnimation({ isActive }: { isActive: boolean }) {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      setText("");
      return;
    }

    const messages = [
      "Initializing OSINT protocols...",
      "Scanning network infrastructure...",
      "Analyzing metadata patterns...",
      "Cross-referencing databases...",
      "Decrypting payload...",
      "Investigation complete."
    ];

    let currentMessage = 0;
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);

      if (currentProgress % 17 === 0 && currentMessage < messages.length) {
        setText(messages[currentMessage]);
        currentMessage++;
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="w-96 space-y-4">
        <div className="space-y-2">
          <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-100 neon-glow"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-primary font-mono text-sm text-center glitch-effect">
            {text}
          </p>
        </div>
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="h-1 bg-primary/20 rounded-full"
              style={{
                backgroundColor: i < (progress / 100 * 32) ? 'var(--primary)' : undefined,
                animationDelay: `${i * 0.05}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Matrix-style code rain effect
export function CodeRain({ show }: { show: boolean }) {
  if (!show) return null;

  const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="code-rain-column"
          style={{
            left: `${i * 5}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          {Array.from({ length: 30 }).map((_, j) => (
            <span key={j} className="text-primary/30 font-mono text-xs block">
              {characters.charAt(Math.floor(Math.random() * characters.length))}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

// Scan line effect for cyberpunk aesthetic
export function ScanLines() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 opacity-5">
      <div className="scan-lines" />
    </div>
  );
}

// Particle effect for achievements
export function ParticleExplosion({ x, y, show }: { x: number; y: number; show: boolean }) {
  if (!show) return null;

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{ left: x, top: y }}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            '--angle': `${(i / 20) * 360}deg`,
            '--distance': `${50 + Math.random() * 50}px`,
            animationDelay: `${Math.random() * 0.1}s`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
