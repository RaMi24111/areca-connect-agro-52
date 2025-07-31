import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const IndustryRegister = () => {
  const [formData, setFormData] = useState({
    registrantName: "",
    phone: "",
    companyName: "",
    companyAddress: "",
    city: "",
    state: "",
    pinCode: "",
    companyPhone: ""
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOtp = () => {
    if (!formData.phone) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }
    setIsOtpSent(true);
    toast({
      title: "OTP Sent",
      description: `OTP sent to ${formData.phone}`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpSent) {
      toast({
        title: "Error",
        description: "Please verify your phone number first",
        variant: "destructive",
      });
      return;
    }
    if (!otp) {
      toast({
        title: "Error",
        description: "Please enter the OTP",
        variant: "destructive",
      });
      return;
    }
    
    // Save registration data to localStorage
    localStorage.setItem('industryRegistration', JSON.stringify(formData));
    
    toast({
      title: "Registration Successful",
      description: "Redirecting to complete your profile...",
    });
    
    setTimeout(() => {
      navigate("/industry/profile");
    }, 1000);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4 pt-20">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Industry Registration</CardTitle>
            <CardDescription className="text-center">
              Join our platform to source sustainable areca materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="registrantName">Name of Registering Individual</Label>
                <Input
                  id="registrantName"
                  name="registrantName"
                  value={formData.registrantName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                    disabled={isOtpSent}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleSendOtp}
                    disabled={isOtpSent}
                  >
                    {isOtpSent ? "OTP Sent" : "Send OTP"}
                  </Button>
                </div>
              </div>

              {isOtpSent && (
                <div>
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    required
                  />
                </div>
              )}

              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="companyAddress">Company Address</Label>
                <Textarea
                  id="companyAddress"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                  placeholder="Enter complete company address"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pinCode">Pin Code</Label>
                  <Input
                    id="pinCode"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    placeholder="Enter pin code"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="companyPhone">Company Phone</Label>
                <Input
                  id="companyPhone"
                  name="companyPhone"
                  value={formData.companyPhone}
                  onChange={handleInputChange}
                  placeholder="Enter company phone number"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Complete Registration
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button variant="link" className="p-0" onClick={() => navigate("/industry/login")}>
                  Login with User ID/Phone/Email
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default IndustryRegister;