import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, X, Play, Bug, Search, Shield, ShieldOff, Zap, Lock, Maximize, RotateCcw } from 'lucide-react';
import games from './data/games.json';

interface GameData {
  id: string;
  title: string;
  imageFile: string | null;
  htmlFile: string | null;
}

const RoachBackground = () => {
  const [roaches, setRoaches] = useState<Array<{ id: number, x: number, y: number, rotation: number, speed: number, size: number, opacity: number }>>([]);

  useEffect(() => {
    const initialRoaches = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      speed: 0.2 + Math.random() * 0.5,
      size: 28 + Math.random() * 36,
      opacity: 0.25 + Math.random() * 0.25,
    }));
    setRoaches(initialRoaches);

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      setRoaches(prev => prev.map(roach => {
        const rad = (roach.rotation * Math.PI) / 180;
        // Adjust speed based on deltaTime for smooth movement
        const moveDistance = roach.speed * (deltaTime / 16);
        
        let newX = roach.x + Math.cos(rad) * moveDistance;
        let newY = roach.y + Math.sin(rad) * moveDistance;
        
        // Wiggle effect
        let newRotation = roach.rotation + (Math.random() - 0.5) * 10;

        if (newX > 110) newX = -10;
        if (newX < -10) newX = 110;
        if (newY > 110) newY = -10;
        if (newY < -10) newY = 110;

        return { ...roach, x: newX, y: newY, rotation: newRotation };
      }));
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {roaches.map(roach => (
        <div
          key={roach.id}
          className="absolute text-brand-accent/40"
          style={{
            left: `${roach.x}vw`,
            top: `${roach.y}vh`,
            opacity: roach.opacity,
            transform: `translate(-50%, -50%) rotate(${roach.rotation + 90}deg)`,
          }}
        >
          <Bug style={{ width: roach.size, height: roach.size }} className="drop-shadow-md" />
        </div>
      ))}
    </div>
  );
};

const titles = [
  "ayyyyy this tufff as beans",
  "yes squishy i finally finished the site bro",
  "i see you",
  "school is so ahhh brooooooooo"
];

