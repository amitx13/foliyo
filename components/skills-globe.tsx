"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Skill {
  name: string
  level: number
  color: string
}

export default function SkillsGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  const skills: Skill[] = [
    { name: "JavaScript", level: 90, color: "#f7df1e" },
    { name: "TypeScript", level: 85, color: "#3178c6" },
    { name: "React", level: 90, color: "#61dafb" },
    { name: "Next.js", level: 85, color: "#ffffff" },
    { name: "Node.js", level: 80, color: "#339933" },
    { name: "Go", level: 80, color: "#00ADD8" },
    { name: "MongoDB", level: 80, color: "#47a248" },
    { name: "PostgreSQL", level: 80, color: "#4169e1" },
    { name: "Redis", level: 75, color: "#db3a34" },
    { name: "Docker", level: 80, color: "#2496ed" },
    { name: "Kubernetes", level: 70, color: "#326ce5" },
    { name: "Solidity", level: 65, color: "#363636" },
    { name: "Prometheus", level: 70, color: "#e7d060" },
    { name: "Grafana", level: 70, color: "#f9a62f" },
  ];

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="h-full w-full bg-slate-800/50 rounded-lg animate-pulse" />
  }

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg" />

      <div className="relative h-full w-full flex items-center justify-center">
        <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="relative flex justify-center items-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.2, zIndex: 10 }}
            >
              <div
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border",
                  "hover:shadow-lg transition-all duration-300"
                )}
                style={{
                  backgroundColor: `${skill.color}20`,
                  borderColor: `${skill.color}50`,
                  color: skill.color,
                  boxShadow: `0 0 10px ${skill.color}30`,
                }}
              >
                {skill.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
