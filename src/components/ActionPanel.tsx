import { Sprout, Droplet, ScissorsIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ActionPanelProps {
  soilMoisture: number;
  cropGrowth: number;
  onPlant: () => void;
  onIrrigate: () => void;
  onHarvest: () => void;
  onUpgrades: () => void;
  moistureHistory: number[];
}

export const ActionPanel = ({
  soilMoisture,
  cropGrowth,
  onPlant,
  onIrrigate,
  onHarvest,
  onUpgrades,
  moistureHistory,
}: ActionPanelProps) => {
  return (
    <div className="bg-card border-l border-border w-80 flex flex-col shadow-[var(--shadow-panel)] overflow-y-auto">
      {/* Status Section */}
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-bold mb-4 uppercase tracking-wide">
          Status da Plantação
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Umidade do Solo</span>
              <span className="text-sm font-bold text-secondary">{soilMoisture}%</span>
            </div>
            <Progress value={soilMoisture} className="h-3 [&>div]:bg-secondary" />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Crescimento da Colheita</span>
              <span className="text-sm font-bold text-primary">{cropGrowth}%</span>
            </div>
            <Progress value={cropGrowth} className="h-3 [&>div]:bg-primary" />
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-bold mb-4 uppercase tracking-wide">
          Ações
        </h2>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="action"
            className="h-20 flex-col gap-2"
            onClick={onPlant}
          >
            <Sprout className="h-6 w-6 text-primary" />
            <span className="text-xs font-semibold">Plantar</span>
          </Button>
          
          <Button
            variant="action"
            className="h-20 flex-col gap-2"
            onClick={onIrrigate}
          >
            <Droplet className="h-6 w-6 text-secondary" />
            <span className="text-xs font-semibold">Irrigar</span>
          </Button>
          
          <Button
            variant="action"
            className="h-20 flex-col gap-2"
            onClick={onHarvest}
          >
            <ScissorsIcon className="h-6 w-6 text-accent" />
            <span className="text-xs font-semibold">Colher</span>
          </Button>
          
          <Button
            variant="action"
            className="h-20 flex-col gap-2"
            onClick={onUpgrades}
          >
            <Settings className="h-6 w-6 text-muted-foreground" />
            <span className="text-xs font-semibold">Upgrades</span>
          </Button>
        </div>
      </div>

      {/* Data History Section */}
      <div className="p-6 flex-1">
        <h2 className="text-sm font-bold mb-3 uppercase tracking-wide text-muted-foreground">
          Histórico de Umidade (Dados SMAP)
        </h2>
        
        <div className="space-y-2">
          {moistureHistory.map((value, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-12">Dia {index + 1}</span>
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-secondary transition-all"
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="text-xs font-medium w-8 text-right">{value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
