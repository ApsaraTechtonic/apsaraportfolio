import { motion } from "framer-motion";
import { BookOpen, Brain } from "lucide-react";
import SectionTitle from "./SectionTitle";

const InterestsSection = () => (
  <section id="interests" className="section-container">
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
      <SectionTitle>Interests</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card-hover space-y-4">
          <BookOpen className="text-primary" size={32} />
          <h3 className="text-xl font-bold text-foreground">Philosophy</h3>
          <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground">
            "The unexamined life is not worth living." — Exploring logical structures
            and existential thought through the lens of code.
          </blockquote>
        </div>
        <div className="glass-card-hover space-y-4">
          <Brain className="text-primary" size={32} />
          <h3 className="text-xl font-bold text-foreground">Psychology</h3>
          <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground">
            "Know thyself." — Fascinated by human-computer interaction, behavioral patterns,
            and how design influences decision-making.
          </blockquote>
        </div>
      </div>
    </motion.div>
  </section>
);

export default InterestsSection;
