import { useState, useEffect } from "react";
import { Terminal, Zap, Shield, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import TypewriterText from "./TypewriterText";

interface IntroSequenceProps {
  onComplete: (codename: string) => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [stage, setStage] = useState(0);
  const [codename, setCodename] = useState("");
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (stage === 0) {
      const timer = setTimeout(() => setStage(1), 1000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (codename.trim().length >= 3) {
      setStage(3);
      setTimeout(() => {
        onComplete(codename.trim());
      }, 2000);
    }
  };

  if (stage === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 animate-pulse">
          <Terminal className="w-16 h-16 mx-auto text-primary" />
          <p className="font-mono text-sm text-muted-foreground">
            INITIALIZING SECURE CONNECTION...
          </p>
        </div>
      </div>
    );
  }

  if (stage === 3) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 animate-fade-in">
          <Shield className="w-16 h-16 mx-auto text-primary animate-pulse" />
          <p className="font-orbitron text-xl text-primary">
            Welcome to GEARZ, Agent {codename}
          </p>
          <p className="font-mono text-sm text-muted-foreground">
            ACCESS GRANTED // LOADING MISSION BRIEFINGS...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Animated scanline effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scan" />
      </div>

      <Card className={`max-w-3xl w-full p-8 border-2 border-primary/30 bg-card/95 backdrop-blur-sm ${glitch ? 'animate-glitch' : ''}`}>
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Eye className="w-12 h-12 text-primary" />
            <h1 className="font-orbitron text-4xl font-bold">
              <span className="text-primary">GEARZ</span>
              <span className="text-muted-foreground mx-2">//</span>
              <span className="text-accent">OSINT</span>
            </h1>
          </div>

          {/* Mission briefing */}
          <div className="space-y-4 font-mono text-sm">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-muted-foreground leading-relaxed">
                  <TypewriterText
                    text="Welcome to the Global Electronic Analysis and Reconnaissance Zone. You have been selected to join an elite unit of digital investigators tasked with uncovering threats hidden in the open web."
                    speed={30}
                  />
                </p>
              </div>
            </div>

            {stage >= 2 && (
              <div className="flex items-start gap-3 animate-fade-in">
                <Terminal className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <p className="text-muted-foreground leading-relaxed">
                    <TypewriterText
                      text="Your mission: Master the art of Open Source Intelligence. Learn to track digital footprints, analyze metadata, correlate data sources, and expose what others tried to hide."
                      speed={30}
                    />
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Codename input */}
          {stage === 1 && (
            <div className="pt-4 animate-fade-in">
              <Button
                onClick={() => setStage(2)}
                className="w-full font-rajdhani uppercase tracking-wide"
                data-testid="button-continue-intro"
              >
                Continue
                <Zap className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {stage === 2 && (
            <form onSubmit={handleSubmit} className="pt-4 space-y-4 animate-fade-in">
              <div className="space-y-2">
                <label className="text-sm font-rajdhani uppercase tracking-wide text-muted-foreground">
                  Choose Your Operative Codename
                </label>
                <Input
                  value={codename}
                  onChange={(e) => setCodename(e.target.value)}
                  placeholder="Enter codename (min 3 characters)..."
                  className="font-mono bg-background/50"
                  minLength={3}
                  maxLength={20}
                  required
                  autoFocus
                  data-testid="input-codename"
                />
                <p className="text-xs text-muted-foreground">
                  This will be your identity throughout your missions
                </p>
              </div>
              <Button
                type="submit"
                disabled={codename.trim().length < 3}
                className="w-full font-rajdhani uppercase tracking-wide"
                data-testid="button-submit-codename"
              >
                Begin Training
                <Shield className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}
        </div>
      </Card>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        .animate-glitch {
          animation: glitch 0.3s;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
