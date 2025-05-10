"use client"

import { useEffect, useRef, useState } from "react"
import { Github, Mail, Linkedin, ChevronDown } from "lucide-react"
import Link from "next/link"
import ProjectCard from "@/components/project-card"
import ExperienceItem from "@/components/experience-item"
import ContributionCard from "@/components/contribution-card"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import CustomCursor from "@/components/custom-cursor"
import ParticleBackground from "@/components/particle-background"
import SkillsGlobe from "@/components/skills-globe"
import { useMediaQuery } from "@/hooks/use-media-query"
import dynamic from "next/dynamic"
import Image from "next/image"

const HeroCanvas = dynamic(() => import("@/components/hero-canvas"), { ssr: false })

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isLoaded, setIsLoaded] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  const { scrollYProgress } = useScroll({
    offset: ["start", "end"],
  })

  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      if (window.scrollY > 100) {
        setShowScrollIndicator(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const sections = ["home", "about", "experience", "projects", "contributions", "contact"]

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || "home")
          }
        })
      },
      { threshold: 0.3 },
    )

    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) observerRef.current?.observe(element)
    })

    return () => {
      if (observerRef.current) {
        sections.forEach((section) => {
          const element = document.getElementById(section)
          if (element) observerRef.current?.unobserve(element)
        })
      }
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                className="inline-block h-20 w-20 rounded-full border-4 border-t-cyan-400 border-r-purple-500 border-b-cyan-400 border-l-purple-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-8 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
              >
                Welcome to My Portfolio
              </motion.h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isMobile && <CustomCursor />}
      <ParticleBackground />

      <div ref={containerRef} className="relative">
        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 z-50"
          style={{ width: progressBarWidth, transformOrigin: "0%" }}
        />

        {/* Navigation */}
        <nav
          className={cn(
            "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
            scrollY > 50 ? "bg-black/30 backdrop-blur-md py-3" : "bg-transparent py-5",
          )}
        >
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link
              href="/"
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                Apx13
              </motion.span>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2 }}
              className="hidden md:flex gap-8"
            >
              {[
                { name: "About", href: "#about" },
                { name: "Experience", href: "#experience" },
                { name: "Projects", href: "#projects" },
                { name: "Open Source", href: "#contributions" },
                { name: "Contact", href: "#contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative hover:text-cyan-400 transition-colors group",
                    activeSection === item.href.substring(1) ? "text-cyan-400" : "text-white/80",
                  )}
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full" />
                  {activeSection === item.href.substring(1) && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 h-[1px] w-full bg-gradient-to-r from-cyan-400 to-purple-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="md:hidden border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
              >
                Menu
              </Button>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative h-screen flex items-center overflow-hidden">
          <HeroCanvas />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.4 }}
                className="inline-block px-4 py-1 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-cyan-300"
              >
                Software Developer
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.4 }}
                className="inline-block px-4 py-1 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-cyan-300"
              >
                Foss Contributer
              </motion.div>
                            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.4 }}
                className="inline-block px-4 py-1 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-cyan-300"
              >
                DevOps
              </motion.div>
                                          <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.4 }}
                className="inline-block px-4 py-1 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-cyan-300"
              >
                Web3
              </motion.div>
                                                        <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.4 }}
                className="inline-block px-4 py-1 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-cyan-300"
              >
                Kubernetes
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.6 }}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              >
                {`Hi, I'm{" "}`}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 relative">
                  Amit Prasad
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.8 }}
                className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed"
              >
                Your friendly neighborhood Web3 developer, And a FOSS contributor to the Bitcoin ecosystem. Contributing to open source for a decentralized future, not a NPC
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 3 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 border-0 text-white relative overflow-hidden group"
                  asChild
                >
                  <Link href="#contact">
                    <span className="relative z-10">Get in touch</span>
                    <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 relative overflow-hidden group"
                  asChild
                >
                  <Link href="#projects">
                    <span className="relative z-10">View Projects</span>
                    <span className="absolute inset-0 bg-cyan-400/10 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 0.8 }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
              <span className="text-white/60 mb-2 text-sm">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <ChevronDown className="h-6 w-6 text-cyan-400" />
              </motion.div>
            </motion.div>
          )}
        </section>

        {/* About Section */}
        <section id="about" className="py-32 relative">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-center mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
                >
                  About Me
                </motion.h2>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "80px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-2"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="aspect-square max-w-md mx-auto relative group perspective">
                    <div className="relative preserve-3d duration-1000 group-hover:my-rotate-y-180 w-full h-full">
                      <div className="absolute backface-hidden w-full h-full">
                        <div className="p-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500">
                          <div className="w-full h-full rounded-xl overflow-hidden">
                            <Image
                              src="./public/logo.png"
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="absolute my-rotate-y-180 backface-hidden w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 p-6 flex flex-col justify-center items-center border border-cyan-500/30">
                        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
                          Amit Prasad
                        </h3>
                        <p className="text-white/80 text-center mb-4">
                          "I believe in creating software that not only works flawlessly but also provides an
                          exceptional user experience."
                        </p>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
                            asChild
                          >
                            <a
                              href="https://github.com/amitx13"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="GitHub"
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
                            asChild
                          >
                            <a
                              href="https://www.linkedin.com/in/amit-prasad-ab1014249/"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="LinkedIn"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-cyan-500 rounded-full opacity-20 blur-3xl"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <p className="text-lg mb-6 text-white/80 leading-relaxed">
                    Self-taught full-stack developer with a focus on Go, DevOps, and Bitcoin infrastructure. I’ve built and contributed to blockchain projects like JoinMarket and Jam, and specialize in backend systems, cloud infrastructure, and scalable applications. I'm passionate about working on innovative tech and continuously improving my skills. Always looking for opportunities to contribute and collaborate on impactful projects.
                  </p>
                  <h3 className="text-xl font-semibold mb-6 text-cyan-300">Skills</h3>

                  <div className="h-[300px] w-full">
                    <SkillsGlobe />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 relative">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-center mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
                >
                  Experience
                </motion.h2>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "80px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-2"
                />
              </div>

              <div className="max-w-3xl mx-auto">
                  <ExperienceItem
                  title="FOSS Contributor"
                  company="CARAVAN"
                  period="current"
                  description={`
                    Caravan is an open-source Bitcoin multisig wallet that enables users to easily create, manage, and sign multisig
transactions without relying on a third party.
Responsible for designing and implementing WebSocket support to improve wallet data fetching efficiency,
enhance user experience, and boost overall performance for multisig users.`}
                />
                <ExperienceItem
                  title="Summer Of Bitcoin (SWE)"
                  company="JAM"
                  period="MAY 2024 - OCT 2024"
                  description={`
                    Jam is a completely decentralized, free, open-source, and non-custodial project that aims to improve the financial
privacy of yourself and others, without relying on a trusted third party.
1: Implementation of Coin Control for the Jam wallet.
2: Design and integrate intuitive UI/UX components to facilitate a smooth interaction flow.
3: Allow users to select single or multiple UTXOs effortlessly for transactions, improving flexibility and
convenience.`}
                />
                <ExperienceItem
                  title="SDE"
                  company="PSQUARE"
                  period="Jan 2024 -  MAY 2024"
                  description={`Psquare is a Product based company which focused on building ERP’s for small and large Businesses
1. Proficiently managed programming for databases and websites using node.js, Expressjs,Mongo,
Websockets, Reactjs. Successfully resolved website bugs, leading to notable improvements in web
functionality and speed.
2. Led a team of [4] developers, ensuring timely delivery of backend services and scalable architecture.
Started as a MERN stack developer and was later appointed as a Backend Team lead.`}
                  isLast={true}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 relative">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-center mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
                >
                  Projects
                </motion.h2>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "80px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-2"
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard
                  title="Bitcoin Transaction Validator"
                  description={`IT simulates the process of mining a Bitcoin block. It involves several key steps: reading transactions (P2PKH, P2SH,
P2WPKH, and P2WSH), validating these transactions, creating a block header, serializing a coinbase transaction, and
extracting transaction IDs (txids). And also mining a block so that the block header meets a specific difficulty target.`}
                  codeLink="https://github.com/amitx13/code-challenge-2024-amitx13"
                  tags={["js", "hashing", "bitcoin", "blockchain"]}
                  liveLink="https://github.com/amitx13/code-challenge-2024-amitx13"
                  image="https://www.ccn.com/education/crypto/bitcoin-mining-vs-transaction-validation/"
                  index={0}
                />
                <ProjectCard
                  title="JDlifestyle.store"
                  description="Developed and deployed a product-based MLM platform to boost product demand and increase sales for a saree
