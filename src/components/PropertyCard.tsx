
import { Link } from "react-router-dom";
import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface PropertyData {
  id: string | number;
  title: string;
  price: number;
  priceUnit: string;
  location: string;
  city: string;
  type: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  featured?: boolean;
}

interface PropertyCardProps {
  property: PropertyData;
  featured?: boolean;
}

const PropertyCard = ({ property, featured = false }: PropertyCardProps) => {
  const statusColor = property.status === "sale" ? "bg-estate-accent" : "bg-estate-secondary";
  
  return (
    <Card className={`property-card h-full ${featured ? 'border-estate-primary border-2' : ''}`}>
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title} 
          className="h-48 w-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className={`${statusColor} text-white`}>
            {property.status === "sale" ? "للبيع" : "للإيجار"}
          </Badge>
        </div>
        {featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-estate-primary text-white">مميز</Badge>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-3 left-3 bg-white/80 hover:bg-white text-estate-primary rounded-full h-8 w-8"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{property.title}</h3>
          <div className="font-bold text-estate-primary text-lg">
            {property.price.toLocaleString()} {property.priceUnit}
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="ml-1" size={16} />
          <p className="line-clamp-1">{property.location}، {property.city}</p>
        </div>
        
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center">
            <Bed className="ml-1" size={16} />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="ml-1" size={16} />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Square className="ml-1" size={16} />
            <span>{property.area} م²</span>
          </div>
        </div>
        
        <div className="mt-4">
          <Link to={`/property/${property.id}`}>
            <Button className="w-full bg-estate-primary/10 text-estate-primary hover:bg-estate-primary/20">
              عرض التفاصيل
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
