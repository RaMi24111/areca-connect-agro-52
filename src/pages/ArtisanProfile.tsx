import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ArtisanProfile = () => {
  
  const [formData, setFormData] = useState({
    brandLogo: null as File | null,
    logoPreview: "",
    userId: "",
    brandName: "",
    brandDescription: "",
    verificationDoc: null as File | null,
    address: "",
    state: "",
    pin: "",
    city: "",
    accountNumber: "",
    ifscCode: "",
    huskQuantity: "",
    huskType: "",
    frequency: "",
    customFrequency: ""
  });
  const [artisanCount, setArtisanCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user came from registration
    const registrationData = localStorage.getItem('artisanRegistration');
    if (!registrationData) {
      navigate('/register');
      return;
    }
    
    // Generate artisan ID based on registration order
    const savedCount = localStorage.getItem('artisanCount');
    const count = savedCount ? parseInt(savedCount) + 1 : 1;
    setArtisanCount(count);
    setFormData(prev => ({ ...prev, userId: `AMA_${count}` }));
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, brandLogo: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({ ...prev, logoPreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file }));
    }
  };


  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Get registration data
    const registrationData = localStorage.getItem('artisanRegistration');
    if (!registrationData) {
      navigate('/register');
      return;
    }
    
    // Save artisan count to localStorage
    localStorage.setItem('artisanCount', artisanCount.toString());
    // Save complete artisan profile data
    const completeProfile = {
      ...formData,
      ...JSON.parse(registrationData)
    };
    localStorage.setItem('artisanProfile', JSON.stringify(completeProfile));
    // Clear registration data
    localStorage.removeItem('artisanRegistration');
    navigate("/artisan/home");
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4 pt-20">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Complete Your Artisan Profile</CardTitle>
            <CardDescription className="text-center">
              Fill in your business details to complete registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => document.getElementById('brandLogo')?.click()}>
                    <AvatarImage src={formData.logoPreview} />
                    <AvatarFallback>Logo</AvatarFallback>
                  </Avatar>
                  <Input
                    id="brandLogo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-muted-foreground">Click to upload brand logo</p>
              </div>

              <div>
                <Label htmlFor="userId">Artisan ID (Auto-generated)</Label>
                <Input
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div>
                <Label htmlFor="brandName">Brand Name</Label>
                <Input
                  id="brandName"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleInputChange}
                  placeholder="Enter your brand name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="brandDescription">Brand Description</Label>
                <Textarea
                  id="brandDescription"
                  name="brandDescription"
                  value={formData.brandDescription}
                  onChange={handleInputChange}
                  placeholder="Describe your brand and products"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="verificationDoc">Verification Document (PAN/GST/Aadhaar)</Label>
                <Input
                  id="verificationDoc"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, "verificationDoc")}
                  required
                  className="hover:border-primary/50 transition-colors"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Address Details</h3>
                <div>
                  <Label htmlFor="address">Complete Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter complete address"
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
                    <Label htmlFor="pin">PIN Code</Label>
                    <Input
                      id="pin"
                      name="pin"
                      value={formData.pin}
                      onChange={handleInputChange}
                      placeholder="Enter PIN code"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Bank Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      placeholder="Enter account number"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ifscCode">IFSC Code</Label>
                    <Input
                      id="ifscCode"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleInputChange}
                      placeholder="Enter IFSC code"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Husk Requirements (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="huskQuantity">Quantity</Label>
                    <Input
                      id="huskQuantity"
                      name="huskQuantity"
                      value={formData.huskQuantity}
                      onChange={handleInputChange}
                      placeholder="e.g., 100 kg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="huskType">Preferred Husk Type</Label>
                    <Select onValueChange={(value) => handleSelectChange("huskType", value)} value={formData.huskType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wet">Wet</SelectItem>
                        <SelectItem value="dry">Dry</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select onValueChange={(value) => handleSelectChange("frequency", value)} value={formData.frequency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="customFrequency">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {formData.frequency === "customFrequency" && (
                  <div>
                    <Label htmlFor="customFrequency">Custom Frequency</Label>
                    <Input
                      id="customFrequency"
                      name="customFrequency"
                      value={formData.customFrequency}
                      onChange={handleInputChange}
                      placeholder="Enter custom frequency (e.g., every 15 days)"
                    />
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full hover:scale-[1.02] transition-transform duration-200">
                Complete Profile & Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ArtisanProfile;