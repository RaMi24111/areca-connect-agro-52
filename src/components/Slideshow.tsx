import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, AlertTriangle, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import burningImpactImg from "@/assets/burning-impact.jpg";
import sustainableUsesImg from "@/assets/sustainable-uses.jpg";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  type: "harm" | "benefit";
  icon: React.ReactNode;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Environmental Impact of Burning Areca Husk",
    description: "Burning areca husk releases harmful pollutants into the atmosphere, contributing to air pollution and respiratory problems. This practice also wastes valuable organic material that could be used sustainably.",
    image: burningImpactImg,
    type: "harm",
    icon: <AlertTriangle className="h-6 w-6" />
  },
  {
    id: 2,
    title: "Sustainable Uses of Areca Products",
    description: "Areca leaves and husks can be transformed into biodegradable plates, bowls, cups, and packaging materials. These eco-friendly alternatives help reduce plastic waste and support sustainable livelihoods.",
    image: sustainableUsesImg,
    type: "benefit",
    icon: <Recycle className="h-6 w-6" />
  }
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];
  const isHarmful = currentSlideData.type === "harm";

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <Card className={`overflow-hidden shadow-elevated ${isHarmful ? 'border-destructive/20' : 'border-primary/20'}`}>
        <div className="relative">
          <div 
            className="aspect-video w-full bg-cover bg-center transition-all duration-500"
            style={{ backgroundImage: `url(${currentSlideData.image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`p-4 rounded-full ${isHarmful ? 'bg-destructive' : 'bg-primary'}`}>
                {currentSlideData.icon}
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        
        <CardHeader className="text-center">
          <CardTitle className={`text-xl ${isHarmful ? 'text-destructive' : 'text-primary'}`}>
            {currentSlideData.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <CardDescription className="text-center text-base leading-relaxed">
            {currentSlideData.description}
          </CardDescription>
        </CardContent>
      </Card>
      
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? (isHarmful ? 'bg-destructive' : 'bg-primary')
                : 'bg-muted'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;