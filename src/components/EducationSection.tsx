import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionTitle from "./SectionTitle";

const edu = [
  { degree: "BCA", school: "Panipat Institute of Engineering and Technology (KUK)", score: "68%", year: "2021–2024" },
  { degree: "12th (CBSE)", school: "Apollo International School", score: "97%", year: "2021" },
  { degree: "10th (HBSE)", school: "LSBT Senior Secondary School", score: "94.2%", year: "2019" },
];

const EducationSection = () => (
  <section id="education" className="section-container">
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
      <SectionTitle>Education</SectionTitle>
      <div className="space-y-4">
        {edu.map((item, i) => (
          <div key={i} className="glass-card-hover flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <GraduationCap className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <h3 className="text-primary font-bold text-lg">{item.degree}</h3>
                <p className="text-foreground font-medium">{item.school}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-muted-foreground text-sm">{item.year}</span>
              <span className="pink-badge">{item.score}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default EducationSection;
