
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Heart, 
  Share2,
  Phone,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyData } from "@/components/PropertyCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        console.log("Fetching property with ID:", id);
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error("Error fetching property details:", error);
          setLoading(false);
          return;
        }
        
        if (data) {
          console.log("Property data received:", data);
          console.log("Images array:", data.images);
          
          const propertyData: PropertyData = {
            id: data.id,
            title: data.title,
            price: data.price,
            priceUnit: data.currency,
            location: data.location,
            city: data.city,
            type: data.property_type,
            status: data.status,
            bedrooms: data.bedrooms || 0,
            bathrooms: data.bathrooms || 0,
            area: data.area,
            image: Array.isArray(data.images) && data.images.length > 0 ? data.images[0] : '/placeholder.svg',
            description: data.description || "",
            images: Array.isArray(data.images) ? [...data.images] : []
          };
          
          console.log("Processed property data:", propertyData);
          setProperty(propertyData);
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProperty();
    }
  }, [id]);
  
  const handleFavorite = () => {
    toast({
      title: "تمت الإضافة للمفضلة",
      description: "تم إضافة العقار إلى قائمة المفضلة بنجاح!",
    });
  };
  
  const handleShare = () => {
    // Copy link to clipboard
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        toast({
          title: "تم نسخ الرابط",
          description: "تم نسخ رابط العقار إلى الحافظة!",
        });
      });
  };
  
  // Handle not found or loading
  if (loading) {
    return (
      <>
        <Header />
        <div className="container py-16 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/4 mx-auto"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (!property) {
    return (
      <>
        <Header />
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">العقار غير موجود</h2>
          <p className="mb-6">عذراً، العقار الذي تبحث عنه غير موجود أو تم إزالته.</p>
          <Link to="/properties">
            <Button>العودة إلى قائمة العقارات</Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Header />
      
      <div className="container py-8">
        {/* Property header */}
        <div className="flex flex-wrap justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="ml-1" size={18} />
              <span>{property.location}، {property.city}</span>
            </div>
          </div>
          
          <div className="text-right mt-4 sm:mt-0">
            <div className="text-3xl font-bold text-estate-primary mb-2">
              {property.price.toLocaleString()} {property.priceUnit}
            </div>
            <div className="inline-block bg-estate-accent text-white py-1 px-3 rounded-full text-sm">
              {property.status === "sale" ? "للبيع" : "للإيجار"}
            </div>
          </div>
        </div>
        
        {/* Property gallery - replaced with carousel */}
        <div className="mb-8 relative">
          <Carousel className="w-full">
            <CarouselContent>
              {property.images && property.images.length > 0 ? (
                property.images.map((image, index) => {
                  console.log(`Rendering image ${index}:`, image);
                  return (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <img 
                          src={image} 
                          alt={`${property.title} - صورة ${index + 1}`}
                          className="w-full h-[500px] object-cover rounded-lg" 
                        />
                      </div>
                    </CarouselItem>
                  );
                })
              ) : (
                <CarouselItem>
                  <div className="p-1">
                    <img 
                      src="/placeholder.svg" 
                      alt={property.title}
                      className="w-full h-[500px] object-cover rounded-lg" 
                    />
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2" />
            <CarouselNext className="absolute right-4 top-1/2" />
          </Carousel>
        </div>
        
        {/* Actions bar */}
        <div className="flex justify-end space-x-4 space-x-reverse mb-8">
          <Button 
            variant="outline" 
            onClick={handleFavorite}
            className="flex items-center"
          >
            <Heart className="ml-2" size={18} />
            <span>أضف للمفضلة</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleShare}
            className="flex items-center"
          >
            <Share2 className="ml-2" size={18} />
            <span>مشاركة</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Property features */}
            <div className="bg-white rounded-lg border p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">المميزات الرئيسية</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <Bed className="mx-auto mb-2" size={24} />
                  <div className="font-medium">غرف النوم</div>
                  <div className="text-lg font-bold">{property.bedrooms}</div>
                </div>
                
                <div className="border rounded-lg p-4 text-center">
                  <Bath className="mx-auto mb-2" size={24} />
                  <div className="font-medium">الحمامات</div>
                  <div className="text-lg font-bold">{property.bathrooms}</div>
                </div>
                
                <div className="border rounded-lg p-4 text-center">
                  <Square className="mx-auto mb-2" size={24} />
                  <div className="font-medium">المساحة</div>
                  <div className="text-lg font-bold">{property.area} م²</div>
                </div>
                
                <div className="border rounded-lg p-4 text-center">
                  <Calendar className="mx-auto mb-2" size={24} />
                  <div className="font-medium">سنة البناء</div>
                  <div className="text-lg font-bold">2020</div>
                </div>
              </div>
            </div>
            
            {/* Property details tabs */}
            <div className="bg-white rounded-lg border overflow-hidden mb-8">
              <Tabs defaultValue="description">
                <TabsList className="flex w-full">
                  <TabsTrigger 
                    value="description" 
                    className="flex-1 rounded-none border-b"
                  >
                    الوصف
                  </TabsTrigger>
                  <TabsTrigger 
                    value="details" 
                    className="flex-1 rounded-none border-b"
                  >
                    التفاصيل
                  </TabsTrigger>
                  <TabsTrigger 
                    value="location" 
                    className="flex-1 rounded-none border-b"
                  >
                    الموقع
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="p-6">
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      {property.description || (property.type === 'apartment' ? 
                        'شقة فاخرة مجهزة بالكامل تتميز بإطلالات خلابة وموقع استراتيجي في قلب المدينة. الشقة مشمسة طوال اليوم وتتميز بتصميم عصري وتشطيبات راقية.' : 
                        'عقار مميز بموقع فريد، بُني باستخدام أفضل مواد البناء وبتصميم عصري يلبي احتياجات الأسرة العصرية. يتميز بمساحات واسعة ونوافذ كبيرة توفر إضاءة طبيعية ممتازة.')}
                    </p>
                    <p className="mb-4">
                      يقع العقار في منطقة هادئة وراقية، قريب من جميع الخدمات الأساسية مثل المدارس، المتاجر، المطاعم، والمواصلات العامة. كما أنه يوفر سهولة الوصول إلى الطرق الرئيسية في المدينة.
                    </p>
                    <p>
                      {property.type === 'apartment' ? 
                        'تتكون الشقة من صالة واسعة مع شرفة، مطبخ مجهز بالكامل، غرفة طعام، وحمامين. تشمل المميزات الإضافية نظام تدفئة مركزية، مصعد في البناية، وموقف سيارات خاص.' : 
                        'يتميز العقار بحديقة خاصة، مسبح، وموقف سيارات واسع. كما يضم غرفة معيشة كبيرة، مطبخ مجهز بأحدث التجهيزات، غرفة طعام منفصلة، ومساحات تخزين كافية.'}
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="p-6">
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <span className="font-medium">نوع العقار:</span>
                      <span className="mr-2">
                        {property.type === 'apartment' ? 'شقة' : 
                         property.type === 'house' ? 'منزل' :
                         property.type === 'villa' ? 'فيلا' :
                         property.type === 'land' ? 'أرض' : 'تجاري'}
                      </span>
                    </div>
                    
                    <div>
                      <span className="font-medium">الحالة:</span>
                      <span className="mr-2">
                        {property.status === 'sale' ? 'للبيع' : 'للإيجار'}
                      </span>
                    </div>
                    
                    <div>
                      <span className="font-medium">المساحة:</span>
                      <span className="mr-2">{property.area} م²</span>
                    </div>
                    
                    <div>
                      <span className="font-medium">سنة البناء:</span>
                      <span className="mr-2">2020</span>
                    </div>
                    
                    <div>
                      <span className="font-medium">عدد الطوابق:</span>
                      <span className="mr-2">1</span>
                    </div>
                    
                    <div>
                      <span className="font-medium">موقف سيارات:</span>
                      <span className="mr-2">نعم</span>
                    </div>
                    
                    <div>
                      <span className="font-medium">التدفئة:</span>
                      <span className="mr-2">مركزية</span>
                    </div>
                    
                    <div>
                      <span className="font-medium">التكييف:</span>
                      <span className="mr-2">سبليت</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="location" className="p-6">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">
                      سيتم هنا عرض خريطة الموقع عند الاتصال بخدمة الخرائط
                    </p>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">المرافق القريبة:</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• مدارس: على بعد 0.5 كم</li>
                      <li>• مراكز تسوق: على بعد 1 كم</li>
                      <li>• مستشفى: على بعد 2 كم</li>
                      <li>• محطة مواصلات: على بعد 0.3 كم</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Agent info */}
            <div className="bg-white rounded-lg border overflow-hidden mb-8">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mr-4">
                    <User className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">محمد العلي</h3>
                    <p className="text-muted-foreground">وكيل عقاري مرخص</p>
                  </div>
                </div>
                
                <a 
                  href="tel:+963123456789" 
                  className="flex items-center justify-center bg-estate-accent hover:bg-estate-accent/90 text-white py-3 px-4 rounded-lg mb-4"
                >
                  <Phone className="ml-2" size={18} />
                  <span>اتصل الآن: 123456789</span>
                </a>
                
                <Button className="w-full bg-estate-primary hover:bg-estate-primary/90 mb-4">
                  راسل الوكيل
                </Button>
              </div>
            </div>
            
            {/* Contact form */}
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="p-6">
                <h3 className="font-bold text-xl mb-4">استفسار عن العقار</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default PropertyDetail;
