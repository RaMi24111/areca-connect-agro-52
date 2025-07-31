import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Camera, User, Mail, Phone, MapPin, CreditCard, LogOut } from "lucide-react";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileData, setProfileData] = useState({
    photo: null as File | null,
    photoPreview: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    accountNumber: "",
    ifscCode: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('userProfile');
    if (!userData) {
      navigate('/register/user');
      return;
    }
    
    const user = JSON.parse(userData);
    setUserProfile(user);
    
    // Load existing profile data if available
    const savedProfile = localStorage.getItem('userProfileComplete');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setProfileData(prev => ({
        ...prev,
        ...profile,
        photoPreview: profile.photoPreview || ""
      }));
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData(prev => ({ ...prev, photoPreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save complete profile data
    const completeProfile = {
      ...userProfile,
      ...profileData
    };
    
    localStorage.setItem('userProfileComplete', JSON.stringify(completeProfile));
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userProfileComplete');
    navigate('/');
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const showEmailField = userProfile.contactType === "phone";

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-subtle pt-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              User Profile
            </h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                {/* Profile Photo */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => document.getElementById('profilePhoto')?.click()}>
                      <AvatarImage src={profileData.photoPreview} />
                      <AvatarFallback className="text-lg">
                        {userProfile.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 bg-primary rounded-full p-2">
                      <Camera className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <Input
                      id="profilePhoto"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Click to upload profile photo</p>
                </div>

                {/* User ID and Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="userId">User ID</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="userId"
                        value={userProfile.userId}
                        disabled
                        className="bg-muted"
                      />
                      <Badge variant="outline">Auto-generated</Badge>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userProfile.name}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Contact Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryContact">
                        {userProfile.contactType === "phone" ? "Phone Number" : "Email Address"}
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="primaryContact"
                          value={userProfile.contact}
                          disabled
                          className="bg-muted"
                        />
                        <Badge variant="secondary">
                          {userProfile.contactType === "phone" ? <Phone className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
                        </Badge>
                      </div>
                    </div>
                    
                    {showEmailField && (
                      <div>
                        <Label htmlFor="email">Email Address (Optional)</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Address Details
                  </h3>
                  
                  <div>
                    <Label htmlFor="address">Complete Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your complete address"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={profileData.city}
                        onChange={handleInputChange}
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={profileData.state}
                        onChange={handleInputChange}
                        placeholder="Enter state"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">PIN Code</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={profileData.pincode}
                        onChange={handleInputChange}
                        placeholder="Enter PIN code"
                      />
                    </div>
                  </div>
                </div>

                {/* Bank Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Bank Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        name="accountNumber"
                        value={profileData.accountNumber}
                        onChange={handleInputChange}
                        placeholder="Enter account number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ifscCode">IFSC Code</Label>
                      <Input
                        id="ifscCode"
                        name="ifscCode"
                        value={profileData.ifscCode}
                        onChange={handleInputChange}
                        placeholder="Enter IFSC code"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Update Profile
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleLogout}
                    className="text-destructive hover:text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default UserProfile;