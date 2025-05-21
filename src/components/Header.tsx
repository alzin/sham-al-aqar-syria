
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

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
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <User className="h-5 w-5 ml-2" />
                  <span>حسابي</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full cursor-pointer">
                    الملف الشخصي
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-properties" className="w-full cursor-pointer">
                    عقاراتي
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/favorites" className="w-full cursor-pointer">
                    المفضلة
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="h-4 w-4 ml-2" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="flex items-center">
                <User className="h-5 w-5 ml-2" />
                <span>تسجيل الدخول</span>
              </Button>
            </Link>
          )}
          
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
                {user ? (
                  <>
                    <Link to="/profile">
                      <Button className="w-full bg-estate-primary hover:bg-estate-primary/90 mb-4">
                        الملف الشخصي
                      </Button>
                    </Link>
                    <Link to="/my-properties">
                      <Button className="w-full bg-estate-secondary text-estate-dark hover:bg-estate-secondary/90 mb-4">
                        عقاراتي
                      </Button>
                    </Link>
                    <Button 
                      onClick={handleSignOut} 
                      variant="outline" 
                      className="w-full mb-4"
                    >
                      <LogOut className="h-4 w-4 ml-2" />
                      تسجيل الخروج
                    </Button>
                  </>
                ) : (
                  <Link to="/login">
                    <Button className="w-full bg-estate-primary hover:bg-estate-primary/90 mb-4">
                      تسجيل الدخول
                    </Button>
                  </Link>
                )}
                
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
