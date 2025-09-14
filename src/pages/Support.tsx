import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, Send, Loader2, BookOpen, Users, MessageCircle, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Support() {
  const { toast } = useToast();
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [answer, setAnswer] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      toast({
        title: "Missing Question",
        description: "Please enter a question for the AI to answer.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Mock AI response
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const mockAnswer = `Based on your question about "${question}", here's a detailed explanation:

This is a comprehensive answer that takes into account educational best practices and pedagogical approaches. The AI assistant provides clear, structured information that can be easily understood by students at various learning levels.

Key points to remember:
• The concept builds upon foundational knowledge
• Visual aids and examples can enhance understanding  
• Practice exercises help reinforce the learning
• Real-world applications make the topic more engaging

For additional support, consider breaking down complex topics into smaller, manageable chunks and using multiple teaching modalities to accommodate different learning styles.

Would you like me to suggest some specific teaching strategies or create practice materials for this topic?`;

      setAnswer(mockAnswer);
      toast({
        title: "Answer Generated!",
        description: "AI has provided a detailed response to your question."
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate answer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const sampleQuestions = [
    {
      category: "Teaching Strategy",
      question: "How can I explain photosynthesis to grade 5 students in a simple way?"
    },
    {
      category: "Classroom Management", 
      question: "What are effective strategies for keeping students engaged during online lessons?"
    },
    {
      category: "Assessment",
      question: "How do I create fair quiz questions for different learning abilities?"
    },
    {
      category: "Curriculum Planning",
      question: "What's the best sequence to teach fractions to elementary students?"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center">
          <HelpCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Support</h1>
          <p className="text-muted-foreground">AI-powered Q&A assistance for personalized explanations</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Question Input */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              Ask a Question
            </CardTitle>
            <CardDescription>
              Get personalized explanations and teaching guidance from AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="question">Student Question *</Label>
              <Textarea
                id="question"
                placeholder="e.g., I don't understand how photosynthesis works. Can you explain it in simple terms?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="context">Additional Context (Optional)</Label>
              <Textarea
                id="context"
                placeholder="e.g., This is for a 7th grade biology class. The student has already learned about plants and cells."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>

            <Button
              onClick={handleAskQuestion}
              disabled={isGenerating}
              className="w-full"
              variant="hero"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Answer...
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4" />
                  Get AI Answer
                </>
              )}
            </Button>

            <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded">
              <p className="font-medium mb-1">💡 Tips for better answers:</p>
              <ul className="space-y-1">
                <li>• Include the student's grade level</li>
                <li>• Mention what they already know</li>
                <li>• Specify if you need examples or activities</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* AI Answer Display */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-secondary" />
              AI Response
            </CardTitle>
            <CardDescription>
              Personalized explanation and teaching guidance
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!answer ? (
              <div className="text-center py-12 text-muted-foreground">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Ask a question to see AI-generated explanations here</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
                  <h4 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    AI Assistant Response
                  </h4>
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-foreground leading-relaxed font-sans">
                      {answer}
                    </pre>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(answer)}
                  >
                    Copy Response
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      const blob = new Blob([answer], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'ai_explanation.txt';
                      a.click();
                    }}
                  >
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setQuestion("");
                      setAnswer("");
                      setContext("");
                    }}
                  >
                    Ask Another
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sample Questions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            Sample Questions
          </CardTitle>
          <CardDescription>
            Click any example to try it out
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sampleQuestions.map((sample, index) => (
              <Card 
                key={index}
                className="cursor-pointer hover:shadow-card transition-shadow duration-300 border-l-4 border-l-accent"
                onClick={() => setQuestion(sample.question)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-accent">
                      {sample.category}
                    </CardTitle>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">
                    {sample.question}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Additional Teaching Resources
          </CardTitle>
          <CardDescription>
            Helpful links and resources for educators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">Teaching Strategies</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Evidence-based methods for effective instruction
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Explore Strategies
              </Button>
            </div>

            <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
              <h4 className="font-semibold text-secondary mb-2">Lesson Templates</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Ready-to-use lesson plan templates
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View Templates
              </Button>
            </div>

            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <h4 className="font-semibold text-accent mb-2">Assessment Tools</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Rubrics and evaluation frameworks
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Access Tools
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}