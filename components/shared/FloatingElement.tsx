'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FloatingElementProps {
  children: ReactNode
  className?: string
  duration?: number
  delay?: number
  yOffset?: number
  xOffset?: number
}

export function FloatingElement({
  children,
  className,
  duration = 4,
  delay = 0,
  yOffset = 12,
  xOffset = 0,
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-yOffset / 2, yOffset / 2, -yOffset / 2],
        x: [-xOffset / 2, xOffset / 2, -xOffset / 2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
}

export function ParallaxSection({ children, className }: ParallaxProps) {
  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      {children}
    </div>
  )
}
