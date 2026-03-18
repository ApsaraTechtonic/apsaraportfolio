import { useState, useEffect, useRef, useCallback } from "react";
import { Gamepad2 } from "lucide-react";
import SectionTitle from "./SectionTitle";

const GRID = 20;
const CELL = 20;
const SPEED = 120;

type Pos = { x: number; y: number };

const GameSection = () => {
  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("snake-high");
    return saved ? parseInt(saved) : 0;
  });

  const snakeRef = useRef<Pos[]>([{ x: 10, y: 10 }]);
  const dirRef = useRef<Pos>({ x: 1, y: 0 });
  const foodRef = useRef<Pos>({ x: 15, y: 10 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loopRef = useRef<number>(0);
  const lastDirRef = useRef<Pos>({ x: 1, y: 0 });

  const spawnFood = useCallback(() => {
    const snake = snakeRef.current;
    let pos: Pos;
    do {
      pos = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
    } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
    foodRef.current = pos;
  }, []);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const size = GRID * CELL;

    // Background
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--background").trim()
      ? `hsl(${getComputedStyle(document.documentElement).getPropertyValue("--background").trim()})`
      : "#0a0a0a";
    ctx.fillRect(0, 0, size, size);

    // Grid dots
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    for (let x = 0; x < GRID; x++)
      for (let y = 0; y < GRID; y++)
        ctx.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 2, 2);

    // Snake
    const snake = snakeRef.current;
    snake.forEach((seg, i) => {
      const t = 1 - i / snake.length;
      ctx.fillStyle = `hsl(330, 90%, ${50 + t * 20}%)`;
      const pad = i === 0 ? 1 : 2;
      ctx.beginPath();
      ctx.roundRect(seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, 4);
      ctx.fill();
    });

    // Food
    const f = foodRef.current;
    ctx.fillStyle = "hsl(330, 90%, 65%)";
    ctx.beginPath();
    ctx.arc(f.x * CELL + CELL / 2, f.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "hsl(330, 90%, 80%)";
    ctx.beginPath();
    ctx.arc(f.x * CELL + CELL / 2 - 2, f.y * CELL + CELL / 2 - 2, 3, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const tick = useCallback(() => {
    const snake = [...snakeRef.current];
    const dir = dirRef.current;
    lastDirRef.current = dir;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    // Wall collision
    if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) {
      setGameOver(true);
      setPlaying(false);
      setScore((s) => {
        const final = s;
        setHighScore((h) => {
          const newH = Math.max(h, final);
          localStorage.setItem("snake-high", String(newH));
          return newH;
        });
        return s;
      });
      return;
    }

    // Self collision
    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      setGameOver(true);
      setPlaying(false);
      setScore((s) => {
        const final = s;
        setHighScore((h) => {
          const newH = Math.max(h, final);
          localStorage.setItem("snake-high", String(newH));
          return newH;
        });
        return s;
      });
      return;
    }

    snake.unshift(head);

    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      setScore((s) => s + 1);
      spawnFood();
    } else {
      snake.pop();
    }

    snakeRef.current = snake;
    draw();
  }, [draw, spawnFood]);

  const resetGame = () => {
    snakeRef.current = [{ x: 10, y: 10 }];
    dirRef.current = { x: 1, y: 0 };
    lastDirRef.current = { x: 1, y: 0 };
    spawnFood();
    setScore(0);
    setGameOver(false);
    setPlaying(true);
  };

  // Game loop
  useEffect(() => {
    if (!playing) return;
    draw();
    const id = setInterval(tick, SPEED);
    loopRef.current = id as unknown as number;
    return () => clearInterval(id);
  }, [playing, tick, draw]);

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!playing) return;
      const last = lastDirRef.current;
      switch (e.key) {
        case "ArrowUp":
        case "w":
          if (last.y !== 1) dirRef.current = { x: 0, y: -1 };
          break;
        case "ArrowDown":
        case "s":
          if (last.y !== -1) dirRef.current = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
        case "a":
          if (last.x !== 1) dirRef.current = { x: -1, y: 0 };
          break;
        case "ArrowRight":
        case "d":
          if (last.x !== -1) dirRef.current = { x: 1, y: 0 };
          break;
      }
      e.preventDefault();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [playing]);

  // Touch controls
  const touchStart = useRef<Pos | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current || !playing) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    const last = lastDirRef.current;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 20 && last.x !== -1) dirRef.current = { x: 1, y: 0 };
      else if (dx < -20 && last.x !== 1) dirRef.current = { x: -1, y: 0 };
    } else {
      if (dy > 20 && last.y !== -1) dirRef.current = { x: 0, y: 1 };
      else if (dy < -20 && last.y !== 1) dirRef.current = { x: 0, y: -1 };
    }
    touchStart.current = null;
  };

  const canvasSize = GRID * CELL;

  return (
    <section id="game" className="section-container">
      <SectionTitle>Snake</SectionTitle>

      {!playing && !gameOver && (
        <div className="glass-card text-center space-y-4">
          <Gamepad2 className="mx-auto text-primary" size={48} />
          <p className="text-muted-foreground">
            Use arrow keys or WASD to control. Swipe on mobile.
          </p>
          {highScore > 0 && (
            <p className="text-muted-foreground text-sm">Best: {highScore}</p>
          )}
          <button onClick={resetGame} className="btn-primary mx-auto">
            Start Game
          </button>
        </div>
      )}

      {gameOver && (
        <div className="glass-card text-center space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Game Over!</h3>
          <p className="text-primary text-3xl font-mono font-bold">Score: {score}</p>
          <p className="text-muted-foreground text-sm">Best: {highScore}</p>
          <button onClick={resetGame} className="btn-primary mx-auto">
            Play Again
          </button>
        </div>
      )}

      {playing && (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-between w-full max-w-[400px] px-2">
            <span className="text-primary font-mono text-xl font-bold">Score: {score}</span>
            <span className="text-muted-foreground font-mono text-sm">Best: {highScore}</span>
          </div>
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="rounded-2xl max-w-full touch-none"
            style={{
              boxShadow: "0 0 40px hsl(330 90% 50% / 0.15)",
              border: "1px solid hsl(var(--foreground) / 0.1)",
            }}
          />
          <p className="text-muted-foreground text-xs">Arrow keys / WASD • Swipe on mobile</p>
        </div>
      )}
    </section>
  );
};

export default GameSection;
