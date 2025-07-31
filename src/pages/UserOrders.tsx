import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Phone, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserOrders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = localStorage.getItem('userOrders');
    if (savedOrders) {
      const ordersList = JSON.parse(savedOrders);
      setOrders(ordersList);
      
      // If redirected from checkout with new order ID
      if (location.state?.newOrderId) {
        const newOrder = ordersList.find((order: any) => order.id === location.state.newOrderId);
        if (newOrder) {
          setSelectedOrder(newOrder);
        }
      }
    }
  }, [location.state]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
      case "processing":
        return <Clock className="h-4 w-4" />;
      case "packed":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "packed":
        return "bg-yellow-100 text-yellow-700";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const canCancelOrder = (status: string) => {
    return status === "confirmed" || status === "processing";
  };

  const handleCancelOrder = (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: "cancelled" }
        : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
    
    toast({
      title: "Order Cancelled",
      description: `Order ${orderId} has been cancelled successfully.`,
    });

    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: "cancelled" });
    }
  };

  const getOrderTotal = (order: any) => {
    if (order.total) return order.total;
    if (order.items) {
      return order.items.reduce((sum: number, item: any) => sum + (item.price * (item.quantity || 1)), 0);
    }
    return order.price || 0;
  };

  if (selectedOrder) {
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
                onClick={() => setSelectedOrder(null)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Order Details</h1>
                <p className="text-muted-foreground">Order ID: {selectedOrder.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Order Status & Items */}
              <div className="lg:col-span-2 space-y-6">
                {/* Status Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Order Status</span>
                      <Badge className={`${getStatusColor(selectedOrder.status)} flex items-center gap-1`}>
                        {getStatusIcon(selectedOrder.status)}
                        {selectedOrder.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Order Date</span>
                        <span>{new Date(selectedOrder.orderDate).toLocaleDateString()}</span>
                      </div>
                      {selectedOrder.estimatedDelivery && (
                        <div className="flex items-center justify-between">
                          <span>Estimated Delivery</span>
                          <span>{new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}</span>
                        </div>
                      )}
                      {canCancelOrder(selectedOrder.status) && (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleCancelOrder(selectedOrder.id)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel Order
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedOrder.items ? (
                        selectedOrder.items.map((item: any) => (
                          <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">Quantity: {item.quantity || 1}</p>
                              <p className="font-semibold mt-1">₹{(item.price * (item.quantity || 1)).toLocaleString()}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex gap-4 p-4 border rounded-lg">
                          <img 
                            src={selectedOrder.image} 
                            alt={selectedOrder.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{selectedOrder.name}</h3>
                            <p className="text-sm text-muted-foreground">Seller: {selectedOrder.seller}</p>
                            <p className="font-semibold mt-1">₹{selectedOrder.price?.toLocaleString()}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary & Address */}
              <div className="space-y-6">
                {/* Payment & Total */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Payment Method</span>
                        <span className="capitalize">{selectedOrder.paymentMethod || "COD"}</span>
                      </div>
                      {selectedOrder.upiId && (
                        <div className="flex justify-between">
                          <span>UPI ID</span>
                          <span className="text-sm">{selectedOrder.upiId}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total Paid</span>
                        <span>₹{getOrderTotal(selectedOrder).toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Address */}
                {selectedOrder.address && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Delivery Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <p className="font-semibold">{selectedOrder.address.name}</p>
                        <p className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {selectedOrder.address.phone}
                        </p>
                        <p>{selectedOrder.address.address}</p>
                        <p>{selectedOrder.address.city}, {selectedOrder.address.state}</p>
                        <p>PIN: {selectedOrder.address.pincode}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

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
              onClick={() => navigate('/user/home')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">My Orders</h1>
          </div>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
                <Button onClick={() => navigate('/user/home')}>
                  Start Shopping
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6" onClick={() => setSelectedOrder(order)}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                        {getStatusIcon(order.status)}
                        {order.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img 
                          src={order.items?.[0]?.image || order.image} 
                          alt={order.items?.[0]?.name || order.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">
                            {order.items?.[0]?.name || order.name}
                            {order.items && order.items.length > 1 && (
                              <span className="text-muted-foreground"> + {order.items.length - 1} more</span>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total: ₹{getOrderTotal(order).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserOrders;