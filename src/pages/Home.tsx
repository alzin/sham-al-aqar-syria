
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSearch from "@/components/HeroSearch";
import FeaturedProperties from "@/components/FeaturedProperties";
import Features from "@/components/Features";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Welcome toast on first visit
    if (!localStorage.getItem('visited')) {
      toast({
        title: "أهلاً بك في عقاري",
        description: "أول موقع عقاري متكامل في سوريا",
      });
      localStorage.setItem('visited', 'true');
    }
  }, [toast]);
  
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-estate-primary to-estate-accent py-24 text-white">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              ابحث عن منزل أحلامك في سوريا
            </h1>
            <p className="text-xl opacity-90">
              أول موقع عقاري متكامل لبيع وشراء وتأجير العقارات في مختلف المناطق السورية
            </p>
          </div>
          
          <HeroSearch />
        </div>
        
        {/* Overlay pattern */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </section>
      
      {/* Featured Properties Section */}
      <FeaturedProperties />
      
      {/* Features Section */}
      <Features />
      
      {/* Call to Action */}
      <section className="bg-estate-primary text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">هل تملك عقار وترغب ببيعه أو تأجيره؟</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            انضم إلينا الآن وسوّق عقارك مع أكبر منصة عقارية في سوريا. نساعدك على الوصول إلى آلاف المشترين والمستأجرين المحتملين.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="bg-white text-estate-primary hover:bg-white/90">
                سجّل الآن
              </Button>
            </Link>
            <Link to="/add-property">
              <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/20">
                أضف عقارك
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">تواصل معنا</h2>
              <p className="text-lg text-muted-foreground mb-6">
                نحن هنا للإجابة على جميع استفساراتك ومساعدتك في رحلتك العقارية
              </p>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">مقرنا الرئيسي</h3>
                <p>دمشق، سوريا - شارع بغداد، بناء العقاري، الطابق 3</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">معلومات الاتصال</h3>
                <p className="mb-2">البريد الإلكتروني: info@aqari.sy</p>
                <p className="mb-2">الهاتف: 9631123456+</p>
                <p>الجوال: 963987654321+</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">ساعات العمل</h3>
                <p className="mb-2">الأحد - الخميس: 9 صباحاً - 5 مساءً</p>
                <p>الجمعة - السبت: 10 صباحاً - 2 ظهراً</p>
              </div>
            </div>
            
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Home;
