"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Separator } from "@/components/ui/separator"
import { Github, Linkedin, Mail, Heart, ArrowUp, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"

// Import Sections
import HeroSection from "@/sections/HeroSection"
import AboutSection from "@/sections/AboutSection"
import SkillsSection from "@/sections/SkillsSection"
// 1. IMPORT 'LatestPostsSection' DIHAPUS DARI SINI
import ProjectsSection from "@/sections/ProjectsSection"
import ExperienceSection from "@/sections/ExperienceSection"
import ContactSection from "@/sections/ContactSection"

// Import Data untuk Footer
import { FOOTER_BIO, GITHUB_URL, LINKEDIN_URL, EMAIL, TENESYS_URL } from "@/data/portfolio"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Global entry animation - DELAY DITAMBAHKAN
const pageEnterVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      delay: 0.3, // Delay agar muncul setelah loading screen
      ease: [0, 0, 0.2, 1] as const 
    } as const 
  }
};

// Footer animation variants
const footerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const footerItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

// 2. NAMA FUNGSI DIGANTI & DITAMBAH PROPS 'latestPosts'
export default function HomeClient({ latestPosts }: { latestPosts: React.ReactNode }) {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [contentReady, setContentReady] = useState(false)

  // Delay render content sampai loading screen selesai
  useEffect(() => {
    const timer = setTimeout(() => {
      setContentReady(true)
    }, 2600) // Sedikit lebih lama dari loading screen (2500ms)
    
    return () => clearTimeout(timer)
  }, [])

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Render placeholder saat loading
  if (!contentReady) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground">
      
      {/* --- ENHANCED BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        {/* Animated gradient blobs */}
        <motion.div 
          className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] 
            bg-gradient-to-r from-primary/30 via-purple-500/10 to-blue-500/10 
            rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-20%] w-[400px] h-[400px] 
            bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-primary/10 
            rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] 
            bg-gradient-to-r from-primary/10 via-purple-500/5 to-transparent
            rounded-full blur-[80px]"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Subtle grid overlay (light/dark adaptive) */}
      <div className="fixed inset-0 -z-10 
        bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]
        dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] 
        bg-[size:40px_40px]" />

      {/* --- NAVBAR --- */}
      <Navbar />
      
      {/* GLOBAL ENTRY ANIMATION CONTAINER */}
      <motion.main
        initial="hidden"
        animate="visible"
        variants={pageEnterVariant}
      >
        <HeroSection />
        <Separator className="container opacity-20" />

        <AboutSection /> 

        <SkillsSection />

        {/* 3. <LatestPostsSection /> DIGANTI JADI PROP INI */}
        {latestPosts}

        <ProjectsSection />

        <ExperienceSection />

        <ContactSection />
      </motion.main>
      
      {/* --- ENHANCED FOOTER (4 Kolom) --- */}
      <motion.footer 
        className="relative w-full border-t border-border/40 bg-gradient-to-b from-background/95 to-background backdrop-blur-xl pt-16 pb-8 mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={footerContainerVariants}
      >
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Kolom 1: About */}
            <motion.div variants={footerItemVariants} className="space-y-4">
              <motion.h4 
                className="text-xl font-black tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Erwin
              </motion.h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {FOOTER_BIO}
              </p>
              {/* Social Icons */}
              <div className="flex gap-3 pt-2">
                <motion.a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center border border-primary/20 hover:border-primary/40 transition-all"
                >
                  <Github className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-blue-500/10 hover:bg-blue-500/20 flex items-center justify-center border border-blue-500/20 hover:border-blue-500/40 transition-all"
                >
                  <Linkedin className="w-4 h-4 text-blue-600" />
                </motion.a>
                <motion.a
                  href={`mailto:${EMAIL}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center border border-red-500/20 hover:border-red-500/40 transition-all"
                >
                  <Mail className="w-4 h-4 text-red-500" />
                </motion.a>
              </div>
            </motion.div>

            {/* Kolom 2: Quick Links */}
            <motion.div variants={footerItemVariants} className="space-y-4">
              <h4 className="text-lg font-bold tracking-tight">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { href: "/blog", label: "Notes" },
                  { href: "#projects", label: "Projects" },
                  { href: "#skills", label: "Skills" },
                  { href: "#experience", label: "Experience" },
                ].map((link, i) => (
                  <motion.li 
                    key={i}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Kolom 3: Connect */}
            <motion.div variants={footerItemVariants} className="space-y-4">
              <h4 className="text-lg font-bold tracking-tight">Connect</h4>
              <ul className="space-y-3">
                {[
                  { href: GITHUB_URL, label: "GitHub", external: true },
                  { href: LINKEDIN_URL, label: "LinkedIn", external: true },
                  { href: `mailto:${EMAIL}`, label: "Email", external: false },
                ].map((link, i) => (
                  <motion.li 
                    key={i}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a 
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                      {link.label}
                      {link.external && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Kolom 4: CTF Teams */}
            <motion.div variants={footerItemVariants} className="space-y-4">
              <h4 className="text-lg font-bold tracking-tight">CTF Teams</h4>
              <ul className="space-y-3">
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a 
                    href={TENESYS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    Tenesys
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          </div>
          
          {/* Copyright Bar */}
          <motion.div 
            variants={footerItemVariants}
            className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} Erwin Wijaya.</span>
              <span className="hidden md:inline">•</span>
                Designed & Built by Erwin Wijaya
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href="#home" className="hover:text-primary transition-colors">Privacy</Link>
              <span>•</span>
              <Link href="#home" className="hover:text-primary transition-colors">Terms</Link>
              <span>•</span>
              <Link href="#home" className="hover:text-primary transition-colors">Sitemap</Link>
            </div>
          </motion.div>
        </div>
      </motion.footer>

      {/* --- SCROLL TO TOP BUTTON --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          size="icon"
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all group"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </Button>
      </motion.div>
    </div>
  )
}
