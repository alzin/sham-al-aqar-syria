
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PropertyCard, { PropertyData } from "./PropertyCard";
import { dummyProperties } from "@/data/properties";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<PropertyData[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we're using dummy data
    const featured = dummyProperties.filter(property => property.featured);
    setProperties(featured);
  }, []);
  
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-2">عقارات مميزة</h2>
          <p className="text-lg text-muted-foreground">اكتشف أفضل العروض المتاحة حالياً</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              featured={true} 
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/properties">
            <Button size="lg" className="bg-estate-primary hover:bg-estate-primary/90">
              عرض جميع العقارات
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
