import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import pianoMusic from "@/assets/Experience_Solo_Piano.mp3";   // ← Change this path to match your actual folder structure

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set source from the imported URL
    audio.src = pianoMusic;     // Important: assign the imported path

    const tryPlay = () => {
      audio.volume = 0.45;
      audio.play()
        .then(() => setPlaying(true))
        .catch((err) => console.log("Autoplay prevented:", err));
    };

    // Try autoplay (often blocked by browsers)
    tryPlay();

    // Fallback: play on first user click anywhere
    const handler = () => {
      tryPlay();
      document.removeEventListener("click", handler);
    };
    document.addEventListener("click", handler);

    return () => document.removeEventListener("click", handler);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch((err) => console.log("Play error:", err));
    }
  };

  return (
    <>
     <audio
        ref={audioRef}
        loop
        preload="auto"
        // src is now set in useEffect (or you can put src={pianoMusic} directly)
      />
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card/80 backdrop-blur border border-border text-foreground hover:bg-card transition-colors"
        aria-label={playing ? "Mute music" : "Play music"}
      >
        {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  );
};

export default BackgroundMusic;
