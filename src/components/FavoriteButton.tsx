
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FavoriteButtonProps {
  propertyId: string;
}

const FavoriteButton = ({ propertyId }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      checkIfFavorite();
    }
  }, [user, propertyId]);

  const checkIfFavorite = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("property_id", propertyId)
        .maybeSingle();
      
      if (error) throw error;
      setIsFavorite(!!data);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      toast({
        title: "تسجيل الدخول مطلوب",
        description: "يرجى تسجيل الدخول لإضافة العقار إلى المفضلة",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("property_id", propertyId);
          
        if (error) throw error;
        
        setIsFavorite(false);
        toast({
          title: "تمت الإزالة",
          description: "تمت إزالة العقار من المفضلة",
        });
      } else {
        // Add to favorites
        const { error } = await supabase
          .from("favorites")
          .insert({
            user_id: user.id,
            property_id: propertyId,
          });
          
        if (error) throw error;
        
        setIsFavorite(true);
        toast({
          title: "تمت الإضافة",
          description: "تمت إضافة العقار إلى المفضلة",
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ أثناء محاولة تحديث المفضلة",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`rounded-full ${isFavorite ? "text-red-500 hover:text-red-600" : ""}`}
      onClick={toggleFavorite}
      disabled={isLoading}
    >
      <Heart
        className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
      />
    </Button>
  );
};

export default FavoriteButton;
