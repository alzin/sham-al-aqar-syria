
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const { toast } = useToast();
  
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
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would call an API
    // For now, just show a toast
    toast({
      title: "تم تسجيل الدخول",
      description: "تم تسجيل دخولك بنجاح!",
    });
  };
  
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "خطأ في التسجيل",
        description: "كلمة المرور وتأكيدها غير متطابقين",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would call an API
    // For now, just show a toast
    toast({
      title: "تم إنشاء الحساب",
      description: "تم إنشاء حسابك بنجاح!",
    });
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
              >
                تسجيل الدخول
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
                  required
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
              >
                إنشاء حساب
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default RegisterForm;
