import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Building, Phone, MapPin, CreditCard, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const IndustryProfileView = () => {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load profile data from localStorage
    const savedProfile = localStorage.getItem('industryProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  const handleLogout = () => {
    // Clear all industry related data
    localStorage.removeItem('industryRegistration');
    localStorage.removeItem('industryProfile');
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    
    navigate("/");
  };

  if (!profileData) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4 pt-20">
          <Card className="w-full max-w-2xl">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground">No profile data found. Please complete your registration.</p>
                <Button className="mt-4" onClick={() => navigate("/register/industry")}>
                  Go to Registration
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-subtle p-4 pt-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Industry Profile</h1>
            <p className="text-xl text-muted-foreground">Your complete business information</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Registration Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">User ID</p>
                  <p className="text-base font-mono">{profileData.userId || "AMi_1"}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Company Name</p>
                  <p className="text-base">{profileData.companyName}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Company Address</p>
                  <p className="text-base">{profileData.companyAddress}</p>
                  {profileData.city && (
                    <p className="text-base">{profileData.city}, {profileData.state} - {profileData.pinCode}</p>
                  )}
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Company Phone</p>
                  <p className="text-base">{profileData.companyPhone}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">GST/Corporate Number</p>
                  <p className="text-base">{profileData.gstNumber}</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Contact Person Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-base">{profileData.registrantName}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Role</p>
                  <p className="text-base">{profileData.roleOfContact}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                  <p className="text-base">{profileData.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Bank Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Banking Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Account Number</p>
                  <p className="text-base">{profileData.accountNumber}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">IFSC Code</p>
                  <p className="text-base">{profileData.ifscCode}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Additional Bank Details</p>
                  <p className="text-base">{profileData.bankDetails}</p>
                </div>
              </CardContent>
            </Card>

            {/* Husk Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Husk Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profileData.huskQuantity ? (
                  <>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Quantity</p>
                      <p className="text-base">{profileData.huskQuantity}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Type</p>
                      <p className="text-base">{profileData.huskType || "Not specified"}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Frequency</p>
                      <p className="text-base">{profileData.frequency || "Not specified"}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Delivery Mode</p>
                      <p className="text-base">{profileData.deliveryMode || "Not specified"}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">No husk requirements specified</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button onClick={() => navigate("/industry/home")}>
              Back to Dashboard
            </Button>
            <Button variant="outline" onClick={() => navigate("/industry/profile")}>
              Edit Profile
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndustryProfileView;