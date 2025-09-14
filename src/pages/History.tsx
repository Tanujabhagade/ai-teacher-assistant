import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  History as HistoryIcon, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2,
  BrainCircuit, 
  FileText, 
  Mic, 
  Paintbrush2,
  Calendar,
  Clock
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HistoryItem {
  id: string;
  title: string;
  type: "quiz" | "lesson" | "voice" | "visual";
  subject: string;
  grade: string;
  createdAt: Date;
  size: string;
  status: "completed" | "draft";
}

const mockHistory: HistoryItem[] = [
  {
    id: "1",
    title: "Mathematics Quiz - Algebra Basics",
    type: "quiz",
    subject: "Mathematics",
    grade: "Grade 10",
    createdAt: new Date("2024-01-15T10:30:00"),
    size: "10 questions",
    status: "completed"
  },
  {
    id: "2",
    title: "Photosynthesis Lesson Plan",
    type: "lesson",
    subject: "Biology",
    grade: "Grade 8",
    createdAt: new Date("2024-01-14T14:20:00"),
    size: "45 minutes",
    status: "completed"
  },
  {
    id: "3",
    title: "Water Cycle Voice Notes",
    type: "voice",
    subject: "Science",
    grade: "Grade 6",
    createdAt: new Date("2024-01-13T09:15:00"),
    size: "2.3 MB",
    status: "completed"
  },
  {
    id: "4",
    title: "Solar System Diagram",
    type: "visual",
    subject: "Astronomy",
    grade: "Grade 5",
    createdAt: new Date("2024-01-12T16:45:00"),
    size: "1024x768",
    status: "completed"
  },
  {
    id: "5",
    title: "Chemistry Quiz - Periodic Table",
    type: "quiz",
    subject: "Chemistry",
    grade: "Grade 11",
    createdAt: new Date("2024-01-11T11:00:00"),
    size: "15 questions",
    status: "draft"
  }
];

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const getTypeIcon = (type: string) => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case "quiz": return <BrainCircuit className={iconClass} />;
      case "lesson": return <FileText className={iconClass} />;
      case "voice": return <Mic className={iconClass} />;
      case "visual": return <Paintbrush2 className={iconClass} />;
      default: return <FileText className={iconClass} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "quiz": return "bg-primary/10 text-primary border-primary/20";
      case "lesson": return "bg-secondary/10 text-secondary border-secondary/20";
      case "voice": return "bg-accent/10 text-accent border-accent/20";
      case "visual": return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredHistory = mockHistory.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.grade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center">
          <HistoryIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">History</h1>
          <p className="text-muted-foreground">View and manage your generated content</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-soft">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Filter & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="quiz">Quizzes</SelectItem>
                <SelectItem value="lesson">Lesson Plans</SelectItem>
                <SelectItem value="voice">Voice Notes</SelectItem>
                <SelectItem value="visual">Visuals</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Generated Content</CardTitle>
              <CardDescription>
                {filteredHistory.length} items found
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-sm">
              Total: {mockHistory.length} items
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <HistoryIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No content found matching your filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-shadow duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg border ${getTypeColor(item.type)}`}>
                      {getTypeIcon(item.type)}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-foreground">{item.title}</h3>
                        <Badge 
                          variant={item.status === "completed" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {item.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.createdAt.toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span>{item.subject} • {item.grade}</span>
                        <span className="text-accent">{item.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Quizzes Created", value: mockHistory.filter(item => item.type === "quiz").length, icon: BrainCircuit, color: "text-primary" },
          { label: "Lesson Plans", value: mockHistory.filter(item => item.type === "lesson").length, icon: FileText, color: "text-secondary" },
          { label: "Voice Transcripts", value: mockHistory.filter(item => item.type === "voice").length, icon: Mic, color: "text-accent" },
          { label: "Visual Content", value: mockHistory.filter(item => item.type === "visual").length, icon: Paintbrush2, color: "text-purple-600" }
        ].map((stat, index) => (
          <Card key={index} className="shadow-soft text-center">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-2">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}