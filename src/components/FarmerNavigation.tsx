import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FarmerNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [farmerProfile, setFarmerProfile] = useState<any>(null);
  const [editableProfile, setEditableProfile] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const profile = localStorage.getItem('farmerProfile');
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setFarmerProfile(parsedProfile);
      setEditableProfile(parsedProfile);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditableProfile({
      ...editableProfile,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value: string) => {
    setEditableProfile({
      ...editableProfile,
      harvestMonth: value
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditableProfile(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setEditableProfile(prev => ({ ...prev, photoPreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('farmerProfile', JSON.stringify(editableProfile));
    setFarmerProfile(editableProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableProfile(farmerProfile);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('farmerProfile');
    localStorage.removeItem('farmerBatches');
    navigate('/');
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ArecaConnect
          </span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button 
              variant={location.pathname === "/" ? "default" : "ghost"}
              className="text-sm"
            >
              Home
            </Button>
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                {farmerProfile?.photoPreview ? (
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={farmerProfile.photoPreview} />
                    <AvatarFallback>
                      <User className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <User className="h-4 w-4" />
                )}
                <span>Profile</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Farmer Profile</SheetTitle>
                <SheetDescription>
                  {isEditing ? "Edit your profile information" : "Your profile information"}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-4">
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative">
                    <Avatar 
                      className={`w-20 h-20 ${isEditing ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
                      onClick={isEditing ? () => document.getElementById('photo')?.click() : undefined}
                    >
                      <AvatarImage src={editableProfile?.photoPreview} />
                      <AvatarFallback>
                        {editableProfile?.userId?.slice(0, 2) || 'AM'}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    )}
                  </div>
                  {isEditing && <p className="text-xs text-muted-foreground">Click photo to upload</p>}
                  <h3 className="font-semibold">{editableProfile?.userId}</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">User ID</Label>
                    <p className="text-sm text-muted-foreground">{editableProfile?.userId}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Bank Account</Label>
                    {isEditing ? (
                      <Input
                        name="accountNumber"
                        value={editableProfile?.accountNumber || ''}
                        onChange={handleInputChange}
                        placeholder="Account Number"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{editableProfile?.accountNumber}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">IFSC Code</Label>
                    {isEditing ? (
                      <Input
                        name="ifscCode"
                        value={editableProfile?.ifscCode || ''}
                        onChange={handleInputChange}
                        placeholder="IFSC Code"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{editableProfile?.ifscCode}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Farm Size</Label>
                    {isEditing ? (
                      <Input
                        name="farmSize"
                        value={editableProfile?.farmSize || ''}
                        onChange={handleInputChange}
                        placeholder="Farm Size (acres)"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{editableProfile?.farmSize} acres</p>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Number of Trees</Label>
                    {isEditing ? (
                      <Input
                        name="numberOfTrees"
                        value={editableProfile?.numberOfTrees || ''}
                        onChange={handleInputChange}
                        placeholder="Number of Trees"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{editableProfile?.numberOfTrees}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Average Production</Label>
                    {isEditing ? (
                      <Input
                        name="averageProduction"
                        value={editableProfile?.averageProduction || ''}
                        onChange={handleInputChange}
                        placeholder="Average Production"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{editableProfile?.averageProduction}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Harvest Month</Label>
                    {isEditing ? (
                      <Select onValueChange={handleSelectChange} value={editableProfile?.harvestMonth || ''}>
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
                    ) : (
                      <p className="text-sm text-muted-foreground">{editableProfile?.harvestMonth}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} className="flex-1 hover:scale-[1.02] transition-transform duration-200">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleCancel} className="flex-1 hover:scale-[1.02] transition-transform duration-200">
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full hover:scale-[1.02] transition-transform duration-200"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full text-destructive hover:text-destructive hover:scale-[1.02] transition-transform duration-200"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default FarmerNavigation;