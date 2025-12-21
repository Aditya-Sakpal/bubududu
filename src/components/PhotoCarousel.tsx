import { useMemo } from "react";

import photo1 from "@/assets/photo-1.png";
import photo2 from "@/assets/photo-2.png";
import photo3 from "@/assets/photo-3.png";
import photo4 from "@/assets/photo-4.png";
import photo5 from "@/assets/photo-5.png";
import photo6 from "@/assets/photo-6.png";
import photo7 from "@/assets/photo-7.png";
import photo8 from "@/assets/photo-8.png";
import photo9 from "@/assets/photo-9.png";
import photo10 from "@/assets/photo-10.png";
import photo11 from "@/assets/photo-11.png";
import photo12 from "@/assets/photo-12.png";
import photo13 from "@/assets/photo-13.png";
import photo14 from "@/assets/photo-14.png";
import photo15 from "@/assets/photo-15.png";

const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12, photo13, photo14, photo15];

interface PhotoColumnProps {
  images: string[];
  direction: "up" | "down";
  speed?: number;
}

const PhotoColumn = ({ images, direction }: PhotoColumnProps) => {
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <div className="relative h-screen overflow-hidden flex-1">
      <div
        className={`flex flex-col gap-3 ${
          direction === "down" ? "animate-scroll-down" : "animate-scroll-up"
        }`}
      >
        {duplicatedImages.map((src, index) => (
          <div
            key={index}
            className="w-full aspect-[3/4] rounded-lg overflow-hidden opacity-40 hover:opacity-60 transition-opacity duration-500"
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const PhotoCarousel = () => {
  // Calculate number of columns based on viewport
  const columnCount = useMemo(() => {
    if (typeof window === "undefined") return 5;
    const width = window.innerWidth;
    if (width < 640) return 3;
    if (width < 1024) return 4;
    if (width < 1440) return 5;
    return 6;
  }, []);

  // Shuffle photos for each column
  const getShuffledPhotos = (seed: number) => {
    const shuffled = [...photos];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = (i + seed) % shuffled.length;
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return (
    <div className="fixed inset-0 z-0 flex gap-3 p-3 animate-fade-in-slow">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-background/60 z-10 pointer-events-none" />
      
      {Array.from({ length: columnCount }).map((_, index) => (
        <PhotoColumn
          key={index}
          images={getShuffledPhotos(index)}
          direction={index % 2 === 0 ? "down" : "up"}
        />
      ))}
    </div>
  );
};

export default PhotoCarousel;
