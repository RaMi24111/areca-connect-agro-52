import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tractor, Hammer, Factory, User } from "lucide-react";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [subRole, setSubRole] = useState<string>("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    phone: "",
    alternatePhone: "",
    pinCode: "",
    city: "",
    state: "",
    address: "",
    email: ""
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Auto-select role if coming from product click
  useEffect(() => {
    const roleFromUrl = searchParams.get('role');
    if (roleFromUrl === 'user') {
      setSelectedRole('user');
    }
  }, [searchParams]);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setSubRole("");
    
    // Navigate to specific registration pages
    if (role === "user") {
      navigate("/register/user");
    }
  };

  const handleSubRoleSelect = (role: string) => {
    setSubRole(role);
    
    // Directly navigate based on role
    if (role === "artisan") {
      navigate("/artisan/register");
    } else if (role === "industry") {
      navigate("/register/industry");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedRole === "farmer") {
      // Simulate OTP sending
      setOtpSent(true);
      console.log("OTP sent to:", formData.phone);
    } else if (selectedRole === "user") {
      // Handle user registration with OTP
      setOtpSent(true);
      console.log("OTP sent to:", formData.phone || formData.email);
    }
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate OTP verification
    if (otpCode.length === 6) {
      if (selectedRole === "farmer") {
        navigate("/farmer/profile");
      } else if (selectedRole === "user") {
        // Store user profile and redirect to user home
        localStorage.setItem('userProfile', JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: 'user'
        }));
        navigate("/user/home");
      }
    }
  };

  const renderForm = () => {
    const roleTitle = subRole || selectedRole;
    
    if (selectedRole === "user") {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">User Registration</CardTitle>
            <CardDescription className="text-center">
              Register to buy eco-friendly areca products
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!otpSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send OTP
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpVerify} className="space-y-4">
                <div>
                  <Label htmlFor="otp">Enter OTP sent to {formData.phone || formData.email}</Label>
                  <Input
                    id="otp"
                    name="otp"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Verify OTP & Continue
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setOtpSent(false)}>
                    Back
                  </Button>
                </div>
              </form>
            )}
            <div className="space-y-2 mt-4">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSelectedRole("");
                  setSubRole("");
                  setOtpSent(false);
                  setOtpCode("");
                }}
                className="w-full"
              >
                Back to Role Selection
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button variant="link" size="sm" onClick={() => navigate("/login")}>
                  Login here
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }
    
    if (selectedRole === "farmer") {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Farmer Registration</CardTitle>
            <CardDescription className="text-center">
              Register as a farmer to sell your areca produce
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!otpSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="alternatePhone">Alternate Phone Number</Label>
                  <Input
                    id="alternatePhone"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleInputChange}
                    placeholder="Enter alternate phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Complete Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="pinCode">PIN Code</Label>
                    <Input
                      id="pinCode"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      placeholder="PIN Code"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
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
                      placeholder="State"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Send OTP
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpVerify} className="space-y-4">
                <div>
                  <Label htmlFor="otp">Enter OTP sent to {formData.phone}</Label>
                  <Input
                    id="otp"
                    name="otp"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Verify OTP & Continue
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setOtpSent(false)}>
                    Back
                  </Button>
                </div>
              </form>
            )}
            <div className="space-y-2 mt-4">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSelectedRole("");
                  setSubRole("");
                  setOtpSent(false);
                  setOtpCode("");
                }}
                className="w-full"
              >
                Back to Role Selection
              </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Button variant="link" size="sm" onClick={() => navigate("/login")}>
                    Login here
                  </Button>
                </div>
            </div>
          </CardContent>
        </Card>
      );
    }
    
    return null;
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4 pt-20">
        <div className="w-full max-w-4xl">
          {!selectedRole && (
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-3xl text-center">Choose Your Role</CardTitle>
                <CardDescription className="text-center text-lg">
                  Select how you want to use ArecaConnect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Button
                    variant="outline"
                    className="h-32 flex flex-col space-y-4 hover:bg-primary/10"
                    onClick={() => handleRoleSelect("farmer")}
                  >
                    <Tractor className="h-12 w-12 text-primary" />
                    <span className="text-lg font-semibold">Farmer</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-32 flex flex-col space-y-4 hover:bg-primary/10"
                    onClick={() => handleRoleSelect("artisan")}
                  >
                    <div className="flex space-x-2">
                      <Hammer className="h-12 w-12 text-primary" />
                      <Factory className="h-12 w-12 text-primary" />
                    </div>
                    <span className="text-lg font-semibold">Artisan / Industry</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-32 flex flex-col space-y-4 hover:bg-primary/10"
                    onClick={() => handleRoleSelect("user")}
                  >
                    <User className="h-12 w-12 text-primary" />
                    <span className="text-lg font-semibold">User</span>
                  </Button>
                </div>
                <div className="text-center mt-6 text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Button variant="link" size="sm" onClick={() => navigate("/login")}>
                    Login here
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedRole === "artisan" && !subRole && (
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Choose Your Category</CardTitle>
                <CardDescription className="text-center">
                  Are you an individual artisan or an industry?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Button
                    variant="outline"
                    className="h-32 flex flex-col space-y-4 hover:bg-primary/10"
                    onClick={() => handleSubRoleSelect("artisan")}
                  >
                    <Hammer className="h-12 w-12 text-primary" />
                    <span className="text-lg font-semibold">Artisan</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-32 flex flex-col space-y-4 hover:bg-primary/10"
                    onClick={() => handleSubRoleSelect("industry")}
                  >
                    <Factory className="h-12 w-12 text-primary" />
                    <span className="text-lg font-semibold">Industry</span>
                  </Button>
                </div>
                <div className="space-y-2 mt-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedRole("")}
                    className="w-full"
                  >
                    Back to Role Selection
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Button variant="link" size="sm" onClick={() => navigate("/login")}>
                      Login here
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {(selectedRole === "farmer" || selectedRole === "user") && renderForm()}
        </div>
      </div>
    </>
  );
};

export default Register;