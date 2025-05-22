
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, UploadCloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AddProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    property_type: "",
    status: "",
    city: "",
    location: "",
  });

  // Redirect if not logged in
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPropertyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setPropertyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploadingImages(true);
    setUploadProgress(0);
    
    const uploadedUrls: string[] = [];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const filePath = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('property_images')
          .upload(filePath, file);
        
        if (error) throw error;
        
        if (data) {
          const { data: urlData } = supabase.storage
            .from('property_images')
            .getPublicUrl(filePath);
            
          uploadedUrls.push(urlData.publicUrl);
        }
        
        // Update progress
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      }
      
      setUploadedImages(prev => [...prev, ...uploadedUrls]);
      toast({
        title: "تم رفع الصور",
        description: `تم رفع ${uploadedUrls.length} صور بنجاح`,
      });
      
    } catch (error) {
      console.error("Error uploading images:", error);
      toast({
        title: "خطأ في رفع الصور",
        description: "حدث خطأ أثناء محاولة رفع الصور",
        variant: "destructive",
      });
    } finally {
      setUploadingImages(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (uploadedImages.length === 0) {
      toast({
        title: "لا توجد صور",
        description: "يرجى رفع صورة واحدة على الأقل للعقار",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from("properties")
        .insert({
          title: propertyData.title,
          description: propertyData.description,
          price: parseFloat(propertyData.price),
          area: parseFloat(propertyData.area),
          bedrooms: propertyData.bedrooms ? parseInt(propertyData.bedrooms) : null,
          bathrooms: propertyData.bathrooms ? parseInt(propertyData.bathrooms) : null,
          property_type: propertyData.property_type,
          status: propertyData.status,
          city: propertyData.city,
          location: propertyData.location,
          images: uploadedImages,
          user_id: user.id,
        })
        .select();
      
      if (error) throw error;
      
      toast({
        title: "تم إضافة العقار",
        description: "تم إضافة العقار بنجاح",
      });
      
      // Navigate to the property page or my properties
      navigate("/my-properties");
      
    } catch (error) {
      console.error("Error adding property:", error);
      toast({
        title: "خطأ في إضافة العقار",
        description: "حدث خطأ أثناء محاولة إضافة العقار",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      
      <div className="container py-16">
        <h1 className="text-3xl font-bold mb-8">إضافة عقار جديد</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>المعلومات الأساسية</CardTitle>
                  <CardDescription>أدخل المعلومات الأساسية للعقار</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">عنوان الإعلان*</Label>
                    <Input
                      id="title"
                      name="title"
                      value={propertyData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">وصف العقار</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={propertyData.description}
                      onChange={handleInputChange}
                      rows={5}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="property_type">نوع العقار*</Label>
                      <Select
                        value={propertyData.property_type}
                        onValueChange={(value) => handleSelectChange("property_type", value)}
                        required
                      >
                        <SelectTrigger id="property_type">
                          <SelectValue placeholder="اختر نوع العقار" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">شقة</SelectItem>
                          <SelectItem value="house">منزل</SelectItem>
                          <SelectItem value="villa">فيلا</SelectItem>
                          <SelectItem value="land">أرض</SelectItem>
                          <SelectItem value="commercial">عقار تجاري</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="status">الغرض*</Label>
                      <Select
                        value={propertyData.status}
                        onValueChange={(value) => handleSelectChange("status", value)}
                        required
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="اختر الغرض" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sale">للبيع</SelectItem>
                          <SelectItem value="rent">للإيجار</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>تفاصيل العقار</CardTitle>
                  <CardDescription>أدخل تفاصيل ومواصفات العقار</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">السعر*</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={propertyData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="area">المساحة (متر مربع)*</Label>
                      <Input
                        id="area"
                        name="area"
                        type="number"
                        value={propertyData.area}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">عدد غرف النوم</Label>
                      <Input
                        id="bedrooms"
                        name="bedrooms"
                        type="number"
                        value={propertyData.bedrooms}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">عدد الحمامات</Label>
                      <Input
                        id="bathrooms"
                        name="bathrooms"
                        type="number"
                        value={propertyData.bathrooms}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>الموقع</CardTitle>
                  <CardDescription>أدخل معلومات موقع العقار</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">المدينة*</Label>
                      <Select
                        value={propertyData.city}
                        onValueChange={(value) => handleSelectChange("city", value)}
                        required
                      >
                        <SelectTrigger id="city">
                          <SelectValue placeholder="اختر المدينة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="دمشق">دمشق</SelectItem>
                          <SelectItem value="حلب">حلب</SelectItem>
                          <SelectItem value="حمص">حمص</SelectItem>
                          <SelectItem value="اللاذقية">اللاذقية</SelectItem>
                          <SelectItem value="طرطوس">طرطوس</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">العنوان التفصيلي*</Label>
                      <Input
                        id="location"
                        name="location"
                        value={propertyData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>صور العقار*</CardTitle>
                  <CardDescription>قم برفع صور للعقار</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      اسحب وأفلت الصور هنا أو انقر للاختيار
                    </p>
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploadingImages}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      className="mt-4 w-full"
                      disabled={uploadingImages}
                      onClick={() => document.getElementById('images')?.click()}
                    >
                      {uploadingImages ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          جاري الرفع... {uploadProgress}%
                        </>
                      ) : (
                        "اختيار الصور"
                      )}
                    </Button>
                  </div>
                  
                  {uploadedImages.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">الصور المرفوعة:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {uploadedImages.map((url, index) => (
                          <div key={index} className="relative aspect-video rounded overflow-hidden">
                            <img
                              src={url}
                              alt={`Uploaded ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Button
                type="submit"
                className="w-full bg-estate-primary hover:bg-estate-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  "نشر الإعلان"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
      
      <Footer />
    </>
  );
};

export default AddProperty;
