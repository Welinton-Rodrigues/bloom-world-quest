import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface FarmMapProps {
  soilMoisture: number; // 0-100
}

export const FarmMap = ({ soilMoisture }: FarmMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const farmPolygonRef = useRef<L.Polygon | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on a farming region (Iowa, USA as example)
    const map = L.map(mapRef.current, {
      center: [41.8781, -93.0977],
      zoom: 13,
      zoomControl: true,
    });

    // Add satellite imagery
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      attribution: "Tiles &copy; Esri",
    }).addTo(map);

    // Create farm polygon (square)
    const farmBounds: [number, number][] = [
      [41.880, -93.100],
      [41.880, -93.095],
      [41.876, -93.095],
      [41.876, -93.100],
    ];

    const polygon = L.polygon(farmBounds, {
      color: "#ffffff",
      weight: 3,
      fillOpacity: 0.6,
    }).addTo(map);

    mapInstanceRef.current = map;
    farmPolygonRef.current = polygon;

    // Fit map to polygon
    map.fitBounds(polygon.getBounds(), { padding: [50, 50] });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update polygon color based on soil moisture
  useEffect(() => {
    if (!farmPolygonRef.current) return;

    // Interpolate color from brown (dry) to green (moist)
    const hue = 30 + (soilMoisture / 100) * 110; // 30 (brown) to 140 (green)
    const saturation = 45 + (soilMoisture / 100) * 15; // 45% to 60%
    const lightness = 50 - (soilMoisture / 100) * 5; // 50% to 45%
    
    farmPolygonRef.current.setStyle({
      fillColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    });
  }, [soilMoisture]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg overflow-hidden shadow-[var(--shadow-elevated)]"
      style={{ minHeight: "500px" }}
    />
  );
};
