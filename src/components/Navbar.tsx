import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Download, Menu, X, Sparkles, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const links = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Education", path: "/education" },
  { label: "Work", path: "/work" },
  { label: "Interests", path: "/interests" },
  { label: "Game", path: "/game" },
  { label: "Crowd Funding", path: "/crowd-funding" },
  { label: "Contact", path: "/contact" },
];

const handleResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  fetch("/apsara_resume.pdf")
    .then((res) => res.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Apsara_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { isVibeMode, toggleVibeMode } = useTheme();

  return (
    <nav className="nav-glass">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-primary tracking-tighter text-xl">
          APSARA
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.path}
              className={`hover:text-primary transition-colors duration-150 ${
                location.pathname === l.path ? "text-primary" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleVibeMode}
            className="p-2 mr-1 rounded-full bg-foreground/5 hover:bg-foreground/10 text-primary transition-all active:scale-95"
            aria-label="Toggle Vibe Mode"
          >
            {isVibeMode ? <Sparkles size={20} /> : <Moon size={20} />}
          </button>
          <a
            href="/apsara_resume.pdf"
            onClick={handleResumeClick}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold hover:bg-primary/85 transition-all active:scale-95"
          >
            <Download size={16} /> Resume
          </a>
          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-foreground/5 px-6 pb-6 pt-2 space-y-4">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.path}
              onClick={() => setOpen(false)}
              className={`block hover:text-primary transition-colors font-medium ${
                location.pathname === l.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
