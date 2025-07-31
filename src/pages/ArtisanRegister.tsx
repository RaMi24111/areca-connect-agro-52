import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ArtisanRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    contactMethod: "email" as "email" | "phone",
    contactValue: "",
  });
  const [showVerification, setShowVerification] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    return otp;
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    if (!formData.contactValue) {
      alert('Please enter your email or phone number');
      return;
    }

    const otp = generateOtp();
    console.log(`OTP for ${formData.contactMethod}: ${otp}`);
    setShowVerification(true);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      // Save registration data
      localStorage.setItem('artisanRegistration', JSON.stringify(formData));
      navigate("/artisan/profile");
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4 pt-20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {showVerification ? "Verify Your Account" : "Artisan Registration"}
            </CardTitle>
            <CardDescription className="text-center">
              {showVerification 
                ? `Enter the OTP sent to your ${formData.contactMethod}`
                : "Create your artisan account"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showVerification ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-6">
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
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password (min 6 characters)"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                <div>
                  <Label>Verification Method</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <Button
                      type="button"
                      variant={formData.contactMethod === 'email' ? 'default' : 'outline'}
                      onClick={() => setFormData(prev => ({ ...prev, contactMethod: 'email' }))}
                      className="hover:scale-[1.02] transition-transform duration-200"
                    >
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={formData.contactMethod === 'phone' ? 'default' : 'outline'}
                      onClick={() => setFormData(prev => ({ ...prev, contactMethod: 'phone' }))}
                      className="hover:scale-[1.02] transition-transform duration-200"
                    >
                      Phone
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="contactValue">
                    {formData.contactMethod === 'email' ? 'Email Address' : 'Phone Number'}
                  </Label>
                  <Input
                    id="contactValue"
                    name="contactValue"
                    type={formData.contactMethod === 'email' ? 'email' : 'tel'}
                    value={formData.contactValue}
                    onChange={handleInputChange}
                    placeholder={formData.contactMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                    required
                  />
                </div>

                <Button type="submit" className="w-full hover:scale-[1.02] transition-transform duration-200">
                  Register & Send OTP
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Button variant="link" size="sm" onClick={() => navigate("/login/artisan")}>
                    Login with User ID/Phone/Email
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="mb-4 p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium">Your OTP: <span className="text-primary">{generatedOtp}</span></p>
                </div>
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full hover:scale-[1.02] transition-transform duration-200">
                    Verify & Complete Registration
                  </Button>
                </form>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ArtisanRegister;