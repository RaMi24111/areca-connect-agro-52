import { useState, useEffect } from "react";
import FarmerNavigation from "@/components/FarmerNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Package, Plus, Calendar, User, LogOut, Camera, Edit2, Trash2 } from "lucide-react";

const FarmerHome = () => {
  const [sellFormData, setSellFormData] = useState({
    quantity: "",
    type: "",
    location: "",
    harvestDate: "",
    pickupDate: "",
    photo: null as File | null,
    photoPreview: ""
  });
  const [farmerProfile, setFarmerProfile] = useState<any>(null);
  const [batches, setBatches] = useState<any[]>([]);
  const [batchCount, setBatchCount] = useState(0);
  const [editingBatch, setEditingBatch] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Load farmer profile from localStorage
    const profile = localStorage.getItem('farmerProfile');
    if (profile) {
      setFarmerProfile(JSON.parse(profile));
    }
    
    // Load existing batches
    const savedBatches = localStorage.getItem('farmerBatches');
    if (savedBatches) {
      setBatches(JSON.parse(savedBatches));
    }
    
    const savedBatchCount = localStorage.getItem('batchCount');
    if (savedBatchCount) {
      setBatchCount(parseInt(savedBatchCount));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellFormData({
      ...sellFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setSellFormData({
      ...sellFormData,
      [name]: value
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSellFormData(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setSellFormData(prev => ({ ...prev, photoPreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate batch ID
    const newBatchCount = batchCount + 1;
    const batchId = `${farmerProfile?.userId || 'AMF_1'}_b${newBatchCount}`;
    
    const newBatch = {
      id: batchId,
      ...sellFormData,
      status: "Listed",
      paymentStatus: "Pending",
      createdAt: new Date().toISOString()
    };
    
    const updatedBatches = [...batches, newBatch];
    setBatches(updatedBatches);
    setBatchCount(newBatchCount);
    
    // Save to localStorage
    localStorage.setItem('farmerBatches', JSON.stringify(updatedBatches));
    localStorage.setItem('batchCount', newBatchCount.toString());
    
    // Reset form
    setSellFormData({
      quantity: "",
      type: "",
      location: "",
      harvestDate: "",
      pickupDate: "",
      photo: null,
      photoPreview: ""
    });
    
    console.log("New batch created:", newBatch);
  };

  const handleEditBatch = (batch: any) => {
    setEditingBatch(batch);
    setSellFormData({
      quantity: batch.quantity,
      type: batch.type,
      location: batch.location,
      harvestDate: batch.harvestDate,
      pickupDate: batch.pickupDate,
      photo: batch.photo,
      photoPreview: batch.photoPreview
    });
    setIsDialogOpen(true);
  };

  const handleUpdateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBatch) return;

    const updatedBatches = batches.map(batch => 
      batch.id === editingBatch.id 
        ? { ...batch, ...sellFormData }
        : batch
    );
    
    setBatches(updatedBatches);
    localStorage.setItem('farmerBatches', JSON.stringify(updatedBatches));
    
    // Reset form and close dialog
    setSellFormData({
      quantity: "",
      type: "",
      location: "",
      harvestDate: "",
      pickupDate: "",
      photo: null,
      photoPreview: ""
    });
    setEditingBatch(null);
    setIsDialogOpen(false);
  };

  const handleDeleteBatch = (batchId: string) => {
    if (confirm('Are you sure you want to delete this batch?')) {
      const updatedBatches = batches.filter(batch => batch.id !== batchId);
      setBatches(updatedBatches);
      localStorage.setItem('farmerBatches', JSON.stringify(updatedBatches));
    }
  };

  return (
    <>
      <FarmerNavigation />
      <div className="min-h-screen bg-gradient-subtle pt-20 p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Farmer Dashboard</h1>
              <p className="text-xl text-muted-foreground">Welcome back, {farmerProfile?.userId || 'Farmer'}</p>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sell">Upload New Batch</TabsTrigger>
              <TabsTrigger value="batches">My Batches</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{batches.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Listed batches
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {batches.filter(b => b.status === "Listed").length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Available for pickup
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Payment Pending</CardTitle>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {batches.filter(b => b.paymentStatus === "Pending").length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Awaiting payment
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Batches</CardTitle>
                  <CardDescription>Your latest uploaded batches</CardDescription>
                </CardHeader>
                <CardContent>
                  {batches.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No batches uploaded yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {batches.slice(-3).reverse().map((batch) => (
                        <div key={batch.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-semibold">{batch.id}</h4>
                            <p className="text-sm text-muted-foreground">
                              {batch.quantity} kg • {batch.type} • {batch.status}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{batch.paymentStatus}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(batch.createdAt).toLocaleDateString()}
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
                  <CardTitle>Upload New Areca Husk Batch</CardTitle>
                  <CardDescription>Create a new batch listing for your areca husks</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="quantity">Quantity (kg/tons)</Label>
                        <Input
                          id="quantity"
                          name="quantity"
                          value={sellFormData.quantity}
                          onChange={handleInputChange}
                          placeholder="Enter quantity"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="type">Type</Label>
                        <Select onValueChange={(value) => handleSelectChange("type", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wet">Wet Husks</SelectItem>
                            <SelectItem value="dry">Dry Husks</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={sellFormData.location}
                          onChange={handleInputChange}
                          placeholder="Enter pickup location"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="harvestDate">Date of Harvest</Label>
                        <Input
                          id="harvestDate"
                          name="harvestDate"
                          type="date"
                          value={sellFormData.harvestDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="pickupDate">Date of Pickup</Label>
                        <Input
                          id="pickupDate"
                          name="pickupDate"
                          type="date"
                          value={sellFormData.pickupDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="photo">Upload Batch Photo</Label>
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="mt-1"
                        required
                      />
                      {sellFormData.photoPreview && (
                        <div className="mt-2">
                          <img 
                            src={sellFormData.photoPreview} 
                            alt="Batch preview" 
                            className="w-32 h-32 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>

                    <Button type="submit" className="w-full hover:scale-[1.02] transition-transform duration-200">
                      <Camera className="h-4 w-4 mr-2" />
                      Upload Batch
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="batches">
              <Card>
                <CardHeader>
                  <CardTitle>My Batches</CardTitle>
                  <CardDescription>Track all your uploaded batches and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  {batches.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No batches uploaded yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {batches.map((batch) => (
                        <Card key={batch.id} className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <h4 className="font-semibold text-lg">{batch.id}</h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <Label className="text-muted-foreground">Quantity:</Label>
                                  <p>{batch.quantity} kg</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Type:</Label>
                                  <p className="capitalize">{batch.type}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Location:</Label>
                                  <p>{batch.location}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Harvest Date:</Label>
                                  <p>{batch.harvestDate}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Pickup Date:</Label>
                                  <p>{batch.pickupDate}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Created:</Label>
                                  <p>{new Date(batch.createdAt).toLocaleDateString()}</p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right space-y-2">
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                batch.status === 'Listed' ? 'bg-green-100 text-green-800' : 
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {batch.status}
                              </div>
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                batch.paymentStatus === 'Pending' ? 'bg-orange-100 text-orange-800' : 
                                'bg-green-100 text-green-800'
                              }`}>
                                Payment: {batch.paymentStatus}
                              </div>
                              <div className="flex space-x-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditBatch(batch)}
                                  className="hover:scale-[1.05] transition-transform duration-200"
                                >
                                  <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteBatch(batch.id)}
                                  className="hover:scale-[1.05] transition-transform duration-200"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          {batch.photoPreview && (
                            <div className="mt-4">
                              <img 
                                src={batch.photoPreview} 
                                alt={`Batch ${batch.id}`} 
                                className="w-24 h-24 object-cover rounded border"
                              />
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Edit Batch Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Batch: {editingBatch?.id}</DialogTitle>
                <DialogDescription>Update the details of your batch</DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleUpdateBatch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-quantity">Quantity (kg/tons)</Label>
                    <Input
                      id="edit-quantity"
                      name="quantity"
                      value={sellFormData.quantity}
                      onChange={handleInputChange}
                      placeholder="Enter quantity"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-type">Type</Label>
                    <Select onValueChange={(value) => handleSelectChange("type", value)} value={sellFormData.type}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wet">Wet Husks</SelectItem>
                        <SelectItem value="dry">Dry Husks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="edit-location">Location</Label>
                    <Input
                      id="edit-location"
                      name="location"
                      value={sellFormData.location}
                      onChange={handleInputChange}
                      placeholder="Enter pickup location"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-harvestDate">Date of Harvest</Label>
                    <Input
                      id="edit-harvestDate"
                      name="harvestDate"
                      type="date"
                      value={sellFormData.harvestDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-pickupDate">Date of Pickup</Label>
                    <Input
                      id="edit-pickupDate"
                      name="pickupDate"
                      type="date"
                      value={sellFormData.pickupDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit-photo">Update Batch Photo</Label>
                  <Input
                    id="edit-photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="mt-1"
                  />
                  {sellFormData.photoPreview && (
                    <div className="mt-2">
                      <img 
                        src={sellFormData.photoPreview} 
                        alt="Batch preview" 
                        className="w-32 h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1 hover:scale-[1.02] transition-transform duration-200">
                    Update Batch
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingBatch(null);
                      setSellFormData({
                        quantity: "",
                        type: "",
                        location: "",
                        harvestDate: "",
                        pickupDate: "",
                        photo: null,
                        photoPreview: ""
                      });
                    }}
                    className="flex-1 hover:scale-[1.02] transition-transform duration-200"
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

export default FarmerHome;