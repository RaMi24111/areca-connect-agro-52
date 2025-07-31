import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    phone: "",
    email: "",
    otp: ""
  });
  const [otpSent, setOtpSent] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login validation
    if (loginData.username && loginData.password) {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      
      // Redirect based on role
      switch (selectedRole) {
        case "user":
          navigate("/user/home");
          break;
        case "farmer":
          navigate("/farmer/home");
          break;
        case "artisan":
          navigate("/artisan/home");
          break;
        case "industry":
          navigate("/industry/home");
          break;
        default:
          navigate("/user/home");
      }
    }
  };

  const handleOtpLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otpSent) {
      // Send OTP
      if (loginData.phone || loginData.email) {
        setOtpSent(true);
        toast({
          title: "OTP Sent",
          description: `OTP sent to ${loginData.phone || loginData.email}`,
        });
      }
    } else {
      // Verify OTP
      if (loginData.otp.length === 6) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        
        // Redirect based on role
        switch (selectedRole) {
          case "user":
            navigate("/user/home");
            break;
          case "farmer":
            navigate("/farmer/home");
            break;
          case "artisan":
            navigate("/artisan/home");
            break;
          case "industry":
            navigate("/industry/home");
            break;
          default:
            navigate("/user/home");
        }
      }
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4 pt-20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Sign in to your ArecaConnect account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Role Selection */}
            <div className="mb-6">
              <Label>Select your role</Label>
              <RadioGroup value={selectedRole} onValueChange={setSelectedRole} className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user" className="text-sm">User</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="farmer" id="farmer" />
                  <Label htmlFor="farmer" className="text-sm">Farmer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="artisan" id="artisan" />
                  <Label htmlFor="artisan" className="text-sm">Artisan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="industry" id="industry" />
                  <Label htmlFor="industry" className="text-sm">Industry</Label>
                </div>
              </RadioGroup>
            </div>

            <Tabs defaultValue="password" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="otp">OTP</TabsTrigger>
              </TabsList>
              
              <TabsContent value="password" className="space-y-4">
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="username">Username/Email</Label>
                    <Input
                      id="username"
                      name="username"
                      value={loginData.username}
                      onChange={handleInputChange}
                      placeholder="Enter username or email"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={loginData.password}
                      onChange={handleInputChange}
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="otp" className="space-y-4">
                <form onSubmit={handleOtpLogin} className="space-y-4">
                  {!otpSent ? (
                    <>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={loginData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div className="text-center text-sm text-muted-foreground">OR</div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={loginData.email}
                          onChange={handleInputChange}
                          placeholder="Enter email address"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Send OTP
                      </Button>
                    </>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="otp">Enter OTP sent to {loginData.phone || loginData.email}</Label>
                        <Input
                          id="otp"
                          name="otp"
                          value={loginData.otp}
                          onChange={handleInputChange}
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1">
                          Verify OTP
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setOtpSent(false)}>
                          Back
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-6 text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button variant="link" size="sm" onClick={() => navigate("/register")}>
                Register here
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;