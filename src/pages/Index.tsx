import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import earthSunrise from "@/assets/earth-sunrise.jpg";
import nasaLogo from "@/assets/nasa-logo.svg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${earthSunrise})`,
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* NASA Logo */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <img 
            src={nasaLogo} 
            alt="NASA Logo" 
            className="h-24 w-auto brightness-0 invert"
          />
        </div>
        
        {/* Game Title */}
        <h1 className="mb-3 text-5xl md:text-7xl font-bold text-white tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 text-center">
          NASA FARM NAVIGATORS
        </h1>
        
        {/* Team Name */}
        <p className="mb-16 text-lg md:text-xl text-white/90 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 font-medium">
          Space Apps Challenge 2025
        </p>
        
        {/* Start Button */}
        <Button
          variant="hero"
          size="lg"
          onClick={() => navigate("/dashboard")}
          className="h-16 px-16 text-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
        >
          INICIAR SIMULAÇÃO
        </Button>
      </div>
    </div>
  );
};

export default Index;
