import { motion } from "framer-motion";
import { ExternalLink, Briefcase } from "lucide-react";
import SectionTitle from "./SectionTitle";

const WorkSection = () => (
  <section id="work" className="section-container">
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
      <SectionTitle>Featured Work</SectionTitle>
      <div className="glass-card-hover overflow-hidden !p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 space-y-6">
            <span className="pink-badge uppercase tracking-widest text-xs">Web Application</span>
            <h3 className="text-3xl font-bold text-foreground">TransTrack</h3>
            <p className="text-muted-foreground">
              A comprehensive Transport Management Website built for Maxfort International School
              to manage fleet logistics and student transport safety.
            </p>
            <a
              href="https://transtrack.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground font-bold hover:text-primary transition-colors"
            >
              Live Demo <ExternalLink size={18} />
            </a>
          </div>
          <div className="bg-gradient-to-br from-card to-primary/20 h-64 md:h-auto flex items-center justify-center">
            <Briefcase size={64} className="text-foreground/10 hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

export default WorkSection;
