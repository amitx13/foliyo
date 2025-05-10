"use client"

import { motion } from "framer-motion"

interface ExperienceItemProps {
  title: string
  company: string
  period: string
  description: string
  isLast?: boolean
}

export default function ExperienceItem({ title, company, period, description, isLast = false }: ExperienceItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative pl-10 pb-12"
    >
      {!isLast && (
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="absolute top-0 left-5 w-px bg-gradient-to-b from-cyan-400 to-purple-500"
        />
      )}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
        viewport={{ once: true }}
        className="absolute top-0 left-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/20"
      >
        <div className="w-3 h-3 rounded-full bg-white"></div>
      </motion.div>
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400 transition-all duration-300 relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative">
          <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">{title}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3 text-white/70">
            <span className="text-cyan-300">{company}</span>
            <span className="hidden sm:inline text-white/50">•</span>
            <span>{period}</span>
          </div>
          <p className="text-white/70">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
