import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import worldMapBg from "@/assets/world-map-bg.jpg";
import { Sprout } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${worldMapBg})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/80" />
      
      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* Logo/Title */}
        <div className="mb-8 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sprout className="h-16 w-16 text-primary" strokeWidth={2.5} />
        </div>
        
        <h1 className="mb-4 text-6xl md:text-8xl font-black text-foreground tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Plantio
        </h1>
        
        <p className="mb-12 text-xl md:text-2xl text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          Cultive seu império agrícola pelo mundo
        </p>
        
        {/* Play Button */}
        <Button
          variant="hero"
          size="lg"
          onClick={() => navigate("/mapa")}
          className="h-14 px-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
        >
          Jogar
        </Button>
      </div>
    </div>
  );
};

export default Index;
