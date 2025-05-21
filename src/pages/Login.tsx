
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterForm from "@/components/RegisterForm";

const Login = () => {
  return (
    <>
      <Header />
      
      <div className="container py-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">حسابك في عقاري</h1>
          
          <RegisterForm />
          
          <div className="mt-8 text-center">
            <Link to="/" className="text-estate-accent hover:underline">
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Login;
