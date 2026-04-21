import React, { useState } from 'react';
import { BookOpen, Sparkles, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';

interface Page {
  text: string;
  imagePrompt: string;
}

export default function StoryGenerator() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [pages, setPages] = useState<Page[] | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setPages(null);
    setError(null);
    setCurrentPage(0);

    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("Missing Gemini API Key");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `You are a creative children's book author. The user wants a Sesame Street story about: "${topic}".
      Requirements:
      - Create an educational and fun story starring MULTIPLE Sesame Street characters interacting (e.g. Elmo and Cookie Monster together, showing emotions like laughing or surprised).
      - The story MUST be exactly 4 to 5 pages long.
      - Keep text brief: 1 to 2 very simple sentences per page (perfect for preschoolers).
      - Provide a comprehensive 'imagePrompt' for an image generator. The image prompt MUST describe the characters interacting in the scene. 
      - CRITICAL for imagePrompt: To avoid the AI inventing new appearances, you MUST explicitly describe their canonical features (e.g., "Authentic Elmo, a furry red monster with a round orange nose", "Authentic Big Bird, a giant 8-foot tall yellow bird", "Authentic Cookie Monster, a furry blue monster with googly eyes"). 
      - Specify 'cute 3d cartoon style, vibrant colors, official Sesame Street photography, highly detailed' in the imagePrompt.
      
      Respond strictly with a raw JSON object in this format (NO markdown blocks, just the JSON):
      {
        "pages": [
          { "text": "page text here", "imagePrompt": "Full scene description including canonical character details, actions, expressions, and setting" }
        ]
      }`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        }
      });

      let text = response.text;
      if (!text) throw new Error("No response from AI");
      
      text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(text);
      if (parsed.pages && Array.isArray(parsed.pages)) {
        setPages(parsed.pages);
      } else {
        throw new Error("Invalid format received.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate story. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, (pages?.length || 1) - 1));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  return (
    <div className="space-y-8 pb-12 text-center max-w-4xl mx-auto">
      {!pages ? (
        <div className="space-y-6 flex flex-col items-center">
          <div className="inline-block bg-white brutal-border px-6 py-2 shadow-retro-static mb-2 -rotate-1">
            <h1 className="sesame-title text-3xl md:text-5xl text-blue-600 tracking-wide">
              1. STORY MAKER
             </h1>
          </div>
          <p className="text-xl text-gray-900 font-bold bg-white px-4 py-1 brutal-border inline-block rounded-full transform rotate-1">
            What is the story about?
          </p>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full max-w-2xl mx-auto mt-8 p-6 bg-white brutal-border shadow-retro">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Sharing Cookies"
              className="w-full text-xl p-4 brutal-border focus:outline-none focus:ring-4 ring-yellow-300 transition"
              disabled={isGenerating}
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              className="w-full md:w-auto bg-yellow-400 disabled:bg-gray-300 text-black font-black py-4 px-8 brutal-border shadow-retro transition whitespace-nowrap min-w-[200px]"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={24} />
                  WRITING...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles size={24} />
                  GENERATE
                </span>
              )}
            </button>
          </div>
          {error && <p className="text-red-600 bg-white brutal-border px-4 py-2 font-bold shadow-sm">{error}</p>}
        </div>
      ) : (
        <div className="space-y-6">
          <button onClick={() => setPages(null)} className="bg-red-500 text-white font-bold brutal-border shadow-retro px-4 py-2 flex items-center justify-center gap-2 mx-auto">
            <BookOpen size={20} />
            WRITE ANOTHER STORY
          </button>
          
          <div className="w-full max-w-[800px] mx-auto relative cursor-default mt-8 px-6 md:px-12">
            {/* Wooden/Cardboard Book Cover */}
            <div className="brutal-border shadow-retro bg-[#E3A018] p-2 md:p-4 rounded-sm relative">
              {/* Paper Inside (Single Page) */}
              <div className="bg-[#fdfbf7] border-4 border-black w-full aspect-[4/5] md:aspect-square relative overflow-hidden flex shadow-[inset_0_0_15px_rgba(0,0,0,0.3)]">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, filter: 'blur(5px)', scale: 0.98 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                    exit={{ opacity: 0, filter: 'blur(5px)', scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {/* Full Scene generated directly by AI */}
                    <img
                      src={`https://image.pollinations.ai/prompt/${encodeURIComponent(pages[currentPage].imagePrompt + ', accurate canonical sesame street character design, strictly no added or generic monsters')}?width=800&height=800&nologo=true&seed=${topic.length + currentPage}`}
                      alt="Story illustration"
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Shadow Gradient for Text Readability */}
                    <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-20"></div>

                    {/* Integrated Text */}
                    <div className="absolute inset-x-0 bottom-6 md:bottom-10 px-6 md:px-16 z-30 flex flex-col items-center justify-end text-center pointer-events-none">
                      <p className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight drop-shadow-[0_4px_6px_rgba(0,0,0,1)] tracking-wide">
                        {pages[currentPage].text}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Single Page Number */}
                <div className="absolute bottom-2 md:bottom-4 right-4 md:right-6 z-50 text-white font-black text-sm md:text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,1)] opacity-80">
                   {currentPage + 1}
                </div>
              </div>

              {/* Navigation Controls over the book cover */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-6 md:-left-8 z-50">
                <button 
                  onClick={prevPage} 
                  disabled={currentPage === 0}
                  className="bg-blue-500 text-white hover:bg-blue-400 disabled:opacity-0 disabled:pointer-events-none p-3 md:p-5 rounded-full brutal-border shadow-retro transition-all active:scale-90"
                >
                  <ChevronLeft size={32} />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-6 md:-right-8 z-50">
                <button 
                  onClick={nextPage} 
                  disabled={currentPage === pages.length - 1}
                  className="bg-green-500 text-white hover:bg-green-400 disabled:opacity-0 disabled:pointer-events-none p-3 md:p-5 rounded-full brutal-border shadow-retro transition-all active:scale-90"
                >
                  <ChevronRight size={32} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
