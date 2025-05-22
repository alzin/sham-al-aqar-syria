
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useEffect } from "react";
import { supabase } from "./integrations/supabase/client";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import MyProperties from "./pages/MyProperties";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";

const queryClient = new QueryClient();

const App = () => {
  // Create the necessary storage bucket on app initialization if it doesn't exist
  useEffect(() => {
    const createStorageBucket = async () => {
      try {
        // Check if the storage bucket exists by attempting to get its public URL
        const { data: bucketData } = await supabase.storage.getBucket('property_images');
        
        if (!bucketData) {
          // Bucket doesn't exist, create it
          const { error } = await supabase.storage.createBucket('property_images', {
            public: true, // Make the bucket public so we can access the images without authentication
            fileSizeLimit: 10485760, // 10MB limit
          });
          
          if (error) {
            console.error("Error creating storage bucket:", error);
          } else {
            console.log("Created property_images storage bucket");
          }
        }
      } catch (error) {
        console.error("Error checking/creating storage bucket:", error);
      }
    };
    
    createStorageBucket();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-properties" element={<MyProperties />} />
              <Route path="/add-property" element={<AddProperty />} />
              <Route path="/edit-property/:id" element={<EditProperty />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
