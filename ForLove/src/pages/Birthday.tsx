import { motion } from "framer-motion";
import { useState, useCallback } from "react";

import Sparkles from "@/components/Sparkles";
import LockScreen from "@/components/LockScreen";
import BackgroundMusic from "@/components/BackgroundMusic";

import photo1 from "@/assets/p1.jpg";
import photo2 from "@/assets/p2.jpg";
import photo3 from "@/assets/p3.jpg";
import photo4 from "@/assets/p4.jpg";

const photos = [photo2, photo1, photo3, photo4];

const captions = [
  "Every moment with you is magic ✨",
  "Together is my favorite place 💐",
  "You & me, always 💋",
  "My favorite smile in the world 💛",
];

const Birthday = () => {
  const [locked, setLocked] = useState(
    () => Date.now() < new Date("2026-04-07T00:00:00").getTime()
  );
  const handleUnlock = useCallback(() => setLocked(false), []);
  if (locked) {
    return (
      <>
        <Sparkles />
        <LockScreen onUnlock={handleUnlock} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <Sparkles />
      <BackgroundMusic />
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-lg font-light">
            Happy Birthday
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground leading-tight">
            To the Love <br />
            <span className="italic text-primary">of My Life</span>
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-xl mx-auto font-light leading-relaxed">
            Today the world celebrates the day you were born — and I celebrate
            every day I get to love you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12"
        >
          <div className="w-px h-16 bg-primary/40 mx-auto animate-pulse" />
        </motion.div>
      </section>

      {/* Photo Gallery */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex flex-col ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-8 md:gap-16`}
          >
            <div className="w-full md:w-3/5 overflow-hidden rounded-lg">
              <img
                src={photo}
                alt={`Memory ${i + 1}`}
                className="w-full h-[400px] md:h-[520px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="w-full md:w-2/5 text-center md:text-left space-y-4">
             {/*  <span className="text-primary text-6xl font-display opacity-30">
                {String(i + 1).padStart(2, "")}
              </span> */}
              <p className="text-foreground text-4xl md:text-3xl italic font-light leading-relaxed">
                {captions[i]}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Closing Message */}
      <section className="py-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <div className="text-6xl">🎂</div>
          <h2 className="text-4xl md:text-5xl font-semibold text-foreground">
            Happy Birthday, <span className="text-primary italic">My Love</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed">
            Here's to another year of laughter, adventures, and endless love.
            You make every day brighter just by being you. I love you more than
            words could ever say.
          </p>
          <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed">
            💛
          </p>
          <div className="flex items-center justify-center gap-3 pt-4">
            <div className="h-px w-12 bg-primary/40" />
            <span className="text-primary text-sm tracking-widest uppercase">
              Forever Yours
            </span>
            <div className="h-px w-12 bg-primary/40" />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Birthday;
