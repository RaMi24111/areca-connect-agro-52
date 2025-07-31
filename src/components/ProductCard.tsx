import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Truck, Shield, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  seller: string;
  image: string;
  availability: number;
  rating: number;
  reviews: number;
  discount?: number;
  deliveryTime: string;
  tags?: string[];
}

interface ProductCardProps {
  product: Product;
  onAddToWishlist?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToWishlist, onAddToCart, onBuyNow }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      toast({
        title: "Added to Cart",
        description: `${product.name} added to your cart`,
      });
    }
  };

  const handleWishlist = () => {
    if (onAddToWishlist && !isWishlisted) {
      onAddToWishlist(product);
      setIsWishlisted(true);
    } else {
      setIsWishlisted(!isWishlisted);
      toast({
        title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
        description: `${product.name} ${isWishlisted ? "removed from" : "added to"} your wishlist`,
      });
    }
  };

  const handleBuyNow = () => {
    // Check if user is logged in
    const userData = localStorage.getItem('userProfile');
    if (!userData) {
      toast({
        title: "Login Required",
        description: "Please login to continue with your purchase",
        variant: "destructive"
      });
      navigate('/user-login');
      return;
    }

    // Navigate to checkout with the product as checkout item
    const checkoutItem = { ...product, quantity: 1 };
    navigate('/user/checkout', { 
      state: { 
        items: [checkoutItem] 
      } 
    });

    if (onBuyNow) {
      onBuyNow(product);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="group overflow-hidden card-interactive glow hover:shadow-hover transition-all duration-500 border-0 shadow-soft animate-fade-in">
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square bg-gradient-subtle relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Discount Badge */}
          {product.discount && (
            <Badge className="absolute top-2 left-2 bg-gradient-primary hover:bg-gradient-vibrant animate-pulse-glow">
              {product.discount}% OFF
            </Badge>
          )}
          
          {/* Wishlist Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white hover:scale-110 transition-all duration-300 shadow-soft"
            onClick={handleWishlist}
          >
            <Heart className={`h-4 w-4 transition-colors duration-300 ${isWishlisted ? "fill-red-500 text-red-500 animate-pulse" : "hover:text-red-500"}`} />
          </Button>
        </div>

        {/* Product Info */}
        <CardHeader className="pb-2">
          <div className="space-y-1">
            <CardTitle className="text-lg leading-tight line-clamp-2 text-gradient group-hover:scale-[1.02] transition-transform duration-300">{product.name}</CardTitle>
            <CardDescription className="text-sm line-clamp-2 animate-scale-in">{product.description}</CardDescription>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Price */}
          <div className="flex items-center gap-2 mb-3 animate-fade-in">
            <span className="text-xl font-bold text-gradient">{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Seller & Delivery Info */}
          <div className="space-y-2 mb-4">
            <p className="text-sm text-muted-foreground">
              By <span className="font-medium">{product.seller}</span>
            </p>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <Truck className="h-3 w-3" />
              <span>Delivery in {product.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-600">
              <Shield className="h-3 w-3" />
              <span>AdikeMart Assured</span>
            </div>
          </div>

          {/* Tags */}
          {product.tags && (
            <div className="flex flex-wrap gap-1 mb-4">
              {product.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs animate-pulse hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Stock Status */}
          <div className="mb-4">
            {product.availability > 10 ? (
              <span className="text-xs text-green-600 font-medium">In Stock</span>
            ) : product.availability > 0 ? (
              <span className="text-xs text-orange-600 font-medium">
                Only {product.availability} left!
              </span>
            ) : (
              <span className="text-xs text-red-600 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button 
                onClick={handleAddToCart}
                variant="outline" 
                className="flex-1 group/btn"
                disabled={product.availability === 0}
              >
                <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:animate-bounce" />
                Add to Cart
              </Button>
              
              <Button 
                variant="gradient"
                size="lg"
                className="flex-1" 
                onClick={handleBuyNow}
                disabled={product.availability === 0}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProductCard;