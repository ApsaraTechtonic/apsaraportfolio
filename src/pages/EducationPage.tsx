import Navbar from "@/components/Navbar";
import EducationSection from "@/components/EducationSection";

const EducationPage = () => (
  <div className="bg-background min-h-screen text-foreground">
    <Navbar />
    <div className="pt-20">
      <EducationSection />
    </div>
  </div>
);

export default EducationPage;
