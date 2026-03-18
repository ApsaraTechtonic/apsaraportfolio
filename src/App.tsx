import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import EducationPage from "./pages/EducationPage";
import WorkPage from "./pages/WorkPage";
import InterestsPage from "./pages/InterestsPage";
import GamePage from "./pages/GamePage";
import ContactPage from "./pages/ContactPage";
import CrowdFundingPage from "./pages/CrowdFundingPage";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./contexts/ThemeContext";
import CustomCursor from "./components/CustomCursor";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CustomCursor />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/interests" element={<InterestsPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/crowd-funding" element={<CrowdFundingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
