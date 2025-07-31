import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Package, Plus, Calendar, User, LogOut, Camera, Edit2, Trash2, ShoppingCart } from "lucide-react";

const ArtisanHome = () => {
  const [artisanProfile, setArtisanProfile] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Load artisan profile from localStorage
    const profile = localStorage.getItem('artisanProfile');
    if (profile) {
      setArtisanProfile(JSON.parse(profile));
    }
    
    // Load existing products
    const savedProducts = localStorage.getItem('artisanProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
    
    // Load existing orders
    const savedOrders = localStorage.getItem('artisanOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    
    const savedProductCount = localStorage.getItem('productCount');
    if (savedProductCount) {
      setProductCount(parseInt(savedProductCount));
    }
  }, []);

  // Pre-fill bank details when artisan profile loads
  useEffect(() => {
    if (artisanProfile && !productFormData.accountNumber && !productFormData.ifscCode) {
      setProductFormData(prev => ({
        ...prev,
        accountNumber: artisanProfile.accountNumber || '',
        ifscCode: artisanProfile.ifscCode || '',
        pickupAddress: `${artisanProfile.address || ''}, ${artisanProfile.city || ''}, ${artisanProfile.state || ''} - ${artisanProfile.pin || ''}`.replace(/^, |, $|, , /g, ''),
        contactDetails: artisanProfile.emailOrPhone || ''
      }));
    }
  }, [artisanProfile]);

  const [productFormData, setProductFormData] = useState({
    name: "",
    images: [] as File[],
    imagesPreviews: [] as string[],
    cost: "",
    description: "",
    pickupAddress: "",
    contactDetails: "",
    accountNumber: "",
    ifscCode: ""
  });

  const [buyFormData, setBuyFormData] = useState({
    quantity: "",
    huskType: "",
    harvestDate: "",
    address: "",
    paymentMethod: ""
  });

  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductFormData({
      ...productFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleBuyInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBuyFormData({
      ...buyFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setBuyFormData({
      ...buyFormData,
      [name]: value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + productFormData.images.length <= 5) {
      const newFiles = [...productFormData.images, ...files];
      const newPreviews = [...productFormData.imagesPreviews];
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          newPreviews.push(reader.result as string);
          setProductFormData(prev => ({
            ...prev,
            imagesPreviews: newPreviews
          }));
        };
        reader.readAsDataURL(file);
      });
      
      setProductFormData(prev => ({
        ...prev,
        images: newFiles
      }));
    }
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate product ID
    const newProductCount = productCount + 1;
    const productId = `${artisanProfile?.userId || 'AMA_1'}_p${newProductCount}`;
    
    const newProduct = {
      id: productId,
      ...productFormData,
      status: "Listed",
      createdAt: new Date().toISOString()
    };
    
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    setProductCount(newProductCount);
    
    // Save to localStorage
    localStorage.setItem('artisanProducts', JSON.stringify(updatedProducts));
    localStorage.setItem('productCount', newProductCount.toString());
    
    // Reset form
    setProductFormData({
      name: "",
      images: [],
      imagesPreviews: [],
      cost: "",
      description: "",
      pickupAddress: "",
      contactDetails: "",
      accountNumber: "",
      ifscCode: ""
    });
    
    console.log("New product added:", newProduct);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setProductFormData({
      name: product.name,
      images: product.images,
      imagesPreviews: product.imagesPreviews,
      cost: product.cost,
      description: product.description,
      pickupAddress: product.pickupAddress,
      contactDetails: product.contactDetails,
      accountNumber: product.accountNumber,
      ifscCode: product.ifscCode
    });
    setIsDialogOpen(true);
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const updatedProducts = products.map(product => 
      product.id === editingProduct.id 
        ? { ...product, ...productFormData }
        : product
    );
    
    setProducts(updatedProducts);
    localStorage.setItem('artisanProducts', JSON.stringify(updatedProducts));
    
    // Reset form and close dialog
    setProductFormData({
      name: "",
      images: [],
      imagesPreviews: [],
      cost: "",
      description: "",
      pickupAddress: "",
      contactDetails: "",
      accountNumber: "",
      ifscCode: ""
    });
    setEditingProduct(null);
    setIsDialogOpen(false);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem('artisanProducts', JSON.stringify(updatedProducts));
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem('artisanOrders', JSON.stringify(updatedOrders));
    }
  };

  const handleBuySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOrder = {
      id: Date.now().toString(),
      ...buyFormData,
      status: "Processing",
      createdAt: new Date().toISOString()
    };
    
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('artisanOrders', JSON.stringify(updatedOrders));
    
    // Reset form
    setBuyFormData({
      quantity: "",
      huskType: "",
      harvestDate: "",
      address: "",
      paymentMethod: ""
    });
    
    console.log("New order created:", newOrder);
  };

  const handleLogout = () => {
    localStorage.removeItem('artisanProfile');
    navigate('/');
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-subtle pt-20 p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Artisan Dashboard</h1>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:scale-[1.02] transition-transform duration-200">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={artisanProfile?.logoPreview} alt="Profile" />
                      <AvatarFallback>{artisanProfile?.brandName?.charAt(0) || 'A'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{artisanProfile?.brandName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {artisanProfile?.userId}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/')}>
                    Home
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sell">Sell Products</TabsTrigger>
              <TabsTrigger value="products">My Products</TabsTrigger>
              <TabsTrigger value="buy">Buy Materials</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Products Listed</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{products.length}</div>
                    <p className="text-xs text-muted-foreground">Total products</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Material Orders</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{orders.length}</div>
                    <p className="text-xs text-muted-foreground">Purchase orders</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹15,750</div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Material Purchase Status */}
              {orders.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Material Purchase Status</CardTitle>
                    <CardDescription>Track your recent material orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                        {orders.slice(-3).reverse().map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-semibold">Order #{order.id}</h4>
                              <p className="text-sm text-muted-foreground">
                                {order.quantity} • {order.huskType} husk • {order.paymentMethod}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right space-y-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {order.status}
                              </span>
                              <div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteOrder(order.id)}
                                  className="hover:scale-[1.05] transition-transform duration-200"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Recent Products</CardTitle>
                  <CardDescription>Your latest listed products</CardDescription>
                </CardHeader>
                <CardContent>
                  {products.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No products listed yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {products.slice(-3).reverse().map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-semibold">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              ₹{product.cost} • {product.status}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{product.status}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(product.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sell">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                  <CardDescription>List your products for sale to general users</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProductSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="productImages">Product Images (Max 5)</Label>
                      <Input
                        id="productImages"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="mt-1 hover:border-primary/50 transition-colors"
                        required
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        {productFormData.images.length}/5 images selected
                      </p>
                      {productFormData.imagesPreviews.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {productFormData.imagesPreviews.map((preview, index) => (
                            <img 
                              key={index}
                              src={preview} 
                              alt={`Preview ${index + 1}`} 
                              className="w-16 h-16 object-cover rounded border"
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="productName">Product Name</Label>
                        <Input
                          id="productName"
                          name="name"
                          value={productFormData.name}
                          onChange={handleProductInputChange}
                          placeholder="Enter product name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cost">Cost (₹)</Label>
                        <Input
                          id="cost"
                          name="cost"
                          type="number"
                          value={productFormData.cost}
                          onChange={handleProductInputChange}
                          placeholder="Enter cost"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={productFormData.description}
                        onChange={handleProductInputChange}
                        placeholder="Describe your product..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pickupAddress">Pickup Address</Label>
                        <Input
                          id="pickupAddress"
                          name="pickupAddress"
                          value={productFormData.pickupAddress}
                          onChange={handleProductInputChange}
                          placeholder="Enter pickup address"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactDetails">Contact Details</Label>
                        <Input
                          id="contactDetails"
                          name="contactDetails"
                          value={productFormData.contactDetails}
                          onChange={handleProductInputChange}
                          placeholder="Enter contact details"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Confirm Bank Details (from profile)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="accountNumber">Account Number</Label>
                          <Input
                            id="accountNumber"
                            name="accountNumber"
                            value={productFormData.accountNumber || artisanProfile?.accountNumber || ''}
                            onChange={handleProductInputChange}
                            placeholder="Confirm account number"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="ifscCode">IFSC Code</Label>
                          <Input
                            id="ifscCode"
                            name="ifscCode"
                            value={productFormData.ifscCode || artisanProfile?.ifscCode || ''}
                            onChange={handleProductInputChange}
                            placeholder="Confirm IFSC code"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full hover:scale-[1.02] transition-transform duration-200">
                      <Camera className="h-4 w-4 mr-2" />
                      List Product
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>My Products</CardTitle>
                  <CardDescription>Manage all your listed products</CardDescription>
                </CardHeader>
                <CardContent>
                  {products.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No products listed yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {products.map((product) => (
                        <Card key={product.id} className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex space-x-4">
                              {product.imagesPreviews && product.imagesPreviews.length > 0 && (
                                <img 
                                  src={product.imagesPreviews[0]} 
                                  alt={product.name}
                                  className="w-20 h-20 object-cover rounded border"
                                />
                              )}
                              <div className="space-y-2">
                                <h4 className="font-semibold text-lg">{product.name}</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <Label className="text-muted-foreground">Cost:</Label>
                                    <p>₹{product.cost}</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Images:</Label>
                                    <p>{product.images.length} uploaded</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Contact:</Label>
                                    <p>{product.contactDetails}</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Created:</Label>
                                    <p>{new Date(product.createdAt).toLocaleDateString()}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Description:</Label>
                                  <p className="text-sm">{product.description}</p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right space-y-2">
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                product.status === 'Listed' ? 'bg-green-100 text-green-800' : 
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {product.status}
                              </div>
                              <div className="flex space-x-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditProduct(product)}
                                  className="hover:scale-[1.05] transition-transform duration-200"
                                >
                                  <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="hover:scale-[1.05] transition-transform duration-200"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="buy">
              <Card>
                <CardHeader>
                  <CardTitle>Buy Areca Husk</CardTitle>
                  <CardDescription>Create purchase orders for raw materials</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBuySubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="quantity">Required Quantity</Label>
                        <Input
                          id="quantity"
                          name="quantity"
                          value={buyFormData.quantity}
                          onChange={handleBuyInputChange}
                          placeholder="e.g., 100 kg"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="huskType">Type of Husk</Label>
                        <Select onValueChange={(value) => handleSelectChange("huskType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select husk type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wet">Wet</SelectItem>
                            <SelectItem value="dry">Dry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="harvestDate">Desired Harvest Date</Label>
                      <Input
                        id="harvestDate"
                        name="harvestDate"
                        type="date"
                        value={buyFormData.harvestDate}
                        onChange={handleBuyInputChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={buyFormData.address}
                        onChange={handleBuyInputChange}
                        placeholder="Enter delivery address"
                        rows={3}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="paymentMethod">Payment Method</Label>
                      <Select onValueChange={(value) => handleSelectChange("paymentMethod", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upi">UPI</SelectItem>
                          <SelectItem value="cod">Cash on Delivery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full hover:scale-[1.02] transition-transform duration-200">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Create Purchase Order
                    </Button>
                  </form>

                  {orders.length > 0 && (
                    <div className="mt-8">
                      <h4 className="font-medium mb-4">Order Tracking</h4>
                      <div className="space-y-3">
                        {orders.map((order) => (
                          <div key={order.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-semibold">Order #{order.id}</h5>
                                <p className="text-sm text-muted-foreground">
                                  {order.quantity} • {order.huskType} • {order.paymentMethod}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right space-y-2">
                                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                  {order.status}
                                </span>
                                <div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDeleteOrder(order.id)}
                                    className="hover:scale-[1.05] transition-transform duration-200"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Edit Product Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>Update your product details</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdateProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editProductName">Product Name</Label>
                    <Input
                      id="editProductName"
                      name="name"
                      value={productFormData.name}
                      onChange={handleProductInputChange}
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="editCost">Cost (₹)</Label>
                    <Input
                      id="editCost"
                      name="cost"
                      type="number"
                      value={productFormData.cost}
                      onChange={handleProductInputChange}
                      placeholder="Enter cost"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="editDescription">Description</Label>
                  <Textarea
                    id="editDescription"
                    name="description"
                    value={productFormData.description}
                    onChange={handleProductInputChange}
                    placeholder="Describe your product..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editPickupAddress">Pickup Address</Label>
                    <Input
                      id="editPickupAddress"
                      name="pickupAddress"
                      value={productFormData.pickupAddress}
                      onChange={handleProductInputChange}
                      placeholder="Enter pickup address"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="editContactDetails">Contact Details</Label>
                    <Input
                      id="editContactDetails"
                      name="contactDetails"
                      value={productFormData.contactDetails}
                      onChange={handleProductInputChange}
                      placeholder="Enter contact details"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="hover:scale-[1.02] transition-transform duration-200">
                    Update Product
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    className="hover:scale-[1.02] transition-transform duration-200"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default ArtisanHome;