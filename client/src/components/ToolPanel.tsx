import { useState } from "react";
import { Search, Globe, Image, FileCode, ChevronRight, Shield, Database } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { performSearch, performWhoisLookup, analyzeMetadata, searchPastebin } from "@/lib/toolData";
import type { ToolType } from "@shared/schema";

interface ToolPanelProps {
  availableTools: ToolType[];
}

export default function ToolPanel({ availableTools }: ToolPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  const [whoisQuery, setWhoisQuery] = useState("");
  const [whoisResult, setWhoisResult] = useState<any>(null);
  
  const [metadataFile, setMetadataFile] = useState("");
  const [metadataResult, setMetadataResult] = useState<any>(null);
  
  const [pasteQuery, setPasteQuery] = useState("");
  const [pasteResult, setPasteResult] = useState<any>(null);
  
  const [certQuery, setCertQuery] = useState("");
  const [certResult, setCertResult] = useState<any>(null);
  
  const [breachQuery, setBreachQuery] = useState("");
  const [breachResult, setBreachResult] = useState<any>(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = performSearch(searchQuery);
      setSearchResults(results);
    }
  };

  const handleWhois = () => {
    if (whoisQuery.trim()) {
      const result = performWhoisLookup(whoisQuery);
      setWhoisResult(result);
    }
  };

  const handleMetadata = () => {
    if (metadataFile.trim()) {
      const result = analyzeMetadata(metadataFile);
      setMetadataResult(result);
    }
  };

  const handlePastebin = () => {
    if (pasteQuery.trim()) {
      const result = searchPastebin(pasteQuery);
      setPasteResult(result);
    }
  };

  const handleCert = () => {
    if (certQuery.trim()) {
      // Certificate transparency logs
      const result = {
        domain: certQuery,
        subdomains: [`www.${certQuery}`, `mail.${certQuery}`, `api.${certQuery}`, `admin.${certQuery}`],
        certificates_found: 4,
        issuer: "Let's Encrypt Authority X3",
        validity: "Valid"
      };
      setCertResult(result);
    }
  };

  const handleBreach = () => {
    if (breachQuery.trim()) {
      // Breach database search
      const result = {
        query: breachQuery,
        breaches_found: ["MegaCorp 2023", "TechData Leak 2022"],
        compromised_accounts: 12,
        data_types: ["emails", "passwords", "phone_numbers"],
        risk_level: "High"
      };
      setBreachResult(result);
    }
  };

  const toolIcons: Record<ToolType, any> = {
    search: Search,
    whois: Globe,
    metadata: Image,
    pastebin: FileCode,
    cert: Shield,
    breach: Database,
    linkedin: Globe,
    dns: Globe,
    email: FileCode,
  };

  return (
    <Card className="p-4 border-2 border-primary/30 h-full flex flex-col">
      <Tabs defaultValue={availableTools[0]} className="flex-1 flex flex-col">
        <TabsList className={`grid w-full mb-4 ${availableTools.length <= 4 ? 'grid-cols-' + availableTools.length : 'grid-cols-2 md:grid-cols-4'}`}>
          {availableTools.map((tool) => {
            const Icon = toolIcons[tool] || Search;
            return (
              <TabsTrigger
                key={tool}
                value={tool}
                className="font-mono text-xs uppercase"
                data-testid={`tab-tool-${tool}`}
              >
                <Icon className="w-3 h-3 mr-1" />
                {tool}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="search" className="space-y-3 mt-0">
            <div className="space-y-2">
              <label className="text-xs font-semibold font-rajdhani uppercase tracking-wide">
                Search Query
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter search terms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="font-mono text-sm"
                  data-testid="input-search-query"
                />
                <Button onClick={handleSearch} data-testid="button-search">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-2">
                {searchResults.map((result, idx) => (
                  <Card key={idx} className="p-3 hover-elevate" data-testid={`card-search-result-${idx}`}>
                    <h4 className="font-semibold text-sm text-primary mb-1">{result.title}</h4>
                    <p className="text-xs text-muted-foreground mb-1 break-all">{result.url}</p>
                    <p className="text-xs">{result.snippet}</p>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="whois" className="space-y-3 mt-0">
            <div className="space-y-2">
              <label className="text-xs font-semibold font-rajdhani uppercase tracking-wide">
                Domain / IP Address
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="example.com or 1.2.3.4"
                  value={whoisQuery}
                  onChange={(e) => setWhoisQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleWhois()}
                  className="font-mono text-sm"
                  data-testid="input-whois-query"
                />
                <Button onClick={handleWhois} data-testid="button-whois">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {whoisResult && (
              <Card className="p-4 bg-muted/30" data-testid="card-whois-result">
                {whoisResult.error ? (
                  <p className="text-sm text-destructive">{whoisResult.error}</p>
                ) : (
                  <div className="font-mono text-xs space-y-1">
                    {Object.entries(whoisResult).map(([key, value]) => (
                      <div key={key} className="flex">
                        <span className="text-muted-foreground min-w-[120px]">{key}:</span>
                        <span className="text-foreground">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}
          </TabsContent>

          <TabsContent value="metadata" className="space-y-3 mt-0">
            <div className="space-y-2">
              <label className="text-xs font-semibold font-rajdhani uppercase tracking-wide">
                File Name
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter filename..."
                  value={metadataFile}
                  onChange={(e) => setMetadataFile(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleMetadata()}
                  className="font-mono text-sm"
                  data-testid="input-metadata-file"
                />
                <Button onClick={handleMetadata} data-testid="button-metadata">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {metadataResult && (
              <Card className="p-4 bg-muted/30" data-testid="card-metadata-result">
                {metadataResult.error ? (
                  <p className="text-sm text-destructive">{metadataResult.error}</p>
                ) : (
                  <div className="font-mono text-xs space-y-1">
                    {Object.entries(metadataResult).map(([key, value]) => (
                      <div key={key} className="flex">
                        <span className="text-muted-foreground min-w-[120px]">{key}:</span>
                        <span className="text-foreground">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}
          </TabsContent>

          <TabsContent value="pastebin" className="space-y-3 mt-0">
            <div className="space-y-2">
              <label className="text-xs font-semibold font-rajdhani uppercase tracking-wide">
                Paste ID
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter paste ID..."
                  value={pasteQuery}
                  onChange={(e) => setPasteQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePastebin()}
                  className="font-mono text-sm"
                  data-testid="input-pastebin-id"
                />
                <Button onClick={handlePastebin} data-testid="button-pastebin">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {pasteResult && (
              <Card className="p-4 bg-muted/30" data-testid="card-pastebin-result">
                {pasteResult.error ? (
                  <p className="text-sm text-destructive">{pasteResult.error}</p>
                ) : (
                  <div className="space-y-2">
                    <div className="font-mono text-xs">
                      <div className="flex">
                        <span className="text-muted-foreground min-w-[80px]">ID:</span>
                        <span>{pasteResult.id}</span>
                      </div>
                      <div className="flex">
                        <span className="text-muted-foreground min-w-[80px]">Title:</span>
                        <span>{pasteResult.title}</span>
                      </div>
                      <div className="flex">
                        <span className="text-muted-foreground min-w-[80px]">Date:</span>
                        <span>{pasteResult.date}</span>
                      </div>
                    </div>
                    <pre className="text-xs bg-background p-2 rounded border overflow-x-auto">
                      {pasteResult.content}
                    </pre>
                  </div>
                )}
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cert" className="space-y-3 mt-0">
            <div className="space-y-2">
              <label className="text-xs font-semibold font-rajdhani uppercase tracking-wide">
                Certificate Transparency Logs
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter domain..."
                  value={certQuery}
                  onChange={(e) => setCertQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCert()}
                  className="font-mono text-sm"
                  data-testid="input-cert"
                />
                <Button onClick={handleCert} data-testid="button-cert">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {certResult && (
              <Card className="p-4 bg-muted/30" data-testid="card-cert-result">
                <div className="font-mono text-xs space-y-2">
                  <div className="flex">
                    <span className="text-muted-foreground min-w-[120px]">Domain:</span>
                    <span>{certResult.domain}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Subdomains:</span>
                    {certResult.subdomains.map((sub: string, i: number) => (
                      <div key={i} className="pl-4 text-primary">• {sub}</div>
                    ))}
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground min-w-[120px]">Certificates:</span>
                    <span>{certResult.certificates_found}</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground min-w-[120px]">Issuer:</span>
                    <span>{certResult.issuer}</span>
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="breach" className="space-y-3 mt-0">
            <div className="space-y-2">
              <label className="text-xs font-semibold font-rajdhani uppercase tracking-wide">
                Breach Database Search
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter email or domain..."
                  value={breachQuery}
                  onChange={(e) => setBreachQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleBreach()}
                  className="font-mono text-sm"
                  data-testid="input-breach"
                />
                <Button onClick={handleBreach} data-testid="button-breach">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {breachResult && (
              <Card className="p-4 bg-muted/30" data-testid="card-breach-result">
                <div className="font-mono text-xs space-y-2">
                  <div className="flex">
                    <span className="text-muted-foreground min-w-[120px]">Query:</span>
                    <span>{breachResult.query}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Breaches:</span>
                    {breachResult.breaches_found.map((breach: string, i: number) => (
                      <div key={i} className="pl-4 text-destructive">• {breach}</div>
                    ))}
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground min-w-[120px]">Compromised:</span>
                    <span>{breachResult.compromised_accounts}</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground min-w-[120px]">Data Types:</span>
                    <span>{breachResult.data_types.join(', ')}</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground min-w-[120px]">Risk:</span>
                    <span className="text-destructive font-bold">{breachResult.risk_level}</span>
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </Card>
  );
}
