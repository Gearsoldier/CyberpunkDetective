export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scanline"
            style={{
              top: `${i * 5}%`,
              left: 0,
              right: 0,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${6 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(var(--primary)_/_0.03)_50%,transparent_100%)] bg-[length:100px_100%] animate-pulse" />
      
      <svg className="absolute inset-0 w-full h-full">
        <pattern
          id="grid"
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 50 0 L 0 0 0 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-primary/20"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
