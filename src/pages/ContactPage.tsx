import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";

const ContactPage = () => (
  <div className="bg-background min-h-screen text-foreground">
    <Navbar />
    <div className="pt-20">
      <ContactSection />
    </div>
  </div>
);

export default ContactPage;
