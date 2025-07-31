import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, User, LayoutDashboard, LogOut } from "lucide-react";
import RegisterButton from "./RegisterButton";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Navigation = () => {
  const location = useLocation();
  const [farmerProfile, setFarmerProfile] = useState<any>(null);
  const [artisanProfile, setArtisanProfile] = useState<any>(null);
  const [industryProfile, setIndustryProfile] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const profile = localStorage.getItem('farmerProfile');
    if (profile) {
      setFarmerProfile(JSON.parse(profile));
    }

    const artProfile = localStorage.getItem('artisanProfile');
    if (artProfile) {
      setArtisanProfile(JSON.parse(artProfile));
    }

    const indProfile = localStorage.getItem('industryProfile');
    if (indProfile) {
      setIndustryProfile(JSON.parse(indProfile));
    }

    const userProf = localStorage.getItem('userProfile');
    if (userProf) {
      setUserProfile(JSON.parse(userProf));
    }
  }, []);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          to={industryProfile ? "/industry/home" : farmerProfile ? "/farmer/home" : artisanProfile ? "/artisan/home" : userProfile ? "/user/home" : "/"} 
          className="flex items-center space-x-2 group hover:scale-[1.05] transition-transform duration-300"
        >
          <Leaf className="h-8 w-8 text-primary group-hover:animate-pulse" />
          <span className="text-xl font-bold text-gradient animate-fade-in">
            ArecaConnect
          </span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button 
              variant={location.pathname === "/" ? "default" : "ghost"}
              className="text-sm hover:scale-[1.02] transition-transform duration-200"
            >
              Home
            </Button>
          </Link>
          
          {farmerProfile ? (
            <>
              <Link to="/farmer/home">
                <Button variant="ghost" className="flex items-center space-x-2 hover:scale-[1.02] transition-transform duration-200">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <FarmerProfileButton farmerProfile={farmerProfile} />
            </>
          ) : artisanProfile ? (
            <>
              <Link to="/artisan/home">
                <Button variant="ghost" className="flex items-center space-x-2 hover:scale-[1.02] transition-transform duration-200">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <ArtisanProfileButton artisanProfile={artisanProfile} />
            </>
          ) : industryProfile ? (
            <>
              <Link to="/industry/home">
                <Button variant="ghost" className="flex items-center space-x-2 hover:scale-[1.02] transition-transform duration-200">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <IndustryProfileButton industryProfile={industryProfile} />
            </>
          ) : userProfile ? (
            <>
              <Link to="/user/home">
                <Button variant="ghost" className="flex items-center space-x-2 hover:scale-[1.02] transition-transform duration-200">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <UserProfileButton userProfile={userProfile} />
            </>
          ) : (
            <RegisterButton />
          )}
        </div>
      </div>
    </nav>
  );
};

