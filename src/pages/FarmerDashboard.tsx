import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, MapPin, Phone, User } from "lucide-react";

const FarmerDashboard = () => {
  const [profileComplete, setProfileComplete] = useState(false);
  const [showSellForm, setShowSellForm] = useState(false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileComplete(true);
  };

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSellForm(false);
    // Handle sell form submission
  };

  if (!profileComplete) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-subtle pt-20 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card className="shadow-elegant">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
                  Complete Your Farmer Profile
                </CardTitle>
                <CardDescription>
                  Please provide your details to start selling your areca products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" placeholder="Enter your full name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Enter your phone number" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Farm Address</Label>
                    <Textarea id="address" placeholder="Enter your complete farm address" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="arecaProduction">Number of Areca Trees/Annual Production</Label>
                    <Input 
                      id="arecaProduction" 
                      type="number" 
                      placeholder="e.g., 500 trees or 1000 kg annually" 
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Complete Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-subtle pt-20 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Farmer Dashboard
            </h1>
            <p className="text-muted-foreground">Manage your areca products and sales</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Ready for collection</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹8,500</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Listings</h2>
            <Button onClick={() => setShowSellForm(true)}>
              Sell New Produce
            </Button>
          </div>

          {showSellForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>List New Areca Produce</CardTitle>
                <CardDescription>Add details about your areca husk for sale</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSellSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity (kg)</Label>
                      <Input id="quantity" type="number" placeholder="Enter quantity" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wet">Wet Husk</SelectItem>
                          <SelectItem value="dry">Dry Husk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="harvestDate">Harvest Date</Label>
                      <Input id="harvestDate" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="collectionDate">Preferred Collection Date</Label>
                      <Input id="collectionDate" type="date" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per kg (₹)</Label>
                    <Input id="price" type="number" placeholder="Enter price" required />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">List Produce</Button>
                    <Button type="button" variant="outline" onClick={() => setShowSellForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Wet Areca Husk</CardTitle>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <CardDescription>50 kg available</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Price:</span>
                      <span className="font-medium">₹25/kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Harvest:</span>
                      <span className="font-medium">15 Jan 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Collection:</span>
                      <span className="font-medium">20 Jan 2024</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="destructive">Remove</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmerDashboard;