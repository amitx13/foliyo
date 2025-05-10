"use client"

import { Github } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"

interface ContributionCardProps {
  project: string
  description: string
  link: string
  index: number
}

export default function ContributionCard({ project, description, link, index }: ContributionCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative group h-full perspective">
        <motion.div
          animate={{
            rotateY: isHovered ? 10 : 0,
            rotateX: isHovered ? -10 : 0,
            z: isHovered ? 50 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="preserve-3d h-full"
        >
          <Card className="h-full flex flex-col bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative h-full flex flex-col">
              <CardContent className="pt-6 flex-grow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                    <Github className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {project}
                  </h3>
                </div>
                <p className="text-white/70">{description}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="default"
                  size="sm"
                  className="w-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 hover:from-cyan-500/20 hover:to-purple-500/20 border border-cyan-500/30 text-white relative overflow-hidden group"
                  asChild
                >
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <Github className="h-4 w-4 relative z-10" />
                    <span className="relative z-10">View Contribution</span>
                  </a>
                </Button>
              </CardFooter>
            </div>
          </Card>
        </motion.div>

        {/* Shadow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 -z-10"></div>
      </div>
    </motion.div>
  )
}
