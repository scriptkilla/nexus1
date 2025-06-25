"use client"

import React from 'react';

export function NexusLogoNeon() {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 md:w-12 md:h-12"
      >
        {/* Main 'N' shape with gradient */}
        <path
          d="M20 100L50 20L80 100L110 20"
          stroke="url(#neon-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Intersecting lines for 'X' or network effect */}
        <path
          d="M25 50L95 50M35 70L105 70"
          stroke="url(#neon-gradient-secondary)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Small circles for 'nodes' or 'connections' */}
        <circle cx="20" cy="100" r="4" fill="url(#neon-gradient)" />
        <circle cx="50" cy="20" r="4" fill="url(#neon-gradient)" />
        <circle cx="80" cy="100" r="4" fill="url(#neon-gradient)" />
        <circle cx="110" cy="20" r="4" fill="url(#neon-gradient)" />
        <circle cx="25" cy="50" r="3" fill="url(#neon-gradient-secondary)" />
        <circle cx="95" cy="50" r="3" fill="url(#neon-gradient-secondary)" />
        <circle cx="35" cy="70" r="3" fill="url(#neon-gradient-secondary)" />
        <circle cx="105" cy="70" r="3" fill="url(#neon-gradient-secondary)" />

        {/* Define gradients for neon effect */}
        <defs>
          <linearGradient id="neon-gradient" x1="20" y1="60" x2="110" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6"/> {/* Purple */}
            <stop offset="1" stopColor="#EC4899"/> {/* Pink */}
          </linearGradient>
          <linearGradient id="neon-gradient-secondary" x1="25" y1="60" x2="105" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6"/> {/* Blue */}
            <stop offset="1" stopColor="#10B981"/> {/* Green */}
          </linearGradient>
        </defs>
      </svg>
      {/* Text overlay for "NEXUS" with neon glow */}
      <span 
        className="absolute text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
        style={{
          textShadow: '0 0 8px rgba(139, 92, 246, 0.7), 0 0 12px rgba(236, 72, 153, 0.7)',
          WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.2)'
        }}
      >
        NEXUS
      </span>
    </div>
  );
}