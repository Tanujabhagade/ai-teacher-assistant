import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, FileText, Mic, Paintbrush2, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 text-white shadow-glow">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold leading-tight">
                Welcome to ShikshaSaarthi
              </h1>
              <p className="text-xl text-white/90">
                Your AI-powered teaching assistant for creating engaging lessons, quizzes, and educational content.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="secondary" size="lg">
                <Link to="/quiz">
                  <BrainCircuit className="w-5 h-5" />
                  Create Quiz
                </Link>
              </Button>
              <Button asChild variant="accent" size="lg">
                <Link to="/lesson">
                  <FileText className="w-5 h-5" />
                  Generate Lesson
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src={heroImage} 
              alt="AI Teaching Assistant" 
              className="rounded-xl shadow-card w-full"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-primary shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" />
              Quizzes Created
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">12</div>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-secondary" />
              Lesson Plans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">8</div>
            <p className="text-sm text-muted-foreground">Ready to use</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Time Saved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">24h</div>
            <p className="text-sm text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Tools Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">AI-Powered Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group hover:shadow-card transition-all duration-300 hover:scale-105 cursor-pointer">
            <Link to="/quiz">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <BrainCircuit className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Quiz Generator</CardTitle>
                <CardDescription>
                  Create MCQ quizzes instantly with AI
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="group hover:shadow-card transition-all duration-300 hover:scale-105 cursor-pointer">
            <Link to="/lesson">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <FileText className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="text-lg">Lesson Planner</CardTitle>
                <CardDescription>
                  Generate structured lesson plans
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="group hover:shadow-card transition-all duration-300 hover:scale-105 cursor-pointer">
            <Link to="/voice">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Mic className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg">Voice Notes</CardTitle>
                <CardDescription>
                  Convert speech to lesson material
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="group hover:shadow-card transition-all duration-300 hover:scale-105 cursor-pointer">
            <Link to="/visuals">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all">
                  <Paintbrush2 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">Visual Generator</CardTitle>
                <CardDescription>
                  Create educational diagrams & images
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Your latest AI-generated content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <BrainCircuit className="w-4 h-4 text-primary" />
              <div>
                <p className="font-medium">Mathematics Quiz - Algebra</p>
                <p className="text-sm text-muted-foreground">Grade 10 • 10 questions</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">View</Button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-secondary" />
              <div>
                <p className="font-medium">Science Lesson - Photosynthesis</p>
                <p className="text-sm text-muted-foreground">Grade 8 • 45 minutes</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">View</Button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Paintbrush2 className="w-4 h-4 text-accent" />
              <div>
                <p className="font-medium">Solar System Diagram</p>
                <p className="text-sm text-muted-foreground">Astronomy visual aid</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">View</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}