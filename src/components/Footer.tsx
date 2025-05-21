
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-estate-dark text-white pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Link to="/" className="text-2xl font-bold text-estate-secondary mb-4 block">
              عقاري
            </Link>
            <p className="text-gray-300 mb-6">
              الوجهة الأولى للعقارات في سوريا، نوفر خدمة متميزة للباحثين عن عقارات للبيع والإيجار.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <Link to="#" className="hover:text-estate-secondary">
                <Facebook size={20} />
              </Link>
              <Link to="#" className="hover:text-estate-secondary">
                <Instagram size={20} />
              </Link>
              <Link to="#" className="hover:text-estate-secondary">
                <Twitter size={20} />
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-estate-secondary">روابط سريعة</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-estate-secondary">الرئيسية</Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-estate-secondary">العقارات</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-estate-secondary">من نحن</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-estate-secondary">اتصل بنا</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-estate-secondary">الشروط والأحكام</Link>
              </li>
            </ul>
          </div>
          
          {/* Property Types */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-estate-secondary">أنواع العقارات</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/properties?type=apartment" className="hover:text-estate-secondary">شقق</Link>
              </li>
              <li>
                <Link to="/properties?type=house" className="hover:text-estate-secondary">منازل</Link>
              </li>
              <li>
                <Link to="/properties?type=villa" className="hover:text-estate-secondary">فلل</Link>
              </li>
              <li>
                <Link to="/properties?type=land" className="hover:text-estate-secondary">أراضي</Link>
              </li>
              <li>
                <Link to="/properties?type=commercial" className="hover:text-estate-secondary">عقارات تجارية</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-estate-secondary">معلومات الاتصال</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="ml-2 mt-1 text-estate-secondary" size={18} />
                <span>دمشق، سوريا</span>
              </li>
              <li className="flex items-center">
                <Phone className="ml-2 text-estate-secondary" size={18} />
                <span>+963 11 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="ml-2 text-estate-secondary" size={18} />
                <span>info@aqari.sy</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {currentYear} عقاري. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
