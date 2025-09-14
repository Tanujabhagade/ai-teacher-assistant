import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Copy, Loader2, Clock, Target, Users, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LessonPlan {
  title: string;
  subject: string;
  grade: string;
  duration: string;
  objectives: string[];
  materials: string[];
  introduction: string;
  mainActivity: string;
  assessment: string;
  conclusion: string;
}

export default function Lesson() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    subject: "",
    grade: "",
    topic: "",
    duration: "45"
  });
  
  const [generatedLesson, setGeneratedLesson] = useState<LessonPlan | null>(null);
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
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockLesson: LessonPlan = {
        title: `${formData.topic} - ${formData.subject} Lesson Plan`,
        subject: formData.subject,
        grade: formData.grade,
        duration: `${formData.duration} minutes`,
        objectives: [
          "Students will understand the basic concepts of photosynthesis",
          "Students will identify the key components required for photosynthesis",
          "Students will explain the importance of photosynthesis in ecosystems"
        ],
        materials: [
          "Whiteboard and markers",
          "Plant specimens",
          "Microscopes",
          "Worksheet handouts",
          "Video presentation materials"
        ],
        introduction: "Begin the lesson by showing students a healthy plant and asking them what the plant needs to survive and grow. This will lead into a discussion about sunlight, water, and air, setting the stage for understanding photosynthesis.",
        mainActivity: "Conduct a hands-on experiment where students observe plant cells under microscopes to identify chloroplasts. Follow this with a interactive demonstration of the photosynthesis equation, using props to represent reactants and products. Students will work in pairs to complete a photosynthesis diagram worksheet.",
        assessment: "Students will complete a quick exit ticket with 3 questions about photosynthesis. Additionally, observe student participation during the hands-on activities and check their completed worksheets for understanding of the process.",
        conclusion: "Review the key points of photosynthesis and connect it to the broader ecosystem. Ask students to think about how photosynthesis affects their daily lives and assign homework to find examples of photosynthesis in their environment."
      };

      setGeneratedLesson(mockLesson);
      toast({
        title: "Lesson Plan Generated!",
        description: "Your structured lesson plan is ready for use."
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate lesson plan. Please try again.",
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
      description: "Lesson plan copied to clipboard."
    });
  };

  const downloadLesson = () => {
    if (!generatedLesson) return;
    
    const content = `${generatedLesson.title}
Subject: ${generatedLesson.subject} | Grade: ${generatedLesson.grade} | Duration: ${generatedLesson.duration}

LEARNING OBJECTIVES:
${generatedLesson.objectives.map(obj => `• ${obj}`).join('\n')}

MATERIALS NEEDED:
${generatedLesson.materials.map(mat => `• ${mat}`).join('\n')}

INTRODUCTION (10 mins):
${generatedLesson.introduction}

MAIN ACTIVITY (25 mins):
${generatedLesson.mainActivity}

ASSESSMENT (5 mins):
${generatedLesson.assessment}

CONCLUSION (5 mins):
${generatedLesson.conclusion}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedLesson.title.replace(/[^a-z0-9]/gi, '_')}_lesson_plan.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lesson Planner</h1>
          <p className="text-muted-foreground">Create structured, engaging lesson plans with AI</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Lesson Parameters</CardTitle>
            <CardDescription>Define your lesson requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Biology, History"
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
              <Label htmlFor="topic">Lesson Topic *</Label>
              <Input
                id="topic"
                placeholder="e.g., Photosynthesis, World War II"
                value={formData.topic}
                onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="w-full"
              variant="ai"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Lesson Plan...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Generate Lesson Plan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Lesson Display */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Lesson Plan</CardTitle>
                <CardDescription>Review and export your lesson</CardDescription>
              </div>
              {generatedLesson && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => copyToClipboard(JSON.stringify(generatedLesson, null, 2))}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={downloadLesson}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!generatedLesson ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Generate a lesson plan to see the results here</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border-b border-border pb-4">
                  <h3 className="text-xl font-semibold text-foreground">{generatedLesson.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {generatedLesson.grade}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {generatedLesson.duration}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Learning Objectives
                    </h4>
                    <ul className="space-y-2">
                      {generatedLesson.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Materials Needed</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                      {generatedLesson.materials.map((material, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                          {material}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {[
                    { title: "Introduction", content: generatedLesson.introduction },
                    { title: "Main Activity", content: generatedLesson.mainActivity },
                    { title: "Assessment", content: generatedLesson.assessment },
                    { title: "Conclusion", content: generatedLesson.conclusion }
                  ].map((section, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">{section.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
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