"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Brain, Key, Trash2, AlertCircle, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

interface LLMConfig {
  id: string
  provider: string
  modelName: string
  apiKey: string // In a real app, this would be securely handled (e.g., not stored client-side)
}

export function LLMManagement() {
  const [llmConfigs, setLlmConfigs] = useState<LLMConfig[]>([
    { id: "1", provider: "OpenAI", modelName: "gpt-4o", apiKey: "sk-********************" },
    { id: "2", provider: "Anthropic", modelName: "claude-3-opus", apiKey: "sk-ant-********************" },
  ])
  const [newConfig, setNewConfig] = useState({
    provider: "",
    modelName: "",
    apiKey: "",
  })
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewConfig({ ...newConfig, [e.target.id]: e.target.value })
  }

  const handleSelectChange = (value: string, id: string) => {
    setNewConfig({ ...newConfig, [id]: value })
  }

  const handleAddConfig = () => {
    setError(null)
    if (!newConfig.provider || !newConfig.modelName || !newConfig.apiKey) {
      setError("Please fill in all fields.")
      return
    }

    const newId = Date.now().toString()
    const configToAdd = { ...newConfig, id: newId }
    setLlmConfigs((prev) => [...prev, configToAdd])
    setNewConfig({ provider: "", modelName: "", apiKey: "" })
    toast.success("LLM API added successfully!")
  }

  const handleDeleteConfig = (id: string) => {
    setLlmConfigs((prev) => prev.filter((config) => config.id !== id))
    toast.info("LLM API removed.")
  }

  const LLM_PROVIDERS = [
    { value: "OpenAI", label: "OpenAI" },
    { value: "Anthropic", label: "Anthropic" },
    { value: "Google", label: "Google Gemini" },
    { value: "Mistral", label: "Mistral AI" },
    { value: "Grok", label: "Grok" },
    { value: "Perplexity", label: "Perplexity AI" }, // Added Perplexity
    { value: "Custom", label: "Custom/Other" },
  ]

  const OPENAI_MODELS = [
    { value: "gpt-4o", label: "GPT-4o (Recommended)" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  ]

  const ANTHROPIC_MODELS = [
    { value: "claude-3-opus", label: "Claude 3 Opus" },
    { value: "claude-3-sonnet", label: "Claude 3 Sonnet" },
    { value: "claude-3-haiku", label: "Claude 3 Haiku" },
  ]

  const GOOGLE_MODELS = [
    { value: "gemini-pro", label: "Gemini Pro" },
    { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
  ]

  const GROK_MODELS = [
    { value: "grok-1", label: "Grok-1" },
    { value: "grok-1.5", label: "Grok-1.5" },
  ]

  const PERPLEXITY_MODELS = [ // Added Perplexity models
    { value: "llama-3-8b-instruct", label: "Llama 3 8B Instruct" },
    { value: "llama-3-70b-instruct", label: "Llama 3 70B Instruct" },
    { value: "mixtral-8x7b-instruct", label: "Mixtral 8x7B Instruct" },
  ]

  const getModelsForProvider = (provider: string) => {
    switch (provider) {
      case "OpenAI":
        return OPENAI_MODELS
      case "Anthropic":
        return ANTHROPIC_MODELS
      case "Google":
        return GOOGLE_MODELS
      case "Grok":
        return GROK_MODELS
      case "Perplexity": // Case for Perplexity
        return PERPLEXITY_MODELS
      default:
        return [{ value: "default-model", label: "Default Model" }]
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            LLM API Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Configure and manage your Large Language Model (LLM) API keys for various AI features across the platform.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New LLM API</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="provider">AI Provider</Label>
              <Select value={newConfig.provider} onValueChange={(value) => handleSelectChange(value, "provider")}>
                <SelectTrigger id="provider">
                  <SelectValue placeholder="Select a provider" />
                </SelectTrigger>
                <SelectContent>
                  {LLM_PROVIDERS.map((provider) => (
                    <SelectItem key={provider.value} value={provider.value}>
                      {provider.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="modelName">Model Name</Label>
              <Select value={newConfig.modelName} onValueChange={(value) => handleSelectChange(value, "modelName")} disabled={!newConfig.provider}>
                <SelectTrigger id="modelName">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {getModelsForProvider(newConfig.provider).map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type="password"
                placeholder="sk-..."
                value={newConfig.apiKey}
                onChange={handleInputChange}
              />
              <Key className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              Your API key will be used to authenticate with the LLM provider. Keep it secure.
            </p>
          </div>
          <Button onClick={handleAddConfig} className="w-full gap-2">
            <Plus className="w-4 h-4" />
            Add API Configuration
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configured LLM APIs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {llmConfigs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No LLM APIs configured yet.</p>
              <p className="text-sm">Add a new configuration above.</p>
            </div>
          ) : (
            llmConfigs.map((config) => (
              <div key={config.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold">{config.provider} - {config.modelName}</p>
                  <p className="text-sm text-muted-foreground truncate">API Key: {config.apiKey.replace(/.(?=.{4})/g, '*')}</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteConfig(config.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}