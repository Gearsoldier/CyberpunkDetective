import { useState } from "react";
import { Search, Globe, Image, FileCode, ChevronRight } from "lucide-react";
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

  const toolIcons = {
    search: Search,
    whois: Globe,
    metadata: Image,
    pastebin: FileCode,
  };

  return (
    <Card className="p-4 border-2 border-primary/30 h-full flex flex-col">
      <Tabs defaultValue={availableTools[0]} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
          {availableTools.map((tool) => {
            const Icon = toolIcons[tool];
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
                  placeholder="suspicious_photo.jpg"
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
                  placeholder="a7f3k9m2"
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
        </ScrollArea>
      </Tabs>
    </Card>
  );
}
