import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";

const AboutPage = () => (
  <div className="bg-background min-h-screen text-foreground">
    <Navbar />
    <div className="pt-20">
      <AboutSection />
    </div>
  </div>
);

export default AboutPage;
