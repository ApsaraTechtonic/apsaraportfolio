import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [text, setText] = useState("");
  const fullText = "Hi, I'm Apsara. A Vibe Coder from Delhi.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-[80vh] flex flex-col justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-foreground tracking-tight mb-6">
          {text}
          <span className="animate-blink text-primary">|</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Blending rapid AI-assisted development with human intuition to build high-performance digital experiences.
        </p>
        <Link to="/work" className="btn-outline-pink group inline-flex items-center gap-2 w-fit">
          View My Projects
          <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
