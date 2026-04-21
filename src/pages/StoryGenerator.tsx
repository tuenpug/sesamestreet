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
      - Create an educational and fun story starring Sesame Street characters (like Elmo, Big Bird, Cookie Monster, etc.).
      - The story MUST be exactly 4 to 5 pages long.
      - Keep text brief: 1 to 2 very simple sentences per page (perfect for preschoolers).
      - Include a highly descriptive 'imagePrompt' per page to generate an illustration. Describe the specific Sesame Street character, their action, the setting, and specify 'cute 3d cartoon style, vibrant colors'.
      
      Respond strictly with a JSON object in this format:
      {
        "pages": [
          { "text": "page text here", "imagePrompt": "detailed image generation prompt here" }
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

      const text = response.text;
      if (!text) throw new Error("No response from AI");
      
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
          
          <div className="bg-white brutal-border shadow-retro-static max-w-4xl mx-auto min-h-[500px] flex flex-col md:flex-row card-pattern relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col md:flex-row w-full h-full"
              >
                <div className="h-64 md:h-auto md:w-1/2 bg-yellow-300 brutal-border border-l-0 border-t-0 md:border-b-0 border-r-4 p-4 md:p-8 flex items-center justify-center relative">
                  <img
                    src={`https://image.pollinations.ai/prompt/${encodeURIComponent(pages[currentPage].imagePrompt)}?width=600&height=600&nologo=true`}
                    alt="Story illustration"
                    className="w-full h-full object-cover brutal-border shadow-retro-static bg-white"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute top-2 right-2 bg-white brutal-border font-black px-3 py-1 text-red-600 transform rotate-3">
                    # {currentPage + 1}
                  </div>
                </div>
                
                <div className="p-8 md:p-12 flex-1 flex items-center justify-center bg-white/90">
                  <p className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-relaxed text-left font-sans italic selection:bg-yellow-300">
                    "{pages[currentPage].text}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 0}
                className="bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 p-4 brutal-border shadow-retro transition-transform active:scale-95"
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                onClick={nextPage} 
                disabled={currentPage === pages.length - 1}
                 className="bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 p-4 brutal-border shadow-retro transition-transform active:scale-95"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
