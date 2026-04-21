import React from 'react';
import { CARD_DECK, OFFICIAL_IMAGES } from '../constants';
import { motion } from 'framer-motion';

export default function CardDeck() {
  return (
    <div className="space-y-8 pb-12 flex flex-col items-center">
      <div className="bg-green-500 w-full max-w-6xl mx-auto brutal-border shadow-retro-static flex flex-col md:flex-row justify-between items-center p-6 gap-4">
        <h1 className="sesame-title text-3xl md:text-5xl text-white tracking-wide">
          3. CARD LIBRARY
        </h1>
        <span className="bg-white px-4 py-2 brutal-border rounded-full text-sm font-black whitespace-nowrap transform rotate-1">
          26 CARDS COLLECTED
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {CARD_DECK.map((card, index) => (
          <motion.div
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
              {/* Top Bar (Name, HP, Type) */}
              <div className="flex justify-between items-start w-full pb-1 border-b-[1.5px] border-black/10">
                <h2 className="font-extrabold text-sm sm:text-base leading-none uppercase text-black tracking-tight drop-shadow-sm font-sans flex-1 truncate mr-1">
                   {card.character as string}
                </h2>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-red-700 font-extrabold text-xs sm:text-sm tracking-tighter drop-shadow-sm">
                    {card.id}0 HP
                  </span>
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-black text-white shadow-[1px_1px_0_#222] border-[1.5px] border-black ${card.color as string}`}>
                    {card.letterUpper as string}
                  </div>
                </div>
              </div>

              {/* Main Image Viewport */}
              <div className="relative w-full aspect-[4/3] rounded-sm shadow-[inset_0_0_8px_rgba(0,0,0,0.3)] bg-gradient-to-br from-white/90 to-gray-300/90 overflow-hidden mt-1.5 flex items-center justify-center border-4 border-gray-400">
                 {/* Foil reflection sweeping effect */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20"></div>
                 {/* Pattern behind character */}
                 <div className={`absolute inset-0 opacity-40 ${card.color as string} mix-blend-color-burn card-pattern`}></div>
                 <img 
                  src={OFFICIAL_IMAGES[card.character as string]}
                  alt={card.character as string}
                  className="h-full w-full object-contain relative z-10 p-1 filter drop-shadow-lg scale-110 object-bottom"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Sub-image Info Bar */}
              <div className={`w-full border-y border-black/20 text-center text-[9px] font-black text-gray-900 py-0.5 shadow-sm mt-1 uppercase italic tracking-widest z-10 leading-tight ${card.color} bg-opacity-50`}>
                 Basic Friend • Element: {card.letterUpper}{card.letterLower}
              </div>

              {/* Attack / Move Section */}
              <div className="flex-1 py-1 flex flex-col justify-center relative z-10 border-b border-black/10">
                 <div className="flex items-center justify-between px-1 gap-2">
                   {/* Energy Cost (Using lower case letter) */}
                   <div className="flex items-center space-x-[-4px] shrink-0">
                     <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white border border-gray-400 shadow-[1px_1px_0_rgba(0,0,0,0.3)] flex items-center justify-center font-bold text-[10px] sm:text-xs text-gray-800 relative z-10">
                       {card.letterLower as string}
                     </div>
                     <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white border border-gray-400 shadow-[1px_1px_0_rgba(0,0,0,0.3)] flex items-center justify-center font-bold text-[10px] sm:text-xs text-gray-800 relative z-0">
                       {card.letterLower as string}
                     </div>
                   </div>
                   
                   {/* Attack Name (Food) */}
                   <div className="flex-1 text-center font-black text-xs sm:text-sm uppercase text-gray-900 tracking-tight leading-tight px-1 drop-shadow-sm">
                      {card.food as string}
                   </div>
                   
                   {/* Attack Damage */}
                   <div className="font-extrabold text-base sm:text-lg text-black drop-shadow-sm shrink-0">
                      {(card.id as number) * 10}
                   </div>
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
