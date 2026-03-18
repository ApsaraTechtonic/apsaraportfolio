import { motion } from "framer-motion";
import { Brain, Heart } from "lucide-react";
import SectionTitle from "./SectionTitle";
import apsaraImg from "@/assets/apsara.jpg";

const AboutSection = () => (
  <section id="about" className="section-container">
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
      <SectionTitle>About Me</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-primary/30 mx-auto md:mx-0">
            <img src={apsaraImg} alt="Apsara" className="w-full h-full object-cover" />
          </div>
          <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
            <p>
              I am <span className="text-foreground font-bold">Apsara</span>, a 21-year-old BCA graduate based in Dwarka, Delhi.
              Originally from Panipat, I specialize in Cloud Technology and Information Security.
            </p>
            <p className="border-l-2 border-primary pl-6 italic">
              "A developer blending rapid AI-assisted coding with human intuition."
            </p>
            <p className="text-muted-foreground">
              Passionate about delivering innovative technology solutions. Seeking a challenging role
              in the IT industry to apply full-stack development and cloud knowledge.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card-hover text-center space-y-2">
            <Brain className="mx-auto text-primary" size={32} />
            <h4 className="font-bold text-foreground">Psychology</h4>
            <p className="text-xs text-muted-foreground">Understanding user behavior</p>
          </div>
          <div className="glass-card-hover text-center space-y-2">
            <Heart className="mx-auto text-primary" size={32} />
            <h4 className="font-bold text-foreground">Philosophy</h4>
            <p className="text-xs text-muted-foreground">Logical frameworks</p>
          </div>
          <div className="glass-card-hover text-center space-y-2 col-span-2">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-bold">Tech Stack:</span> C, Python, JavaScript, HTML/CSS, MySQL, MS SQL Server
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

export default AboutSection;
