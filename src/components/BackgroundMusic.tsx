import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface BackgroundMusicProps {
  isPlaying: boolean;
}

const BackgroundMusic = ({ isPlaying }: BackgroundMusicProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Preload audio when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      // Preload the audio
      audioRef.current.load();
    }
  }, []);

  // Play audio when isPlaying becomes true
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Audio autoplay prevented:", error);
      });
    } else if (!isPlaying && audioRef.current) {
      // Pause if not playing
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        preload="auto"
        src="/audio/Atif_Aslam_Shreya_Goshal_-_Jeene_Laga_Hoon_(mp3.pm).mp3"
      />
      
      {/* Mute toggle button - only show when playing */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-secondary/80 backdrop-blur-sm border border-border/50 text-foreground/70 hover:text-foreground hover:bg-secondary transition-all duration-300"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}
    </>
  );
};

export default BackgroundMusic;
