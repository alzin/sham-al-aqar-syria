import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardContent, Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type PropertyType = Tables<"properties">;

const EditProperty = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [property, setProperty] = useState<{
    title: string;
    description: string;
    price: string;
    currency: string;
    property_type: string;
    status: string;
    bedrooms: string;
    bathrooms: string;
    area: string;
    city: string;
    location: string;
    images: string[];
  }>({
    title: "",
    description: "",
    price: "",
    currency: "SYP",
    property_type: "",
    status: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    city: "",
    location: "",
    images: [],
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setProperty({
            title: data.title,
            description: data.description || "",
            price: data.price.toString(),
            currency: data.currency,
            property_type: data.property_type,
            status: data.status,
            bedrooms: data.bedrooms?.toString() || "",
            bathrooms: data.bathrooms?.toString() || "",
            area: data.area.toString(),
            city: data.city,
            location: data.location,
            images: data.images || [],
          });
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء استرجاع بيانات العقار",
          variant: "destructive",
        });
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles(filesArray);
    }
  };

  const uploadImages = async (): Promise<string[]> => {
    if (imageFiles.length === 0) return property.images;

    setUploadingImages(true);
    setUploadProgress(0);

    try {
      const uploadPromises = imageFiles.map(async (file, index) => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from("property_images")
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        // Update progress
        setUploadProgress(((index + 1) / imageFiles.length) * 100);

        const { data: publicUrlData } = supabase.storage
          .from("property_images")
          .getPublicUrl(filePath);

        return publicUrlData.publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      return [...property.images, ...uploadedUrls];
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedImageUrls = property.images;

      if (imageFiles.length > 0) {
        updatedImageUrls = await uploadImages();
      }

      const { error } = await supabase
        .from("properties")
        .update({
          title: property.title,
          description: property.description,
          price: parseFloat(property.price),
          currency: property.currency,
          property_type: property.property_type,
          status: property.status,
          bedrooms: property.bedrooms ? parseInt(property.bedrooms) : null,
          bathrooms: property.bathrooms ? parseInt(property.bathrooms) : null,
          area: parseFloat(property.area),
          city: property.city,
          location: property.location,
          images: updatedImageUrls,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) {
        throw error;
      }

      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث معلومات العقار بنجاح",
      });

      navigate(`/property/${id}`);
    } catch (error) {
      console.error("Error updating property:", error);
      toast({
        title: "خطأ في التحديث",
        description: "حدث خطأ أثناء تحديث بيانات العقار",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">تعديل العقار</h1>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              {/* Basic Information */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">المعلومات الأساسية</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title">عنوان العقار</Label>
                    <Input
                      id="title"
                      name="title"
                      value={property.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">السعر</Label>
                    <div className="flex space-x-4 space-x-reverse">
                      <div className="flex-1">
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          value={property.price}
                          onChange={handleInputChange}
                          min="1"
                          required
                        />
                      </div>
                      <div className="w-24">
                        <Select
                          value={property.currency}
                          onValueChange={(value) => handleSelectChange("currency", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SYP">ل.س</SelectItem>
                            <SelectItem value="USD">$</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Type & Status */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">نوع وحالة العقار</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="property_type">نوع العقار</Label>
                    <Select
                      value={property.property_type}
                      onValueChange={(value) => handleSelectChange("property_type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع العقار" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">شقة</SelectItem>
                        <SelectItem value="house">منزل</SelectItem>
                        <SelectItem value="villa">فيلا</SelectItem>
                        <SelectItem value="land">أرض</SelectItem>
                        <SelectItem value="commercial">تجاري</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">حالة العقار</Label>
                    <Select
                      value={property.status}
                      onValueChange={(value) => handleSelectChange("status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر حالة العقار" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sale">للبيع</SelectItem>
                        <SelectItem value="rent">للإيجار</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Property Features */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">مميزات العقار</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="bedrooms">غرف النوم</Label>
                    <Input
                      id="bedrooms"
                      name="bedrooms"
                      type="number"
                      value={property.bedrooms}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">الحمامات</Label>
                    <Input
                      id="bathrooms"
                      name="bathrooms"
                      type="number"
                      value={property.bathrooms}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="area">المساحة (م²)</Label>
                    <Input
                      id="area"
                      name="area"
                      type="number"
                      value={property.area}
                      onChange={handleInputChange}
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">الموقع</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="city">المدينة</Label>
                    <Input
                      id="city"
                      name="city"
                      value={property.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">الحي / المنطقة</Label>
                    <Input
                      id="location"
                      name="location"
                      value={property.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <Label htmlFor="description">وصف العقار</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={property.description}
                  onChange={handleInputChange}
                  rows={6}
                />
              </div>

              {/* Images */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">صور العقار</h2>

                {/* Existing images */}
                {property.images && property.images.length > 0 && (
                  <div className="mb-4">
                    <p className="mb-2 font-medium">الصور الحالية:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {property.images.map((img, index) => (
                        <div key={index} className="relative aspect-square">
                          <img
                            src={img}
                            alt={`صورة العقار ${index + 1}`}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload new images */}
                <div className="mt-4">
                  <Label htmlFor="images">إضافة صور جديدة</Label>
                  <Input id="images" type="file" multiple onChange={handleImageChange} />
                  <p className="text-sm text-muted-foreground mt-1">
                    يمكنك تحديد عدة صور للرفع (الحد الأقصى 5 ميغابايت للصورة)
                  </p>
                </div>

                {uploadingImages && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-estate-primary h-2.5 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-center mt-1">{`${Math.round(uploadProgress)}%`}</p>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-4 mt-8">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  إلغاء
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default EditProperty;
