"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Plus } from "lucide-react"
import React from "react"

interface FloatingCreatePostButtonProps {
  onClick: () => void;
}

export function FloatingCreatePostButton({ onClick }: FloatingCreatePostButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-6 right-6 rounded-full shadow-lg z-50 w-14 h-14 p-0 flex items-center justify-center"
            onClick={onClick}
          >
            <Plus className="w-6 h-6" />
            <span className="sr-only">Create Post</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Create a new post</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}