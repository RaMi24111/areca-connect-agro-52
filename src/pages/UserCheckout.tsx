import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Truck, MapPin, Clock, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get product data from location state or cart
  const [checkoutItems, setCheckoutItems] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [useProfileAddress, setUseProfileAddress] = useState(true);
  const [customAddress, setCustomAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  useEffect(() => {
    // Load user profile
    const userData = localStorage.getItem('userProfile');
    if (!userData) {
      navigate('/user-login');
      return;
    }
    const profile = JSON.parse(userData);
    setUserProfile(profile);
    
    // Set custom address from profile
    setCustomAddress({
      name: profile.name || "",
      phone: profile.phone || "",
      address: profile.address || "",
      city: profile.city || "",
      state: profile.state || "",
      pincode: profile.pincode || ""
    });

    // Get checkout items from location state or cart
    if (location.state?.items) {
      setCheckoutItems(location.state.items);
    } else {
      const cartData = localStorage.getItem('userCart');
      if (cartData) {
        setCheckoutItems(JSON.parse(cartData));
      } else {
        navigate('/user/home');
      }
    }
  }, [navigate, location.state]);

  const calculateTotal = () => {
    const subtotal = checkoutItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const shipping = subtotal > 500 ? 0 : 40; // Free shipping above ₹500
    return { subtotal, shipping, total: subtotal + shipping };
  };

  const handleAddressChange = (field: string, value: string) => {
    setCustomAddress(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    // Validate required fields
    if (paymentMethod === "upi" && !upiId) {
      toast({
        title: "UPI ID Required",
        description: "Please enter your UPI ID",
        variant: "destructive"
      });
      return;
    }

    const address = useProfileAddress ? {
      name: userProfile.name,
      phone: userProfile.phone,
      address: userProfile.address,
      city: userProfile.city,
      state: userProfile.state,
      pincode: userProfile.pincode
    } : customAddress;

    // Check if address is complete
    if (!address.name || !address.phone || !address.address || !address.city || !address.state || !address.pincode) {
      toast({
        title: "Incomplete Address",
        description: "Please fill in all address fields",
        variant: "destructive"
      });
      return;
    }

    const { total } = calculateTotal();
    
    // Create order with enhanced data for better tracking
    const newOrder = {
      id: `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`,
      items: checkoutItems.map(item => ({
        ...item,
        orderedAt: new Date().toISOString(),
        seller: item.seller || "AdikeMart"
      })),
      address: address,
      paymentMethod: paymentMethod,
      upiId: paymentMethod === "upi" ? upiId : null,
      total: total,
      subtotal: calculateTotal().subtotal,
      shipping: calculateTotal().shipping,
      status: "confirmed",
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      trackingSteps: [
        {
          status: "confirmed",
          date: new Date().toISOString(),
          description: "Order confirmed and being processed"
        }
      ],
      customerDetails: {
        name: address.name,
        phone: address.phone,
        userId: userProfile.id || `USER_${Date.now()}`
      }
    };

    // Save order to localStorage with error handling
    try {
      const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
      
      // Also save to a backup key for reliability
      localStorage.setItem('lastPlacedOrder', JSON.stringify(newOrder));
      
      console.log('Order saved successfully:', newOrder);
    } catch (error) {
      console.error('Error saving order:', error);
      toast({
        title: "Error",
        description: "Failed to save order. Please try again.",
        variant: "destructive"
      });
      return;
    }

    // Clear cart if checkout came from cart
    if (!location.state?.items) {
      localStorage.removeItem('userCart');
    }

    toast({
      title: "Order Placed Successfully!",
      description: `Your order ${newOrder.id} has been confirmed and is being processed`,
    });

    // Redirect to order tracking with order details
    navigate('/user/orders', { 
      state: { 
        newOrderId: newOrder.id,
        fromCheckout: true 
      } 
    });
  };

  if (!userProfile || checkoutItems.length === 0) {
    return <div>Loading...</div>;
  }

  const { subtotal, shipping, total } = calculateTotal();

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Address & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Address Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroup 
                      value={useProfileAddress ? "profile" : "custom"} 
                      onValueChange={(value) => setUseProfileAddress(value === "profile")}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="profile" id="profile" />
                        <Label htmlFor="profile">Use saved address</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="custom" id="custom" />
                        <Label htmlFor="custom">Enter new address</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {useProfileAddress ? (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-semibold">{userProfile.name}</p>
                      <p>{userProfile.phone}</p>
                      <p>{userProfile.address}</p>
                      <p>{userProfile.city}, {userProfile.state} - {userProfile.pincode}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Full Name"
                        value={customAddress.name}
                        onChange={(e) => handleAddressChange("name", e.target.value)}
                      />
                      <Input
                        placeholder="Phone Number"
                        value={customAddress.phone}
                        onChange={(e) => handleAddressChange("phone", e.target.value)}
                      />
                      <div className="md:col-span-2">
                        <Textarea
                          placeholder="Address"
                          value={customAddress.address}
                          onChange={(e) => handleAddressChange("address", e.target.value)}
                        />
                      </div>
                      <Input
                        placeholder="City"
                        value={customAddress.city}
                        onChange={(e) => handleAddressChange("city", e.target.value)}
                      />
                      <Input
                        placeholder="State"
                        value={customAddress.state}
                        onChange={(e) => handleAddressChange("state", e.target.value)}
                      />
                      <Input
                        placeholder="PIN Code"
                        value={customAddress.pincode}
                        onChange={(e) => handleAddressChange("pincode", e.target.value)}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex-1">UPI Payment</Label>
                    </div>
                    {paymentMethod === "upi" && (
                      <Input
                        placeholder="Enter UPI ID (e.g. user@paytm)"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="mt-2"
                      />
                    )}
                    
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1">Cash on Delivery</Label>
                      <Badge variant="secondary">Available</Badge>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {checkoutItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity || 1}</p>
                        </div>
                        <p className="font-semibold">₹{(item.price * (item.quantity || 1)).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Delivery Estimate */}
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Estimated delivery: 3-5 business days</span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handlePlaceOrder}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Place Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCheckout;