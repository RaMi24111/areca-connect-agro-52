import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, ShoppingCart, Upload, MapPin } from "lucide-react";

const ArtisanDashboard = () => {
  const [showProductForm, setShowProductForm] = useState(false);

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowProductForm(false);
    // Handle product form submission
  };

  const handleBuyProduct = (productId: number) => {
    // Handle buy product
    console.log("Buying product:", productId);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-subtle pt-20 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Artisan Dashboard
            </h1>
            <p className="text-muted-foreground">Sell your products and buy raw materials</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Products Listed</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+3 this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders Received</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">+5 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹12,300</div>
                <p className="text-xs text-muted-foreground">+20% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="sell" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sell">Sell Products</TabsTrigger>
              <TabsTrigger value="buy">Buy Materials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sell" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Products</h2>
                <Button onClick={() => setShowProductForm(true)}>
                  <Upload className="mr-2 h-4 w-4" />
                  Add New Product
                </Button>
              </div>

              {showProductForm && (
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Product</CardTitle>
                    <CardDescription>List your handcrafted product for sale</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProductSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="productName">Product Name</Label>
                        <Input id="productName" placeholder="Enter product name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="productImage">Product Image</Label>
                        <Input id="productImage" type="file" accept="image/*" required />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price (₹)</Label>
                          <Input id="price" type="number" placeholder="Enter price" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <Input id="weight" type="number" step="0.1" placeholder="Enter weight" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="availability">Availability</Label>
                        <Input id="availability" type="number" placeholder="Quantity available" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pickupAddress">Pickup Address</Label>
                        <Textarea id="pickupAddress" placeholder="Enter complete pickup address" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Product Description</Label>
                        <Textarea id="description" placeholder="Describe your product" />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit">List Product</Button>
                        <Button type="button" variant="outline" onClick={() => setShowProductForm(false)}>
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
                        <CardTitle className="text-lg">Handwoven Basket</CardTitle>
                        <Badge variant="secondary">Available</Badge>
                      </div>
                      <CardDescription>Made from areca palm leaves</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Price:</span>
                          <span className="font-medium">₹450</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Weight:</span>
                          <span className="font-medium">0.5 kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Stock:</span>
                          <span className="font-medium">15 pieces</span>
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
            </TabsContent>

            <TabsContent value="buy" className="space-y-6">
              <h2 className="text-xl font-semibold">Available Raw Materials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <Card key={item}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">Wet Areca Husk</CardTitle>
                        <Badge variant="outline">Available</Badge>
                      </div>
                      <CardDescription>Fresh from local farm</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Price:</span>
                          <span className="font-medium">₹25/kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Available:</span>
                          <span className="font-medium">50 kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Location:</span>
                          <span className="font-medium">Udupi</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full mt-4" 
                        onClick={() => handleBuyProduct(item)}
                      >
                        Buy Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ArtisanDashboard;