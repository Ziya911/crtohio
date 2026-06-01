'use client'

import { motion } from 'framer-motion'

interface FloatingOrbProps {
  className?: string
  count?: number
}

export function FloatingOrbs({ className = '', count = 5 }: FloatingOrbProps) {
  const orbs = [
    { size: 'w-72 h-72', color: 'bg-primary/[0.04]', x: '-5%', y: '10%', duration: 18 },
    { size: 'w-96 h-96', color: 'bg-accent/[0.04]', x: '70%', y: '60%', duration: 22 },
    { size: 'w-64 h-64', color: 'bg-primary-sky/[0.05]', x: '40%', y: '-10%', duration: 15 },
    { size: 'w-80 h-80', color: 'bg-primary/[0.03]', x: '85%', y: '5%', duration: 20 },
    { size: 'w-56 h-56', color: 'bg-accent/[0.04]', x: '15%', y: '70%', duration: 16 },
  ].slice(0, count)

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute ${orb.size} ${orb.color} rounded-full blur-3xl`}
          style={{ left: orb.x, top: orb.y }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function GridPattern({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(10, 77, 140, 0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    />
  )
}

export function GlowEffect({ color = 'primary', position = 'top-right' }: { color?: 'primary' | 'accent'; position?: string }) {
  const positions: Record<string, string> = {
    'top-right': '-top-32 -right-32',
    'top-left': '-top-32 -left-32',
    'bottom-right': '-bottom-32 -right-32',
    'bottom-left': '-bottom-32 -left-32',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  }

  const colors = {
    primary: 'from-primary/10 to-primary-sky/5',
    accent: 'from-accent/10 to-accent-dark/5',
  }

  return (
    <div className={`absolute ${positions[position] || positions['top-right']} w-96 h-96 bg-gradient-to-br ${colors[color]} rounded-full blur-3xl pointer-events-none`} />
  )
}
