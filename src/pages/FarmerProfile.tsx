import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FarmerNavigation from "@/components/FarmerNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FarmerProfile = () => {
  const [formData, setFormData] = useState({
    photo: null as File | null,
    photoPreview: "",
    userId: "",
    accountNumber: "",
    ifscCode: "",
    farmSize: "",
    numberOfTrees: "",
    averageProduction: "",
    harvestMonth: ""
  });
  const [farmerCount, setFarmerCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Generate farmer ID based on registration order
    const savedCount = localStorage.getItem('farmerCount');
    const count = savedCount ? parseInt(savedCount) + 1 : 1;
    setFarmerCount(count);
    setFormData(prev => ({ ...prev, userId: `AMF_${count}` }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      harvestMonth: value
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({ ...prev, photoPreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save farmer count to localStorage
    localStorage.setItem('farmerCount', farmerCount.toString());
    // Save profile data
    localStorage.setItem('farmerProfile', JSON.stringify(formData));
    navigate("/farmer/home");
  };

  return (
    <>
      <FarmerNavigation />
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4 pt-20">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Complete Your Farmer Profile</CardTitle>
            <CardDescription className="text-center">
              Complete your profile to start selling your areca produce
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => document.getElementById('photo')?.click()}>
                    <AvatarImage src={formData.photoPreview} />
                    <AvatarFallback>Photo</AvatarFallback>
                  </Avatar>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-muted-foreground">Click photo to upload</p>
              </div>

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
                <h3 className="text-lg font-semibold">Farm Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="farmSize">Size of Farm (acres)</Label>
                    <Input
                      id="farmSize"
                      name="farmSize"
                      value={formData.farmSize}
                      onChange={handleInputChange}
                      placeholder="Enter farm size"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="numberOfTrees">Number of Trees</Label>
                    <Input
                      id="numberOfTrees"
                      name="numberOfTrees"
                      value={formData.numberOfTrees}
                      onChange={handleInputChange}
                      placeholder="Enter number of areca trees"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="averageProduction">Average Production (kg/tons)</Label>
                    <Input
                      id="averageProduction"
                      name="averageProduction"
                      value={formData.averageProduction}
                      onChange={handleInputChange}
                      placeholder="Enter average production"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="harvestMonth">Harvest Month</Label>
                    <Select onValueChange={handleSelectChange} value={formData.harvestMonth}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select harvest month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="January">January</SelectItem>
                        <SelectItem value="February">February</SelectItem>
                        <SelectItem value="March">March</SelectItem>
                        <SelectItem value="April">April</SelectItem>
                        <SelectItem value="May">May</SelectItem>
                        <SelectItem value="June">June</SelectItem>
                        <SelectItem value="July">July</SelectItem>
                        <SelectItem value="August">August</SelectItem>
                        <SelectItem value="September">September</SelectItem>
                        <SelectItem value="October">October</SelectItem>
                        <SelectItem value="November">November</SelectItem>
                        <SelectItem value="December">December</SelectItem>
                        <SelectItem value="December-January">December-January</SelectItem>
                        <SelectItem value="January-February">January-February</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
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

export default FarmerProfile;