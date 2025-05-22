
// This file contains mock data for properties
// After implementation with Supabase, this file will be used as fallback for demo purposes

export interface PropertyMockData {
  id: string;
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
  images?: string[];
}

export const propertiesData: PropertyMockData[] = [
  {
    id: "1",
    title: "فيلا فاخرة مع حديقة",
    price: 1200000,
    priceUnit: "SYP",
    location: "الشيخ ضاهر",
    city: "اللاذقية",
    type: "villa",
    status: "sale",
    bedrooms: 5,
    bathrooms: 3,
    area: 350,
    image: "/assets/properties/villa1.jpg",
    featured: true,
    images: ["/assets/properties/villa1.jpg", "/assets/properties/villa1-2.jpg", "/assets/properties/villa1-3.jpg"]
  },
  {
    id: "2",
    title: "شقة حديثة وسط المدينة",
    price: 45000,
    priceUnit: "SYP",
    location: "شارع بغداد",
    city: "دمشق",
    type: "apartment",
    status: "rent",
    bedrooms: 2,
    bathrooms: 1,
    area: 120,
    image: "/assets/properties/apartment1.jpg"
  },
  {
    id: "3",
    title: "منزل تقليدي مرمم",
    price: 850000,
    priceUnit: "SYP",
    location: "الجميلية",
    city: "حلب",
    type: "house",
    status: "sale",
    bedrooms: 4,
    bathrooms: 2,
    area: 220,
    image: "/assets/properties/house1.jpg",
    featured: true,
    images: ["/assets/properties/house1.jpg", "/assets/properties/house1-2.jpg"]
  },
  {
    id: "4",
    title: "أرض استثمارية للبيع",
    price: 1500000,
    priceUnit: "SYP",
    location: "طريق المطار",
    city: "دمشق",
    type: "land",
    status: "sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 1200,
    image: "/assets/properties/land1.jpg"
  },
  {
    id: "5",
    title: "شقة مفروشة للإيجار",
    price: 55000,
    priceUnit: "SYP",
    location: "شارع الثورة",
    city: "دمشق",
    type: "apartment",
    status: "rent",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    image: "/assets/properties/apartment2.jpg",
    featured: true,
    images: ["/assets/properties/apartment2.jpg", "/assets/properties/apartment2-2.jpg"]
  },
  {
    id: "6",
    title: "مكتب تجاري وسط المدينة",
    price: 70000,
    priceUnit: "SYP",
    location: "شارع الفردوس",
    city: "حمص",
    type: "commercial",
    status: "rent",
    bedrooms: 0,
    bathrooms: 1,
    area: 80,
    image: "/assets/properties/office1.jpg"
  },
  {
    id: "7",
    title: "فيلا مع مسبح خاص",
    price: 1800000,
    priceUnit: "SYP",
    location: "الزبداني",
    city: "ريف دمشق",
    type: "villa",
    status: "sale",
    bedrooms: 6,
    bathrooms: 4,
    area: 450,
    image: "/assets/properties/villa2.jpg",
    featured: true,
    images: ["/assets/properties/villa2.jpg", "/assets/properties/villa2-2.jpg"]
  },
  {
    id: "8",
    title: "شقة قرب البحر",
    price: 60000,
    priceUnit: "SYP",
    location: "الكورنيش",
    city: "اللاذقية",
    type: "apartment",
    status: "rent",
    bedrooms: 2,
    bathrooms: 1,
    area: 100,
    image: "/assets/properties/apartment3.jpg"
  },
  {
    id: "9",
    title: "منزل ريفي مع إطلالة",
    price: 750000,
    priceUnit: "SYP",
    location: "بلودان",
    city: "ريف دمشق",
    type: "house",
    status: "sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    image: "/assets/properties/house2.jpg"
  },
  {
    id: "10",
    title: "شقة فاخرة جديدة",
    price: 980000,
    priceUnit: "SYP",
    location: "المزة",
    city: "دمشق",
    type: "apartment",
    status: "sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    id: "11",
    title: "فيلا مطلة على البحر",
    price: 2500000,
    priceUnit: "SYP",
    location: "بانياس",
    city: "طرطوس",
    type: "villa",
    status: "sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 400,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  }
];
