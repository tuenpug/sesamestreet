import React, { useState } from 'react';
import { CHARACTERS, OFFICIAL_IMAGES } from '../constants';
import { Printer, Scissors, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import TransparentCharacter from '../components/TransparentCharacter';

const SETTINGS = [
  { id: "street", label: "On Sesame Street" },
  { id: "park", label: "In a Colorful Park" },
  { id: "pixel", label: "Pixel Art World" },
  { id: "classroom", label: "Vibrant Classroom" },
  { id: "space", label: "Outer Space" },
  { id: "ocean", label: "Under the Ocean" },
  { id: "forest", label: "Magical Fairy Forest" },
  { id: "beach", label: "Sunny Beach" },
  { id: "snow", label: "Snowy Wonderland" },
  { id: "city", label: "Big City Skyline" }
];

const generatePuzzlePath = (cols: number, rows: number) => {
  let path = "";
  for (let r = 1; r < rows; r++) {
    path += `M 0 ${r * 100} `;
    for (let c = 0; c < cols; c++) {
      const flip = (r + c) % 2 === 0 ? 1 : 0;
      path += `h 35 a 15 15 0 1 ${flip} 30 0 h 35 `;
    }
  }
  for (let c = 1; c < cols; c++) {
    path += `M ${c * 100} 0 `;
    for (let r = 0; r < rows; r++) {
      const flip = (r + c) % 2 === 0 ? 1 : 0;
      path += `v 35 a 15 15 0 1 ${flip} 0 30 v 35 `;
    }
  }
  return path.trim();
};

export default function PuzzleMaker() {
  const [character1, setCharacter1] = useState(CHARACTERS[0]);
  const [character2, setCharacter2] = useState("None");
  const [character3, setCharacter3] = useState("None");
  
  const [setting, setSetting] = useState(SETTINGS[0].id);
  const [pieces, setPieces] = useState<12 | 20>(12);
  const [seed, setSeed] = useState(1);

  const handlePrint = () => {
    window.print();
  };

  const settingLabel = SETTINGS.find(s => s.id === setting)?.label;
  const activeCharacters = [character1, character2, character3].filter(c => c !== "None");
  
  const bgWidth = pieces === 12 ? 800 : 1000;
  const bgHeight = pieces === 12 ? 600 : 800;
  // Generating ONLY the background to prevent AI from inventing incorrect character appearances
  const bgPrompt = `Empty scenery of ${settingLabel}, completely empty background, absolutely no characters or people, highly detailed illustration, vibrant colors.`;
  const bgImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(bgPrompt)}?width=${bgWidth}&height=${bgHeight}&nologo=true&seed=${seed}`;

  const cols = pieces === 12 ? 4 : 5;
  const rows = pieces === 12 ? 3 : 4;
  const puzzleWidth = cols * 100;
  const puzzleHeight = rows * 100;
  const puzzlePathStr = generatePuzzlePath(cols, rows);

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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-2">
            <div className="w-full text-left">
              <label className="block text-sm font-black uppercase mb-2 text-blue-700">Friend 1</label>
              <select
                value={character1}
                onChange={(e) => setCharacter1(e.target.value)}
                className="w-full text-base p-3 brutal-border focus:ring-4 focus:ring-blue-300 transition outline-none cursor-pointer"
              >
                {CHARACTERS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="w-full text-left">
              <label className="block text-sm font-black uppercase mb-2 text-blue-500">Friend 2</label>
              <select
                value={character2}
                onChange={(e) => setCharacter2(e.target.value)}
                className="w-full text-base p-3 brutal-border focus:ring-4 focus:ring-blue-200 transition outline-none cursor-pointer"
              >
                <option value="None">None</option>
                {CHARACTERS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="w-full text-left">
              <label className="block text-sm font-black uppercase mb-2 text-blue-400">Friend 3</label>
              <select
                value={character3}
                onChange={(e) => setCharacter3(e.target.value)}
                className="w-full text-base p-3 brutal-border focus:ring-4 focus:ring-blue-100 transition outline-none cursor-pointer"
              >
                <option value="None">None</option>
                {CHARACTERS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  onClick={() => setPieces(12)}
                  className={`flex-1 py-3 px-2 font-black brutal-border shadow-retro-static active:translate-y-1 active:shadow-none transition ${pieces === 12 ? 'bg-purple-300 transform translate-y-1 !shadow-none' : 'bg-white hover:bg-gray-50'}`}
                >
                  12 Pieces (Easy)
                </button>
                <button
                  onClick={() => setPieces(20)}
                  className={`flex-1 py-3 px-2 font-black brutal-border shadow-retro-static active:translate-y-1 active:shadow-none transition ${pieces === 20 ? 'bg-purple-300 transform translate-y-1 !shadow-none' : 'bg-white hover:bg-gray-50'}`}
                >
                  20 Pieces (Hard)
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
             style={{ width: '100%', maxWidth: '800px', aspectRatio: `${cols}/${rows}` }}>
          
          {/* Layer 1: Background Scene */}
          <div 
            className="absolute inset-0 z-0 group cursor-pointer" 
            onClick={() => setSeed(s => s + 1)}
            title="Click to refresh background image!"
          >
            <img key={`${bgImageUrl}`} src={bgImageUrl} alt="Background" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center pointer-events-none transition-all">
              <RefreshCw size={48} className="text-white drop-shadow-md" />
            </div>
          </div>
          
          {/* Layer 2: Official Character Graphic (Composite) */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
             {activeCharacters.map((char, idx) => {
               const total = activeCharacters.length;
               let style: React.CSSProperties = {
                 position: 'absolute',
                 transform: 'translateX(-50%)',
                 width: '100%',
                 height: '100%',
               };
               
               if (total === 1) {
                 style = { ...style, left: '50%', bottom: '-2%', maxHeight: '95%', maxWidth: '90%', zIndex: 10 };
               } else if (total === 2) {
                 if (idx === 0) style = { ...style, left: '32%', bottom: '-2%', maxHeight: '90%', maxWidth: '65%', zIndex: 12 };
                 if (idx === 1) style = { ...style, left: '72%', bottom: '8%', maxHeight: '80%', maxWidth: '55%', zIndex: 11 };
               } else {
                 if (idx === 0) style = { ...style, left: '22%', bottom: '-2%', maxHeight: '85%', maxWidth: '50%', zIndex: 13 };
                 if (idx === 1) style = { ...style, left: '50%', bottom: '15%', maxHeight: '72%', maxWidth: '45%', zIndex: 11 };
                 if (idx === 2) style = { ...style, left: '78%', bottom: '5%', maxHeight: '80%', maxWidth: '45%', zIndex: 12 };
               }

               return (
                 <div key={`${char}-${idx}`} style={style} className="origin-bottom drop-shadow-[0px_10px_15px_rgba(0,0,0,0.5)]">
                   <TransparentCharacter 
                      src={OFFICIAL_IMAGES[char]} 
                      alt={char} 
                      className="w-full h-full object-contain relative z-10"
                   />
                 </div>
               );
             })}
          </div>

          {/* Layer 3: Overlay jigsaw puzzle lines */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
             <svg width="100%" height="100%" viewBox={`0 0 ${puzzleWidth} ${puzzleHeight}`} preserveAspectRatio="none">
               {/* Base Grid Inner Outlines */}
               <path 
                  d={puzzlePathStr} 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="3" 
                  strokeDasharray="6,4"
                  className="print:hidden opacity-50"
               />
               <path 
                  d={puzzlePathStr} 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="1.5" 
                  strokeDasharray="6,4"
                  className="opacity-90 drop-shadow-sm"
               />
               
               {/* Numbers for puzzle pieces */}
               {Array.from({ length: pieces }).map((_, i) => {
                 const col = i % cols;
                 const row = Math.floor(i / cols);
                 // Center coordinates of each 100x100 piece
                 const cx = col * 100 + 18;
                 const cy = row * 100 + 20;
                 return (
                   <g key={i}>
                     {/* The hint numbers were removed per user request for visual clarity */}
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
