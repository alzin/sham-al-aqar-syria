
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
  // Check if the storage bucket exists on app initialization
  useEffect(() => {
    const checkStorageBucket = async () => {
      try {
        console.log("Checking if property_images bucket exists...");
        // Check if the storage bucket exists by attempting to get its public URL
        const { data: bucketData, error: bucketError } = await supabase.storage.getBucket('property_images');
        
        if (bucketError) {
          console.log("Error checking bucket. The bucket might not exist or you may not have permission to access it.");
          console.log("This is normal if you're not authenticated or if the bucket hasn't been created yet.");
          console.log("The bucket will be created automatically when you upload the first property image.");
          
          // Note: We won't try to create the bucket here since that requires admin privileges
          // The bucket should already be created on the Supabase side by an authenticated admin
        } else {
          console.log("property_images bucket already exists");
        }
      } catch (error) {
        console.error("Error checking storage bucket:", error);
      }
    };
    
    checkStorageBucket();
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
