
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PropertyItem {
  id: string;
  title: string;
  price: number;
  currency: string;
  city: string;
  status: string;
  images: string[];
  created_at: string;
}

const MyProperties = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState<PropertyItem[]>([]);

  useEffect(() => {
    // Redirect if not authenticated
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }

    // Load properties if user is authenticated
    if (user) {
      fetchProperties();
    }
  }, [user, authLoading]);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("id, title, price, currency, city, status, images, created_at")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setProperties(data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "حدث خطأ أثناء جلب العقارات الخاصة بك",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من رغبتك في حذف هذا العقار؟")) {
      try {
        const { error } = await supabase
          .from("properties")
          .delete()
          .eq("id", id);

        if (error) {
          throw error;
        }

        // Remove from local state
        setProperties((prev) => prev.filter((prop) => prop.id !== id));

        toast({
          title: "تم الحذف",
          description: "تم حذف العقار بنجاح",
        });
      } catch (error) {
        console.error("Error deleting property:", error);
        toast({
          title: "خطأ في الحذف",
          description: "حدث خطأ أثناء محاولة حذف العقار",
          variant: "destructive",
        });
      }
    }
  };

  const getStatusLabel = (status: string) => {
    if (status === "sale") return "للبيع";
    if (status === "rent") return "للإيجار";
    return status;
  };

  if (authLoading) {
    return (
      <>
        <Header />
        <div className="container py-16 flex justify-center items-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <div className="container py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">عقاراتي</h1>
          <Button
            className="bg-estate-primary hover:bg-estate-primary/90"
            onClick={() => navigate("/add-property")}
          >
            <Plus className="ml-2 h-4 w-4" /> إضافة عقار جديد
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  {property.images && property.images.length > 0 ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      لا توجد صورة
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-estate-secondary text-estate-dark px-3 py-1 rounded-full text-sm font-semibold">
                    {getStatusLabel(property.status)}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{property.title}</CardTitle>
                  <CardDescription>{property.city}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold">
                    {property.price.toLocaleString()} {property.currency}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/edit-property/${property.id}`)}
                  >
                    <Pencil className="ml-1 h-4 w-4" /> تعديل
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(property.id)}
                  >
                    <Trash2 className="ml-1 h-4 w-4" /> حذف
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg border text-center">
            <h3 className="text-xl font-medium mb-4">لم تقم بإضافة أي عقارات بعد</h3>
            <p className="text-muted-foreground mb-6">
              أضف عقارك الأول ليظهر هنا
            </p>
            <Button
              className="bg-estate-primary hover:bg-estate-primary/90"
              onClick={() => navigate("/add-property")}
            >
              <Plus className="ml-2 h-4 w-4" /> إضافة عقار جديد
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
};

export default MyProperties;
