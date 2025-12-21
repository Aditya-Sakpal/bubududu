import { useState, useEffect } from "react";

const messages = [
  "I love you, Shemdu. Truly. You are the most beautiful thing that has happened to me in 2025. You feel like a gift after all the heartbreaks I went through before you. I know we still have a long journey ahead together, bas thoda sa kalesh kam rakhna.",
  
  "Being with you taught me what it actually feels like to be loved, and that feeling was completely new to me. I can never forget the first moment when I held your hand, or our first kiss in the cinema hall. Those memories are etched into my heart forever. I feel blessed to have you, even if I don't always find the perfect words to express it. But you are truly special to me, Shemdu.",
  
  "I still remember the very first time I saw you that 5'3, cute, innocent girl at Ghatkopar station. Falling in love with you and coming into a relationship with you was the best decision of my life. Please stay by my side always; I promise I'll show you the world.",
  
  "I know I'm not the best at expressing my love, but samajh le yaar, I genuinely and deeply love you. Sometimes I might sound rude, but if I don't get angry with you, then with whom would I? That comfort only comes with love.",
  
  "I often think about that moment when you held my hand while I was peeking out of the rickshaw to look at my favourite car. I felt something powerful then  something I couldn't understand at the time, but now I know exactly what it was.",

  "That was the moment my heart chose you, even before my mind could understand it.",

  "You are my cutiepie Shemdu, I love you so much , you are my protein source as well",

  "I love your nose , your eyes , your smile , your laugh , your meat , your big juicy thighs , I love everything about you",


  "Although I'm not present there in front of you,but the watch I have given you is an essence of my presence that stays with you",

  "I can’t wait for that day jab main tere ghar aaunga tera haath maangne… aur teri mom ke saamne, thoda sa nervous hoke, ye line bolunga ‘I didn't knew you had a sister'",

  "Ab bas Shaadi ka intezaar hai uske baad , I'll eat you raw everyday",

  "Happy Birthday, Shemdu ❤️"
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
            isLastMessage ? 'animate-text-fade-in-stay' : 'animate-text-sequence'
          }`}
        >
          {messages[currentIndex]}
        </p>
      </div>
    </div>
  );
};

export default TextSequence;
