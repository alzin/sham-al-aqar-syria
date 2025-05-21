
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();
  
  // Loading states
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  
  // Login form state
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: ""
  });
  
  // Register form state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  
  // If user is already logged in, redirect to home page
  if (user) {
    navigate("/");
    return null;
  }
  
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    
    try {
      await signIn(loginCredentials.email, loginCredentials.password);
      navigate("/");
    } catch (error) {
      // Error handling is done in the AuthContext
      console.error("Login error:", error);
    } finally {
      setIsLoginLoading(false);
    }
  };
  
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "خطأ في التسجيل",
        description: "كلمة المرور وتأكيدها غير متطابقين",
        variant: "destructive"
      });
      return;
    }
    
    setIsRegisterLoading(true);
    
    try {
      // Split full name into first and last name
      const nameParts = registerData.name.trim().split(/\s+/);
      const firstName = nameParts.shift() || '';
      const lastName = nameParts.join(' ');
      
      await signUp(
        registerData.email, 
        registerData.password,
        {
          first_name: firstName,
          last_name: lastName || undefined,
          phone: registerData.phone || undefined
        }
      );
      
      // Reset the form
      setRegisterData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
      });
      
      // Switch to login tab after successful registration
      const loginTab = document.querySelector('[data-state="inactive"][data-value="login"]') as HTMLElement;
      if (loginTab) loginTab.click();
      
    } catch (error) {
      // Error handling is done in the AuthContext
      console.error("Registration error:", error);
    } finally {
      setIsRegisterLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md">
      <Tabs defaultValue="login">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
          <TabsTrigger value="register">إنشاء حساب</TabsTrigger>
        </TabsList>
        
        {/* Login Tab */}
        <TabsContent value="login">
          <form onSubmit={handleLoginSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
              <CardDescription>
                قم بتسجيل الدخول إلى حسابك لإدارة عقاراتك
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required
                  value={loginCredentials.email}
                  onChange={(e) => setLoginCredentials({
                    ...loginCredentials,
                    email: e.target.value
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-estate-accent hover:underline"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  required
                  value={loginCredentials.password}
                  onChange={(e) => setLoginCredentials({
                    ...loginCredentials,
                    password: e.target.value
                  })}
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-estate-primary hover:bg-estate-primary/90"
                disabled={isLoginLoading}
              >
                {isLoginLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  "تسجيل الدخول"
                )}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        
        {/* Register Tab */}
        <TabsContent value="register">
          <form onSubmit={handleRegisterSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl">إنشاء حساب جديد</CardTitle>
              <CardDescription>
                سجل الآن للوصول إلى جميع ميزات موقعنا
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input 
                  id="name" 
                  required
                  value={registerData.name}
                  onChange={(e) => setRegisterData({
                    ...registerData,
                    name: e.target.value
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reg-email">البريد الإلكتروني</Label>
                <Input 
                  id="reg-email" 
                  type="email"
                  required
                  value={registerData.email}
                  onChange={(e) => setRegisterData({
                    ...registerData,
                    email: e.target.value
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input 
                  id="phone" 
                  type="tel"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({
                    ...registerData,
                    phone: e.target.value
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reg-password">كلمة المرور</Label>
                <Input 
                  id="reg-password" 
                  type="password"
                  required
                  value={registerData.password}
                  onChange={(e) => setRegisterData({
                    ...registerData,
                    password: e.target.value
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  required
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value
                  })}
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-estate-primary hover:bg-estate-primary/90"
                disabled={isRegisterLoading}
              >
                {isRegisterLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري إنشاء الحساب...
                  </>
                ) : (
                  "إنشاء حساب"
                )}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default RegisterForm;
