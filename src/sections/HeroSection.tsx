// src/sections/HeroSection.tsx
"use client";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Mail, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useState } from "react";

// Import data dari file terpisah
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from "@/data/portfolio";

// Enhanced animation variants with proper typing
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            delayChildren: 0.2, 
            staggerChildren: 0.12,
            duration: 0.5
        } 
    },
};

const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1, 
        transition: { 
            type: "spring", 
            stiffness: 100, 
            damping: 20 
        } 
    },
};

const avatarVariants: Variants = {
    hidden: { scale: 0, opacity: 0, rotate: -180 },
    visible: { 
        scale: 1, 
        opacity: 1, 
        rotate: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 15,
            duration: 0.8
        }
    },
};

export default function HeroSection() {
    const [isHovered, setIsHovered] = useState(false);
    
    const [typeEffect] = useTypewriter({
        words: ['Cybersecurity Enthusiast', 'CTF Player', 'Aspiring Full-Stack Developer'],
        loop: true,
        typeSpeed: 70,
        deleteSpeed: 50,
        delaySpeed: 1500,
    });

    return (
        <motion.section
            id="home"
            className="relative container pt-20 pb-12 md:pt-32 md:pb-20 min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
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
                    className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
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

            <motion.div
                className="relative z-10 flex flex-col items-center justify-center space-y-6 md:space-y-8 max-w-4xl mx-auto px-4"
                variants={containerVariants}
            >
                {/* Profile Image with Floating Animation */}
                <motion.div 
                    variants={avatarVariants}
                    className="relative"
                >
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <div className="relative">
                            {/* Glow effect ring */}
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
                            <Avatar 
                                className="relative w-28 h-28 md:w-40 md:h-40 shadow-2xl border-4 border-primary/30 ring-4 ring-primary/10 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <AvatarImage src="https://github.com/0xTappen.png" alt="Profile Picture Erwin Wijaya" />
                                <AvatarFallback className="text-2xl md:text-4xl font-bold bg-gradient-to-br from-primary to-primary/50">EW</AvatarFallback>
                            </Avatar>
                            {/* Sparkle effect on hover */}
                            {isHovered && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute -top-2 -right-2"
                                >
                                    <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary animate-pulse" />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Greeting Text */}
                <motion.div variants={itemVariants} className="text-center space-y-2">
                    <motion.p 
                        className="text-base md:text-xl text-muted-foreground font-medium tracking-wide"
                        animate={{
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        Hi, I'm
                    </motion.p>
                </motion.div>

                {/* Main Name with Gradient */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
                >
                    Erwin Wijaya
                </motion.h1>

                {/* Typing Effect with Enhanced Styling */}
                <motion.div 
                    variants={itemVariants} 
                    className="min-h-[2.5rem] md:min-h-[3rem] flex items-center justify-center"
                >
                    <div className="relative px-6 py-2 md:px-8 md:py-3 rounded-2xl bg-primary/5 border border-primary/20 backdrop-blur-sm">
                        <p className="text-lg md:text-2xl lg:text-3xl text-foreground font-semibold flex items-center justify-center gap-2">
                            <span className="hidden md:inline text-primary">▸</span>
                            {typeEffect}
                            <Cursor cursorStyle='|' cursorColor='hsl(var(--primary))' />
                        </p>
                    </div>
                </motion.div>

                {/* Call-to-Action Buttons */}
                <motion.div 
                    variants={itemVariants} 
                    className="flex flex-col sm:flex-row gap-4 pt-4 md:pt-6 w-full sm:w-auto px-4 sm:px-0"
                >
                    <Button 
                        size="lg" 
                        asChild 
                        className="group relative overflow-hidden text-base md:text-lg px-6 md:px-8 py-5 md:py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <Link href="#projects" className="relative z-10">
                            <span className="relative z-10 flex items-center gap-2">
                                View Projects 
                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-primary/20"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                            />
                        </Link>
                    </Button>
                    <Button 
                        variant="outline" 
                        size="lg" 
                        asChild 
                        className="group text-base md:text-lg px-6 md:px-8 py-5 md:py-6 border-2 hover:bg-primary/5 transition-all duration-300"
                    >
                        <Link href="/blog" className="flex items-center gap-2">
                            Read My Blog 
                            <BookOpen className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                        </Link>
                    </Button>
                </motion.div>

                {/* Social Links with Enhanced Interactivity */}
                <motion.div 
                    variants={itemVariants} 
                    className="flex items-center gap-3 md:gap-4 pt-4 md:pt-6"
                >
                    <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-primary/30" />
                    
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            asChild 
                            className="h-12 w-12 md:h-14 md:w-14 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 relative group"
                        >
                            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                                <Github className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform" />
                                <span className="sr-only">GitHub</span>
                            </a>
                        </Button>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            asChild 
                            className="h-12 w-12 md:h-14 md:w-14 rounded-full hover:bg-blue-500/10 hover:text-blue-600 transition-all duration-300 relative group"
                        >
                            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-5 w-5 md:h-6 md:w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </Button>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            asChild 
                            className="h-12 w-12 md:h-14 md:w-14 rounded-full hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 relative group"
                        >
                            <a href={EMAIL}>
                                <Mail className="h-5 w-5 md:h-6 md:w-6 text-red-500 group-hover:scale-110 transition-transform" />
                                <span className="sr-only">Email</span>
                            </a>
                        </Button>
                    </motion.div>

                    <div className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-primary/30" />
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    variants={itemVariants}
                    className="pt-8 md:pt-12"
                >
                    <motion.div
                        animate={{
                            y: [0, 8, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="flex flex-col items-center gap-2 text-muted-foreground"
                    >
                        <span className="text-xs md:text-sm font-medium tracking-wider">SCROLL DOWN</span>
                        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
                            <motion.div
                                animate={{
                                    y: [0, 12, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="w-1.5 h-1.5 bg-primary rounded-full"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}