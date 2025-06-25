"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Search, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { MobileMenu } from "./mobile-menu"

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Header({ activeSection, setActiveSection }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Placeholder for search functionality
  const handleSearch = () => {
    console.log("Initiating search...")
    // In a real application, you would trigger a search action here.
  }

  if (!mounted) {
    return (
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          {/* NEXUS Logo Placeholder */}
          <div className="text-lg font-bold text-primary">NEXUS</div>
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search NEXUS..." className="pl-10" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Sun className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-card border-b border-border p-4">
      <div className="flex items-center justify-between">
        {/* NEXUS Logo Text */}
        <div className="min-w-[100px]">
          <div className="text-lg font-bold text-primary">NEXUS</div>
        </div>

        {/* Search Input and Button Group - Centered */}
        <div className="flex flex-1 justify-center mx-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search NEXUS..."
              className="pl-10 rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="default"
                  className="rounded-l-none px-3"
                  onClick={handleSearch}
                >
                  <Search className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Initiate search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-2 min-w-[100px] justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle {theme === "dark" ? "light" : "dark"} mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <MobileMenu activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>
      </div>
    </header>
  )
}