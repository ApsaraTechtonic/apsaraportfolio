import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const Index = () => (
  <div className="bg-background min-h-screen text-foreground">
    <Navbar />
    <HeroSection />
    <footer className="py-10 text-center border-t border-foreground/5 text-muted-foreground text-sm">
      © {new Date().getFullYear()} Apsara • Built with Vibe & Logic
    </footer>
  </div>
);

export default Index;
