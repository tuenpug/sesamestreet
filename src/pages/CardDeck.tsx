import React, { useState } from 'react';
import { CARD_DECK, OFFICIAL_IMAGES } from '../constants';
import { motion } from 'framer-motion';
import TransparentCharacter from '../components/TransparentCharacter';

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
            
            {/* Inner Border mimicking TCG layout */}
            <div className="relative z-10 w-full h-full border-[3px] border-[#222] rounded-md p-2 flex flex-col bg-[#e6e6e6] shadow-[inset_0_0_12px_rgba(0,0,0,0.15)] overflow-hidden">
              {/* Top Bar (Uppercase Initial & Name) */}
              <div className="w-full flex items-center justify-between pb-1 border-b-[1.5px] border-black/10 px-1 pt-1">
                <h2 className="font-sans text-lg md:text-xl font-bold tracking-tight text-gray-800 flex items-baseline truncate flex-1">
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
                <div className="flex items-center gap-1 shrink-0 bg-white/60 px-2 py-0.5 rounded-full border border-black/20 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] ml-2">
                  <span className="text-black font-black tracking-tighter text-sm sm:text-base">
                    #{card.id}
                  </span>
                </div>
              </div>

              {/* Main Image Viewport */}
              <div className="relative w-full aspect-[4/3] rounded-sm shadow-[inset_0_0_8px_rgba(0,0,0,0.3)] bg-gradient-to-br from-white/90 to-gray-300/90 overflow-hidden mt-1.5 flex items-center justify-center border-4 border-gray-400">
                 {/* Foil reflection sweeping effect */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20"></div>
                 {/* Pattern behind character */}
                 <div className={`absolute inset-0 opacity-40 ${card.color as string} mix-blend-color-burn card-pattern`}></div>
                 
                 <TransparentCharacter 
                  src={OFFICIAL_IMAGES[card.character as string]}
                  alt={card.character as string}
                  className="h-full w-full object-contain relative z-10 p-1 scale-110 object-bottom drop-shadow-[0px_8px_12px_rgba(0,0,0,0.4)]"
                />
              </div>

              {/* Sub-image Info Bar */}
              <div className={`w-full border-y border-black/20 text-center text-[10px] sm:text-xs font-black text-gray-900 py-0.5 shadow-sm mt-1 uppercase tracking-widest z-10 leading-tight ${card.color} bg-opacity-50`}>
                 Healthy Food Power!
              </div>

              {/* Food Section (Lowercase Initial & Rendered Food) */}
              <div className="flex-1 mt-1 bg-white/50 border border-black/10 rounded-sm flex flex-row items-center p-1 relative z-10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] gap-2">
                 
                 {/* Generated Food Image */}
                 <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-sm overflow-hidden border border-gray-300 shadow-[inset_0_0_5px_rgba(0,0,0,0.2)] bg-white flex items-center justify-center relative">
                   <img 
                     src={`https://image.pollinations.ai/prompt/${encodeURIComponent('perfect realistic single colorful ' + (card.food as string) + ' on solid white background')}?width=100&height=100&nologo=true`} 
                     alt={card.food as string}
                     className="w-[120%] h-[120%] object-cover mix-blend-multiply opacity-90"
                     referrerPolicy="no-referrer"
                   />
                 </div>

                 {/* Food Name highlighting Lowercase */}
                 <div className="flex-1 flex flex-col justify-center overflow-hidden">
                   <h3 className="font-sans text-sm sm:text-base font-bold text-gray-800 flex items-baseline truncate">
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
                            <span className="font-black text-2xl sm:text-3xl text-green-700 drop-shadow-sm px-[1px] leading-none mr-[1px]">
                              {word.charAt(idx).toLowerCase()}
                            </span>
                            <span className="uppercase">{word.slice(idx + 1)}</span>
                          </>
                        );
                     })()}
                   </h3>
                   <p className="text-[9px] sm:text-[10px] uppercase tracking-tight text-gray-500 font-extrabold leading-none mt-0.5">
                     Nutritious Element
                   </p>
                 </div>
              </div>

              {/* Footer / Stats Setup */}
              <div className="mt-1 flex justify-between items-center px-3 py-1 relative z-10 text-[7px] sm:text-[9px] uppercase font-black text-gray-700 bg-gray-300/40 rounded-sm border border-gray-400">
                 <div className="flex flex-col items-center">
                    <span>Weakness</span>
                    <span className="text-black">-</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <span>Resistance</span>
                    <span className="text-black">-</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <span>Retreat</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300 border border-gray-500 mt-[2px]"></span>
                 </div>
              </div>

              {/* Bottom Copyright & Set Info */}
              <div className="flex justify-between items-end mt-1 relative z-10 text-[7px] sm:text-[8px] font-bold text-gray-600/80 italic pb-0.5">
                 <span>Illus. by Sesame Workshop</span>
                 <span className="flex items-center gap-1 font-black not-italic text-black">
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
