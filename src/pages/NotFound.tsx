
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Header />
      
      <div className="container py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-7xl font-bold mb-4 text-estate-primary">404</h1>
          <h2 className="text-2xl font-semibold mb-6">الصفحة غير موجودة</h2>
          <p className="text-muted-foreground mb-8">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها إلى عنوان آخر.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/">
              <Button className="bg-estate-primary hover:bg-estate-primary/90">
                العودة للصفحة الرئيسية
              </Button>
            </Link>
            
            <Link to="/properties">
              <Button variant="outline">
                تصفح العقارات
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default NotFound;
