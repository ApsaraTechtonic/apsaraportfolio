import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Phone, Mail, Linkedin } from "lucide-react";
import SectionTitle from "./SectionTitle";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-container mb-20">
      <SectionTitle>Get In Touch</SectionTitle>
      <div className="glass-card max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Name</label>
                  <input required className="input-glass" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Phone</label>
                  <input required className="input-glass" placeholder="10-digit number" pattern="[0-9]{10}" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                <input required type="email" className="input-glass" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea className="input-glass min-h-[100px] resize-none" placeholder="Your message..." />
              </div>
              <button type="submit" className="btn-primary w-full">
                Get in Touch <Send size={18} />
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-10 space-y-8"
            >
              <h3 className="text-2xl font-bold text-foreground">Thank You! Let's Connect</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Phone className="text-primary" />
                  <span className="text-foreground text-sm">+91 9217843095</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Mail className="text-primary" />
                  <span className="text-foreground text-sm">apsarastar1@gmail.com</span>
                </div>
                <a
                  href="https://www.linkedin.com/in/apsara-09b455343"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 hover:text-primary transition-colors"
                >
                  <Linkedin className="text-primary" />
                  <span className="text-foreground text-sm">LinkedIn</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ContactSection;
