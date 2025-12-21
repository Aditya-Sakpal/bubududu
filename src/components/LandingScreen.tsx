import { Button } from "@/components/ui/button";

interface LandingScreenProps {
  onStart: () => void;
  isExiting: boolean;
}

const LandingScreen = ({ onStart, isExiting }: LandingScreenProps) => {
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background ${
        isExiting ? 'animate-scale-out' : ''
      }`}
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <Button
        onClick={onStart}
        variant="romantic"
        size="xl"
        className="animate-gentle-pulse"
      >
        Ispe pe click kar Shemdu!
      </Button>
    </div>
  );
};

export default LandingScreen;
