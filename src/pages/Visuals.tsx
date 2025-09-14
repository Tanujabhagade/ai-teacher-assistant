import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Paintbrush2, Download, RefreshCw, Loader2, Image, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeneratedImage {
  url: string;
  prompt: string;
  style: string;
  timestamp: Date;
}

export default function Visuals() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("educational");
  const [size, setSize] = useState("1024x1024");
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Missing Prompt",
        description: "Please enter a description for the visual you want to create.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Mock image generation
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const mockImage: GeneratedImage = {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
        prompt: prompt,
        style: style,
        timestamp: new Date()
      };

      setGeneratedImages(prev => [mockImage, ...prev]);
      toast({
        title: "Visual Generated!",
        description: "Your educational visual is ready for download."
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate visual. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = (imageUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
          <Paintbrush2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Visual Generator</h1>
          <p className="text-muted-foreground">Create educational diagrams and illustrations with AI</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Generation Form */}
        <Card className="shadow-soft lg:col-span-1">
          <CardHeader>
            <CardTitle>Create Visual</CardTitle>
            <CardDescription>Describe the educational visual you need</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="prompt">Visual Description *</Label>
              <Textarea
                id="prompt"
                placeholder="e.g., A detailed diagram of the human heart showing all four chambers, major blood vessels, and flow direction with labels"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Visual Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="educational">Educational Diagram</SelectItem>
                  <SelectItem value="realistic">Realistic Illustration</SelectItem>
                  <SelectItem value="cartoon">Cartoon Style</SelectItem>
                  <SelectItem value="minimalist">Minimalist Design</SelectItem>
                  <SelectItem value="infographic">Infographic Style</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Image Size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="512x512">Square (512×512)</SelectItem>
                  <SelectItem value="1024x1024">Large Square (1024×1024)</SelectItem>
                  <SelectItem value="1024x768">Landscape (1024×768)</SelectItem>
                  <SelectItem value="768x1024">Portrait (768×1024)</SelectItem>
                </SelectContent>
              </Select>
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
                  Generating Visual...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Visual
                </>
              )}
            </Button>

            <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded">
              <p className="font-medium mb-1">💡 Tips for better results:</p>
              <ul className="space-y-1">
                <li>• Be specific about colors, labels, and details</li>
                <li>• Mention if you need arrows or annotations</li>
                <li>• Specify the educational level (elementary, high school, etc.)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Generated Images Gallery */}
        <Card className="shadow-soft lg:col-span-2">
          <CardHeader>
            <CardTitle>Generated Visuals</CardTitle>
            <CardDescription>Your AI-created educational images</CardDescription>
          </CardHeader>
          <CardContent>
            {generatedImages.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Generate your first visual to see it here</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedImages.map((image, index) => (
                  <div key={index} className="group relative">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted shadow-soft">
                      <img
                        src={image.url}
                        alt={image.prompt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      
                      {/* Overlay Controls */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => downloadImage(image.url, `visual_${index + 1}.png`)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setPrompt(image.prompt)}
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Image Details */}
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium text-foreground line-clamp-2">
                        {image.prompt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="bg-secondary/20 text-secondary px-2 py-1 rounded">
                          {image.style}
                        </span>
                        <span>
                          {image.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sample Prompts */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Sample Educational Visuals</CardTitle>
          <CardDescription>Click any example to try it out</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Solar System Diagram",
                description: "A colorful diagram of our solar system showing all planets in order with their relative sizes and orbital paths, labeled clearly for grade 5 students"
              },
              {
                title: "Plant Cell Structure", 
                description: "Detailed cross-section of a plant cell showing nucleus, chloroplasts, cell wall, vacuole, and other organelles with clear labels and bright colors"
              },
              {
                title: "Water Cycle Illustration",
                description: "Educational diagram of the water cycle showing evaporation, condensation, precipitation, and collection with arrows indicating the flow direction"
              },
              {
                title: "Human Digestive System",
                description: "Anatomical diagram of the human digestive system from mouth to intestines, showing the path of food with organ labels"
              },
              {
                title: "Volcanic Eruption",
                description: "Cross-section view of a volcano during eruption showing magma chamber, lava flow, ash cloud, and geological layers with educational labels"
              },
              {
                title: "Photosynthesis Process",
                description: "Scientific illustration showing the photosynthesis process in a leaf with sunlight, CO2, water inputs and oxygen, glucose outputs"
              }
            ].map((example, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-card transition-shadow duration-300 border-l-4 border-l-primary"
                onClick={() => setPrompt(example.description)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{example.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {example.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}