export default function App() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [randomTitle, setRandomTitle] = useState("");
  const [gamesData, setGamesData] = useState<GameData[]>(games);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCloaked, setIsCloaked] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [showJumpscare, setShowJumpscare] = useState(false);
  const [showSquishyEffect, setShowSquishyEffect] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [showHorrorSequence, setShowHorrorSequence] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const [browserUrl, setBrowserUrl] = useState("https://rammer.nana.alliancetravel.tur.ar/");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'feedback' | 'request'>('feedback');
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(() => localStorage.getItem('site_unlocked') === 'true');
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleUnlock = (e: any) => {
    e.preventDefault();
    if (passwordInput === 'froach33pro') {
      setIsUnlocked(true);
      localStorage.setItem('site_unlocked', 'true');
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 1000);
    }
  };

  const FEEDBACK_WEBHOOK = "https://discord.com/api/webhooks/1483271485262139534/eR7uyXr1PaP7fmy9wlPTah3dRF5wfYrkcI5odf5OaHZy6gowxdypUL3PLmHfrYDdwcfj";
  const REQUEST_WEBHOOK = "https://discord.com/api/webhooks/1483271588026781736/FjL-MojzpJGJsNS4wF0fJtlwSKR87xS1-K-LBb8zVTnmngmZ5ZQV0nPrkctszSPc4UNt";

  const handleFeedbackSubmit = async (e: any) => {
    e.preventDefault();
    const webhookUrl = feedbackType === 'feedback' ? FEEDBACK_WEBHOOK : REQUEST_WEBHOOK;

    if (!webhookUrl) {
      alert("Webhook URL not configured.");
      setShowFeedbackModal(false);
      return;
    }

    setIsSendingFeedback(true);
    try {
      const payload = {
        embeds: [{
          title: feedbackType === 'feedback' ? 'New Feedback' : 'New Game Request',
          description: feedbackMessage,
          color: feedbackType === 'feedback' ? 0x00ff00 : 0xffa500,
          fields: [
            {
              name: "Sent By",
              value: senderName || "Anonymous",
              inline: true
            }
          ],
          timestamp: new Date().toISOString(),
          footer: { text: 'flyingroach33 games' }
        }]
      };

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      alert('Sent successfully!');
      setFeedbackMessage("");
      setSenderName("");
      setShowFeedbackModal(false);
    } catch (error) {
      console.error('Error sending to Discord:', error);
      alert('Failed to send.');
    } finally {
      setIsSendingFeedback(false);
    }
  };

  const rammerheadLinks = [
    { name: "Server 1", url: "https://rammer.nana.alliancetravel.tur.ar/" },
    { name: "Server 2", url: "https://homework.fascinatingphoto.com/" },
    { name: "Server 3", url: "https://mathexcel.texasmath.net/" },
    { name: "Server 4", url: "https://tenpiece.machophd.org/" }
  ];

  useEffect(() => {
    if (randomTitle === "i see you") {
      const timer = setTimeout(() => {
        setIsZooming(true);
        setTimeout(() => {
          setShowHorrorSequence(true);
        }, 3000); // Zoom duration
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [randomTitle]);

  useEffect(() => {
    if (showHorrorSequence) {
      const audioTimeout = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.log("Audio play blocked:", e));
        }
      }, 100);
      const timer = setTimeout(() => {
        handleHorrorEnd();
      }, 5000);
      return () => {
        clearTimeout(audioTimeout);
        clearTimeout(timer);
      };
    }
  }, [showHorrorSequence]);

  const handleHorrorEnd = () => {
    setShowHorrorSequence(false);
    setIsZooming(false);
    setRandomTitle(titles[Math.floor(Math.random() * titles.length)]);
  };

  useEffect(() => {
    if (isCloaked) {
      document.title = "Google";
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) link.href = "https://www.google.com/favicon.ico";
    } else {
      document.title = "flyingroach33 games";
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) link.href = "/favicon.ico";
    }
  }, [isCloaked]);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [gamesData, searchQuery]);

  const handleLogoClick = () => {
    setLogoClicks(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setShowJumpscare(true);
        setTimeout(() => setShowJumpscare(false), 2000);
        return 0;
      }
      return next;
    });
  };

  const toggleFullScreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if ((iframeRef.current as any).webkitRequestFullscreen) {
        (iframeRef.current as any).webkitRequestFullscreen();
      } else if ((iframeRef.current as any).msRequestFullscreen) {
        (iframeRef.current as any).msRequestFullscreen();
      }
    }
  };

  const browserIframeRef = useRef<HTMLIFrameElement>(null);

  const toggleBrowserFullScreen = () => {
    if (browserIframeRef.current) {
      if (browserIframeRef.current.requestFullscreen) {
        browserIframeRef.current.requestFullscreen();
      } else if ((browserIframeRef.current as any).webkitRequestFullscreen) {
        (browserIframeRef.current as any).webkitRequestFullscreen();
      } else if ((browserIframeRef.current as any).msRequestFullscreen) {
        (browserIframeRef.current as any).msRequestFullscreen();
      }
    }
  };

  const triggerSquishyEffect = () => {
    setShowSquishyEffect(true);
    const audio = new Audio('https://www.myinstants.com/media/sounds/metal-pipe-clang.mp3');
    audio.play().catch(() => {});
    // Flash effect
    let flashes = 0;
    const interval = setInterval(() => {
      flashes++;
      if (flashes > 6) clearInterval(interval);
    }, 100);
    setTimeout(() => setShowSquishyEffect(false), 2000);
  };

  useEffect(() => {
    setRandomTitle(titles[Math.floor(Math.random() * titles.length)]);
  }, []);

  const openAboutBlank = (url: string) => {
    const win = window.open('about:blank', '_blank');
    if (win) {
      win.document.body.style.margin = '0';
      win.document.body.style.height = '100vh';
      win.document.body.style.backgroundColor = '#000';
      const iframe = win.document.createElement('iframe');
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.margin = '0';
      iframe.src = url || window.location.href;
      win.document.body.appendChild(iframe);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 selection:bg-brand-gold/30">
        <RoachBackground />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-4 border border-brand-gold/20">
              <Lock className="w-8 h-8 text-brand-gold" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Access Restricted</h1>
            <p className="text-white/40 text-sm mt-1">Enter password to enter the swarm</p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="relative">
              <input 
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Password"
                className={`w-full bg-black/60 border ${passwordError ? 'border-red-500 animate-shake' : 'border-white/10'} rounded-2xl p-4 text-white text-center font-mono focus:outline-none focus:border-brand-gold/50 transition-all`}
                autoFocus
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-brand-gold text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest shadow-lg shadow-brand-gold/20"
            >
              Unlock
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em]">flyingroach33 games v2.0</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-brand-dark text-[#e7e5e4] font-sans selection:bg-brand-accent/30 relative overflow-x-hidden ${isZooming ? 'animate-zoom-horror' : ''}`}>
      <RoachBackground />
      
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-brand-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer select-none group"
            onClick={handleLogoClick}
          >
            <div className="p-2 bg-brand-accent/10 rounded-lg border border-brand-accent/20 group-hover:bg-brand-accent/20 transition-colors">
              <Bug className="w-5 h-5 text-brand-gold" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white hidden sm:block">
              flyingroach33 games
            </h1>
          </motion.div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-1.5 pl-9 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setFeedbackType('feedback');
                setShowFeedbackModal(true);
              }}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              Feedback
            </button>
            <button
              onClick={() => {
                setFeedbackType('request');
                setShowFeedbackModal(true);
              }}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              Request Game
            </button>
            <button
              onClick={() => setShowBrowser(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-brand-accent/10 border border-brand-accent/20 rounded-lg text-xs font-bold text-brand-gold hover:bg-brand-accent/20 transition-all"
              title="Open Browser"
            >
              <Search className="w-3.5 h-3.5" />
              Browser
            </button>
            <button
              onClick={() => openAboutBlank(window.location.href)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-brand-accent/10 border border-brand-accent/20 rounded-lg text-xs font-bold text-brand-gold hover:bg-brand-accent/20 transition-all"
              title="Open in about:blank"
            >
              <Zap className="w-3.5 h-3.5" />
              Open in about:blank
            </button>
            <button
              onClick={() => setIsCloaked(!isCloaked)}
              className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-brand-gold transition-all"
              title="Toggle Mask"
            >
              {isCloaked ? <ShieldOff className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center sm:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={isZooming ? { 
              scale: 15, 
              opacity: 0,
              transition: { duration: 3, ease: "easeInOut" }
            } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-2 leading-none uppercase origin-center sm:origin-left"
          >
            {randomTitle === "yes squishy i finally finished the site bro" ? (
              <>
                yes <span onClick={triggerSquishyEffect} className="cursor-pointer hover:text-amber-500 transition-colors">squishy</span> i finally finished the site bro
              </>
            ) : randomTitle}
          </motion.h2>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ y: -4 }}
              className="group relative bg-white/[0.02] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedGame(game.htmlFile)}
            >
              <div className="aspect-square bg-black/40 relative overflow-hidden">
                {game.imageFile ? (
                  <img 
                    src={game.imageFile} 
                    alt={game.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${game.id}/400/400?blur=1`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Gamepad2 className="w-8 h-8 text-white/10" />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-sm font-semibold text-white truncate group-hover:text-amber-400 transition-colors">
                    {game.title}
                  </h3>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[1px]">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <Play className="w-5 h-5 text-black fill-current ml-0.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 opacity-20">
            <Bug className="w-12 h-12 animate-pulse mb-4" />
            <p className="text-xs font-bold uppercase tracking-widest">Deploying Swarm...</p>
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="text-center py-32 border border-white/5 rounded-3xl bg-white/[0.01]">
            <Search className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white/40">No matches found</h3>
            <p className="text-sm text-white/20 mt-1">Try a different search term</p>
          </div>
        ) : null}
      </main>

      {/* Feedback/Request Modal */}
      <AnimatePresence>
        {showFeedbackModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-brand-dark border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  {feedbackType === 'feedback' ? 'Send Feedback' : 'Request a Game'}
                </h3>
                <button onClick={() => setShowFeedbackModal(false)} className="text-white/40 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-white/40 uppercase mb-2">Your Name</label>
                  <input 
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Optional"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-gold/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/40 uppercase mb-2">Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder={feedbackType === 'feedback' ? "What's on your mind?" : "What game should we add?"}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-gold/50 transition-all resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSendingFeedback}
                  className="w-full py-3 bg-brand-accent/20 border border-brand-accent/30 rounded-xl text-brand-gold font-bold hover:bg-brand-accent/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSendingFeedback ? 'Sending...' : 'Submit'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Browser Modal */}
      <AnimatePresence>
        {showBrowser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl h-[85vh] bg-brand-dark border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-4 border-b border-white/5 bg-white/5 flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-brand-accent/20 border border-brand-accent/30 rounded-lg text-[10px] font-bold text-brand-gold uppercase tracking-widest">
                    Rammerhead
                  </div>
                  <select 
                    value={browserUrl}
                    onChange={(e) => setBrowserUrl(e.target.value)}
                    className="bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-[10px] text-white/60 focus:outline-none focus:border-brand-gold/50"
                  >
                    {rammerheadLinks.map(link => (
                      <option key={link.url} value={link.url}>{link.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleBrowserFullScreen}
                    className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-brand-gold transition-all"
                    title="Fullscreen Browser"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowBrowser(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-white relative">
                <iframe
                  ref={browserIframeRef}
                  src={browserUrl}
                  className="w-full h-full border-0"
                  title="Browser"
                  allow="autoplay; fullscreen; focus-without-user-activation"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Horror Sequence Overlay */}
      <AnimatePresence>
        {showHorrorSequence && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black flex flex-col items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
              <img 
                src="https://media1.tenor.com/m/_NBBJbVDx64AAAAd/springtrap-on-fire.gif" 
                className="max-w-full max-h-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                alt="Springtrap on fire"
                referrerPolicy="no-referrer"
              />
              <audio 
                ref={audioRef}
                src="https://www.soundjay.com/misc/sounds/white-noise-01.mp3" 
                autoPlay 
                loop 
                preload="auto"
                muted={false}
                crossOrigin="anonymous"
                onCanPlayThrough={(e) => {
                  e.currentTarget.volume = 1.0;
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Jumpscare Overlay */}
      <AnimatePresence>
        {showJumpscare && (
          <motion.div
            initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <img 
              src="https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover"
              alt="Jumpscare"
            />
            <h2 className="absolute text-white text-8xl font-black italic animate-pulse">
              GET OUT!
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Squishy Effect Overlay */}
      <AnimatePresence>
        {showSquishyEffect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[90] pointer-events-none flex items-center justify-center bg-white/10 backdrop-invert"
          >
            <Zap className="w-64 h-64 text-yellow-400 absolute animate-ping" />
            <img 
              src="https://i.ibb.co/mr3WGvcd/squishy.png" 
              className="w-full h-full object-contain z-10 scale-125"
              alt="Squishy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop";
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full h-full md:w-[95vw] md:h-[90vh] bg-[#0c0a09] md:rounded-2xl overflow-hidden border border-white/10 flex flex-col"
            >
              {/* Modal Header */}
              <div className="h-14 bg-white/5 border-b border-white/10 flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                  </div>
                  <button
                    onClick={() => openAboutBlank(selectedGame)}
                    className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-amber-500 transition-colors flex items-center gap-2"
                  >
                    <Zap className="w-3 h-3" />
                    Open in Cloaked Tab
                  </button>
                  <button
                    onClick={toggleFullScreen}
                    className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-green-500 transition-colors flex items-center gap-2 ml-4"
                  >
                    <Maximize className="w-3 h-3" />
                    Full Screen
                  </button>
                  <button
                    onClick={() => {
                      if (iframeRef.current) {
                        const currentSrc = iframeRef.current.src;
                        iframeRef.current.src = '';
                        setTimeout(() => {
                          if (iframeRef.current) iframeRef.current.src = currentSrc;
                        }, 10);
                      }
                    }}
                    className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-blue-500 transition-colors flex items-center gap-2 ml-4"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reload
                  </button>
                  <button
                    onClick={() => window.open(selectedGame, '_blank')}
                    className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-red-500 transition-colors flex items-center gap-2 ml-4"
                  >
                    <Play className="w-3 h-3" />
                    Direct Open
                  </button>
                </div>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Iframe Container */}
              <div className="flex-1 w-full relative bg-black">
                {selectedGame.endsWith('.png') ? (
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <img src={selectedGame} alt="Game" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                  </div>
                ) : (
                  <iframe
                    ref={iframeRef}
                    src={selectedGame}
                    className="absolute inset-0 w-full h-full border-0"
                    title="Game View"
                    allow="autoplay; fullscreen; focus-without-user-activation; camera; microphone; geolocation; clipboard-read; clipboard-write"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
