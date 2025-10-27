import { useState } from "react";
import { X, Save, ExternalLink, HelpCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AIConfig } from "@shared/schema";

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

const defaultConfigs = {
  huggingface: {
    apiEndpoint: "https://api-inference.huggingface.co/models/",
    model: "mistralai/Mistral-7B-Instruct-v0.2",
  },
  openai: {
    apiEndpoint: "https://api.openai.com/v1/chat/completions",
    model: "gpt-3.5-turbo",
  },
  custom: {
    apiEndpoint: "",
    model: "",
  },
};

export default function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const [provider, setProvider] = useState<"openai" | "huggingface" | "custom">("huggingface");
  const [apiKey, setApiKey] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState(defaultConfigs.huggingface.apiEndpoint);
  const [model, setModel] = useState(defaultConfigs.huggingface.model);

  const handleProviderChange = (value: string) => {
    const newProvider = value as "openai" | "huggingface" | "custom";
    setProvider(newProvider);
    setApiEndpoint(defaultConfigs[newProvider].apiEndpoint);
    setModel(defaultConfigs[newProvider].model);
  };

  const handleSave = () => {
    const config: AIConfig = {
      provider,
      apiKey,
      apiEndpoint,
      model,
    };
    localStorage.setItem("ai_config", JSON.stringify(config));
    console.log("AI config saved:", { ...config, apiKey: "***" });
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-orbitron text-xl tracking-wide flex items-center gap-2">
            <span className="text-primary">AI</span>
            <span className="text-muted-foreground">//</span>
            <span className="text-accent">CONFIGURATION</span>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          <Card className="p-4 bg-primary/5 border-primary/20">
            <p className="text-sm leading-relaxed">
              Configure your AI mentor by providing an API key from a supported provider. The AI mentor will grade your reports and provide educational feedback on OSINT techniques.
            </p>
          </Card>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="provider" className="font-rajdhani uppercase tracking-wide text-sm">
                AI Provider
              </Label>
              <Select value={provider} onValueChange={handleProviderChange}>
                <SelectTrigger id="provider" data-testid="select-provider">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="huggingface">
                    Hugging Face (Free Tier Available)
                  </SelectItem>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="custom">Custom Endpoint</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey" className="font-rajdhani uppercase tracking-wide text-sm">
                API Key
              </Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your API key..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono"
                data-testid="input-api-key"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endpoint" className="font-rajdhani uppercase tracking-wide text-sm">
                API Endpoint
              </Label>
              <Input
                id="endpoint"
                placeholder="https://api.example.com/..."
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                className="font-mono text-xs"
                data-testid="input-api-endpoint"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model" className="font-rajdhani uppercase tracking-wide text-sm">
                Model Name
              </Label>
              <Input
                id="model"
                placeholder="model-name"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="font-mono text-xs"
                data-testid="input-model"
              />
            </div>
          </div>

          <Accordion type="single" collapsible className="border rounded-md">
            <AccordionItem value="huggingface" className="border-0">
              <AccordionTrigger className="px-4 hover-elevate font-rajdhani uppercase tracking-wide text-sm">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  How to get a Hugging Face API key (FREE)
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 space-y-3">
                <Badge variant="outline" className="font-mono text-xs">
                  RECOMMENDED FOR FREE USAGE
                </Badge>
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  <li>Visit <a href="https://huggingface.co/join" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">huggingface.co/join <ExternalLink className="w-3 h-3" /></a></li>
                  <li>Create a free account</li>
                  <li>Go to Settings → Access Tokens</li>
                  <li>Click "New token" and create a token with "Read" permissions</li>
                  <li>Copy your token and paste it in the API Key field above</li>
                </ol>
                <Card className="p-3 bg-muted/30 font-mono text-xs">
                  <p className="text-muted-foreground mb-1">Default endpoint:</p>
                  <code className="break-all">https://api-inference.huggingface.co/models/</code>
                  <p className="text-muted-foreground mt-2 mb-1">Recommended model:</p>
                  <code>mistralai/Mistral-7B-Instruct-v0.2</code>
                </Card>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="openai" className="border-0">
              <AccordionTrigger className="px-4 hover-elevate font-rajdhani uppercase tracking-wide text-sm">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  How to get an OpenAI API key
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 space-y-3">
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  <li>Visit <a href="https://platform.openai.com/signup" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">platform.openai.com <ExternalLink className="w-3 h-3" /></a></li>
                  <li>Sign up or log in to your account</li>
                  <li>Navigate to API Keys section</li>
                  <li>Click "Create new secret key"</li>
                  <li>Copy the key and paste it above (Note: paid service)</li>
                </ol>
                <Card className="p-3 bg-muted/30 font-mono text-xs">
                  <p className="text-muted-foreground mb-1">Endpoint:</p>
                  <code className="break-all">https://api.openai.com/v1/chat/completions</code>
                  <p className="text-muted-foreground mt-2 mb-1">Model:</p>
                  <code>gpt-3.5-turbo</code>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1" data-testid="button-cancel-settings">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!apiKey.trim()}
              className="flex-1 font-rajdhani uppercase tracking-wide"
              data-testid="button-save-settings"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
