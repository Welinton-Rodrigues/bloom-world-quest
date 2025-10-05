import { useState, useEffect } from "react";
import { StatusBar } from "@/components/StatusBar";
import { FarmMap } from "@/components/FarmMap";
import { ActionPanel } from "@/components/ActionPanel";
import { EventPopup } from "@/components/EventPopup";
import { toast } from "sonner";

const Dashboard = () => {
  // Game state
  const [day, setDay] = useState(1);
  const [money, setMoney] = useState(5000);
  const [water, setWater] = useState(750);
  const [maxWater] = useState(1000);
  const [sustainability, setSustainability] = useState(85);
  const [soilMoisture, setSoilMoisture] = useState(60);
  const [cropGrowth, setCropGrowth] = useState(25);
  const [moistureHistory, setMoistureHistory] = useState([60, 58, 55, 62, 60]);
  
  // Event state
  const [eventPopup, setEventPopup] = useState<{
    isOpen: boolean;
    type: "drought" | "rain" | "heatwave" | null;
  }>({ isOpen: false, type: null });

  // Simulate random events
  useEffect(() => {
    const eventInterval = setInterval(() => {
      const random = Math.random();
      if (random < 0.1) { // 10% chance
        const events: ("drought" | "rain" | "heatwave")[] = ["drought", "rain", "heatwave"];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        setEventPopup({ isOpen: true, type: randomEvent });
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(eventInterval);
  }, []);

  // Day progression
  useEffect(() => {
    const dayInterval = setInterval(() => {
      setDay(prev => prev + 1);
      
      // Natural moisture decrease
      setSoilMoisture(prev => {
        const newValue = Math.max(0, prev - 5);
        setMoistureHistory(hist => [...hist.slice(-6), newValue]);
        return newValue;
      });
      
      // Crop growth (if moisture is adequate)
      if (soilMoisture > 30) {
        setCropGrowth(prev => Math.min(100, prev + 8));
      }
    }, 10000); // New day every 10 seconds for demo

    return () => clearInterval(dayInterval);
  }, [soilMoisture]);

  const handlePlant = () => {
    if (money >= 500) {
      setMoney(prev => prev - 500);
      setCropGrowth(0);
      toast.success("Sementes plantadas! Comece a irrigar para crescimento.");
    } else {
      toast.error("Dinheiro insuficiente! Precisa de $500.");
    }
  };

  const handleIrrigate = () => {
    if (water >= 50) {
      setWater(prev => prev - 50);
      setSoilMoisture(prev => Math.min(100, prev + 20));
      toast.success("Irrigação aplicada! +20% umidade do solo.");
    } else {
      toast.error("Água insuficiente! Precisa de 50 unidades.");
    }
  };

  const handleHarvest = () => {
    if (cropGrowth >= 100) {
      const profit = 1500;
      setMoney(prev => prev + profit);
      setCropGrowth(0);
      toast.success(`Colheita concluída! +$${profit}`);
    } else {
      toast.error(`Colheita não está pronta! Apenas ${cropGrowth}% crescida.`);
    }
  };

  const handleUpgrades = () => {
    toast.info("Sistema de upgrades em desenvolvimento!");
  };

  return (
    <div className="flex flex-col h-screen">
      <StatusBar
        day={day}
        money={money}
        water={water}
        maxWater={maxWater}
        sustainability={sustainability}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-6">
          <FarmMap soilMoisture={soilMoisture} />
        </div>
        
        <ActionPanel
          soilMoisture={soilMoisture}
          cropGrowth={cropGrowth}
          onPlant={handlePlant}
          onIrrigate={handleIrrigate}
          onHarvest={handleHarvest}
          onUpgrades={handleUpgrades}
          moistureHistory={moistureHistory}
        />
      </div>

      <EventPopup
        isOpen={eventPopup.isOpen}
        onClose={() => setEventPopup({ isOpen: false, type: null })}
        eventType={eventPopup.type}
      />
    </div>
  );
};

export default Dashboard;
