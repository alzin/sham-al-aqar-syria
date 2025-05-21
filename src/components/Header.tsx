
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white py-4">
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-estate-primary">
          عقاري
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6 space-x-reverse">
            <li>
              <Link 
                to="/" 
                className="text-lg font-medium text-foreground hover:text-estate-primary"
              >
                الرئيسية
              </Link>
            </li>
            <li>
              <Link 
                to="/properties" 
                className="text-lg font-medium text-foreground hover:text-estate-primary"
              >
                العقارات
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="text-lg font-medium text-foreground hover:text-estate-primary"
              >
                من نحن
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="text-lg font-medium text-foreground hover:text-estate-primary"
              >
                اتصل بنا
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4 space-x-reverse">
          <Link to="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="flex items-center">
              <User className="h-5 w-5 ml-2" />
              <span>تسجيل الدخول</span>
            </Button>
          </Link>
          <Link to="/add-property">
            <Button className="bg-estate-primary hover:bg-estate-primary/90">
              إضافة عقار
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-3/4">
            <nav className="flex flex-col space-y-6 mt-10">
              <Link 
                to="/" 
                className="text-xl font-medium hover:text-estate-primary"
              >
                الرئيسية
              </Link>
              <Link 
                to="/properties" 
                className="text-xl font-medium hover:text-estate-primary"
              >
                العقارات
              </Link>
              <Link 
                to="/about" 
                className="text-xl font-medium hover:text-estate-primary"
              >
                من نحن
              </Link>
              <Link 
                to="/contact" 
                className="text-xl font-medium hover:text-estate-primary"
              >
                اتصل بنا
              </Link>
              <div className="pt-6 border-t">
                <Link to="/login">
                  <Button className="w-full bg-estate-primary hover:bg-estate-primary/90 mb-4">
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link to="/add-property">
                  <Button className="w-full bg-estate-secondary text-estate-dark hover:bg-estate-secondary/90">
                    إضافة عقار
                  </Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
