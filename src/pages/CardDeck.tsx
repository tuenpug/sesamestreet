import React from 'react';
import { CARD_DECK, OFFICIAL_IMAGES } from '../constants';
import { motion } from 'framer-motion';

export default function CardDeck() {
  const getCardColorForText = (bgClass: string) => {
    return bgClass.replace('bg-', 'text-').replace('400', '600').replace('500', '600').replace('300', '600');
  };

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
            whileHover={{ scale: 1.05 }}
            className={`brutal-border rounded-2xl shadow-retro bg-white flex flex-col p-4 relative h-full transform transition-transform ${index % 2 === 0 ? '-rotate-1 hover:-rotate-3' : 'rotate-2 hover:rotate-4'}`}
          >
            {/* Holographic overlay effect replaced by simple dot pattern */}
            <div className="absolute inset-0 card-pattern opacity-50 pointer-events-none rounded-xl z-0"></div>
            
            {/* Card Header */}
            <div className="flex justify-between items-start z-10">
              <div className="relative">
                <div className="text-5xl font-black text-black absolute top-1 left-1 opacity-50">{card.letterUpper}</div>
                <div className={`text-5xl font-black relative z-10 ${getCardColorForText(card.color as string)}`}>{card.letterUpper}</div>
              </div>
              <div className="relative">
                <div className="text-3xl font-black text-black absolute top-1 right-1 opacity-50">{card.letterLower}</div>
                <div className={`text-3xl font-black relative z-10 opacity-80 ${getCardColorForText(card.color as string)}`}>{card.letterLower}</div>
              </div>
            </div>

            {/* Character Image Area */}
            <div className={`mt-4 w-full aspect-square rounded-full flex-1 border-4 border-black mb-2 flex items-center justify-center bg-white shadow-retro-static relative z-10 overflow-hidden`}>
              <img 
                src={OFFICIAL_IMAGES[card.character as string]}
                alt={card.character as string}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>

            {/* Card Footer / Stats */}
            <div className="mt-2 z-10 text-center">
               <h3 className={`sesame-title text-2xl leading-tight ${getCardColorForText(card.color as string)}`}>
                 {card.character as string}
               </h3>
               
               <div className="flex justify-between items-end mt-4">
                  <div className="w-12 h-12 bg-white rounded-full brutal-border flex items-center justify-center font-black text-xl shadow-sm">
                    #{card.id}
                  </div>
                  <div className="text-right bg-white p-2 border-2 border-black rounded-lg">
                    <p className="text-[10px] font-black uppercase tracking-wider text-green-600 mb-1">
                      Healthy Snack
                    </p>
                    <p className="font-bold text-gray-900 border-t-2 border-black pt-1">
                      {card.food as string}
                    </p>
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
