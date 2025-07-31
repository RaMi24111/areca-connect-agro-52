import { useState } from "react";
import Navigation from "@/components/Navigation";
import IndustrySidebar from "@/components/IndustrySidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Search, Package, TrendingUp, Menu, MapPin, CreditCard, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const IndustryHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderFormData, setOrderFormData] = useState({
    quantity: "",
    huskType: "",
    harvestDate: "",
    paymentMethod: ""
  });
  const [orders, setOrders] = useState([
    { id: 1, quantity: "10 tonnes", status: "Processing", date: "2024-01-15", farmer: "John Doe" },
    { id: 2, quantity: "5 tonnes", status: "Shipped", date: "2024-01-10", farmer: "Jane Smith" }
  ]);
  const [editingOrder, setEditingOrder] = useState(null);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOrderFormData({
      ...orderFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingOrder) {
      setOrders(orders.map(order => 
        order.id === editingOrder.id 
          ? { ...order, quantity: orderFormData.quantity, date: orderFormData.harvestDate }
          : order
      ));
      setEditingOrder(null);
      toast({
        title: "Order Updated",
        description: "Your order has been successfully updated.",
      });
    } else {
      const newOrder = {
        id: orders.length + 1,
        quantity: orderFormData.quantity,
        status: "Processing",
        date: orderFormData.harvestDate,
        farmer: "Assigned Farmer"
      };
      setOrders([...orders, newOrder]);
      toast({
        title: "Order Placed",
        description: "Your order has been successfully placed and is being processed.",
      });
    }
    
    // Reset form
    setOrderFormData({
      quantity: "",
      huskType: "",
      harvestDate: "",
      paymentMethod: ""
    });
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setOrderFormData({
      quantity: order.quantity,
      huskType: "",
      harvestDate: order.date,
      paymentMethod: ""
    });
  };

  const handleDeleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
    toast({
      title: "Order Deleted",
      description: "Order has been successfully deleted.",
      variant: "destructive"
    });
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-subtle pt-20">
        <div className="flex">
          <IndustrySidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          
          {/* Main Content */}
          <div className="flex-1 p-4 lg:ml-0">
            {/* Mobile Menu Button */}
            <Button 
              variant="outline" 
              size="icon" 
              className="lg:hidden mb-4"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="container mx-auto max-w-6xl flex flex-col items-center">
              <div className="flex justify-between items-start mb-8 w-full">
                <div className="text-center flex-1">
                  <h1 className="text-4xl font-bold text-foreground mb-4">Industry Dashboard</h1>
                  <p className="text-xl text-muted-foreground">Source sustainable materials for your business</p>
                </div>
                <div className="bg-muted/50 px-4 py-2 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">User ID</p>
                  <p className="text-base font-mono font-semibold">AMi_1</p>
                </div>
              </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 w-full max-w-4xl">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last week
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sourced</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25,000 kg</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹1,25,000</div>
                <p className="text-xs text-muted-foreground">
                  vs traditional sourcing
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Suppliers</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">
                  Active partners
                </p>
              </CardContent>
            </Card>
          </div>

              <Card className="w-full max-w-4xl">
                <CardHeader>
                  <CardTitle>{editingOrder ? "Edit Order" : "Place Order"}</CardTitle>
                  <CardDescription>
                    {editingOrder ? "Update your order details" : "Order areca husks directly from farmers"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="quantity">Quantity (tonnes)</Label>
                        <Input
                          id="quantity"
                          name="quantity"
                          value={orderFormData.quantity}
                          onChange={handleInputChange}
                          placeholder="Enter required quantity"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="huskType">Husk Type</Label>
                        <Select onValueChange={(value) => setOrderFormData({...orderFormData, huskType: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select husk type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wet">Wet Husks</SelectItem>
                            <SelectItem value="dry">Dry Husks</SelectItem>
                            <SelectItem value="mixed">Mixed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="harvestDate">Preferred Harvest Date</Label>
                        <Input
                          id="harvestDate"
                          name="harvestDate"
                          type="date"
                          value={orderFormData.harvestDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="paymentMethod">Payment Method</Label>
                        <Select onValueChange={(value) => setOrderFormData({...orderFormData, paymentMethod: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="upi">UPI</SelectItem>
                            <SelectItem value="cod">Cash on Delivery</SelectItem>
                            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg space-y-2">
                      <h3 className="font-medium flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Delivery Address
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {/* This would be populated from profile data */}
                        123 Industrial Area, Manufacturing Hub, City - 123456
                      </p>
                    </div>

                    <div className="bg-muted p-4 rounded-lg space-y-2">
                      <h3 className="font-medium flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Bank Information
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Bank: HDFC Bank | Account: ****1234 | IFSC: HDFC0001234
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {editingOrder ? "Update Order" : "Confirm & Create Order"}
                      </Button>
                      {editingOrder && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setEditingOrder(null);
                            setOrderFormData({
                              quantity: "",
                              huskType: "",
                              harvestDate: "",
                              paymentMethod: ""
                            });
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="mt-6 w-full max-w-4xl">
                <CardHeader>
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription>Track and manage your orders</CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No orders yet</p>
                      <p className="text-sm text-muted-foreground mt-2">Your orders will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Order #{order.id}</h4>
                              <p className="text-sm text-muted-foreground">Quantity: {order.quantity}</p>
                              <p className="text-sm text-muted-foreground">Date: {order.date}</p>
                              <p className="text-sm text-muted-foreground">Farmer: {order.farmer}</p>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                order.status === "Processing" ? "bg-yellow-100 text-yellow-800" :
                                order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                                "bg-green-100 text-green-800"
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEditOrder(order)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDeleteOrder(order.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndustryHome;