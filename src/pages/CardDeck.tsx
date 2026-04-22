import React, { useState, useEffect } from 'react';
import { CARD_DECK, OFFICIAL_IMAGES } from '../constants';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import TransparentCharacter from '../components/TransparentCharacter';

const WIKI_MAPPING: Record<string, string> = {
  "Trail Mix": "Trail mix",
  "Fig": "Common_fig",
  "Spinach": "Spinach",
  "Broccoli": "Broccoli",
  "Kiwi": "Kiwifruit",
  "Ugli Fruit": "Jamaican_tangelo",
  "Dragon Fruit": "Pitaya",
  "Yam": "Yam_(vegetable)",
  "Honeydew": "Honeydew_(melon)",
  "Carrot": "Carrot",
  "Raspberry": "Raspberry",
  "Apple": "Apple",
  "Vine Tomato": "Tomato",
  "Iceberg Lettuce": "Iceberg_lettuce",
  "Nectarine": "Nectarine",
  "Watermelon": "Watermelon",
  "Eggplant": "Eggplant",
  "Jalapeno": "Jalapeño",
  "Orange": "Orange_(fruit)",
  "Tomato": "Tomato",
  "Zucchini": "Zucchini",
  "Lemon": "Lemon",
  "Grape": "Grape",
  "Quince": "Quince",
  "Mango": "Mango",
  "Peach": "Peach"
};

const FoodImage = ({ card, index }: { card: any, index: number }) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    // Stagger API calls slightly to be gentle on browser networking
    const timer = setTimeout(async () => {
      try {
        const title = WIKI_MAPPING[card.food as string] || card.food;
        const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&titles=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=300`);
        const data = await res.json();
        const pages = data.query?.pages;
        if (pages) {
          const pageId = Object.keys(pages)[0];
          if (pageId !== "-1" && pages[pageId].thumbnail && isMounted) {
            setImgSrc(pages[pageId].thumbnail.source);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }, index * 40); // slight stagger

    return () => { 
       isMounted = false; 
       clearTimeout(timer);
    };
  }, [card.food, index]);

  return (
    <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-[4px] overflow-hidden border border-gray-300 shadow-[inset_0_0_5px_rgba(0,0,0,0.2)] bg-[#f8f9fa] flex items-center justify-center relative p-[2px]">
      {loading ? (
         <RefreshCw size={14} className="text-gray-300 animate-spin" />
      ) : imgSrc ? (
         <img src={imgSrc} alt={card.food} className="w-full h-full object-cover rounded-sm mix-blend-multiply" referrerPolicy="no-referrer" />
      ) : (
         <span className="text-xl font-bold text-gray-300">{card.food.charAt(0)}</span>
      )}
    </div>
  );
};

export default function CardDeck() {
  const [sortBy, setSortBy] = useState<'id' | 'letterUpper' | 'letterLower'>('id');

  const sortedCards = [...CARD_DECK].sort((a, b) => {
    if (sortBy === 'id') return a.id - b.id;
    if (sortBy === 'letterUpper') return a.letterUpper.localeCompare(b.letterUpper);
    if (sortBy === 'letterLower') return a.letterLower.localeCompare(b.letterLower);
    return 0;
  });

  return (
    <div className="space-y-8 pb-12 flex flex-col items-center">
      <div className="bg-green-500 w-full max-w-6xl mx-auto brutal-border shadow-retro-static flex flex-col items-center p-6 gap-6">
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
          <h1 className="sesame-title text-3xl md:text-5xl text-white tracking-wide flex-1">
            3. CARD LIBRARY
          </h1>
          <span className="bg-white px-4 py-2 brutal-border rounded-full text-sm font-black whitespace-nowrap transform rotate-1">
            26 CARDS COLLECTED
          </span>
        </div>

        {/* Sorting Controls */}
        <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center bg-black/20 p-3 sm:p-4 rounded-xl brutal-border border-black/20 w-fit">
           <span className="text-white font-black mr-2 drop-shadow-sm uppercase text-sm">Sort deck:</span>
           <button onClick={() => setSortBy('id')} className={`px-4 py-1.5 brutal-border text-sm font-black whitespace-nowrap transition-transform ${sortBy === 'id' ? 'bg-yellow-400 rotate-1 scale-105' : 'bg-white hover:-translate-y-1'}`}>
             By Number (#)
           </button>
           <button onClick={() => setSortBy('letterUpper')} className={`px-4 py-1.5 brutal-border text-sm font-black whitespace-nowrap transition-transform ${sortBy === 'letterUpper' ? 'bg-pink-400 text-white rotate-[-1deg] scale-105' : 'bg-white hover:-translate-y-1'}`}>
             By Character (A-Z)
           </button>
           <button onClick={() => setSortBy('letterLower')} className={`px-4 py-1.5 brutal-border text-sm font-black whitespace-nowrap transition-transform ${sortBy === 'letterLower' ? 'bg-blue-400 text-white rotate-1 scale-105' : 'bg-white hover:-translate-y-1'}`}>
             By Food (a-z)
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sortedCards.map((card, index) => (
          <motion.div
            layout
            key={card.id as number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, zIndex: 50, rotate: index % 2 === 0 ? '-2deg' : '2deg' }}
            className={`group relative w-full aspect-[63/88] rounded-[1.2rem] p-[8px] md:p-[12px] shadow-retro-static transition-transform ${card.color} overflow-hidden`}
          >
            {/* Holographic background tint (now spans inside padding as part of card design) */}
            <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none z-0 card-pattern border-white/20 border-4"></div>
            <div className="absolute inset-0 bg-white/10 pointer-events-none z-0"></div>
            
            {/* Inner Border mimicking TCG layout but letting theme color shine through */}
            <div className="relative z-10 w-full h-full border-[3px] border-white/80 rounded-[10px] p-2 flex flex-col bg-white/85 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(255,255,255,0.8)] overflow-hidden">
              {/* Top Bar (Uppercase Initial & Name) */}
              <div className="w-full flex items-center justify-between pb-1 border-b-2 border-black/10 px-1 pt-1">
                <h2 className="font-sans text-lg md:text-xl font-bold tracking-tight text-gray-900 flex items-baseline truncate flex-1 drop-shadow-sm">
                  {(() => {
                    const word = card.character as string;
                    const letter = card.letterUpper as string;
                    let idx = word.toLowerCase().indexOf(letter.toLowerCase());
                    
                    // If the target letter isn't in the character's name, just use the first letter!
                    if (idx === -1) {
                      idx = 0;
                    }

                    return (
                      <>
                        <span className="uppercase">{word.slice(0, idx)}</span>
                        <span className="font-black text-3xl sm:text-4xl text-black drop-shadow-sm px-[1px] leading-none">
                          {word.charAt(idx).toUpperCase()}
                        </span>
                        <span className="uppercase">{word.slice(idx + 1)}</span>
                      </>
                    );
                  })()}
                </h2>
                <div className="flex items-center gap-1 shrink-0 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.15)] px-2.5 py-0.5 rounded-full border-2 border-white ml-2">
                  <span className="text-black font-black tracking-tighter text-sm sm:text-base drop-shadow-sm">
                    #{card.id}
                  </span>
                </div>
              </div>

              {/* Main Image Viewport */}
              <div className="relative w-full flex-1 min-h-0 rounded-lg shadow-[inset_0_4px_12px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.15)] bg-gradient-to-br from-white/95 to-white/40 overflow-hidden mt-2 flex items-center justify-center border-4 border-white/90">
                 {/* Foil reflection sweeping effect */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20"></div>
                 {/* Pattern behind character */}
                 <div className={`absolute inset-0 opacity-60 ${card.color as string} mix-blend-color-burn card-pattern`}></div>
                 
                 <TransparentCharacter 
                  src={OFFICIAL_IMAGES[card.character as string]}
                  alt={card.character as string}
                  className="h-full w-full object-contain relative z-10 p-0 scale-[1.25] origin-bottom object-bottom drop-shadow-[0px_8px_12px_rgba(0,0,0,0.4)]"
                />
              </div>

              {/* Food Section (Lowercase Initial & Rendered Food) */}
              <div className="shrink-0 bg-white/80 border-2 border-white rounded-lg flex flex-row items-center p-1 mt-2 relative z-10 shadow-sm gap-2">
                 
                 {/* Generated Food Image */}
                 <FoodImage card={card} index={index} />

                 {/* Food Name highlighting Lowercase */}
                 <div className="flex-1 flex flex-col justify-center overflow-hidden pl-1">
                   <h3 className="font-sans text-sm sm:text-base font-bold text-gray-900 flex items-baseline truncate drop-shadow-sm">
                     {(() => {
                        const word = card.food as string;
                        const letter = card.letterLower as string;
                        let idx = word.toLowerCase().indexOf(letter.toLowerCase());
                        
                        // Safety fallback just in case
                        if (idx === -1) {
                          idx = 0;
                        }

                        return (
                          <>
                            <span className="uppercase">{word.slice(0, idx)}</span>
                            <span className={`font-black text-2xl sm:text-3xl drop-shadow-sm px-[1px] leading-none mix-blend-color-burn filter brightness-[0.4] ${card.color} text-transparent bg-clip-text mr-[1px]`}>
                              {word.charAt(idx).toLowerCase()}
                            </span>
                            <span className="uppercase">{word.slice(idx + 1)}</span>
                          </>
                        );
                     })()}
                   </h3>
                   <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-black/60 font-extrabold leading-none mt-0.5">
                     {card.category as string}
                   </p>
                 </div>
              </div>

              {/* Footer / Colors Setup */}
              <div className="mt-2 flex justify-between items-center px-1 sm:px-2 py-1.5 sm:py-2 relative z-10 text-[7px] sm:text-[9px] uppercase font-black text-black/70 bg-white/60 rounded-lg border-2 border-white shadow-[0_1px_4px_rgba(0,0,0,0.1)] gap-1">
                 {(card.palette as {n: string; c: string}[]).map((col, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1">
                       <span className="truncate w-full text-center leading-tight mb-0.5 tracking-tighter" title={col.n}>{col.n}</span>
                       <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-black/20 shadow-sm" style={{ backgroundColor: col.c }}></span>
                    </div>
                 ))}
              </div>

              {/* Bottom Copyright & Set Info */}
              <div className="flex justify-between items-end mt-1 relative z-10 text-[7px] sm:text-[8px] font-bold text-black/60 italic pb-0.5 px-1">
                 <span>Illus. by Sesame Workshop</span>
                 <span className="flex items-center gap-1 font-black not-italic text-black/80">
                    {card.id}/26 
                    <span className="text-xs">★</span>
                 </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
