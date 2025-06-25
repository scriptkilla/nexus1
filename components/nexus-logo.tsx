"use client"

import Image from "next/image"
import React from "react"

interface NexusLogoProps {
  className?: string;
}

export function NexusLogo({ className }: NexusLogoProps) {
  return (
    <div className={className}>
      <Image
        src="/nexus1.jpg"
        alt="NEXUS Logo"
        width={100} // Adjust width as needed
        height={30} // Adjust height as needed
        priority // Prioritize loading for LCP
        className="object-contain"
      />
    </div>
  )
}