import { useState, useCallback, useRef, useMemo } from "react";

interface LandingScreenProps {
  onStart: () => void;
  isExiting: boolean;
}

const LandingScreen = ({ onStart, isExiting }: LandingScreenProps) => {
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate a random position within viewport bounds
  const runAway = useCallback(() => {
    if (!containerRef.current || !noBtnRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const btn = noBtnRef.current.getBoundingClientRect();

    const padding = 20;
    const maxX = container.width - btn.width - padding;
    const maxY = container.height - btn.height - padding;

    const newX = Math.random() * maxX + padding;
    const newY = Math.random() * maxY + padding;

    setNoPos({ x: newX, y: newY });
  }, []);

  // Pre-compute random positions for floating hearts so they don't change on re-render
  const hearts = useMemo(
    () =>
      [...Array(12)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 24 + 16}px`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 4 + 4}s`,
      })),
    []
  );

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background ${
        isExiting ? "animate-scale-out" : ""
      }`}
    >
      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px]" />
        {/* Floating hearts background */}
        <div className="absolute inset-0">
          {hearts.map((style, i) => (
            <span
              key={i}
              className="absolute text-primary/10 animate-float-heart select-none"
              style={style}
            >
              ❤
            </span>
          ))}
        </div>
      </div>

      {/* Main popup card */}
      <div className="relative z-10 flex flex-col items-center gap-8 p-8 sm:p-12 rounded-2xl bg-card/80 backdrop-blur-md border border-border/50 shadow-2xl max-w-md mx-4 animate-popup-in">
        {/* Heart icon */}
        <div className="text-5xl sm:text-6xl animate-heartbeat select-none">
          💖
        </div>

        {/* Question */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground leading-tight text-shadow-romantic">
          Shemdu, will you be my Valentine?
        </h2>

        {/* Buttons row */}
        <div className="flex items-center gap-6 w-full justify-center">
          {/* Yes Button */}
          <button
            onClick={onStart}
            className="px-8 py-3 sm:px-10 sm:py-4 rounded-full text-lg sm:text-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg hover:shadow-rose-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Yes! 💕
          </button>

          {/* No Button - only shown in natural position when not yet moved */}
          {noPos === null && (
            <button
              ref={noBtnRef}
              onMouseEnter={runAway}
              onTouchStart={runAway}
              className="px-8 py-3 sm:px-10 sm:py-4 rounded-full text-lg sm:text-xl font-semibold text-muted-foreground bg-secondary/80 border border-border/50 hover:bg-secondary transition-all duration-300 cursor-pointer"
            >
              No
            </button>
          )}
        </div>
      </div>

      {/* Runaway No Button - absolute positioned after first hover */}
      {noPos !== null && (
        <button
          ref={noBtnRef}
          onMouseEnter={runAway}
          onTouchStart={runAway}
          className="fixed px-8 py-3 sm:px-10 sm:py-4 rounded-full text-lg sm:text-xl font-semibold text-muted-foreground bg-secondary/80 border border-border/50 backdrop-blur-sm transition-all duration-200 cursor-pointer z-[60] hover:bg-secondary"
          style={{
            left: `${noPos.x}px`,
            top: `${noPos.y}px`,
          }}
        >
          No
        </button>
      )}
    </div>
  );
};

export default LandingScreen;
