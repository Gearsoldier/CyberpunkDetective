import { Link } from "wouter";
import { ArrowLeft, Github, ExternalLink, Shield, Eye, Zap, Terminal, Coffee, Heart, Briefcase } from "lucide-react";
import { SiLinkedin, SiKofi } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function About() {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Game
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Eye className="w-6 h-6 text-primary" />
              <h1 className="font-orbitron text-xl font-bold">
                <span className="text-primary">GEARZ</span>
                <span className="text-muted-foreground mx-1">//</span>
                <span className="text-accent">OSINT</span>
              </h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container max-w-4xl mx-auto px-4 py-12 space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-16 h-16 text-primary" />
              <h2 className="font-orbitron text-4xl md:text-5xl font-bold">
                GEARZ OSINT Detective
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A cinematic cyberpunk educational game teaching Open Source Intelligence skills through interactive missions
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              <Badge variant="outline" className="font-mono">
                v4.0 Polish Edition
              </Badge>
              <Badge variant="outline" className="font-mono">
                25 Missions
              </Badge>
              <Badge variant="outline" className="font-mono">
                AI-Powered Grading
              </Badge>
              <Badge variant="outline" className="font-mono">
                PWA Enabled
              </Badge>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-primary/30 bg-primary/5 hover-elevate">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Play Free on Replit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Experience the full game instantly in your browser. No downloads, no setup required. Learn OSINT techniques through hands-on missions.
                </p>
                <Button
                  asChild
                  className="w-full font-rajdhani uppercase tracking-wide"
                  data-testid="button-play-replit"
                >
                  <a
                    href="https://replit.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Terminal className="w-4 h-4 mr-2" />
                    Fork on Replit
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-accent/30 bg-accent/5 hover-elevate">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-accent" />
                  Hire the Developer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Need a full-stack developer for your project? From cybersecurity tools to interactive web apps, let's build something amazing together.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full font-rajdhani uppercase tracking-wide border-accent/30"
                  data-testid="button-hire-contra"
                >
                  <a
                    href="https://contra.com/gear_qt74d10m?referralExperimentNid=DEFAULT_REFERRAL_PROGRAM&referrerUsername=gear_qt74d10m&utm_campaign=social_sharing&utm_medium=independent_share&utm_source=copy_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    View on Contra
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron">What You'll Learn</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-rajdhani uppercase tracking-wide text-sm text-primary">
                  Core OSINT Techniques
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Google Dorking & Advanced Search</li>
                  <li>• WHOIS & Domain Intelligence</li>
                  <li>• Image Metadata (EXIF) Analysis</li>
                  <li>• Email Header Investigation</li>
                  <li>• DNS Enumeration & Subdomain Discovery</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-rajdhani uppercase tracking-wide text-sm text-accent">
                  Advanced Skills
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Certificate Transparency Hunting</li>
                  <li>• Breach Database Investigation</li>
                  <li>• Social Media Archaeology</li>
                  <li>• Dark Web Footprint Tracking</li>
                  <li>• Threat Actor Attribution</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Technology Stack */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron">Built With</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Express</Badge>
                <Badge variant="secondary">In-Memory Storage</Badge>
                <Badge variant="secondary">TanStack Query</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
                <Badge variant="secondary">Shadcn UI</Badge>
                <Badge variant="secondary">PWA</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Server-side scoring validation ensures fair gameplay. All progress is automatically saved in-memory with optimistic UI updates for instant responsiveness.
              </p>
            </CardContent>
          </Card>

          {/* Support the Developer */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Support the Developer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enjoyed the game? Support continued development and help create more educational OSINT content!
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="font-rajdhani uppercase tracking-wide border-primary/30"
                  data-testid="button-kofi"
                >
                  <a
                    href="https://ko-fi.com/gearz"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiKofi className="w-4 h-4 mr-2" />
                    Ko-fi
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="font-rajdhani uppercase tracking-wide border-accent/30"
                  data-testid="button-buymeacoffee"
                >
                  <a
                    href="https://buymeacoffee.com/gearz"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Coffee className="w-4 h-4 mr-2" />
                    Buy Me a Coffee
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="font-rajdhani uppercase tracking-wide border-primary/30"
                  data-testid="button-linkedin"
                >
                  <a
                    href="https://www.linkedin.com/in/joel-suarez-648580288"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiLinkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Credits */}
          <Card>
            <CardHeader>
              <CardTitle className="font-orbitron">Credits & Open Source</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                GEARZ OSINT Detective is an educational project designed to teach cybersecurity and OSINT skills through gamification. This project is open source and free to use.
              </p>
              <p className="text-sm text-muted-foreground">
                Developed by Joel Suarez - Full Stack Developer specializing in cybersecurity education, interactive web applications, and gamification.
              </p>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground pt-8 border-t">
            <p>© 2025 GEARZ OSINT Detective • Educational Use Only</p>
            <p className="mt-2">
              This project is designed for learning purposes. Always respect privacy and legal boundaries when conducting OSINT research.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
