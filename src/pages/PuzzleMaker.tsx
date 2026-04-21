import React, { useState } from 'react';
import { CHARACTERS, OFFICIAL_IMAGES } from '../constants';
import { Printer, Scissors, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const ACTIONS = [
  { id: "idle", label: "Standing Still", animate: {} },
  { id: "jumping", label: "Jumping Happily", animate: { y: [0, -40, 0], transition: { repeat: Infinity, duration: 0.8, ease: "backOut" } } },
  { id: "dancing", label: "Dancing Playfully", animate: { rotate: [-10, 10, -10], transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" } } },
  { id: "floating", label: "Floating in Air", animate: { y: [0, -15, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } } },
  { id: "zooming", label: "Zooming In & Out", animate: { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } } }
];

const SETTINGS = [
  { id: "street", label: "On Sesame Street" },
  { id: "park", label: "In a Colorful Park" },
  { id: "pixel", label: "Pixel Art World" },
  { id: "classroom", label: "Vibrant Classroom" },
  { id: "space", label: "Outer Space" }
];

export default function PuzzleMaker() {
  const [character, setCharacter] = useState(CHARACTERS[0]);
  const [action, setAction] = useState(ACTIONS[0].id);
  const [setting, setSetting] = useState(SETTINGS[0].id);
  const [pieces, setPieces] = useState<8 | 12>(8);
  const [seed, setSeed] = useState(1);

  const handlePrint = () => {
    window.print();
  };

  const activeAction = ACTIONS.find(a => a.id === action);
  const settingLabel = SETTINGS.find(s => s.id === setting)?.label;
  
  // Generating ONLY the background to prevent AI from inventing incorrect character appearances
  const bgPrompt = `Empty scenery of ${settingLabel}, completely empty background, absolutely no characters or people, highly detailed illustration, vibrant colors.`;
  const bgImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(bgPrompt)}?width=800&height=${pieces === 8 ? 400 : 600}&nologo=true&seed=${seed}`;
  const charImageUrl = OFFICIAL_IMAGES[character];

  return (
    <div className="space-y-8 pb-12 flex flex-col items-center">
      <div className="text-center print:hidden flex flex-col items-center w-full">
        <div className="inline-block bg-blue-500 brutal-border px-6 py-2 shadow-retro-static mb-4 rotate-1">
          <h1 className="sesame-title text-3xl md:text-5xl text-white tracking-wide">
            2. PUZZLE MAKER
          </h1>
        </div>
        <p className="text-xl text-gray-900 font-bold bg-white px-4 py-1 brutal-border inline-block rounded-full transform -rotate-1 mb-8 shadow-sm">
          Design your custom puzzle!
        </p>

        <div className="bg-white p-6 brutal-border shadow-retro flex flex-col gap-6 justify-center max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="w-full text-left">
              <label className="block text-sm font-black uppercase mb-2 text-blue-700">Friend</label>
              <select
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                className="w-full text-base p-3 brutal-border focus:ring-4 focus:ring-blue-300 transition outline-none cursor-pointer"
              >
                {CHARACTERS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            
            <div className="w-full text-left">
              <label className="block text-sm font-black uppercase mb-2 text-red-600">Action</label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="w-full text-base p-3 brutal-border focus:ring-4 focus:ring-red-300 transition outline-none cursor-pointer"
              >
                {ACTIONS.map((a) => (
                  <option key={a.id} value={a.id}>{a.label}</option>
                ))}
              </select>
            </div>

            <div className="w-full text-left">
              <label className="block text-sm font-black uppercase mb-2 text-green-700">Background</label>
              <select
                value={setting}
                onChange={(e) => setSetting(e.target.value)}
                className="w-full text-base p-3 brutal-border focus:ring-4 focus:ring-green-300 transition outline-none cursor-pointer"
              >
                {SETTINGS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
            
            <div className="w-full text-left">
              <label className="block text-sm font-black uppercase mb-2 text-purple-700">Pieces</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setPieces(8)}
                  className={`flex-1 py-3 px-2 font-black brutal-border shadow-retro-static active:translate-y-1 active:shadow-none transition ${pieces === 8 ? 'bg-purple-300 transform translate-y-1 !shadow-none' : 'bg-white hover:bg-gray-50'}`}
                >
                  8
                </button>
                <button
                  onClick={() => setPieces(12)}
                  className={`flex-1 py-3 px-2 font-black brutal-border shadow-retro-static active:translate-y-1 active:shadow-none transition ${pieces === 12 ? 'bg-purple-300 transform translate-y-1 !shadow-none' : 'bg-white hover:bg-gray-50'}`}
                >
                  12
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2 border-t-4 border-black pt-6">
            <button
              onClick={() => setSeed(s => s + 1)}
              className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-black py-4 px-6 brutal-border shadow-retro transition flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <RefreshCw size={20} />
              RE-ROLL ARTWORK
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 bg-green-500 hover:bg-green-400 text-white font-black py-4 px-6 brutal-border shadow-retro transition flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Printer size={20} />
              PRINT & PLAY
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-12 w-full print:mt-0">
        <div className="text-center print:block hidden mb-8">
           <h1 className="sesame-title text-5xl justify-center flex items-center gap-4 text-black">
            <Scissors size={48} className="text-gray-800" />
            CUT ALONG THE LINES!
          </h1>
        </div>

        {/* Puzzle Container */}
        <div className="relative brutal-border shadow-retro-static print:shadow-none bg-blue-100 polka-bg mx-auto print:!w-[800px] print:!h-auto print:!border-4 print:!border-black overflow-hidden" 
             style={{ width: '100%', maxWidth: '800px', aspectRatio: pieces === 8 ? '2/1' : '4/3' }}>
          
          {/* Layer 1: Background Scene */}
          <img key={`${bgImageUrl}`} src={bgImageUrl} alt="Background" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
          
          {/* Layer 2: Official Character Graphic (Composite) */}
          <div className="absolute inset-x-0 bottom-0 top-[5%] flex items-end justify-center pointer-events-none z-10 overflow-hidden pb-4">
             <motion.img 
                animate={activeAction?.animate || {}}
                src={charImageUrl} 
                alt={character} 
                className="max-w-[70%] max-h-[90%] object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]" 
                referrerPolicy="no-referrer" 
             />
          </div>

          {/* Layer 3: Overlay jigsaw puzzle lines */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
             <svg width="100%" height="100%" viewBox={pieces === 8 ? "0 0 400 200" : "0 0 400 300"} preserveAspectRatio="none">
               {/* Base Grid Inner Outlines */}
               <path 
                  d={pieces === 8 
                    ? "M 0 100 h 35 a 15 15 0 1 1 30 0 h 35 h 35 a 15 15 0 1 0 30 0 h 35 h 35 a 15 15 0 1 1 30 0 h 35 h 35 a 15 15 0 1 0 30 0 h 35 M 100 0 v 35 a 15 15 0 1 1 0 30 v 35 v 35 a 15 15 0 1 0 0 30 v 35 M 200 0 v 35 a 15 15 0 1 0 0 30 v 35 v 35 a 15 15 0 1 1 0 30 v 35 M 300 0 v 35 a 15 15 0 1 1 0 30 v 35 v 35 a 15 15 0 1 0 0 30 v 35"
                    : "M 0 100 h 35 a 15 15 0 1 1 30 0 h 35 h 35 a 15 15 0 1 0 30 0 h 35 h 35 a 15 15 0 1 1 30 0 h 35 h 35 a 15 15 0 1 0 30 0 h 35 M 0 200 h 35 a 15 15 0 1 0 30 0 h 35 h 35 a 15 15 0 1 1 30 0 h 35 h 35 a 15 15 0 1 0 30 0 h 35 h 35 a 15 15 0 1 1 30 0 h 35 M 100 0 v 35 a 15 15 0 1 1 0 30 v 35 v 35 a 15 15 0 1 0 0 30 v 35 v 35 a 15 15 0 1 1 0 30 v 35 M 200 0 v 35 a 15 15 0 1 0 0 30 v 35 v 35 a 15 15 0 1 1 0 30 v 35 v 35 a 15 15 0 1 0 0 30 v 35 M 300 0 v 35 a 15 15 0 1 1 0 30 v 35 v 35 a 15 15 0 1 0 0 30 v 35 v 35 a 15 15 0 1 1 0 30 v 35"
                  } 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="3" 
                  strokeDasharray="6,4"
                  className="print:stroke-black"
               />
               <path 
                  d={pieces === 8 
                    ? "M 0 100 h 35 a 15 15 0 1 1 30 0 h 35 h 35 a 15 15 0 1 0 30 0 h 35 h 35 a 15 15 0 1 1 30 0 h 35 h 35 a 15 15 0 1 0 30 0 h 35 M 100 0 v 35 a 15 15 0 1 1 0 30 v 35 v 35 a 15 15 0 1 0 0 30 v 35 M 200 0 v 35 a 15 15 0 1 0 0 30 v 35 v 35 a 15 15 0 1 1 0 30 v 35 M 300 0 v 35 a 15 15 0 1 1 0 30 v 35 v 35 a 15 15 0 1 0 0 30 v 35"
                    : "M 0 100 h 35 a 15 15 0 1 1 30 0 h 35 h 35 a 15 15 0 1 0 30 0 h 35 h 35 a 15 15 0 1 1 30 0 h 35 h 35 a 15 15 0 1 0 30 0 h 35 M 0 200 h 35 a 15 15 0 1 0 30 0 h 35 h 35 a 15 15 0 1 1 30 0 h 35 h 35 a 15 15 0 1 0 30 0 h 35 h 35 a 15 15 0 1 1 30 0 h 35 M 100 0 v 35 a 15 15 0 1 1 0 30 v 35 v 35 a 15 15 0 1 0 0 30 v 35 v 35 a 15 15 0 1 1 0 30 v 35 M 200 0 v 35 a 15 15 0 1 0 0 30 v 35 v 35 a 15 15 0 1 1 0 30 v 35 v 35 a 15 15 0 1 0 0 30 v 35 M 300 0 v 35 a 15 15 0 1 1 0 30 v 35 v 35 a 15 15 0 1 0 0 30 v 35 v 35 a 15 15 0 1 1 0 30 v 35"
                  } 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="1.5" 
                  strokeDasharray="6,4"
                  className="print:hidden relative shadow-sm"
               />
               
               {/* Numbers for puzzle pieces */}
               {Array.from({ length: pieces }).map((_, i) => {
                 const col = i % 4;
                 const row = Math.floor(i / 4);
                 // Center coordinates of each 100x100 piece
                 const cx = col * 100 + 15;
                 const cy = row * 100 + 20;
                 return (
                   <g key={i}>
                     <circle cx={cx} cy={cy} r="12" fill="#FFD200" stroke="#000" strokeWidth="2" className="print:fill-white" />
                     <text x={cx} y={cy + 4} fontFamily="Fredoka One, cursive" fontSize="14" fontWeight="bold" fill="#000" textAnchor="middle">
                       {i + 1}
                     </text>
                   </g>
                 )
               })}
             </svg>
          </div>
        </div>
      </div>

      <div className="text-center mt-12 print:hidden font-bold inline-flex items-center justify-center gap-2 bg-white brutal-border px-6 py-3 rounded-full transform rotate-1 shadow-sm">
        <Scissors size={24} className="text-blue-500" />
        TIP: Print in landscape mode!
      </div>
    </div>
  );
}
