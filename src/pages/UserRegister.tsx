import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Smartphone, Mail, Verified } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    otp: ""
  });
  const [otpSent, setOtpSent] = useState(false);
  const [contactType, setContactType] = useState<"phone" | "email" | "">("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const detectContactType = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    
    if (emailRegex.test(value)) {
      setContactType("email");
    } else if (phoneRegex.test(value)) {
      setContactType("phone");
    } else {
      setContactType("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === "contact") {
      detectContactType(value);
    }
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.contact || !contactType) {
      toast({
        title: "Invalid Information",
        description: "Please fill all fields with valid information.",
        variant: "destructive"
      });
      return;
    }

    // Simulate OTP sending
    setOtpSent(true);
    toast({
      title: "OTP Sent",
      description: `Verification code sent to your ${contactType === "phone" ? "phone" : "email"}.`,
    });
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive"
      });
      return;
    }

    // Store user data in localStorage for now
    localStorage.setItem('userProfile', JSON.stringify({
      userId: "AU_1",
      name: formData.name,
      contact: formData.contact,
      contactType: contactType,
      registeredAt: new Date().toISOString()
    }));

    toast({
      title: "Registration Successful",
      description: "Welcome to AdikeMart! Redirecting to your dashboard...",
    });

    setTimeout(() => {
      navigate("/user/home");
    }, 1500);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4 pt-20">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <User className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Join AdikeMart</CardTitle>
            <CardDescription>
              {!otpSent 
                ? "Create your account to start shopping sustainable products" 
                : "Enter the verification code to complete registration"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!otpSent ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="contact">
                    Phone Number or Email
                    {contactType && (
                      <span className="ml-2 text-xs text-primary">
                        ({contactType === "phone" ? "📱 Phone" : "📧 Email"} detected)
                      </span>
                    )}
                  </Label>
                  <div className="relative">
                    {contactType === "phone" && (
                      <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    )}
                    {contactType === "email" && (
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    )}
                    <Input
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      placeholder="Enter phone number or email"
                      className={contactType ? "pl-10" : ""}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={!formData.name || !formData.contact || !contactType}
                >
                  Send OTP
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Button variant="link" size="sm" onClick={() => navigate("/login/user")}>
                    Login with User ID/Phone/Email
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="text-center py-4">
                  <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                    <Verified className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Verification code sent to<br />
                    <span className="font-medium">{formData.contact}</span>
                  </p>
                </div>

                <div>
                  <Label htmlFor="otp">Enter 6-digit OTP</Label>
                  <Input
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    placeholder="Enter OTP"
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setOtpSent(false);
                      setFormData(prev => ({ ...prev, otp: "" }));
                    }}
                    className="flex-1"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={formData.otp.length !== 6}
                  >
                    Verify & Continue
                  </Button>
                </div>

                <div className="text-center">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={handleSendOTP}
                  >
                    Resend OTP
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UserRegister;