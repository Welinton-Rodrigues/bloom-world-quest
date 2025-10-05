import { Calendar, DollarSign, Droplet, Leaf } from "lucide-react";

interface StatusBarProps {
  day: number;
  money: number;
  water: number;
  maxWater: number;
  sustainability: number;
}

export const StatusBar = ({ day, money, water, maxWater, sustainability }: StatusBarProps) => {
  return (
    <div className="bg-card border-b border-border px-6 py-3 flex items-center justify-between shadow-[var(--shadow-panel)]">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold text-sm">Dia: {day}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <span className="font-semibold text-sm">$ {money.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Droplet className="h-5 w-5 text-secondary" />
          <span className="font-semibold text-sm">
            Água: {water}/{maxWater} Unidades
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          <span className="font-semibold text-sm">
            Sustentabilidade: {sustainability}%
          </span>
        </div>
      </div>
    </div>
  );
};
