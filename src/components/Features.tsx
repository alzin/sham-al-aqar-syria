
import { Home, Shield, Users, Map, Clock, Banknote } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Home className="h-8 w-8" />,
      title: "تنوع العقارات",
      description: "نوفر مجموعة واسعة من العقارات لتناسب جميع الاحتياجات والميزانيات"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "معاملات آمنة",
      description: "نضمن سلامة وأمان جميع المعاملات العقارية على منصتنا"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "وسطاء موثوقون",
      description: "نتعاون فقط مع وكلاء عقاريين محترفين ذوي خبرة وسمعة طيبة"
    },
    {
      icon: <Map className="h-8 w-8" />,
      title: "تغطية واسعة",
      description: "نغطي مختلف المناطق في سوريا لنوفر لك خيارات متنوعة"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "عروض محدّثة",
      description: "يتم تحديث قوائم العقارات بانتظام لضمان عرض أحدث الفرص العقارية"
    },
    {
      icon: <Banknote className="h-8 w-8" />,
      title: "أسعار تنافسية",
      description: "نعمل على توفير أفضل الأسعار لتناسب مختلف الميزانيات"
    }
  ];
  
  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-2">لماذا تختار عقاري؟</h2>
          <p className="text-lg text-muted-foreground">نوفر لك أفضل الخدمات العقارية في سوريا</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="feature-icon mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
