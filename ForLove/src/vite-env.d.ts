/// <reference types="vite/client" />

// Declare modules for images and audio files
declare module '*.jpg' {
    const src: string;
    export default src;
  }
  
  declare module '*.JPG' {
    const src: string;
    export default src;
  }
  
  declare module '*.jpeg' {
    const src: string;
    export default src;
  }
  
  declare module '*.png' {
    const src: string;
    export default src;
  }
  
  declare module '*.mp3' {
    const src: string;
    export default src;
  }
  
  // Add more if needed (e.g. *.webp, *.gif, *.wav, *.ogg)
  declare module '*.webp' {
    const src: string;
    export default src;
  }