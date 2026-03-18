import Navbar from "@/components/Navbar";
import InterestsSection from "@/components/InterestsSection";

const InterestsPage = () => (
  <div className="bg-background min-h-screen text-foreground">
    <Navbar />
    <div className="pt-20">
      <InterestsSection />
    </div>
  </div>
);

export default InterestsPage;
