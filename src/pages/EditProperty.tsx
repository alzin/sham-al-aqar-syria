
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const EditProperty = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
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
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Load property data
    fetchPropertyData();
  }, [user, id]);

  const fetchPropertyData = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        toast({
          title: "عقار غير موجود",
          description: "لم يتم العثور على العقار المطلوب",
          variant: "destructive",
        });
        navigate("/my-properties");
        return;
      }

      // Check if the current user owns this property
      if (data.user_id !== user?.id) {
        toast({
          title: "غير مصرح",
          description: "لا يمكنك تعديل عقار لا تملكه",
          variant: "destructive",
        });
        navigate("/my-properties");
        return;
      }

      // Format the data for the form
      setPropertyData({
        title: data.title || "",
        description: data.description || "",
        price: data.price.toString() || "",
        area: data.area.toString() || "",
        bedrooms: data.bedrooms ? data.bedrooms.toString() : "",
        bathrooms: data.bathrooms ? data.bathrooms.toString() : "",
        property_type: data.property_type || "",
        status: data.status || "",
        city: data.city || "",
        location: data.location || "",
      });

      // Set the uploaded images
      setUploadedImages(data.images || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching property data:", error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "حدث خطأ أثناء محاولة جلب بيانات العقار",
        variant: "destructive",
      });
      navigate("/my-properties");
    }
  };

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
        const filePath = `${user?.id}/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        
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
      const { error } = await supabase
        .from("properties")
        .update({
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
          updated_at: new Date(),
        })
        .eq("id", id);
      
      if (error) throw error;
      
      toast({
        title: "تم تعديل العقار",
        description: "تم تعديل العقار بنجاح",
      });
      
      // Navigate to the property page or my properties
      navigate("/my-properties");
      
    } catch (error) {
      console.error("Error updating property:", error);
      toast({
        title: "خطأ في تعديل العقار",
        description: "حدث خطأ أثناء محاولة تعديل العقار",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  if (isLoading) {
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
        <h1 className="text-3xl font-bold mb-8">تعديل العقار</h1>
        
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
                          <div key={index} className="relative aspect-video rounded overflow-hidden group">
                            <img
                              src={url}
                              alt={`Uploaded ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="h-8 w-8 rounded-full p-0"
                                onClick={() => removeImage(index)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                              </Button>
                            </div>
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
                    جاري الحفظ...
                  </>
                ) : (
                  "حفظ التغييرات"
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

export default EditProperty;
