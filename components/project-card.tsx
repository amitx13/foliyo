"use client"

import { Github, ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  liveLink: string
  codeLink: string
  image: string
  index: number
}

export default function ProjectCard({ title, description, tags, liveLink, codeLink, image, index }: ProjectCardProps) {
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
          <Card className="overflow-hidden flex flex-col h-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative h-full flex flex-col">
              <div className="aspect-video overflow-hidden relative group">
                <img
                  src={image || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-slate-900/60 border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
                    asChild
                  >
                    <a href={codeLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      <Github className="h-4 w-4" />
                      <span>Code</span>
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-slate-900/60 border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
                    asChild
                  >
                    <a href={liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      <span>Live</span>
                    </a>
                  </Button>
                </div>
              </div>
              <CardContent className="flex-grow pt-6 relative z-10">
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-300 transition-colors">
                  {title}
                </h3>
                <p className="text-white/70 mb-4">{description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-slate-800/50 text-cyan-300 border-cyan-500/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0 relative z-10">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 hover:from-cyan-500/20 hover:to-purple-500/20 border border-cyan-500/30 text-white relative overflow-hidden group"
                  asChild
                >
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10">View Project</span>
                    <ExternalLink className="h-4 w-4 relative z-10" />
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
