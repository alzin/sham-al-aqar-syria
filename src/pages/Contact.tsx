
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <>
      <Header />
      
      {/* Page Header */}
      <section className="bg-muted py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">اتصل بنا</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نحن هنا لمساعدتك في جميع استفساراتك العقارية. تواصل معنا الآن وسيقوم فريقنا بالرد عليك في أقرب وقت.
          </p>
        </div>
      </section>
      
      {/* Contact Details */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">أرسل لنا رسالة</h2>
              <ContactForm />
            </div>
            
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">معلومات الاتصال</h2>
              
              <div className="grid gap-8">
                {/* Address */}
                <div className="flex items-start">
                  <div className="feature-icon flex-shrink-0">
                    <MapPin />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-bold text-lg mb-2">العنوان</h3>
                    <p className="text-muted-foreground">
                      دمشق، سوريا<br />
                      شارع بغداد، بناء العقاري، الطابق 3
                    </p>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-start">
                  <div className="feature-icon flex-shrink-0">
                    <Phone />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-bold text-lg mb-2">الهاتف</h3>
                    <p className="text-muted-foreground">
                      الهاتف الثابت: 9631123456+<br />
                      الجوال: 963987654321+
                    </p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start">
                  <div className="feature-icon flex-shrink-0">
                    <Mail />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-bold text-lg mb-2">البريد الإلكتروني</h3>
                    <p className="text-muted-foreground">
                      info@aqari.sy<br />
                      support@aqari.sy
                    </p>
                  </div>
                </div>
                
                {/* Working Hours */}
                <div className="flex items-start">
                  <div className="feature-icon flex-shrink-0">
                    <Clock />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-bold text-lg mb-2">ساعات العمل</h3>
                    <p className="text-muted-foreground">
                      الأحد - الخميس: 9 صباحاً - 5 مساءً<br />
                      الجمعة - السبت: 10 صباحاً - 2 ظهراً
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="mt-8">
                <h3 className="font-bold text-lg mb-4">موقعنا على الخريطة</h3>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">
                    سيتم هنا عرض خريطة الموقع عند الاتصال بخدمة الخرائط
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8 text-center">الأسئلة الشائعة</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2">كيف يمكنني إضافة عقار للبيع أو الإيجار؟</h3>
                <p className="text-muted-foreground">
                  يمكنك إضافة عقار من خلال إنشاء حساب على موقعنا، ثم الضغط على زر "إضافة عقار" في لوحة التحكم الخاصة بك.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2">هل خدماتكم مجانية؟</h3>
                <p className="text-muted-foreground">
                  البحث وتصفح العقارات مجاني تماماً، لكن هناك باقات مدفوعة للمعلنين تتيح لهم مزايا إضافية مثل ظهور إعلاناتهم في القائمة المميزة.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2">كيف يمكنني التأكد من مصداقية العقارات المعروضة؟</h3>
                <p className="text-muted-foreground">
                  نعمل على التحقق من جميع العقارات المعروضة على موقعنا من خلال فريق متخصص، كما يمكنك الاطلاع على تقييمات المستخدمين السابقين.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2">هل تقدمون خدمات الوساطة العقارية؟</h3>
                <p className="text-muted-foreground">
                  نعم، نقدم خدمات الوساطة العقارية من خلال فريق من الوسطاء المحترفين والمرخصين الذين يمكنهم مساعدتك في إتمام صفقاتك العقارية بكل سهولة وأمان.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Contact;
