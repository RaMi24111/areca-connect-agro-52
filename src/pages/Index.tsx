import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Slideshow from "@/components/Slideshow";
import { Leaf, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import arecaHeroImg from "@/assets/areca-hero.jpg";

const Index = () => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    // Check if user is logged in
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      navigate("/user/home");
    } else {
      // Direct to register page with auto-select user role
      navigate("/register?role=user");
    }
  };
  const products = [
    {
      id: 1,
      name: "Areca Leaf Plates",
      description: "100% biodegradable plates made from natural areca palm leaves. Perfect for eco-friendly dining.",
      price: "₹5-15/piece",
      category: "Tableware"
    },
    {
      id: 2,
      name: "Areca Leaf Bowls",
      description: "Sustainable bowls crafted from areca leaves. Microwave safe and compostable.",
      price: "₹8-20/piece",
      category: "Tableware"
    },
    {
      id: 3,
      name: "Areca Packaging",
      description: "Eco-friendly packaging solutions replacing plastic containers and wraps.",
      price: "₹10-25/piece",
      category: "Packaging"
    },
    {
      id: 4,
      name: "Areca Decorative Items",
      description: "Beautiful handicrafts and decorative pieces made from areca materials.",
      price: "₹50-500/piece",
      category: "Handicrafts"
    },
    {
      id: 5,
      name: "Areca Compost",
      description: "Organic compost made from areca waste, perfect for sustainable farming.",
      price: "₹15-30/kg",
      category: "Agriculture"
    },
    {
      id: 6,
      name: "Areca Mulch",
      description: "Natural mulch from areca husks for water retention and soil protection.",
      price: "₹20-40/kg", 
      category: "Agriculture"
    }
  ];

  const stats = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "500+",
      description: "Eco-friendly Products",
      gradient: "bg-gradient-primary"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "1000+",
      description: "Farmers & Artisans",
      gradient: "bg-gradient-earth"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "50,000+",
      description: "Plastic Items Replaced",
      gradient: "bg-gradient-primary"
    }
  ];

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${arecaHeroImg})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            ArecaConnect
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Connecting farmers and artisans to create sustainable areca products. 
            Join the eco-friendly revolution!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary text-white px-8 py-3">
              Explore Products
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center shadow-soft border-0">
                <CardHeader className="space-y-4">
                  <div className={`w-16 h-16 rounded-full ${stat.gradient} flex items-center justify-center mx-auto text-white`}>
                    {stat.icon}
                  </div>
                  <CardTitle className="text-3xl font-bold text-primary">
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg">
                    {stat.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gradient mb-4 animate-fade-in">
              🌟 Explore Artisan Products Made from Areca Husk
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-scale-in">
              Discover our range of eco-friendly products crafted by skilled artisans using sustainable areca materials
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group overflow-hidden card-interactive glow hover:shadow-hover transition-all duration-500 border-0 shadow-soft animate-fade-in relative">
                <div className="absolute inset-0 bg-gradient-subtle opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  {/* Leaf-themed border accent */}
                  <div className="absolute top-2 left-2 w-8 h-8 bg-gradient-primary rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-gradient-earth rounded-full opacity-15 group-hover:opacity-30 transition-opacity duration-300" />
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-gradient group-hover:scale-[1.02] transition-transform duration-300">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-sm group-hover:text-muted-foreground/80 transition-colors duration-300">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <span className="text-lg font-bold text-gradient">{product.price}</span>
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleProductClick} 
                          variant="outline"
                          size="sm"
                          className="flex-1 group/btn hover:border-primary/50"
                        >
                          View Product
                        </Button>
                        <Button 
                          onClick={handleProductClick}
                          variant="gradient"
                          size="sm" 
                          className="flex-1 animate-pulse-glow group/btn"
                        >
                          🛒 Buy Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Slideshow Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Environmental Impact & Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn about the environmental effects of burning areca husk and discover sustainable alternatives
            </p>
          </div>
          
          <Slideshow />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-6 w-6" />
            <span className="text-xl font-bold">ArecaConnect</span>
          </div>
          <p className="text-primary-foreground/80">
            Empowering sustainable agriculture and eco-friendly craftsmanship
          </p>
        </div>
      </footer>
    </>
  );
};

export default Index;
