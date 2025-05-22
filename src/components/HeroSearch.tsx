
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const HeroSearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    type: "all",
    status: "all",
    city: "all"
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const queryParams = new URLSearchParams();
    if (searchParams.keyword) queryParams.append("keyword", searchParams.keyword);
    if (searchParams.type !== "all") queryParams.append("type", searchParams.type);
    if (searchParams.status !== "all") queryParams.append("status", searchParams.status);
    if (searchParams.city !== "all") queryParams.append("city", searchParams.city);
    
    navigate(`/properties?${queryParams.toString()}`);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
          <Input
            type="text"
            placeholder="ابحث عن موقع، منطقة، أو اسم عقار..."
            className="input-search h-12 text-foreground placeholder:text-muted-foreground"
            value={searchParams.keyword}
            onChange={(e) => setSearchParams({...searchParams, keyword: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select 
            value={searchParams.type} 
            onValueChange={(value) => setSearchParams({...searchParams, type: value})}
          >
            <SelectTrigger className="text-foreground justify-end">
              <SelectValue placeholder="نوع العقار" className="text-foreground" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="all">كل الأنواع</SelectItem>
              <SelectItem value="apartment">شقة</SelectItem>
              <SelectItem value="house">منزل</SelectItem>
              <SelectItem value="villa">فيلا</SelectItem>
              <SelectItem value="land">أرض</SelectItem>
              <SelectItem value="commercial">تجاري</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={searchParams.status} 
            onValueChange={(value) => setSearchParams({...searchParams, status: value})}
          >
            <SelectTrigger className="text-foreground justify-end">
              <SelectValue placeholder="حالة العقار" className="text-foreground" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="all">بيع وإيجار</SelectItem>
              <SelectItem value="sale">للبيع</SelectItem>
              <SelectItem value="rent">للإيجار</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={searchParams.city} 
            onValueChange={(value) => setSearchParams({...searchParams, city: value})}
          >
            <SelectTrigger className="text-foreground justify-end">
              <SelectValue placeholder="المدينة" className="text-foreground" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="all">كل المدن</SelectItem>
              <SelectItem value="damascus">دمشق</SelectItem>
              <SelectItem value="aleppo">حلب</SelectItem>
              <SelectItem value="homs">حمص</SelectItem>
              <SelectItem value="latakia">اللاذقية</SelectItem>
              <SelectItem value="tartus">طرطوس</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-estate-primary hover:bg-estate-primary/90 h-12 text-lg"
        >
          بحث
        </Button>
      </form>
    </div>
  );
};

export default HeroSearch;
