import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface Region {
  id: string;
  name: string;
  climate: string;
  color: string;
  path: string;
}

const regions: Region[] = [
  {
    id: "america-norte",
    name: "América do Norte",
    climate: "Temperado",
    color: "fill-[hsl(200,60%,50%)]",
    path: "M150,100 L280,80 L300,140 L250,180 L180,160 Z"
  },
  {
    id: "america-sul",
    name: "América do Sul",
    climate: "Tropical",
    color: "fill-[hsl(120,55%,45%)]",
    path: "M220,200 L270,190 L280,280 L240,320 L200,300 Z"
  },
  {
    id: "europa",
    name: "Europa",
    climate: "Temperado",
    color: "fill-[hsl(200,60%,50%)]",
    path: "M450,80 L520,90 L530,140 L480,150 Z"
  },
  {
    id: "africa",
    name: "África",
    climate: "Árido/Tropical",
    color: "fill-[hsl(30,55%,50%)]",
    path: "M480,160 L540,170 L550,280 L500,300 L470,250 Z"
  },
  {
    id: "asia",
    name: "Ásia",
    climate: "Variado",
    color: "fill-[hsl(45,50%,55%)]",
    path: "M550,70 L750,80 L780,200 L700,220 L600,180 Z"
  },
  {
    id: "oceania",
    name: "Oceania",
    climate: "Tropical/Árido",
    color: "fill-[hsl(180,50%,50%)]",
    path: "M700,250 L780,260 L790,320 L720,330 Z"
  },
  {
    id: "antartica",
    name: "Antártida",
    climate: "Polar",
    color: "fill-[hsl(200,20%,80%)]",
    path: "M300,380 L700,380 L650,420 L350,420 Z"
  }
];

const WorldMap = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionClick = (region: Region) => {
    setSelectedRegion(region.id);
    toast(`${region.name} - Clima: ${region.climate}`);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground">
            Selecione uma Região
          </h1>
          
          <div className="w-24" /> {/* Spacer for centering */}
        </div>

        {/* Map Container */}
        <div className="rounded-2xl bg-card p-8 shadow-[var(--shadow-elevated)]">
          <svg
            viewBox="0 0 900 450"
            className="w-full h-auto"
            style={{ maxHeight: "70vh" }}
          >
            {/* Ocean background */}
            <rect
              width="900"
              height="450"
              className="fill-accent/20"
            />
            
            {/* Regions */}
            {regions.map((region) => (
              <g key={region.id}>
                <path
                  d={region.path}
                  className={`${region.color} stroke-border cursor-pointer transition-all duration-300 hover:brightness-110 hover:stroke-[3]`}
                  strokeWidth="2"
                  onClick={() => handleRegionClick(region)}
                  style={{
                    filter: selectedRegion === region.id ? "brightness(1.2)" : "none",
                    strokeWidth: selectedRegion === region.id ? "3" : "2"
                  }}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {regions.map((region) => (
            <div
              key={region.id}
              className={`rounded-lg bg-card p-4 border-2 transition-all cursor-pointer hover:scale-105 ${
                selectedRegion === region.id
                  ? "border-primary shadow-[var(--shadow-glow)]"
                  : "border-border"
              }`}
              onClick={() => handleRegionClick(region)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-8 w-8 rounded ${region.color.replace("fill-", "bg-")}`}
                />
                <div>
                  <h3 className="font-semibold text-sm text-card-foreground">
                    {region.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {region.climate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
