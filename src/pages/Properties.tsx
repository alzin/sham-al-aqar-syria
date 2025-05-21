
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard, { PropertyData } from "@/components/PropertyCard";
import { dummyProperties } from "@/data/properties";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const Properties = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Filter states
  const [filteredProperties, setFilteredProperties] = useState<PropertyData[]>([]);
  const [filters, setFilters] = useState({
    keyword: queryParams.get("keyword") || "",
    type: queryParams.get("type") || "all",
    status: queryParams.get("status") || "all",
    city: queryParams.get("city") || "all",
    minPrice: 0,
    maxPrice: 300000000,
    bedrooms: "all"
  });
  
  // Load and filter properties
  useEffect(() => {
    // Apply filters
    let results = [...dummyProperties];
    
    // Keyword filter
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      results = results.filter(property => 
        property.title.toLowerCase().includes(keyword) || 
        property.location.toLowerCase().includes(keyword) ||
        property.city.toLowerCase().includes(keyword)
      );
    }
    
    // Type filter
    if (filters.type !== "all") {
      results = results.filter(property => property.type === filters.type);
    }
    
    // Status filter
    if (filters.status !== "all") {
      results = results.filter(property => property.status === filters.status);
    }
    
    // City filter
    if (filters.city !== "all") {
      results = results.filter(property => property.city.toLowerCase() === filters.city);
    }
    
    // Price range filter
    results = results.filter(property => 
      property.price >= filters.minPrice && property.price <= filters.maxPrice
    );
    
    // Bedrooms filter
    if (filters.bedrooms !== "all") {
      const bedroomsNum = parseInt(filters.bedrooms);
      results = results.filter(property => property.bedrooms >= bedroomsNum);
    }
    
    setFilteredProperties(results);
  }, [filters]);
  
  const handleFilterChange = (key: string, value: string | number | number[]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handlePriceRangeChange = (values: number[]) => {
    setFilters(prev => ({
      ...prev,
      minPrice: values[0],
      maxPrice: values[1]
    }));
  };
  
  const resetFilters = () => {
    setFilters({
      keyword: "",
      type: "all",
      status: "all",
      city: "all",
      minPrice: 0,
      maxPrice: 300000000,
      bedrooms: "all"
    });
  };
  
  return (
    <>
      <Header />
      
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">عقارات للبيع والإيجار</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-bold mb-6">تصفية النتائج</h2>
              
              {/* Keyword Search */}
              <div className="mb-6">
                <label className="block mb-2 font-medium">البحث بالكلمات</label>
                <div className="relative">
                  <Search className="absolute right-3 top-3 text-muted-foreground" size={18} />
                  <Input
                    className="input-search"
                    placeholder="موقع، منطقة..."
                    value={filters.keyword}
                    onChange={(e) => handleFilterChange("keyword", e.target.value)}
                  />
                </div>
              </div>
              
              {/* Property Type */}
              <div className="mb-6">
                <label className="block mb-2 font-medium">نوع العقار</label>
                <Select 
                  value={filters.type} 
                  onValueChange={(value) => handleFilterChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="كل الأنواع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">كل الأنواع</SelectItem>
                    <SelectItem value="apartment">شقة</SelectItem>
                    <SelectItem value="house">منزل</SelectItem>
                    <SelectItem value="villa">فيلا</SelectItem>
                    <SelectItem value="land">أرض</SelectItem>
                    <SelectItem value="commercial">تجاري</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Status */}
              <div className="mb-6">
                <label className="block mb-2 font-medium">حالة العقار</label>
                <Select 
                  value={filters.status} 
                  onValueChange={(value) => handleFilterChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="بيع وإيجار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">بيع وإيجار</SelectItem>
                    <SelectItem value="sale">للبيع</SelectItem>
                    <SelectItem value="rent">للإيجار</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* City */}
              <div className="mb-6">
                <label className="block mb-2 font-medium">المدينة</label>
                <Select 
                  value={filters.city} 
                  onValueChange={(value) => handleFilterChange("city", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="كل المدن" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">كل المدن</SelectItem>
                    <SelectItem value="دمشق">دمشق</SelectItem>
                    <SelectItem value="حلب">حلب</SelectItem>
                    <SelectItem value="حمص">حمص</SelectItem>
                    <SelectItem value="اللاذقية">اللاذقية</SelectItem>
                    <SelectItem value="طرطوس">طرطوس</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <label className="block mb-2 font-medium">نطاق السعر</label>
                <div className="py-4">
                  <Slider
                    defaultValue={[0, 300000000]}
                    max={300000000}
                    step={5000000}
                    value={[filters.minPrice, filters.maxPrice]}
                    onValueChange={handlePriceRangeChange}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span>{filters.minPrice.toLocaleString()} ل.س</span>
                  <span>{filters.maxPrice.toLocaleString()} ل.س</span>
                </div>
              </div>
              
              {/* Bedrooms */}
              <div className="mb-6">
                <label className="block mb-2 font-medium">غرف النوم</label>
                <Select 
                  value={filters.bedrooms} 
                  onValueChange={(value) => handleFilterChange("bedrooms", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="الكل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Reset Filters */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={resetFilters}
              >
                إعادة ضبط
              </Button>
            </div>
          </div>
          
          {/* Property Listings */}
          <div className="lg:col-span-3">
            <div className="bg-muted rounded-lg p-4 mb-6 flex justify-between items-center">
              <div>
                <span className="font-medium">
                  {filteredProperties.length} نتيجة
                </span>
              </div>
              <div>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="ترتيب حسب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">الأحدث</SelectItem>
                    <SelectItem value="price-asc">السعر: الأقل أولاً</SelectItem>
                    <SelectItem value="price-desc">السعر: الأعلى أولاً</SelectItem>
                    <SelectItem value="area-desc">المساحة: الأكبر أولاً</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg border text-center">
                <h3 className="text-xl font-medium mb-2">لم يتم العثور على نتائج</h3>
                <p className="text-muted-foreground mb-4">
                  لم نتمكن من إيجاد عقارات تطابق معايير البحث الخاصة بك
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  إعادة ضبط المعايير
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Properties;
