import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, Download, Copy, RefreshCw, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

interface QuizData {
  title: string;
  subject: string;
  grade: string;
  topic: string;
  difficulty: string;
  questions: QuizQuestion[];
}

export default function Quiz() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    subject: "",
    grade: "",
    topic: "",
    difficulty: "medium",
    num_questions: "10"
  });
  
  const [generatedQuiz, setGeneratedQuiz] = useState<QuizData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!formData.subject || !formData.grade || !formData.topic) {
      toast({
        title: "Missing Information",
        description: "Please fill in subject, grade, and topic fields.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Mock API call - in real implementation, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockQuiz: QuizData = {
        title: `${formData.subject} Quiz: ${formData.topic}`,
        subject: formData.subject,
        grade: formData.grade,
        topic: formData.topic,
        difficulty: formData.difficulty,
        questions: [
          {
            question: "What is the primary function of chlorophyll in plants?",
            options: [
              "To absorb water from soil",
              "To capture light energy for photosynthesis", 
              "To produce oxygen",
              "To transport nutrients"
            ],
            correct_answer: 1,
            explanation: "Chlorophyll is the green pigment that captures light energy and converts it into chemical energy during photosynthesis."
          },
          {
            question: "Which of the following is NOT a product of photosynthesis?",
            options: [
              "Glucose",
              "Oxygen",
              "Carbon dioxide",
              "Water"
            ],
            correct_answer: 2,
            explanation: "Carbon dioxide is a reactant (input) in photosynthesis, not a product. The products are glucose and oxygen."
          }
        ]
      };

      setGeneratedQuiz(mockQuiz);
      toast({
        title: "Quiz Generated!",
        description: `Created ${mockQuiz.questions.length} questions successfully.`
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate quiz. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Quiz content copied to clipboard."
    });
  };

  const downloadQuiz = () => {
    if (!generatedQuiz) return;
    
    const content = `${generatedQuiz.title}\nSubject: ${generatedQuiz.subject} | Grade: ${generatedQuiz.grade}\n\n${generatedQuiz.questions.map((q, i) => 
      `${i + 1}. ${q.question}\n${q.options.map((opt, j) => `${String.fromCharCode(65 + j)}. ${opt}`).join('\n')}\nAnswer: ${String.fromCharCode(65 + q.correct_answer)}\nExplanation: ${q.explanation}\n`
    ).join('\n')}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedQuiz.title.replace(/[^a-z0-9]/gi, '_')}.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
          <BrainCircuit className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quiz Generator</h1>
          <p className="text-muted-foreground">Create engaging multiple-choice quizzes with AI</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Quiz Parameters</CardTitle>
            <CardDescription>Specify the details for your quiz</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Mathematics, Science"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade Level *</Label>
                <Select value={formData.grade} onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={`Grade ${i + 1}`}>
                        Grade {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic *</Label>
              <Input
                id="topic"
                placeholder="e.g., Photosynthesis, Algebra"
                value={formData.topic}
                onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={formData.difficulty} onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="num_questions">Number of Questions</Label>
                <Select value={formData.num_questions} onValueChange={(value) => setFormData(prev => ({ ...prev, num_questions: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Questions</SelectItem>
                    <SelectItem value="10">10 Questions</SelectItem>
                    <SelectItem value="15">15 Questions</SelectItem>
                    <SelectItem value="20">20 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="w-full"
              variant="hero"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Quiz...
                </>
              ) : (
                <>
                  <BrainCircuit className="w-4 h-4" />
                  Generate Quiz
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Quiz Display */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Quiz</CardTitle>
                <CardDescription>Review and export your quiz</CardDescription>
              </div>
              {generatedQuiz && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => copyToClipboard(JSON.stringify(generatedQuiz, null, 2))}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={downloadQuiz}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!generatedQuiz ? (
              <div className="text-center py-12 text-muted-foreground">
                <BrainCircuit className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Generate a quiz to see the results here</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border-b border-border pb-4">
                  <h3 className="text-xl font-semibold text-foreground">{generatedQuiz.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span>Subject: {generatedQuiz.subject}</span>
                    <span>Grade: {generatedQuiz.grade}</span>
                    <span>Difficulty: {generatedQuiz.difficulty}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {generatedQuiz.questions.map((question, index) => (
                    <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                      <h4 className="font-medium text-foreground">
                        {index + 1}. {question.question}
                      </h4>
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div 
                            key={optIndex} 
                            className={`p-2 rounded text-sm ${
                              optIndex === question.correct_answer 
                                ? 'bg-secondary/20 border border-secondary text-secondary-foreground font-medium' 
                                : 'bg-muted/50'
                            }`}
                          >
                            {String.fromCharCode(65 + optIndex)}. {option}
                            {optIndex === question.correct_answer && (
                              <span className="ml-2 text-xs">✓ Correct</span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}