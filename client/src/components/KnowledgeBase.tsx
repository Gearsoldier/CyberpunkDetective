import { useState, useMemo, useEffect } from "react";
import { Book, Search, Award, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GlossaryTerm {
  id: string;
  term: string;
  category: string;
  definition: string;
  examples: string[];
  relatedMissions: number[];
  quiz: Array<{
    question: string;
    options: string[];
    correctIndex: number;
  }>;
}

interface KnowledgeBaseProps {
  completedQuizzes: string[];
  onQuizComplete: (termId: string, score: number) => void;
}

export default function KnowledgeBase({ completedQuizzes, onQuizComplete }: KnowledgeBaseProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [glossaryData, setGlossaryData] = useState<{ terms: GlossaryTerm[], categories: string[] } | null>(null);

  // Load glossary data
  useEffect(() => {
    fetch('/data/glossary.json')
      .then(res => res.json())
      .then(data => setGlossaryData(data))
      .catch(err => console.error('Failed to load glossary:', err));
  }, []);

  // All hooks must be called before any early returns
  const terms = glossaryData?.terms || [];
  const categories = glossaryData ? ["all", ...glossaryData.categories] : ["all"];

  const filteredTerms = useMemo(() => {
    return terms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          term.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [terms, searchQuery, selectedCategory]);

  // Early return AFTER all hooks
  if (!glossaryData) {
    return <div className="max-w-7xl mx-auto p-6">Loading Knowledge Base...</div>;
  }

  const handleStartQuiz = (term: GlossaryTerm) => {
    setSelectedTerm(term);
    setQuizMode(true);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < (selectedTerm?.quiz.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setShowResults(true);
    const correctCount = selectedAnswers.filter((answer, idx) => 
      answer === selectedTerm?.quiz[idx].correctIndex
    ).length;
    const score = Math.round((correctCount / (selectedTerm?.quiz.length || 1)) * 100);
    if (selectedTerm && score >= 66) {
      onQuizComplete(selectedTerm.id, score);
    }
  };

  const handleRetryQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const getQuizScore = () => {
    const correctCount = selectedAnswers.filter((answer, idx) => 
      answer === selectedTerm?.quiz[idx].correctIndex
    ).length;
    return Math.round((correctCount / (selectedTerm?.quiz.length || 1)) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="font-orbitron text-3xl font-bold">
          <span className="text-primary">Knowledge</span>
          <span className="text-muted-foreground mx-2">//</span>
          <span className="text-accent">Base</span>
        </h1>
        <p className="text-muted-foreground">Master OSINT techniques and earn bonus XP</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Book className="w-8 h-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{terms.length}</div>
                <div className="text-sm text-muted-foreground">Total Terms</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-accent" />
              <div>
                <div className="text-2xl font-bold">{completedQuizzes.length}</div>
                <div className="text-sm text-muted-foreground">Quizzes Passed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">
                  {Math.round((completedQuizzes.length / terms.length) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Completion</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search terms, definitions, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-glossary-search"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-md bg-background border border-input"
          data-testid="select-category"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTerms.map(term => (
          <Card key={term.id} className="glass hover-elevate transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {term.term}
                    {completedQuizzes.includes(term.id) && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </CardTitle>
                  <CardDescription>{term.category}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">{term.definition}</p>
              
              <div className="flex flex-wrap gap-1">
                {term.relatedMissions.slice(0, 3).map(missionId => (
                  <Badge key={missionId} variant="outline" className="text-xs">
                    Case #{missionId.toString().padStart(3, '0')}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedTerm(term)}
                  className="flex-1"
                  data-testid={`button-view-${term.id}`}
                >
                  View Details
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleStartQuiz(term)}
                  className="flex-1"
                  data-testid={`button-quiz-${term.id}`}
                >
                  Test Me
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <Card className="glass">
          <CardContent className="py-12 text-center">
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium">No terms found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or category filter</p>
          </CardContent>
        </Card>
      )}

      {/* Term Details Dialog */}
      <Dialog open={selectedTerm !== null && !quizMode} onOpenChange={() => setSelectedTerm(null)}>
        <DialogContent className="max-w-2xl glass-strong max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-orbitron text-2xl">{selectedTerm?.term}</DialogTitle>
            <DialogDescription>{selectedTerm?.category}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Definition</h3>
              <p className="text-muted-foreground">{selectedTerm?.definition}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Examples</h3>
              <ul className="list-disc list-inside space-y-1">
                {selectedTerm?.examples.map((example, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground">{example}</li>
                ))}
              </ul>
            </div>

            {selectedTerm && selectedTerm.relatedMissions.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Related Missions</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTerm.relatedMissions.map(missionId => (
                    <Badge key={missionId} variant="outline">
                      Case #{missionId.toString().padStart(3, '0')}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={() => selectedTerm && handleStartQuiz(selectedTerm)}
              className="w-full"
              data-testid="button-start-quiz-from-details"
            >
              Take Quiz
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quiz Dialog */}
      <Dialog open={quizMode} onOpenChange={() => setQuizMode(false)}>
        <DialogContent className="max-w-2xl glass-strong">
          <DialogHeader>
            <DialogTitle className="font-orbitron">
              {selectedTerm?.term} - Quiz
            </DialogTitle>
            <DialogDescription>
              {showResults ? "Quiz Results" : `Question ${currentQuestion + 1} of ${selectedTerm?.quiz.length}`}
            </DialogDescription>
          </DialogHeader>

          {!showResults && selectedTerm && (
            <div className="space-y-6">
              <p className="text-lg font-medium">{selectedTerm.quiz[currentQuestion].question}</p>
              
              <div className="space-y-3">
                {selectedTerm.quiz[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    className={`w-full p-4 rounded-md text-left border-2 transition-all hover-elevate ${
                      selectedAnswers[currentQuestion] === idx
                        ? 'border-primary bg-primary/10'
                        : 'border-border'
                    }`}
                    data-testid={`button-answer-${idx}`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setQuizMode(false)}
                  className="flex-1"
                  data-testid="button-cancel-quiz"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="flex-1"
                  data-testid="button-next-question"
                >
                  {currentQuestion < selectedTerm.quiz.length - 1 ? "Next" : "Finish"}
                </Button>
              </div>
            </div>
          )}

          {showResults && selectedTerm && (
            <div className="space-y-6">
              <div className="text-center">
                {getQuizScore() >= 66 ? (
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
                ) : (
                  <XCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
                )}
                <h3 className="text-3xl font-bold mb-2">{getQuizScore()}%</h3>
                <p className="text-muted-foreground">
                  {getQuizScore() >= 66 ? "Quiz Passed! +50 XP" : "Keep studying and try again"}
                </p>
              </div>

              <div className="space-y-3">
                {selectedTerm.quiz.map((q, idx) => {
                  const isCorrect = selectedAnswers[idx] === q.correctIndex;
                  return (
                    <div key={idx} className={`p-4 rounded-md border-2 ${
                      isCorrect ? 'border-green-500/50 bg-green-500/10' : 'border-destructive/50 bg-destructive/10'
                    }`}>
                      <p className="font-medium mb-2">{q.question}</p>
                      <p className="text-sm text-muted-foreground">
                        Your answer: {q.options[selectedAnswers[idx]]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-500">
                          Correct answer: {q.options[q.correctIndex]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3">
                {getQuizScore() < 66 && (
                  <Button
                    onClick={handleRetryQuiz}
                    variant="outline"
                    className="flex-1"
                    data-testid="button-retry-quiz"
                  >
                    Retry Quiz
                  </Button>
                )}
                <Button
                  onClick={() => {
                    setQuizMode(false);
                    setSelectedTerm(null);
                  }}
                  className="flex-1"
                  data-testid="button-close-results"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
