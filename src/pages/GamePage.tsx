import Navbar from "@/components/Navbar";
import GameSection from "@/components/GameSection";

const GamePage = () => (
  <div className="bg-background min-h-screen text-foreground">
    <Navbar />
    <div className="pt-20">
      <GameSection />
    </div>
  </div>
);

export default GamePage;
