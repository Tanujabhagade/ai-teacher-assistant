import { 
  BookOpen, 
  BrainCircuit, 
  History, 
  Home, 
  Mic, 
  Paintbrush2, 
  Settings, 
  FileText,
  HelpCircle 
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainMenuItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: Home,
    description: "Overview & quick access"
  },
  { 
    title: "Create Quiz", 
    url: "/quiz", 
    icon: BrainCircuit,
    description: "Generate MCQ quizzes"
  },
  { 
    title: "Create Lesson", 
    url: "/lesson", 
    icon: FileText,
    description: "AI lesson plans"
  },
  { 
    title: "Voice Notes", 
    url: "/voice", 
    icon: Mic,
    description: "Record & transcribe"
  },
  { 
    title: "Generate Visuals", 
    url: "/visuals", 
    icon: Paintbrush2,
    description: "Create diagrams"
  },
];

const utilityItems = [
  { 
    title: "History", 
    url: "/history", 
    icon: History,
    description: "View saved content"
  },
  { 
    title: "Student Support", 
    url: "/support", 
    icon: HelpCircle,
    description: "Q&A assistance"
  },
  { 
    title: "Settings", 
    url: "/settings", 
    icon: Settings,
    description: "API keys & preferences"
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) => {
    const active = isActive(path);
    return active 
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
      : "text-muted-foreground hover:bg-muted hover:text-foreground";
  };

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-border shadow-soft">
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold text-primary">ShikshaSaarthi</h2>
                <p className="text-xs text-muted-foreground">AI Teaching Assistant</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>AI Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.description}>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Utilities</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {utilityItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.description}>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}