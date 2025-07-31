import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SlidersHorizontal, ShoppingCart, User, Menu, Heart, Package, Truck, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import arecaPlates from "@/assets/areca-plates.jpg";
import arecaBowls from "@/assets/areca-bowls.jpg";
import arecaBaskets from "@/assets/areca-baskets.jpg";
import arecaContainers from "@/assets/areca-containers.jpg";

const UserHome = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [userProfile, setUserProfile] = useState(null);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeView, setActiveView] = useState("products"); // products, wishlist, cart, orders
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is registered
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
          name: 'Premium Areca Leaf Plates', 
          price: 299, 
          status: 'delivered', 
          orderDate: '2024-01-15',
          image: arecaPlates
        },
        { 
          id: 'ORD002', 
          name: 'Handcrafted Areca Bowl Set', 
          price: 545, 
          status: 'shipped', 
          orderDate: '2024-01-20',
          image: arecaBowls
        }
      ];
      setOrders(mockOrders);
      localStorage.setItem('userOrders', JSON.stringify(mockOrders));
    }
  }, [navigate]);

  // Enhanced mock products data (Flipkart-style)
  const products = [
    {
      id: 1,
      name: "Premium Areca Leaf Plates - Pack of 25",
      description: "100% biodegradable dinner plates perfect for eco-friendly dining and events",
      price: 299,
      originalPrice: 399,
      category: "tableware",
      seller: "EcoLife Artisans",
      image: arecaPlates,
      availability: 156,
      rating: 4.3,
      reviews: 2847,
      discount: 25,
      deliveryTime: "2-3 days",
      tags: ["Biodegradable", "Premium Quality", "Party Essential"]
    },
    {
      id: 2,
      name: "Handcrafted Areca Bowl Set (6 pieces)",
      description: "Elegant set of 6 natural bowls handmade by skilled artisans for sustainable dining",
      price: 545,
      originalPrice: 699,
      category: "tableware",
      seller: "Artisan Craft Co.",
      image: arecaBowls,
      availability: 89,
      rating: 4.5,
      reviews: 1256,
      discount: 22,
      deliveryTime: "3-4 days",
      tags: ["Handmade", "Artisan Crafted", "Durable"]
    },
    {
      id: 3,
      name: "Designer Areca Storage Baskets",
      description: "Beautiful handwoven storage baskets perfect for organizing and home decoration",
      price: 1299,
      originalPrice: 1599,
      category: "handicrafts",
      seller: "Heritage Crafts",
      image: arecaBaskets,
      availability: 34,
      rating: 4.6,
      reviews: 567,
      discount: 19,
      deliveryTime: "4-5 days",
      tags: ["Home Decor", "Storage Solution", "Traditional"]
    },
    {
      id: 4,
      name: "Eco-Friendly Areca Food Containers",
      description: "Leak-proof food containers made from pressed areca leaves, microwave safe",
      price: 179,
      originalPrice: 229,
      category: "packaging",
      seller: "GreenPack Solutions",
      image: arecaContainers,
      availability: 200,
      rating: 4.2,
      reviews: 3421,
      discount: 22,
      deliveryTime: "1-2 days",
      tags: ["Microwave Safe", "Leak Proof", "Eco-Friendly"]
    },
    {
      id: 5,
      name: "Areca Leaf Wall Art - Nature Collection",
      description: "Stunning wall art pieces crafted from natural areca leaves for modern homes",
      price: 899,
      originalPrice: 1199,
      category: "decor",
      seller: "Modern Eco Arts",
      image: arecaBaskets,
      availability: 45,
      rating: 4.7,
      reviews: 234,
      discount: 25,
      deliveryTime: "5-6 days",
      tags: ["Wall Decor", "Modern Art", "Nature Inspired"]
    },
    {
      id: 6,
      name: "Disposable Areca Leaf Cups - Pack of 50",
      description: "Perfect for tea, coffee and beverages. 100% compostable and plastic-free",
      price: 149,
      originalPrice: 199,
      category: "tableware",
      seller: "Sustainable Living",
      image: arecaPlates,
      availability: 167,
      rating: 4.1,
      reviews: 1890,
      discount: 25,
      deliveryTime: "2-3 days",
      tags: ["Compostable", "Plastic-Free", "Party Cups"]
    }
  ];

  const categories = [
    { value: "all", label: "All Products" },
    { value: "tableware", label: "Tableware" },
    { value: "packaging", label: "Packaging" },
    { value: "handicrafts", label: "Handicrafts" },
    { value: "decor", label: "Home Decor" }
  ];

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "newest", label: "Newest First" }
  ];

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        default:
          return b.reviews - a.reviews; // popularity
      }
    });

  // Add functions for handling wishlist, cart, and orders
  const handleAddToWishlist = (product: any) => {
    const isAlreadyInWishlist = wishlist.some(item => item.id === product.id);
    if (!isAlreadyInWishlist) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem('userWishlist', JSON.stringify(updatedWishlist));
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    } else {
      toast({
        title: "Already in Wishlist",
        description: `${product.name} is already in your wishlist.`,
        variant: "destructive",
      });
    }
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
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = (product: any) => {
    // Navigate to checkout page with the selected product
    navigate('/user/checkout', { 
      state: { 
        items: [{ ...product, quantity: 1 }] 
      } 
    });
  };

  const handleRemoveFromWishlist = (productId: number) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('userWishlist', JSON.stringify(updatedWishlist));
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

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b pt-20">
          <div className="container mx-auto px-4 py-4">
            {/* Top Bar with AdikeMart and User ID */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-primary">AdikeMart</h1>
                <Badge variant="secondary" className="text-xs">
                  Welcome, {userProfile.name}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">User ID:</span>
                <Badge variant="outline" className="font-mono">
                  {userProfile.userId}
                </Badge>
              </div>
            </div>

            {/* Navigation Buttons Below AdikeMart */}
            <div className="flex items-center gap-2 mb-4">
              <Button 
                variant={activeView === "products" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveView("products")}
              >
                <Package className="h-4 w-4 mr-2" />
                Products
              </Button>
              <Button 
                variant={activeView === "wishlist" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveView("wishlist")}
                className="relative"
              >
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
                {wishlist.length > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
              <Button 
                variant={activeView === "cart" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveView("cart")}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {cart.length > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                    {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                  </Badge>
                )}
              </Button>
              <Button 
                variant={activeView === "orders" ? "default" : "outline"} 
                size="sm"
                onClick={() => navigate('/user/orders')}
              >
                <Truck className="h-4 w-4 mr-2" />
                Orders ({orders.length})
              </Button>
            </div>

            {/* Search Bar - Only show for products view */}
            {activeView === "products" && (
              <div className="flex gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search for products, brands and more..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 bg-gray-50 border-gray-200"
                  />
                </div>
                <Button className="h-12 px-8">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="container mx-auto px-4 py-6">
          {/* Products View */}
          {activeView === "products" && (
            <div className="flex gap-6">
              {/* Sidebar Filters */}
              <div className="w-64 space-y-4 hidden lg:block">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <button
                          key={category.value}
                          onClick={() => setSelectedCategory(category.value)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedCategory === category.value 
                              ? "bg-primary text-primary-foreground" 
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Price Range</h3>
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100">
                        Under ₹200
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100">
                        ₹200 - ₹500
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100">
                        ₹500 - ₹1000
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100">
                        Above ₹1000
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Products Content */}
              <div className="flex-1">
                {/* Results Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold">
                      Showing {filteredProducts.length} products
                      {selectedCategory !== "all" && (
                        <span className="text-muted-foreground">
                          {" "}in {categories.find(c => c.value === selectedCategory)?.label}
                        </span>
                      )}
                    </h2>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <div key={product.id}>
                        <ProductCard 
                          product={product} 
                          onAddToWishlist={handleAddToWishlist}
                          onAddToCart={handleAddToCart}
                          onBuyNow={handleBuyNow}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="mx-auto mb-4 w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Wishlist View */}
          {activeView === "wishlist" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Your Wishlist ({wishlist.length} items)</h2>
              {wishlist.length === 0 ? (
                <div className="text-center py-16">
                  <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
                  <p className="text-muted-foreground mb-4">
                    Add items you like to your wishlist. They'll show up here.
                  </p>
                  <Button onClick={() => setActiveView("products")}>
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {wishlist.map((product) => (
                    <Card key={product.id}>
                      <CardContent className="p-4">
                        <div className="aspect-square bg-muted rounded-md mb-3 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-medium mb-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">By {product.seller}</p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleBuyNow(product)}
                          >
                            Buy Now
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRemoveFromWishlist(product.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Cart View */}
          {activeView === "cart" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Shopping Cart ({cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} items)</h2>
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-4">
                    Add some products to your cart to continue shopping.
                  </p>
                  <Button onClick={() => setActiveView("products")}>
                    Browse Products
                  </Button>
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
                          <p className="text-sm text-muted-foreground">By {item.seller}</p>
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
                        <span className="text-lg font-semibold">
                          Total: ₹{cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)}
                        </span>
                        <Button 
                          className="ml-4"
                          onClick={() => navigate('/user/checkout')}
                        >
                          Proceed to Checkout
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Orders View */}
          {activeView === "orders" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Order History ({orders.length} orders)</h2>
              {orders.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start shopping to see your orders here.
                  </p>
                  <Button onClick={() => setActiveView("products")}>
                    Browse Products
                  </Button>
                </div>
              ) : (
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
                          <p className="text-sm text-muted-foreground">Order Date: {order.orderDate}</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">₹{order.price}</p>
                          <Badge variant={
                            order.status === 'delivered' ? 'default' : 
                            order.status === 'shipped' ? 'secondary' : 
                            'outline'
                          }>
                            {order.status === 'delivered' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {order.status === 'shipped' && <Truck className="h-3 w-3 mr-1" />}
                            {order.status === 'processing' && <Clock className="h-3 w-3 mr-1" />}
                            {order.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <Button variant="outline" size="sm">
                            Track Order
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserHome;