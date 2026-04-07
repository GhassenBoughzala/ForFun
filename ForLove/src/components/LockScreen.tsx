import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2026-04-08T00:00:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const LockScreen = ({ onUnlock }: { onUnlock: () => void }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = TARGET_DATE - now;
      if (diff <= 0) {
        onUnlock();
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [onUnlock]);

  if (!timeLeft) return null;

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="space-y-8"
      >
        <div className="text-6xl">🎁</div>
        <h1 className="text-4xl md:text-6xl font-semibold text-foreground">
          Something <span className="text-primary italic">Special</span> is Coming
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl font-light max-w-md mx-auto">
          A surprise awaits you on April 8th…
        </p>

        <div className="flex gap-4 md:gap-8 justify-center pt-4">
          {units.map((u) => (
            <div key={u.label} className="flex flex-col items-center">
              <span className="text-4xl md:text-6xl font-semibold text-primary tabular-nums">
                {String(u.value).padStart(2, "0")}
              </span>
              <span className="text-muted-foreground text-xs md:text-sm uppercase tracking-widest mt-2">
                {u.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LockScreen;
