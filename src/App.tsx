import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import LocationPage from "./pages/LocationPage.tsx";
import PestPage from "./pages/PestPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/:slug" element={<LocationPageOrPest />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

/* Single dynamic route that checks both location and pest data */
import { locations } from "./data/locations";
import { pests } from "./data/pests";
import { useParams } from "react-router-dom";

const LocationPageOrPest = () => {
  const { slug } = useParams<{ slug: string }>();
  const isLocation = locations.some((l) => l.slug === slug);
  const isPest = pests.some((p) => p.slug === slug);

  if (isLocation) return <LocationPage />;
  if (isPest) return <PestPage />;
  return <NotFound />;
};

export default App;
