import { useState } from "react";
import { User, Palette, Save, Shield, Code, Zap, Target, Eye, Brain, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const AVATARS = [
  { id: "shield", icon: Shield, name: "Guardian", color: "text-primary" },
  { id: "code", icon: Code, name: "Coder", color: "text-accent" },
  { id: "zap", icon: Zap, name: "Speedster", color: "text-destructive" },
  { id: "target", icon: Target, name: "Sniper", color: "text-primary" },
  { id: "eye", icon: Eye, name: "Watcher", color: "text-accent" },
  { id: "brain", icon: Brain, name: "Analyst", color: "text-primary" },
  { id: "lock", icon: Lock, name: "Fortress", color: "text-destructive" },
  { id: "user", icon: User, name: "Default", color: "text-muted-foreground" }
];

const THEMES = [
  { id: "cyan", name: "Neon Cyan", primary: "187 85% 50%", accent: "38 95% 58%" },
  { id: "amber", name: "Amber Haze", primary: "38 95% 58%", accent: "187 85% 50%" },
  { id: "violet", name: "Violet Dream", primary: "270 75% 60%", accent: "330 85% 55%" }
];

interface ProfileCustomizationProps {
  onSave: (profile: { avatarId: string; themeId: string }) => void;
}

export default function ProfileCustomization({ onSave }: ProfileCustomizationProps) {
  const { toast } = useToast();
  const [selectedAvatar, setSelectedAvatar] = useState("shield");
  const [selectedTheme, setSelectedTheme] = useState("cyan");

  const handleSave = () => {
    onSave({ avatarId: selectedAvatar, themeId: selectedTheme });
    toast({
      title: "Profile Updated",
      description: "Your detective profile has been customized."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-orbitron text-xl font-bold mb-2">
          <span className="text-primary">CHOOSE</span>
          <span className="text-muted-foreground mx-2">//</span>
          <span className="text-accent">AVATAR</span>
        </h3>
        <p className="text-muted-foreground text-sm font-mono">
          Select your detective persona
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {AVATARS.map(avatar => {
          const Icon = avatar.icon;
          return (
            <button
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar.id)}
              className={`p-4 rounded-lg border-2 transition-all hover-elevate ${
                selectedAvatar === avatar.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border'
              }`}
              data-testid={`button-avatar-${avatar.id}`}
            >
              <Icon className={`w-8 h-8 mx-auto mb-2 ${avatar.color}`} />
              <p className="text-xs font-mono">{avatar.name}</p>
            </button>
          );
        })}
      </div>

      <Separator className="my-6" />

      <div>
        <h3 className="font-orbitron text-xl font-bold mb-2">
          <span className="text-primary">SELECT</span>
          <span className="text-muted-foreground mx-2">//</span>
          <span className="text-accent">THEME</span>
        </h3>
        <p className="text-muted-foreground text-sm font-mono">
          Customize your interface colors
        </p>
      </div>

      <RadioGroup value={selectedTheme} onValueChange={setSelectedTheme}>
        <div className="space-y-3">
          {THEMES.map(theme => (
            <div key={theme.id} className="flex items-center space-x-3">
              <RadioGroupItem 
                value={theme.id} 
                id={theme.id}
                data-testid={`radio-theme-${theme.id}`}
              />
              <Label htmlFor={theme.id} className="flex-1 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div 
                      className="w-6 h-6 rounded border border-border" 
                      style={{ backgroundColor: `hsl(${theme.primary})` }}
                    />
                    <div 
                      className="w-6 h-6 rounded border border-border" 
                      style={{ backgroundColor: `hsl(${theme.accent})` }}
                    />
                  </div>
                  <span className="font-mono text-sm">{theme.name}</span>
                </div>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      <Button 
        onClick={handleSave} 
        className="w-full font-rajdhani uppercase tracking-wide"
        data-testid="button-save-profile"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Profile
      </Button>
    </div>
  );
}
