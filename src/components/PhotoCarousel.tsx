import { useMemo } from "react";

import img1 from "@/assets/bubududu/asas.png";
import img2 from "@/assets/bubududu/asasc.jpg";
import img3 from "@/assets/bubududu/asasd.png";
import img4 from "@/assets/bubududu/ascasxx.jpg";
import img5 from "@/assets/bubududu/asdads.jpg";
import img6 from "@/assets/bubududu/asdas.png";
import img7 from "@/assets/bubududu/asdasxas.jpg";
import img8 from "@/assets/bubududu/asonas.png";
import img9 from "@/assets/bubududu/aspas.jpg";
import img10 from "@/assets/bubududu/huhsdsd.jpg";
import img11 from "@/assets/bubududu/images.jpg";
import img12 from "@/assets/bubududu/pansda.jpg";
import img13 from "@/assets/bubududu/st,small,507x507-pad,600x600,f8f8f8.u2.jpg";

const photos = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13];

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
