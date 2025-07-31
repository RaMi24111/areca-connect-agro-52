import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, Package, Heart, MapPin, User, Truck, Clock, CheckCircle, X } from "lucide-react";
import arecaPlates from "@/assets/areca-plates.jpg";
import arecaBowls from "@/assets/areca-bowls.jpg";
import arecaBaskets from "@/assets/areca-baskets.jpg";
import arecaContainers from "@/assets/areca-containers.jpg";

const UserDashboard = () => {
  const [showDemandForm, setShowDemandForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userProfile');
    if (!userData) {
      navigate('/register/user');
      return;
    }
    setUserProfile(JSON.parse(userData));

    // Load wishlist, cart, and orders from localStorage
    const savedWishlist = localStorage.getItem('userWishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }

    const savedCart = localStorage.getItem('userCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedOrders = localStorage.getItem('userOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Mock orders for demo
      const mockOrders = [
        { 
          id: 'ORD001', 
          name: 'Handwoven Basket', 
          price: 450, 
          status: 'delivered', 
          orderDate: '2024-01-15',
          deliveryDate: '2024-01-18',
          image: arecaBaskets
        },
        { 
          id: 'ORD002', 
          name: 'Areca Leaf Plates', 
          price: 120, 
          status: 'shipped', 
          orderDate: '2024-01-20',
          estimatedDelivery: '2024-01-23',
          image: arecaPlates
        },
        { 
          id: 'ORD003', 
          name: 'Traditional Bowl Set', 
          price: 800, 
          status: 'processing', 
          orderDate: '2024-01-22',
          estimatedDelivery: '2024-01-25',
          image: arecaBowls
        }
      ];
      setOrders(mockOrders);
      localStorage.setItem('userOrders', JSON.stringify(mockOrders));
    }
  }, [navigate]);

  const handleDemandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDemandForm(false);
    // Handle demand form submission
  };

  const handleBuyProduct = (product: any) => {
    // Navigate to checkout page with the selected product
    navigate('/user/checkout', { 
      state: { 
        items: [{ ...product, quantity: 1 }] 
      } 
    });
  };

  const handleConfirmOrder = () => {
    setShowCheckout(false);
    setSelectedProduct(null);
    // Handle order confirmation
  };

  const handleAddToWishlist = (product: any) => {
    const isAlreadyInWishlist = wishlist.some(item => item.id === product.id);
    if (!isAlreadyInWishlist) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem('userWishlist', JSON.stringify(updatedWishlist));
    }
  };

  const handleRemoveFromWishlist = (productId: number) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('userWishlist', JSON.stringify(updatedWishlist));
  };

  const handleAddToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(updatedCart);
    localStorage.setItem('userCart', JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('userCart', JSON.stringify(updatedCart));
  };

  const handleUpdateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(productId);
      return;
    }
    
    const updatedCart = cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('userCart', JSON.stringify(updatedCart));
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-subtle pt-20 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              User Dashboard
            </h1>
            <p className="text-muted-foreground">Browse and buy artisan products or order raw materials</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders Placed</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orders.length}</div>
                <p className="text-xs text-muted-foreground">+{orders.filter(o => new Date(o.orderDate) > new Date(Date.now() - 30*24*60*60*1000)).length} this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{wishlist.length}</div>
                <p className="text-xs text-muted-foreground">Items saved</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cart Items</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cart.reduce((sum, item) => sum + item.quantity, 0)}</div>
                <p className="text-xs text-muted-foreground">₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)} total</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="cart">Cart</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="space-y-6">
              <h2 className="text-xl font-semibold">Available Artisan Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { id: 1, name: "Handwoven Basket", price: 450, image: arecaBaskets, artisan: "Priya Crafts" },
                  { id: 2, name: "Areca Leaf Plates", price: 120, image: arecaPlates, artisan: "EcoWare" },
                  { id: 3, name: "Traditional Bowl Set", price: 800, image: arecaBowls, artisan: "Heritage Weaves" },
                  { id: 4, name: "Food Containers", price: 350, image: arecaContainers, artisan: "ArtisanHouse" },
                ].map((product) => (
                  <Card key={product.id}>
                    <CardHeader>
                      <div className="aspect-square bg-muted rounded-md mb-2 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <Badge variant="secondary">Available</Badge>
                      </div>
                      <CardDescription>By {product.artisan}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Price:</span>
                          <span className="font-medium">₹{product.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Delivery:</span>
                          <span className="font-medium">3-5 days</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button 
                          className="flex-1" 
                          onClick={() => handleBuyProduct(product)}
                        >
                          Buy Now
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleAddToWishlist(product)}
                        >
                          <Heart className={`h-4 w-4 ${wishlist.some(item => item.id === product.id) ? 'fill-current text-red-500' : ''}`} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="wishlist" className="space-y-6">
              <h2 className="text-xl font-semibold">Your Wishlist ({wishlist.length} items)</h2>
              {wishlist.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Your wishlist is empty</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlist.map((product) => (
                    <Card key={product.id}>
                      <CardHeader>
                        <div className="aspect-square bg-muted rounded-md mb-2 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleRemoveFromWishlist(product.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardDescription>By {product.artisan}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Price:</span>
                            <span className="font-medium">₹{product.price}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button 
                            className="flex-1" 
                            onClick={() => handleBuyProduct(product)}
                          >
                            Buy Now
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="cart" className="space-y-6">
              <h2 className="text-xl font-semibold">Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</h2>
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="w-20 h-20 bg-muted rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">By {item.artisan}</p>
                          <p className="font-medium">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleUpdateCartQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleUpdateCartQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{item.price * item.quantity}</p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total: ₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                        <Button className="ml-4">Proceed to Checkout</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <h2 className="text-xl font-semibold">Order History ({orders.length} orders)</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="w-20 h-20 bg-muted rounded-md overflow-hidden">
                        <img 
                          src={order.image} 
                          alt={order.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{order.name}</h3>
                        <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
                        <p className="text-sm text-muted-foreground">Ordered: {order.orderDate}</p>
                        <p className="font-medium">₹{order.price}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          {order.status === 'delivered' && <CheckCircle className="h-4 w-4 text-green-500" />}
                          {order.status === 'shipped' && <Truck className="h-4 w-4 text-blue-500" />}
                          {order.status === 'processing' && <Clock className="h-4 w-4 text-yellow-500" />}
                          <span className="text-sm font-medium capitalize">{order.status}</span>
                        </div>
                        {order.status === 'delivered' && (
                          <p className="text-xs text-muted-foreground">Delivered: {order.deliveryDate}</p>
                        )}
                        {order.status !== 'delivered' && (
                          <p className="text-xs text-muted-foreground">Expected: {order.estimatedDelivery}</p>
                        )}
                        <Button variant="outline" size="sm" className="mt-2">
                          Track Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="materials" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Order Raw Materials</h2>
                <Button onClick={() => setShowDemandForm(true)}>
                  Place Demand
                </Button>
              </div>

              {showDemandForm && (
                <Card>
                  <CardHeader>
                    <CardTitle>Place Material Demand</CardTitle>
                    <CardDescription>Specify your areca husk requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleDemandSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="demandQuantity">Quantity (kg)</Label>
                          <Input id="demandQuantity" type="number" placeholder="Enter quantity needed" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="demandType">Type</Label>
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
                      <div className="space-y-2">
                        <Label htmlFor="deliveryAddress">Delivery Address</Label>
                        <Textarea id="deliveryAddress" placeholder="Enter complete delivery address" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxPrice">Maximum Price per kg (₹)</Label>
                        <Input id="maxPrice" type="number" placeholder="Your budget per kg" />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit">Place Demand</Button>
                        <Button type="button" variant="outline" onClick={() => setShowDemandForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { id: 1, type: "Wet Husk", quantity: 50, price: 25, location: "Udupi", farmer: "Ravi Farm" },
                  { id: 2, type: "Dry Husk", quantity: 100, price: 30, location: "Mangalore", farmer: "Krishna Agriculture" },
                  { id: 3, type: "Wet Husk", quantity: 75, price: 22, location: "Kundapur", farmer: "Organic Farms" },
                ].map((material) => (
                  <Card key={material.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{material.type}</CardTitle>
                        <Badge variant="outline">Available</Badge>
                      </div>
                      <CardDescription>From {material.farmer}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Price:</span>
                          <span className="font-medium">₹{material.price}/kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Available:</span>
                          <span className="font-medium">{material.quantity} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Location:</span>
                          <span className="font-medium">{material.location}</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full mt-4" 
                        onClick={() => handleBuyProduct(material)}
                      >
                        Order Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Your Order</DialogTitle>
            <DialogDescription>
              Review your order details and confirm purchase
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium">{selectedProduct.name || `${selectedProduct.type} - ${selectedProduct.quantity}kg`}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedProduct.artisan || selectedProduct.farmer}
                </p>
                <p className="font-medium mt-2">₹{selectedProduct.price}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkoutAddress">Delivery Address</Label>
                <Textarea id="checkoutAddress" placeholder="Enter delivery address" />
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cod">Cash on Delivery</SelectItem>
                    <SelectItem value="upi">UPI Payment</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCheckout(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmOrder}>
              Confirm Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserDashboard;