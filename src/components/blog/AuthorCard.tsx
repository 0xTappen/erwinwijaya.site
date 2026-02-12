// src/components/blog/AuthorCard.tsx

"use client" 

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

interface AuthorCardProps {
  author?: string;
}

export default function AuthorCard({ author = 'Erwin Wijaya' }: AuthorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-6 sm:p-8 rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
            <span className="text-3xl sm:text-4xl font-bold text-white">
              {author[0]}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-bold mb-2">
            Written by {author}
          </h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Cyber Security Enthusiast & CTF Player. Passionate about web security, 
            reverse engineering, and sharing knowledge through writeups.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/0xTappen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-sm font-medium transition-colors group"
            >
              <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/erwin-wijaya-2b1b3b1b3/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] text-sm font-medium transition-colors group"
            >
              <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              LinkedIn
            </a>
            <a
              href="mailto:erwinwijaya@example.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-sm font-medium transition-colors group"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Email
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}