"use client"

import { motion, Variants } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, ExternalLink, Github, MapPin, Calendar, Code2, Trophy, Sparkles } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { PROFILE_SUMMARY, GITHUB_URL } from "@/data/portfolio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// -------------------- ANIMATION VARIANTS --------------------
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.15, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const cardVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

// -------------------- SECTION TITLE --------------------
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="text-center mb-16 md:mb-20 space-y-4"
  >
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
      {children}
    </h2>
    <motion.div 
      className="h-1 w-24 mx-auto bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-full"
      initial={{ width: 0 }}
      whileInView={{ width: 96 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
    />
  </motion.div>
)

// -------------------- STAT ITEM --------------------
const StatItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all cursor-pointer"
  >
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-bold text-foreground">{value}</p>
    </div>
  </motion.div>
)

// -------------------- MAIN COMPONENT --------------------
export default function AboutSection() {
  const [isCardHovered, setIsCardHovered] = useState(false)

  return (
    <section id="about" className="relative container py-20 md:py-28 px-4 md:px-8 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <SectionTitle>About Me</SectionTitle>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8 lg:gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Profile Card - Enhanced */}
        <motion.div
          variants={cardVariants}
          className="w-full lg:w-96 lg:sticky lg:top-24 flex justify-center lg:justify-start"
        >
          <Card 
            className="relative w-full max-w-sm border border-border/60 bg-card/80 backdrop-blur-xl shadow-xl rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30"
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
          >
            {/* Card Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 pointer-events-none"
              animate={{ opacity: isCardHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Sparkle Effect */}
            {isCardHovered && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-4 right-4 z-10"
              >
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              </motion.div>
            )}

            <div className="relative flex flex-col items-center p-8 space-y-6">
              {/* Avatar with Floating Animation */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <Avatar className="relative w-32 h-32 sm:w-40 sm:h-40 shadow-2xl ring-4 ring-primary/20 hover:ring-primary/40 transition-all duration-300">
                  <AvatarImage src="https://github.com/0xTappen.png" alt="Profile Picture" />
                  <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-primary/50">EW</AvatarFallback>
                </Avatar>
              </motion.div>

              {/* Name & Username */}
              <div className="text-center space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                  Erwin Wijaya
                </h3>

                {/* HoverCard for @username */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <motion.p 
                      className="text-base text-muted-foreground cursor-pointer hover:text-primary transition-colors inline-flex items-center gap-2 group"
                      whileHover={{ scale: 1.05 }}
                    >
                      @0xTappen
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.p>
                  </HoverCardTrigger>

                  <HoverCardContent className="w-80 p-5 backdrop-blur-xl bg-card/95 border-primary/20">
                    <div className="flex gap-4">
                      <Avatar className="h-14 w-14 ring-2 ring-primary/20">
                        <AvatarImage src="https://github.com/0xTappen.png" />
                        <AvatarFallback>EW</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2 flex-1">
                        <h4 className="text-base font-bold">Erwin Wijaya</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Full-Stack Developer | CTF Player | Tenesys Member
                        </p>
                        <div className="flex items-center pt-2 text-xs text-muted-foreground gap-2">
                          <Github className="w-4 h-4" />
                          <span>Active since 2023</span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>

              {/* Quick Stats */}
              <div className="w-full space-y-3">
                <StatItem icon={Code2} label="Role" value="Security Engineer" />
                <StatItem icon={Trophy} label="Specialty" value="Infrastructure / Cloud Security" />
                <StatItem icon={MapPin} label="Location" value="Lampung, Indonesia" />
                <StatItem icon={Calendar} label="Active Since" value="2023" />
              </div>

              {/* CTA Button */}
              <Button 
                asChild 
                className="w-full group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <span className="relative z-10 flex items-center gap-2">
                    View GitHub 
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-primary/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </a>
              </Button>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                  Cybersecurity
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                  Web Dev
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                  CTF
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Summary Text - Enhanced */}
        <motion.div
          variants={itemVariants}
          className="flex-1 space-y-8"
        >
          {/* Summary Paragraphs */}
          <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
            {PROFILE_SUMMARY.split("\n\n").map((para, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="p-6 sm:p-8 bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                  <p className="text-justify leading-relaxed">{para}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Button
              asChild
              size="lg"
              className="group text-base sm:text-lg px-6 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="#experience">
                See Full History
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="group text-base sm:text-lg px-6 py-6 border-2 hover:bg-primary/5"
            >
              <Link href="#projects">
                View Projects
                <Code2 className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Fun Fact Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Fun Fact</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    When I’m not busy coding or hunting flags, I’m probably gaming still solving challenges, just in a different world. Gaming helps me stay sharp, think strategically, and relax after long hours of coding or cybersecurity practice.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>

      <Separator className="mt-20 md:mt-28 opacity-20" />
    </section>
  )
}