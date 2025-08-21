import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Mountain, Star } from 'lucide-react';

interface Quote {
  q: string;
  a: string;
}

function App() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/api/quotes');
      const data = await response.json();
      setQuotes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      // Fallback quotes in case API fails
      setQuotes([
        { q: "The journey of a thousand miles begins with one step.", a: "Lao Tzu" },
        { q: "It is during our darkest moments that we must focus to see the light.", a: "Aristotle" },
        { q: "Success is not final, failure is not fatal: it is the courage to continue that counts.", a: "Winston Churchill" },
        { q: "The only impossible journey is the one you never begin.", a: "Tony Robbins" },
        { q: "In the middle of difficulty lies opportunity.", a: "Albert Einstein" }
      ]);
      setLoading(false);
    }
  };

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  useEffect(() => {
    if (quotes.length > 0) {
      const interval = setInterval(nextQuote, 5000);
      return () => clearInterval(interval);
    }
  }, [quotes.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-x-hidden">
      {/* Animated Background Stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <Star
            key={i}
            className={`absolute text-white/20 animate-pulse`}
            size={Math.random() * 4 + 2}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Header Section */}
      <header className="relative z-10 text-center py-16 px-4">
        <div className="flex items-center justify-center mb-6">
          <Mountain className="text-orange-400 mr-4" size={48} />
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
            Talk2Trek
          </h1>
          <Mountain className="text-orange-400 ml-4" size={48} />
        </div>
        <p className="text-xl md:text-2xl text-white/90 font-medium tracking-wide">
          Talk with us to Trek in your Life
        </p>
        <div className="mt-4 w-32 h-1 bg-gradient-to-r from-orange-400 to-pink-400 mx-auto rounded-full"></div>
      </header>

      {/* Motivational Quotes Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Daily Inspiration
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
            </div>
          ) : (
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20">
              <div className="flex items-center justify-between">
                <button
                  onClick={prevQuote}
                  className="p-3 rounded-full bg-orange-500/20 hover:bg-orange-500/30 transition-all duration-300 text-white hover:scale-110"
                  aria-label="Previous quote"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <div className="flex-1 mx-8 text-center">
                  <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-6">
                    "{quotes[currentQuoteIndex]?.q}"
                  </blockquote>
                  <cite className="text-orange-400 text-lg font-semibold">
                    — {quotes[currentQuoteIndex]?.a}
                  </cite>
                </div>
                
                <button
                  onClick={nextQuote}
                  className="p-3 rounded-full bg-orange-500/20 hover:bg-orange-500/30 transition-all duration-300 text-white hover:scale-110"
                  aria-label="Next quote"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              
              {/* Quote indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {quotes.slice(0, 5).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuoteIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentQuoteIndex % 5 
                        ? 'bg-orange-400 scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to quote ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Image Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative inline-block">
            <img
              src="https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Mountain trek inspiration"
              className="w-full max-w-2xl rounded-2xl shadow-2xl border-4 border-white/20"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="text-center">
          <div className="relative">
            <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent mb-6 animate-pulse">
              Coming Soon...
            </h2>
            <p className="text-2xl md:text-3xl text-white font-bold tracking-wide">
              Stay Motivated!!!
            </p>
            
            {/* Animated elements */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <div className="w-4 h-4 bg-orange-400 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-4 h-4 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8"></div>
        <p className="text-white/60 text-lg">
          Embark on your journey of motivation and discovery
        </p>
      </footer>
    </div>
  );
}

export default App;