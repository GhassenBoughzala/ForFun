/* eslint-disable react-hooks/purity */
import { useState, useRef, useCallback } from "react";

const LOVE_MESSAGES = [
  "You make my heart go brrrr 💓",
  "You're my favorite notification 📱",
  "You're the cheese to my pizza 🍕",
  "My love for you is like a candle... if you forget me I will burn your house down 🔥",
  "Are you a magician? Because whenever I look at you, everyone else disappears ✨",
];

const FallingHeart = ({
  delay,
  left,
  size,
}: {
  delay: number;
  left: number;
  size: number;
}) => (
  <div
    className="fixed pointer-events-none text-primary opacity-60 z-0"
    style={{
      left: `${left}%`,
      fontSize: `${size}rem`,
      animation: `fall ${5 + Math.random() * 5}s linear ${delay}s infinite`,
      top: 0,
    }}
  >
    ❤️
  </div>
);

const Index = () => {
  const [said, setSaid] = useState<"yes" | "celebrate" | null>(null);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [noCount, setNoCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNo = useCallback(() => {
    const x = Math.random() * 250 - 125;
    const y = Math.random() * 250 - 125;
    setNoPos({ x, y });
    setNoCount((c) => c + 1);
  }, []);

  const noTexts = [
    "No 😢",
    "Are you sure? 🥺",
    "Really?? 😭",
    "Think again! 💔",
    "Don't do this! 😿",
    "I'll cry! 😢",
    "PLEASE! 🙏",
    "You're breaking my heart! 💔",
    "I'll give you chocolate! 🍫",
    "NOOO 😭😭😭",
  ];

  if (said === "celebrate") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background">
        {Array.from({ length: 20 }).map((_, i) => (
          <FallingHeart
            key={i}
            delay={i * 0.3}
            left={Math.random() * 100}
            size={1 + Math.random() * 2}
          />
        ))}
        <div
          className="z-10 text-center px-4"
          style={{ animation: "confetti-pop 0.6s ease-out" }}
        >
          <div
            className="text-8xl mb-6"
            style={{ animation: "heart-beat 1s ease-in-out infinite" }}
          >
            💖
          </div>
          <h1
            className="text-5xl md:text-7xl mb-6 text-primary"
            style={{ fontFamily: "var(--font-display)" }}
          >
            YAAAY!
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            I knew you'd say yes! 🥰
          </p>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            You just made me the happiest person in the world! Now let's go eat
            something because love makes me hungry 🍕❤️
          </p>
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border max-w-sm mx-auto">
            <p className="text-lg font-medium text-secondary-foreground italic">
              "{LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)]}
              "
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background px-4"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <FallingHeart
          key={i}
          delay={i * 0.5}
          left={Math.random() * 100}
          size={1 + Math.random() * 1.5}
        />
      ))}

      <div className="z-10 text-center max-w-lg">
        <div
          className="text-7xl md:text-9xl mb-8 inline-block"
          style={{ animation: "heart-beat 1.2s ease-in-out infinite" }}
        >
          💕
        </div>

        <h1
          className="text-4xl md:text-6xl mb-4 text-primary leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Will You Be My Valentine?
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-10">
          I've been practicing this question in front of the mirror... 🪞
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative">
          <button
            onClick={() => setSaid("celebrate")}
            className="px-10 py-4 rounded-full bg-primary text-primary-foreground text-xl font-bold shadow-lg hover:scale-110 transition-transform duration-200"
            style={{
              fontSize: `${1.2 + noCount * 0.15}rem`,
              padding: `${1 + noCount * 0.1}rem ${2.5 + noCount * 0.2}rem`,
            }}
          >
            Yes! 💖
          </button>

          <button
            onMouseEnter={moveNo}
            onClick={moveNo}
            className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground text-base font-semibold transition-all duration-200"
            style={{
              transform: noPos
                ? `translate(${noPos.x}px, ${noPos.y}px)`
                : undefined,
              fontSize: `${Math.max(0.6, 1 - noCount * 0.05)}rem`,
              opacity: Math.max(0.4, 1 - noCount * 0.08),
            }}
          >
            {noTexts[Math.min(noCount, noTexts.length - 1)]}
          </button>
        </div>

        {noCount > 0 && (
          <p className="mt-6 text-muted-foreground text-sm animate-pulse">
            {noCount < 3
              ? "The 'No' button seems to be broken... 🤔"
              : noCount < 6
              ? "It's getting harder to say no, isn't it? 😏"
              : "Just give up and say YES already! 😄"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Index;
