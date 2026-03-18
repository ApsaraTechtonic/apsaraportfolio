import Navbar from "@/components/Navbar";
import WorkSection from "@/components/WorkSection";

const WorkPage = () => (
  <div className="bg-background min-h-screen text-foreground">
    <Navbar />
    <div className="pt-20">
      <WorkSection />
    </div>
  </div>
);

export default WorkPage;
