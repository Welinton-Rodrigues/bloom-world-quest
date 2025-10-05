import { Cloud, Sun, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EventPopupProps {
  isOpen: boolean;
  onClose: () => void;
  eventType: "drought" | "rain" | "heatwave" | null;
}

const eventConfig = {
  drought: {
    icon: Sun,
    iconColor: "text-accent",
    title: "ALERTA DE SECA",
    description: "Dados do U.S. Drought Monitor indicam condições de seca. A umidade do solo evaporará 50% mais rápido nos próximos 5 dias. Planeje sua irrigação com cuidado.",
  },
  rain: {
    icon: Cloud,
    iconColor: "text-secondary",
    title: "CHUVA PREVISTA",
    description: "Previsão de precipitação nas próximas 48 horas. A umidade do solo aumentará naturalmente. Economize água da irrigação!",
  },
  heatwave: {
    icon: AlertTriangle,
    iconColor: "text-destructive",
    title: "ONDA DE CALOR",
    description: "Temperaturas extremas detectadas por satélite. Suas plantas precisarão de irrigação adicional para sobreviver. Monitore de perto!",
  },
};

export const EventPopup = ({ isOpen, onClose, eventType }: EventPopupProps) => {
  if (!eventType) return null;

  const config = eventConfig[eventType];
  const Icon = config.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center mb-4">
            <div className="mb-4 p-4 rounded-full bg-muted">
              <Icon className={`h-12 w-12 ${config.iconColor}`} />
            </div>
            <DialogTitle className="text-2xl font-bold text-center">
              {config.title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-center text-base leading-relaxed">
            {config.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-4">
          <Button onClick={onClose} size="lg" className="w-full">
            ENTENDIDO
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
