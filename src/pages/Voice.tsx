import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Upload, FileText, Loader2, Play, Square, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Voice() {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [refinedNotes, setRefinedNotes] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      toast({
        title: "Recording Started",
        description: "Speak clearly into your microphone"
      });
      
      // In a real implementation, you would use MediaRecorder API here
      // For demo purposes, we'll simulate recording
    } catch (error) {
      toast({
        title: "Recording Failed",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setIsTranscribing(true);
    
    try {
      // Mock transcription
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockTranscription = "Today we will be learning about the water cycle. The water cycle consists of evaporation, condensation, and precipitation. Water evaporates from oceans, lakes, and rivers due to heat from the sun. This water vapor rises into the atmosphere where it cools and condenses into clouds. When the clouds become heavy with water droplets, precipitation occurs in the form of rain, snow, or sleet.";
      
      setTranscription(mockTranscription);
      toast({
        title: "Transcription Complete",
        description: "Your audio has been converted to text"
      });
    } catch (error) {
      toast({
        title: "Transcription Failed",
        description: "Could not transcribe audio. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an audio file",
        variant: "destructive"
      });
      return;
    }

    setIsTranscribing(true);
    try {
      // Mock file transcription
      await new Promise(resolve => setTimeout(resolve, 3000));
      const mockTranscription = "This is a sample transcription from an uploaded audio file. The content discusses various teaching methodologies and classroom management techniques that can be applied in modern educational settings.";
      
      setTranscription(mockTranscription);
      toast({
        title: "File Transcribed",
        description: "Your audio file has been processed successfully"
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Could not process the audio file",
        variant: "destructive"
      });
    } finally {
      setIsTranscribing(false);
    }
  };

  const refineToLessonNotes = async () => {
    if (!transcription) return;

    setIsRefining(true);
    try {
      // Mock AI refinement
      await new Promise(resolve => setTimeout(resolve, 2500));
      const mockRefinedNotes = `# Water Cycle Lesson Notes

## Learning Objectives
- Students will understand the three main stages of the water cycle
- Students will identify the role of the sun in driving the water cycle
- Students will explain how water moves through the environment

## Key Concepts

### 1. Evaporation
- Process where liquid water changes to water vapor
- Caused by heat energy from the sun
- Occurs from oceans, lakes, rivers, and other water sources

### 2. Condensation
- Water vapor cools and changes back to liquid water
- Forms clouds in the atmosphere
- Occurs when warm, moist air rises and cools

### 3. Precipitation
- Water falls from clouds to Earth's surface
- Forms include rain, snow, sleet, and hail
- Completes the cycle by returning water to Earth

## Teaching Activities
- Visual diagram of the water cycle
- Interactive demonstration with boiling water
- Student observation of condensation on cold surfaces

## Assessment Questions
1. What causes water to evaporate?
2. How do clouds form?
3. Name three types of precipitation.`;

      setRefinedNotes(mockRefinedNotes);
      toast({
        title: "Notes Refined",
        description: "Your transcription has been converted to structured lesson notes"
      });
    } catch (error) {
      toast({
        title: "Refinement Failed",
        description: "Could not refine the transcription",
        variant: "destructive"
      });
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center">
          <Mic className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Voice to Notes</h1>
          <p className="text-muted-foreground">Convert speech to structured lesson material</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recording & Upload */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Audio Input</CardTitle>
            <CardDescription>Record live or upload an audio file</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Live Recording */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording 
                    ? 'bg-red-500 shadow-glow animate-pulse' 
                    : 'bg-gradient-accent hover:shadow-soft'
                }`}>
                  {isRecording ? (
                    <Square className="w-8 h-8 text-white" />
                  ) : (
                    <Mic className="w-8 h-8 text-white" />
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isTranscribing}
                  variant={isRecording ? "destructive" : "accent"}
                  size="lg"
                  className="w-full"
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-4 h-4" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4" />
                      Start Recording
                    </>
                  )}
                </Button>
                
                {isRecording && (
                  <p className="text-sm text-muted-foreground animate-pulse">
                    🔴 Recording in progress...
                  </p>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isTranscribing}
                variant="outline"
                className="w-full"
              >
                <Upload className="w-4 h-4" />
                Upload Audio File
              </Button>
            </div>

            {isTranscribing && (
              <div className="text-center py-4">
                <Loader2 className="w-6 h-6 mx-auto animate-spin text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Transcribing audio...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transcription Results */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Transcription</CardTitle>
            <CardDescription>Edit and refine your transcribed text</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Your transcribed text will appear here..."
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            
            <Button
              onClick={refineToLessonNotes}
              disabled={!transcription || isRefining}
              variant="ai"
              className="w-full"
            >
              {isRefining ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Refining to Lesson Notes...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Refine to Lesson Notes
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Refined Notes */}
      {refinedNotes && (
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-secondary" />
              Refined Lesson Notes
            </CardTitle>
            <CardDescription>
              AI-generated structured lesson material from your transcription
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm text-foreground font-mono leading-relaxed">
                {refinedNotes}
              </pre>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => navigator.clipboard.writeText(refinedNotes)}
              >
                Copy Notes
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  const blob = new Blob([refinedNotes], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'lesson_notes.md';
                  a.click();
                }}
              >
                <FileText className="w-4 h-4" />
                Download Notes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}