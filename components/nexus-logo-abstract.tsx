"use client"

import React from 'react';

export function NexusLogoAbstract() {
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
        {/* Central Node */}
        <circle cx="60" cy="60" r="15" fill="url(#main-gradient)" />

        {/* Connecting Lines */}
        <path
          d="M60 60 L30 30 M60 60 L90 30 M60 60 L30 90 M60 60 L90 90"
          stroke="url(#line-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M60 60 L10 60 M60 60 L110 60 M60 60 L60 10 M60 60 L60 110"
          stroke="url(#line-gradient-secondary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Outer Nodes */}
        <circle cx="30" cy="30" r="5" fill="url(#line-gradient)" />
        <circle cx="90" cy="30" r="5" fill="url(#line-gradient)" />
        <circle cx="30" cy="90" r="5" fill="url(#line-gradient)" />
        <circle cx="90" cy="90" r="5" fill="url(#line-gradient)" />
        <circle cx="10" cy="60" r="4" fill="url(#line-gradient-secondary)" />
        <circle cx="110" cy="60" r="4" fill="url(#line-gradient-secondary)" />
        <circle cx="60" cy="10" r="4" fill="url(#line-gradient-secondary)" />
        <circle cx="60" cy="110" r="4" fill="url(#line-gradient-secondary)" />

        {/* Gradients */}
        <defs>
          <linearGradient id="main-gradient" x1="45" y1="45" x2="75" y2="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6"/> {/* Purple */}
            <stop offset="1" stopColor="#EC4899"/> {/* Pink */}
          </linearGradient>
          <linearGradient id="line-gradient" x1="30" y1="30" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6"/> {/* Blue */}
            <stop offset="1" stopColor="#10B981"/> {/* Green */}
          </linearGradient>
          <linearGradient id="line-gradient-secondary" x1="10" y1="60" x2="110" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B"/> {/* Amber */}
            <stop offset="1" stopColor="#EF4444"/> {/* Red */}
          </linearGradient>
        </defs>
      </svg>
      {/* Text overlay for "NEXUS" with subtle glow */}
      <span
        className="absolute text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
        style={{
          textShadow: '0 0 5px rgba(139, 92, 246, 0.5), 0 0 8px rgba(236, 72, 153, 0.5)',
          WebkitTextStroke: '0.3px rgba(255, 255, 255, 0.1)'
        }}
      >
        NEXUS
      </span>
    </div>
  );
}