const ArtisanProfileButton = ({ artisanProfile }: { artisanProfile: any }) => {
  const [editableProfile, setEditableProfile] = useState<any>(artisanProfile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditableProfile(artisanProfile);
  }, [artisanProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableProfile({
      ...editableProfile,
      [e.target.name]: e.target.value
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditableProfile(prev => ({ ...prev, brandLogo: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setEditableProfile(prev => ({ ...prev, logoPreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('artisanProfile', JSON.stringify(editableProfile));
    setIsEditing(false);
    window.location.reload();
  };

  const handleCancel = () => {
    setEditableProfile(artisanProfile);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('artisanProfile');
    localStorage.removeItem('artisanProducts');
    localStorage.removeItem('artisanOrders');
    window.location.href = '/';
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2 hover:scale-[1.02] transition-transform duration-200">
          {artisanProfile?.logoPreview ? (
            <Avatar className="h-5 w-5">
              <AvatarImage src={artisanProfile.logoPreview} />
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
          <SheetTitle>Artisan Profile</SheetTitle>
          <SheetDescription>
            {isEditing ? "Edit your profile information" : "Your profile information"}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <Avatar 
                className={`w-20 h-20 ${isEditing ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
                onClick={isEditing ? () => document.getElementById('home-logo')?.click() : undefined}
              >
                <AvatarImage src={editableProfile?.logoPreview} />
                <AvatarFallback>
                  {editableProfile?.userId?.slice(0, 2) || 'AM'}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Input
                  id="home-logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              )}
            </div>
            {isEditing && <p className="text-xs text-muted-foreground">Click logo to upload</p>}
            <h3 className="font-semibold">{editableProfile?.userId}</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Artisan ID</Label>
              <p className="text-sm text-muted-foreground">{editableProfile?.userId}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Brand Name</Label>
              {isEditing ? (
                <Input
                  name="brandName"
                  value={editableProfile?.brandName || ''}
                  onChange={handleInputChange}
                  placeholder="Brand Name"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{editableProfile?.brandName}</p>
              )}
            </div>
            
            <div>
              <Label className="text-sm font-medium">Account Number</Label>
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
              <Label className="text-sm font-medium">Address</Label>
              <p className="text-sm text-muted-foreground">
                {editableProfile?.address}, {editableProfile?.city}, {editableProfile?.state} - {editableProfile?.pin}
              </p>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Husk Requirements</Label>
              <p className="text-sm text-muted-foreground">
                {editableProfile?.huskQuantity || 'N/A'} • {editableProfile?.huskType || 'N/A'} • {editableProfile?.frequency || 'N/A'}
              </p>
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
  );
};

const FarmerProfileButton = ({ farmerProfile }: { farmerProfile: any }) => {
  const [editableProfile, setEditableProfile] = useState<any>(farmerProfile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditableProfile(farmerProfile);
  }, [farmerProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setIsEditing(false);
    window.location.reload(); // Refresh to update the navigation
  };

  const handleCancel = () => {
    setEditableProfile(farmerProfile);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('farmerProfile');
    localStorage.removeItem('farmerBatches');
    window.location.href = '/';
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2 hover:scale-[1.02] transition-transform duration-200">
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
                onClick={isEditing ? () => document.getElementById('home-photo')?.click() : undefined}
              >
                <AvatarImage src={editableProfile?.photoPreview} />
                <AvatarFallback>
                  {editableProfile?.userId?.slice(0, 2) || 'AM'}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Input
                  id="home-photo"
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
  );
};

const IndustryProfileButton = ({ industryProfile }: { industryProfile: any }) => {
  const handleLogout = () => {
    localStorage.removeItem('industryProfile');
    localStorage.removeItem('industryRegistration');
    window.location.href = '/';
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2 hover:scale-[1.02] transition-transform duration-200">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Industry Profile</SheetTitle>
          <SheetDescription>
            Your business profile information
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="w-20 h-20">
              <AvatarFallback>
                {industryProfile?.companyName?.slice(0, 2) || 'IN'}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold">{industryProfile?.companyName}</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Contact Person</Label>
              <p className="text-sm text-muted-foreground">{industryProfile?.registrantName}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Role</Label>
              <p className="text-sm text-muted-foreground">{industryProfile?.roleOfContact}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Company Phone</Label>
              <p className="text-sm text-muted-foreground">{industryProfile?.companyPhone}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium">GST Number</Label>
              <p className="text-sm text-muted-foreground">{industryProfile?.gstNumber}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Bank Account</Label>
              <p className="text-sm text-muted-foreground">{industryProfile?.accountNumber}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Address</Label>
              <p className="text-sm text-muted-foreground">
                {industryProfile?.companyAddress}
                {industryProfile?.city && `, ${industryProfile.city}, ${industryProfile.state} - ${industryProfile.pinCode}`}
              </p>
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <Link to="/industry/profile-view">
              <Button 
                variant="outline" 
                className="w-full hover:scale-[1.02] transition-transform duration-200"
              >
                View Full Profile
              </Button>
            </Link>
            
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
  );
};

const UserProfileButton = ({ userProfile }: { userProfile: any }) => {
  const [editableProfile, setEditableProfile] = useState<any>(userProfile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load complete profile if available
    const completeProfile = localStorage.getItem('userProfileComplete');
    if (completeProfile) {
      setEditableProfile(JSON.parse(completeProfile));
    } else {
      setEditableProfile(userProfile);
    }
  }, [userProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableProfile({
      ...editableProfile,
      [e.target.name]: e.target.value
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
    localStorage.setItem('userProfileComplete', JSON.stringify(editableProfile));
    setIsEditing(false);
    window.location.reload();
  };

  const handleCancel = () => {
    const completeProfile = localStorage.getItem('userProfileComplete');
    if (completeProfile) {
      setEditableProfile(JSON.parse(completeProfile));
    } else {
      setEditableProfile(userProfile);
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userProfileComplete');
    window.location.href = '/';
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2 hover:scale-[1.02] transition-transform duration-200">
          {editableProfile?.photoPreview ? (
            <Avatar className="h-5 w-5">
              <AvatarImage src={editableProfile.photoPreview} />
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
          <SheetTitle>User Profile</SheetTitle>
          <SheetDescription>
            {isEditing ? "Edit your profile information" : "Your profile information"}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <Avatar 
                className={`w-20 h-20 ${isEditing ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
                onClick={isEditing ? () => document.getElementById('user-photo')?.click() : undefined}
              >
                <AvatarImage src={editableProfile?.photoPreview} />
                <AvatarFallback>
                  {editableProfile?.name?.charAt(0)?.toUpperCase() || editableProfile?.userId?.slice(0, 2) || 'AU'}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Input
                  id="user-photo"
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
              <Label className="text-sm font-medium">Name</Label>
              <p className="text-sm text-muted-foreground">{editableProfile?.name}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Contact</Label>
              <p className="text-sm text-muted-foreground">
                {editableProfile?.contact} ({editableProfile?.contactType})
              </p>
            </div>
            
            {editableProfile?.email && (
              <div>
                <Label className="text-sm font-medium">Email</Label>
                <p className="text-sm text-muted-foreground">{editableProfile?.email}</p>
              </div>
            )}
            
            {editableProfile?.address && (
              <div>
                <Label className="text-sm font-medium">Address</Label>
                <p className="text-sm text-muted-foreground">
                  {editableProfile?.address}, {editableProfile?.city}, {editableProfile?.state} - {editableProfile?.pincode}
                </p>
              </div>
            )}
            
            {editableProfile?.accountNumber && (
              <div>
                <Label className="text-sm font-medium">Bank Details</Label>
                <p className="text-sm text-muted-foreground">
                  Account: {editableProfile?.accountNumber} • IFSC: {editableProfile?.ifscCode}
                </p>
              </div>
            )}
          </div>
          
          <div className="space-y-2 pt-4">
            <Button 
              variant="outline" 
              className="w-full hover:scale-[1.02] transition-transform duration-200"
              onClick={() => window.location.href = '/user/profile'}
            >
              Edit Profile
            </Button>
            
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
  );
};

export default Navigation;