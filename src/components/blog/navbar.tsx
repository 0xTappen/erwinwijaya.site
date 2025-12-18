"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState, useEffect } from "react"
import { Menu, X, Home, BookOpen, Code2, Award, Briefcase, Mail, Hash } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const pathname = usePathname()
  const router = useRouter()

  // Only track sections on homepage
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // Only update active section on homepage
      if (!isHomePage) return
      
      const sections = ["home", "skills", "projects", "experience", "contact"]
      const scrollPosition = window.scrollY + 150
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  // Navigation config
  const navLinks = [
    { name: "Home", href: "/", icon: Home, section: "home" },
    { name: "Skills", href: "/", icon: Award, section: "skills" },
    { name: "Projects", href: "/", icon: Code2, section: "projects" },
    { name: "Experience", href: "/", icon: Briefcase, section: "experience" },
    { name: "Contact", href: "/", icon: Mail, section: "contact" },
  ]

  const pageLinks = [
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Tags", href: "/tags", icon: Hash },
  ]

  const isActive = (section: string) => {
    if (!isHomePage) return false
    return activeSection === section
  }

  const isPageActive = (href: string) => {
    return pathname === href
  }

  // Handle section navigation
  const handleSectionClick = (e: React.MouseEvent, href: string, section: string) => {
    e.preventDefault()
    
    if (!isHomePage) {
      // If not on homepage, navigate to homepage first
      router.push(href)
    } else {
      // If on homepage, smooth scroll to section
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setActiveSection(section)
      }
    }
    
    setIsOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg"
            : "bg-background/80 backdrop-blur-md border-b border-border/30"
        }`}
      >
        <div className="container flex h-16 md:h-18 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo with Animation */}
          <Link 
            href="/" 
            className="group flex items-center gap-3" 
            onClick={() => setActiveSection("home")}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md group-hover:blur-lg transition-all" />
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <img
                  src="/logo/logo.png"
                  alt="Erwin Wijaya Logo"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </motion.div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg md:text-xl font-black tracking-tight leading-none group-hover:text-primary transition-colors">
                Erwin Wijaya
              </span>
              <span className="text-[10px] text-muted-foreground font-medium">
                Cybersecurity | Web Dev
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center ml-auto space-x-1">
            {/* Section Links */}
            {navLinks.map((link) => {
              const Icon = link.icon
              const active = isActive(link.section)
              
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSectionClick(e, link.href, link.section)}
                  className="relative group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </motion.div>
                  
                  {/* Active Indicator */}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}

            {/* Separator */}
            <div className="w-px h-6 bg-border/50 mx-2" />

            {/* Page Links */}
            {pageLinks.map((link) => {
              const Icon = link.icon
              const active = isPageActive(link.href)
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </motion.div>
                  
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right side (Theme + Mobile Menu) */}
          <div className="flex items-center gap-2 md:gap-3 ml-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ThemeToggle />
            </motion.div>

            {/* Mobile menu toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden inline-flex items-center justify-center rounded-lg p-2.5 hover:bg-muted transition-all border border-border/50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-background/90 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-16 md:top-18 bottom-0 z-50 w-[85%] sm:w-80 bg-background border-l border-border/50 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                <div className="flex-1 py-6 px-4 space-y-1">
                  <div className="mb-2">
                    <p className="text-xs font-semibold text-muted-foreground px-4 mb-2">NAVIGATION</p>
                    {navLinks.map((link, index) => {
                      const Icon = link.icon
                      const active = isActive(link.section)
                      
                      return (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <a
                            href={link.href}
                            onClick={(e) => handleSectionClick(e, link.href, link.section)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                              active
                                ? "text-primary bg-primary/10 shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="flex-1">{link.name}</span>
                            {active && (
                              <motion.div
                                layoutId="activeMobile"
                                className="w-2 h-2 rounded-full bg-primary"
                              />
                            )}
                          </a>
                        </motion.div>
                      )
                    })}
                  </div>

                  <div className="h-px bg-border/50 my-4" />

                  <div>
                    <p className="text-xs font-semibold text-muted-foreground px-4 mb-2">PAGES</p>
                    {pageLinks.map((link, index) => {
                      const Icon = link.icon
                      const active = isPageActive(link.href)
                      
                      return (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (navLinks.length + index) * 0.05 }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                              active
                                ? "text-primary bg-primary/10 shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="flex-1">{link.name}</span>
                            {active && (
                              <motion.div
                                layoutId="activeMobile"
                                className="w-2 h-2 rounded-full bg-primary"
                              />
                            )}
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="border-t border-border/50 p-4 bg-muted/30"
                >
                  <p className="text-xs text-muted-foreground text-center">
                    © 2025 Erwin Wijaya
                  </p>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    Cyber Security Enthusiast & CTF Player
                  </p>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}