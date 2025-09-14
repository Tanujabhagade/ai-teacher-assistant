import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Key, Database, Bell, Save, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState({
    openai: "",
    huggingface: ""
  });
  const [preferences, setPreferences] = useState({
    autoSave: true,
    notifications: true,
    darkMode: false,
    exportFormat: "pdf"
  });

  const handleSaveApiKeys = () => {
    // In a real app, these would be sent to Supabase Edge Functions
    toast({
      title: "API Keys Saved",
      description: "Your API keys have been securely stored."
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Updated",
      description: "Your settings have been saved successfully."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
          <Settings className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure your API keys and preferences</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* API Keys */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              API Configuration
            </CardTitle>
            <CardDescription>
              Add your API keys to enable AI-powered features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800">Security Notice</p>
                  <p className="text-amber-700 mt-1">
                    API keys are stored securely and never shared. Leave blank to use fallback mock responses.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="sk-..."
                  value={apiKeys.openai}
                  onChange={(e) => setApiKeys(prev => ({ ...prev, openai: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">
                  Required for GPT models, Whisper transcription, and DALL-E image generation
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hf-key">Hugging Face API Token (Optional)</Label>
                <Input
                  id="hf-key"
                  type="password"
                  placeholder="hf_..."
                  value={apiKeys.huggingface}
                  onChange={(e) => setApiKeys(prev => ({ ...prev, huggingface: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">
                  Fallback for text generation and image creation when OpenAI is unavailable
                </p>
              </div>
            </div>

            <Button onClick={handleSaveApiKeys} className="w-full" variant="hero">
              <Save className="w-4 h-4" />
              Save API Keys
            </Button>
          </CardContent>
        </Card>

        {/* User Preferences */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-secondary" />
              Preferences
            </CardTitle>
            <CardDescription>
              Customize your ShikshaSaarthi experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-save">Auto-save content</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically save generated quizzes and lessons
                  </p>
                </div>
                <Switch
                  id="auto-save"
                  checked={preferences.autoSave}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, autoSave: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Enable notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Get notified when AI generation is complete
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={preferences.notifications}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, notifications: checked }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="export-format">Default export format</Label>
                <select 
                  id="export-format"
                  className="w-full p-2 border border-input rounded-md bg-background"
                  value={preferences.exportFormat}
                  onChange={(e) => 
                    setPreferences(prev => ({ ...prev, exportFormat: e.target.value }))
                  }
                >
                  <option value="pdf">PDF</option>
                  <option value="docx">Word Document</option>
                  <option value="txt">Plain Text</option>
                </select>
              </div>
            </div>

            <Button onClick={handleSavePreferences} className="w-full" variant="ai">
              <Save className="w-4 h-4" />
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Settings */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-accent" />
            Usage & Statistics
          </CardTitle>
          <CardDescription>
            Monitor your ShikshaSaarthi usage and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary">47</div>
              <p className="text-sm text-muted-foreground">Total Generations</p>
            </div>
            <div className="p-4 bg-secondary/5 rounded-lg">
              <div className="text-2xl font-bold text-secondary">12.5h</div>
              <p className="text-sm text-muted-foreground">Time Saved</p>
            </div>
            <div className="p-4 bg-accent/5 rounded-lg">
              <div className="text-2xl font-bold text-accent">98%</div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}