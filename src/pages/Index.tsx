import { useState } from "react";
import LandingScreen from "@/components/LandingScreen";
import PhotoCarousel from "@/components/PhotoCarousel";
import TextSequence from "@/components/TextSequence";
import BackgroundMusic from "@/components/BackgroundMusic";

const Index = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(() => {
      setHasStarted(true);
    }, 1000);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* SEO */}
      <h1 className="sr-only">Happy Birthday Shemdu - A Love Letter</h1>

      {/* Landing Screen */}
      {!hasStarted && (
        <LandingScreen onStart={handleStart} isExiting={isExiting} />
      )}

      {/* Background Music - always rendered to preload audio */}
      <BackgroundMusic isPlaying={hasStarted} />

      {/* Main Experience */}
      {hasStarted && (
        <>
          <PhotoCarousel />
          <TextSequence />
        </>
      )}
    </main>
  );
};

export default Index;
