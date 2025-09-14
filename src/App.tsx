import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Lesson from "./pages/Lesson";
import Voice from "./pages/Voice";
import Visuals from "./pages/Visuals";
import History from "./pages/History";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/quiz" element={<Layout><Quiz /></Layout>} />
          <Route path="/lesson" element={<Layout><Lesson /></Layout>} />
          <Route path="/voice" element={<Layout><Voice /></Layout>} />
          <Route path="/visuals" element={<Layout><Visuals /></Layout>} />
          <Route path="/history" element={<Layout><History /></Layout>} />
          <Route path="/support" element={<Layout><Support /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