business. Used containerization for scalable deployment."
                  tags={["React", "TypeScript", "Tailwind CSS"," Node.js", "Express", "PostgreSQL"," Docker","Smpt"]}
                  liveLink="https://jdlifestyle.store"
                  codeLink="https://github.com/amitx13?tab=repositories"
                  image="/placeholder.svg?height=300&width=500"
                  index={1}
                />
                <ProjectCard
                  title="IEELIFT’s ERP"
                  description="IEELIFT’s Built and deployed a custom ERP system to manage operations, streamline workflows, and improve
efficiency. Utilized AWS for scalable deployment."
                  tags={["JavaScript", "API", "Node.js", "Express", "PostgreSQL"," AWS"," Docker"]}
                  liveLink="http://ieelifts.in/"
                  codeLink="http://ieelifts.in/"
                  image="/placeholder.svg?height=300&width=500"
                  index={2}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Open Source Contributions */}
        <section id="contributions" className="py-32 relative">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-center mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
                >
                  Open Source Contributions
                </motion.h2>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "80px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-2"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <ContributionCard
                  project="JAM"
                  description="Responsible for introducing Coin Control in the Jam wallet, enhancing user experience by allowing users to select specific UTXOs for transactions."
                  link="https://github.com/joinmarket-webui/jam"
                  index={0}
                />
                <ContributionCard
                  project="JoinMarket"
                  description="Added new features and fixed bugs in the JoinMarket codebase, improving the overall functionality and user experience."
                  link="https://github.com/JoinMarket-Org/joinmarket-clientserver/"
                  index={1}
                />
                <ContributionCard
                  project="Caravan"
                  description="Introduced WebSocket support to the Caravan wallet, enhancing real-time data fetching and improving user experience."
                  link="https://github.com/caravan-bitcoin/caravan"
                  index={2}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 relative">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-center mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
                >
                  Get In Touch
                </motion.h2>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "80px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-2"
                />
              </div>

              <div className="max-w-md mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-cyan-500/30 shadow-xl relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <div className="relative p-6">
                    <p className="text-lg mb-8 text-white/80 text-center">
                      I'm currently open to new opportunities and collaborations. Feel free to reach out!
                    </p>
                    <div className="flex justify-center gap-4 mb-8">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 relative overflow-hidden group"
                        asChild
                      >
                        <a href="mailto:amitkvs981@gmail.com" aria-label="Email">
                          <span className="absolute inset-0 bg-cyan-400/10 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                          <Mail className="h-5 w-5 relative z-10" />
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 relative overflow-hidden group"
                        asChild
                      >
                        <a
                          href="https://github.com/amitx13"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                        >
                          <span className="absolute inset-0 bg-cyan-400/10 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                          <Github className="h-5 w-5 relative z-10" />
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 relative overflow-hidden group"
                        asChild
                      >
                        <a
                          href="linkedin.com/in/amit-prasad-ab1014249/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                        >
                          <span className="absolute inset-0 bg-cyan-400/10 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                          <Linkedin className="h-5 w-5 relative z-10" />
                        </a>
                      </Button>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 border-0 relative overflow-hidden group"
                      asChild
                    >
                      <a href="mailto:your.email@example.com" className="flex items-center justify-center gap-2">
                        <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <Mail className="h-5 w-5 relative z-10" />
                        <span className="relative z-10">Send Email</span>
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-white/10 relative z-10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/60">© {new Date().getFullYear()} apx13. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}