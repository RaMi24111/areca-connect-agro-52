import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const IndustryProfile = () => {
  const [formData, setFormData] = useState({
    userId: "",
    gstNumber: "",
    roleOfContact: "",
    accountNumber: "",
    ifscCode: "",
    huskQuantity: "",
    huskType: "",
    frequency: "",
    deliveryMode: "",
    bankDetails: "",
    documents: null as File | null
  });
  const [industryCount, setIndustryCount] = useState(0);
  const [registrationData, setRegistrationData] = useState({
    registrantName: "",
    companyName: "",
    companyAddress: "",
    phone: "",
    companyPhone: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load registration data from localStorage
    const savedData = localStorage.getItem('industryRegistration');
    if (savedData) {
      setRegistrationData(JSON.parse(savedData));
    }

    // Generate industry ID based on registration order
    const savedCount = localStorage.getItem('industryCount');
    const count = savedCount ? parseInt(savedCount) + 1 : 1;
    setIndustryCount(count);
    setFormData(prev => ({ ...prev, userId: `AMi_${count}` }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        documents: e.target.files[0]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save industry count and complete profile data
    localStorage.setItem('industryCount', industryCount.toString());
    const completeProfile = {
      ...registrationData,
      ...formData
    };
    localStorage.setItem('industryProfile', JSON.stringify(completeProfile));
    
    toast({
      title: "Profile Completed",
      description: "Welcome to your industry dashboard!",
    });
    
    setTimeout(() => {
      navigate("/industry/home");
    }, 1000);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4 pt-20">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Complete Your Industry Profile</CardTitle>
            <CardDescription className="text-center">
              Complete your business details and husk requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {registrationData.companyName && (
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Registration Details:</h3>
                  <p className="text-sm text-muted-foreground">Company: {registrationData.companyName}</p>
                  <p className="text-sm text-muted-foreground">Contact: {registrationData.registrantName}</p>
                </div>
              )}

              <div>
                <Label htmlFor="userId">User ID (Auto-generated)</Label>
                <Input
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div>
                <Label htmlFor="gstNumber">GST / Corporate Number</Label>
                <Input
                  id="gstNumber"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                  placeholder="Enter GST or Corporate registration number"
                  required
                />
              </div>

              <div>
                <Label htmlFor="roleOfContact">Role of Contact Person</Label>
                <Input
                  id="roleOfContact"
                  name="roleOfContact"
                  value={formData.roleOfContact}
                  onChange={handleInputChange}
                  placeholder="Enter your role (e.g., CEO, Manager, Procurement Officer)"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="accountNumber">Bank Account Number</Label>
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

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Husk Requirements (Optional)</h3>
                
                <div>
                  <Label htmlFor="huskQuantity">Quantity (tonnes/month)</Label>
                  <Input
                    id="huskQuantity"
                    name="huskQuantity"
                    value={formData.huskQuantity}
                    onChange={handleInputChange}
                    placeholder="e.g., 50 tonnes"
                  />
                </div>

                <div>
                  <Label htmlFor="huskType">Type</Label>
                  <Select onValueChange={(value) => setFormData({...formData, huskType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select husk type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wet">Wet Husks</SelectItem>
                      <SelectItem value="dry">Dry Husks</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Input
                    id="frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleInputChange}
                    placeholder="Enter frequency (e.g., Monthly, Seasonal, As Needed)"
                  />
                </div>

                <div>
                  <Label htmlFor="deliveryMode">Delivery Mode</Label>
                  <Select onValueChange={(value) => setFormData({...formData, deliveryMode: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select delivery mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="platform">Platform Delivery</SelectItem>
                      <SelectItem value="self-pickup">Self Pickup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>


              <div>
                <Label htmlFor="documents">Upload Documents</Label>
                <Input
                  id="documents"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload GST certificate, company registration, or other relevant documents
                </p>
              </div>

              <Button type="submit" className="w-full">
                Complete Profile & Continue to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default IndustryProfile;