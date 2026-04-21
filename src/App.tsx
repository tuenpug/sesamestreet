import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BookOpen, Puzzle, SquareStack } from "lucide-react";
import StoryGenerator from "./pages/StoryGenerator";
import PuzzleMaker from "./pages/PuzzleMaker";
import CardDeck from "./pages/CardDeck";

function Home() {
  return (
    <div className="max-w-5xl mx-auto text-center space-y-8">
      <div className="inline-block bg-red-600 brutal-border px-8 py-3 shadow-retro-static mb-2">
        <h1 className="sesame-title text-4xl md:text-6xl text-white tracking-wide">
          SESAME HUB
        </h1>
      </div>
      <div>
        <span className="text-xl font-bold bg-white px-4 py-2 brutal-border rounded-full italic mx-auto shadow-sm">
          Learning is Fun!
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <Link to="/story" className="group block">
          <div className="bg-yellow-100 brutal-border rounded-2xl p-8 flex flex-col items-center gap-4 shadow-retro card-pattern">
            <div className="bg-blue-500 p-4 rounded-xl text-white brutal-border rotate-3 group-hover:rotate-6 transition-transform">
              <BookOpen size={48} />
            </div>
            <h2 className="sesame-title text-2xl text-blue-600">STORY TIME</h2>
            <p className="font-bold text-gray-800 bg-white px-3 py-1 brutal-border rounded-full text-sm">Magical Stories</p>
          </div>
        </Link>

        <Link to="/puzzle" className="group block">
          <div className="bg-green-100 brutal-border rounded-2xl p-8 flex flex-col items-center gap-4 shadow-retro card-pattern">
             <div className="bg-red-500 p-4 rounded-xl text-white brutal-border -rotate-3 group-hover:-rotate-6 transition-transform">
              <Puzzle size={48} />
            </div>
            <h2 className="sesame-title text-2xl text-red-600">PUZZLE MAKER</h2>
            <p className="font-bold text-gray-800 bg-white px-3 py-1 brutal-border rounded-full text-sm">Printable Puzzles</p>
          </div>
        </Link>

        <Link to="/cards" className="group block">
          <div className="bg-red-100 brutal-border rounded-2xl p-8 flex flex-col items-center gap-4 shadow-retro card-pattern">
            <div className="bg-yellow-400 p-4 rounded-xl text-black brutal-border rotate-2 group-hover:rotate-6 transition-transform">
              <SquareStack size={48} />
            </div>
            <h2 className="sesame-title text-2xl text-yellow-600">CARD DECK</h2>
            <p className="font-bold text-gray-800 bg-white px-3 py-1 brutal-border rounded-full text-sm">Learn A-Z</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen selection:bg-white text-gray-900 pb-12 flex flex-col">
        <header className="py-4 px-6 sticky top-0 z-10 print:hidden mt-4 mx-4 md:mx-10 brutal-border bg-white shadow-retro-static flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
             <div className="bg-blue-600 brutal-border px-4 py-1 -rotate-2">
                <span className="sesame-title text-3xl text-white tracking-widest">HUB</span>
             </div>
          </Link>
          <nav className="flex gap-4">
            <Link to="/story" className="bg-blue-500 text-white brutal-border px-4 py-2 shadow-retro font-bold">STORY</Link>
            <Link to="/puzzle" className="bg-green-500 text-white brutal-border px-4 py-2 shadow-retro font-bold">PUZZLE</Link>
            <Link to="/cards" className="bg-red-500 text-white brutal-border px-4 py-2 shadow-retro font-bold">CARDS</Link>
          </nav>
        </header>

        <main className="p-6 md:p-10 max-w-6xl mx-auto w-full flex-1 mt-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<StoryGenerator />} />
            <Route path="/puzzle" element={<PuzzleMaker />} />
            <Route path="/cards" element={<CardDeck />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
