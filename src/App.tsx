import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Photography from "./pages/Photography";
import Workshop from "./pages/Workshop";
import Blog from "./pages/Blog";
import TTRPG from "./pages/TTRPG";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/photography" element={<Photography />} />
                <Route path="/workshop" element={<Workshop />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/ttrpg" element={<TTRPG />} />
                <Route path="/legal/:section?" element={<Legal />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
