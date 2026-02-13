import { useState, useEffect } from "react";

const messages = [
  "You're my BUBU, I'm your DUDU... I can't live without you 🐼🐻",

  "Jaise BUBU ko DUDU ke bina neend nahi aati, waise mujhe bhi tere bina chain nahi milta.",

  "Tu meri BUBU hai... Cute, cuddly, aur thodi si moody — but that's what makes you perfect 💕",

  "DUDU hamesha BUBU ka khayal rakhta hai... Aur main hamesha tera khayal rakhunga, promise.",

  "Hum dono bilkul BUBU aur DUDU jaise hain... Ek dusre ke bina adhoore, saath mein complete.",

  "BUBU ke bina DUDU ka koi scene nahi... Aur tere bina mera koi plan nahi.",

  "Tu meri woh BUBU hai jiski har cheez cute lagti hai... Gussa bhi, pyaar bhi, sab kuch 🐼",

  "DUDU ko pata hai BUBU usse kitna pyaar karti hai... Aur mujhe bhi pata hai tu mujhse kitna pyaar karti hai.",

  "Jaise BUBU DUDU ka haath pakad ke chal ti hai, waise hi chal mere saath... Zindagi bhar 🤝",

  "BUBU + DUDU = Forever... Aur hum dono bhi = Forever ❤️",

  "Thank You for being my BUBU, Shemdu... Happy Valentine's Day 🐼🐻💖",
];

const TextSequence = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Don't set timer for the last message - it stays forever
    if (currentIndex === messages.length - 1) {
      return;
    }

    const duration = 16000;

    const timer = setTimeout(() => {
      if (currentIndex < messages.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setKey((prev) => prev + 1);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const isLastMessage = currentIndex === messages.length - 1;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center p-8 animate-fade-in-slow">
      <div className="max-w-3xl text-center">
        <p
          key={key}
          className={`text-foreground text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-shadow-romantic italic ${
            isLastMessage
              ? "animate-text-fade-in-stay"
              : "animate-text-sequence"
          }`}
        >
          {messages[currentIndex]}
        </p>
      </div>
    </div>
  );
};

export default TextSequence;
