import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SkipToContent } from "@/components/SkipToContent";
import Index from "./pages/Index";
import Photography from "./pages/Photography";
import Workshop from "./pages/Workshop";
import Blog from "./pages/Blog";
import TTRPG from "./pages/TTRPG";
import Legal from "./pages/Legal";
import SocialNetworks from "./pages/SocialNetworks";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <TooltipProvider>
              <Toaster />
              <Sonner />
              <LanguageProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <SkipToContent />
                  <div className="min-h-screen bg-background flex flex-col">
                    <Header />
                    <main id="main-content" className="flex-grow" tabIndex={-1}>
                      <ErrorBoundary>
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/photography" element={<Photography />} />
                          <Route path="/workshop" element={<Workshop />} />
                          <Route path="/blog" element={<Blog />} />
                          <Route path="/ttrpg" element={<TTRPG />} />
                          <Route path="/legal/:section?" element={<Legal />} />
                          <Route path="/social" element={<SocialNetworks />} />
                          <Route path="/auth" element={<Auth />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </ErrorBoundary>
                    </main>
                    <Footer />
                  </div>
                </BrowserRouter>
              </LanguageProvider>
              </TooltipProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
