import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Leaf, Phone, User } from "lucide-react";

interface LoginFormProps {
  userType: "farmer" | "artisan" | "user" | "industry";
}

const LoginForm = ({ userType }: LoginFormProps) => {
  const [loginMethod, setLoginMethod] = useState<"credentials" | "verification">("credentials");
  const [credentials, setCredentials] = useState({
    userId: "",
    password: ""
  });
  const [verification, setVerification] = useState({
    contact: "",
    otp: ""
  });
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.userId || !credentials.password) {
      toast({
        title: "Required fields missing",
        description: "Please enter both User ID and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate credential verification
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful!",
        description: `Welcome back! You have been logged in successfully.`,
      });
      // Navigate to appropriate dashboard
      navigate(config.dashboard);
    }, 1500);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verification.contact) {
      toast({
        title: "Required field missing",
        description: "Please enter your email or phone number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      toast({
        title: "OTP Sent!",
        description: `OTP has been sent to ${verification.contact}`,
      });
    }, 1500);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verification.otp) {
      toast({
        title: "OTP Required",
        description: "Please enter the OTP sent to your contact",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful!",
        description: `Welcome! You have been logged in successfully.`,
      });
      // Navigate to appropriate dashboard
      navigate(config.dashboard);
    }, 1500);
  };

  const userTypeConfig = {
    farmer: {
      title: "Farmer Login",
      description: "Connect with sustainable areca farming solutions",
      icon: Leaf,
      gradient: "bg-gradient-primary",
      dashboard: "/farmer-dashboard"
    },
    artisan: {
      title: "Artisan Login", 
      description: "Showcase your eco-friendly areca crafts",
      icon: User,
      gradient: "bg-gradient-earth",
      dashboard: "/artisan-dashboard"
    },
    user: {
      title: "User Login",
      description: "Browse and buy sustainable areca products",
      icon: User,
      gradient: "bg-gradient-primary",
      dashboard: "/user-dashboard"
    },
    industry: {
      title: "Industry Login",
      description: "Access your industry dashboard",
      icon: User,
      gradient: "bg-gradient-primary",
      dashboard: "/industry/home"
    }
  };

  const config = userTypeConfig[userType];
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-secondary pt-20 pb-8 px-4 animate-fade-in">
      <Card className="w-full max-w-md shadow-elevated card-interactive glow">
        <CardHeader className="text-center space-y-4">
          <div className={`w-16 h-16 rounded-full ${config.gradient} flex items-center justify-center mx-auto animate-float shadow-glow`}>
            <IconComponent className="h-8 w-8 text-white" />
          </div>
          <div className="animate-scale-in">
            <CardTitle className="text-2xl font-bold text-gradient">{config.title}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {config.description}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 animate-fade-in">
          {/* Login Method Selection */}
          <div className="flex space-x-2 p-1 bg-muted rounded-lg shadow-soft">
            <Button
              type="button"
              variant={loginMethod === "credentials" ? "gradient" : "ghost"}
              className="flex-1 transition-all duration-300"
              onClick={() => setLoginMethod("credentials")}
            >
              User ID & Password
            </Button>
            <Button
              type="button"
              variant={loginMethod === "verification" ? "gradient" : "ghost"}
              className="flex-1 transition-all duration-300"
              onClick={() => setLoginMethod("verification")}
            >
              Email/Phone Verification
            </Button>
          </div>

          {/* Credentials Login */}
          {loginMethod === "credentials" && (
            <form onSubmit={handleCredentialsLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  User ID
                </Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter your User ID"
                  value={credentials.userId}
                  onChange={(e) => setCredentials(prev => ({ ...prev, userId: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                variant="gradient"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          )}

          {/* Verification Login */}
          {loginMethod === "verification" && !otpSent && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Email or Phone Number
                </Label>
                <Input
                  id="contact"
                  type="text"
                  placeholder="Enter your email or phone number"
                  value={verification.contact}
                  onChange={(e) => setVerification(prev => ({ ...prev, contact: e.target.value }))}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                variant="gradient"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>
          )}

          {/* OTP Verification */}
          {loginMethod === "verification" && otpSent && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center text-sm text-muted-foreground mb-4">
                OTP sent to {verification.contact}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="6-digit OTP"
                  value={verification.otp}
                  onChange={(e) => setVerification(prev => ({ ...prev, otp: e.target.value }))}
                  maxLength={6}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                variant="gradient"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify & Login"}
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setOtpSent(false);
                  setVerification(prev => ({ ...prev, otp: "" }));
                }}
              >
                ← Back to Contact Info
              </Button>
            </form>
          )}
          
          <div className="text-center text-xs text-muted-foreground">
            By logging in, you agree to our sustainable farming practices
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;