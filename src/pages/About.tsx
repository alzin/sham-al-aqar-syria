
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">من نحن</h1>
            <p className="text-xl text-muted-foreground mb-8">
              عقاري هو أول موقع متخصص في الخدمات العقارية في سوريا، يقدم منصة متكاملة لبيع وشراء وتأجير العقارات بكل سهولة وأمان.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">قصتنا</h2>
              <p className="text-lg mb-4">
                تأسس موقع عقاري في عام 2023 بهدف تقديم حلول مبتكرة لسوق العقارات في سوريا. بدأنا برؤية واضحة لتحويل تجربة بيع وشراء العقارات من عملية معقدة إلى تجربة سهلة وشفافة.
              </p>
              <p className="text-lg mb-4">
                استطعنا خلال فترة قصيرة أن نصبح المنصة الرائدة في مجال العقارات في سوريا، من خلال تقديم خدمات متميزة تلبي احتياجات مختلف شرائح المجتمع.
              </p>
              <p className="text-lg">
                نسعى دائماً لتقديم أفضل الخدمات لعملائنا، من خلال فريق عمل احترافي ومتخصص في مجال العقارات، ومن خلال استخدام أحدث التقنيات لتسهيل عملية البحث والتواصل.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="فريق عقاري"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="bg-estate-primary text-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center p-8">
              <h3 className="text-2xl font-bold mb-4">رؤيتنا</h3>
              <p className="text-lg opacity-90">
                أن نكون الخيار الأول والأفضل في سوق العقارات السوري، وأن نساهم في تطوير وتنمية القطاع العقاري من خلال تقديم خدمات مبتكرة وحلول ذكية تلبي احتياجات العملاء.
              </p>
            </div>
            <div className="text-center p-8">
              <h3 className="text-2xl font-bold mb-4">رسالتنا</h3>
              <p className="text-lg opacity-90">
                توفير منصة عقارية متكاملة تتسم بالشفافية والمصداقية، وتساعد المواطن السوري في الوصول إلى أفضل الفرص العقارية بأسهل الطرق وأكثرها أماناً.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-10 text-center">قيمنا</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-estate-light text-estate-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">الشفافية</h3>
              <p className="text-muted-foreground">
                نعتمد مبدأ الشفافية في جميع تعاملاتنا، ونقدم معلومات دقيقة وصادقة عن العقارات المعروضة.
              </p>
            </div>
            
            <div className="border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-estate-light text-estate-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">الابتكار</h3>
              <p className="text-muted-foreground">
                نسعى دائماً لتقديم حلول مبتكرة تسهل على المستخدمين تجربة البحث والتعامل في سوق العقارات.
              </p>
            </div>
            
            <div className="border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-estate-light text-estate-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">التعاون</h3>
              <p className="text-muted-foreground">
                نؤمن بأهمية التعاون مع مختلف الجهات والأفراد في القطاع العقاري لتحقيق أهدافنا المشتركة.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 text-center">فريق العمل</h2>
          <p className="text-lg text-muted-foreground mb-10 text-center max-w-2xl mx-auto">
            يضم فريقنا نخبة من المتخصصين في مجالات العقارات والتكنولوجيا، يعملون معاً لتقديم أفضل الخدمات لعملائنا.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square bg-muted"></div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg mb-1">أحمد محمد</h3>
                <p className="text-sm text-muted-foreground">المدير التنفيذي</p>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square bg-muted"></div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg mb-1">سارة أحمد</h3>
                <p className="text-sm text-muted-foreground">مدير التسويق</p>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square bg-muted"></div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg mb-1">محمود علي</h3>
                <p className="text-sm text-muted-foreground">مدير العلاقات العامة</p>
              </div>
            </div>
            
            {/* Team Member 4 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square bg-muted"></div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg mb-1">ليلى خالد</h3>
                <p className="text-sm text-muted-foreground">مدير تطوير الأعمال</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <Features />
      
      {/* Call to Action */}
      <section className="bg-estate-primary text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">انضم إلينا اليوم</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            ابدأ رحلتك العقارية مع عقاري، المنصة الأولى في سوريا لبيع وشراء وتأجير العقارات.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/properties">
              <Button size="lg" className="bg-white text-estate-primary hover:bg-white/90">
                تصفح العقارات
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/20">
                تواصل معنا
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default About;
