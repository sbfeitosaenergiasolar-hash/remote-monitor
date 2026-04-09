import { useAuth } from "@/_core/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { MapPin, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { useEffect, useRef } from "react";

// Google Maps already declared in window

export default function MapPage() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  const devicesQuery = trpc.device.list.useQuery(undefined, { enabled: isAuthenticated });

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  useEffect(() => {
    if (!mapRef.current || !devicesQuery.data) return;

    // Initialize map
    if (!mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: { lat: -23.5505, lng: -46.6333 },
        styles: [
          {
            elementType: "geometry",
            stylers: [{ color: "#1a1a2e" }],
          },
          {
            elementType: "labels.text.fill",
            stylers: [{ color: "#b366ff" }],
          },
        ],
      });
    }

    // Add markers for devices with location
    devicesQuery.data.forEach((device: any) => {
      if (device.lastLocation && device.lastLocation.latitude && device.lastLocation.longitude) {
        const marker = new window.google.maps.Marker({
          position: {
            lat: device.lastLocation.latitude,
            lng: device.lastLocation.longitude,
          },
          map: mapInstance.current,
          title: device.deviceName,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: device.status === "online" ? "#00ff00" : "#ff0000",
            fillOpacity: 1,
            strokeColor: "#b366ff",
            strokeWeight: 2,
          },
        });

        marker.addListener("click", () => {
          new window.google.maps.InfoWindow({
            content: `<div style="color: #b366ff; padding: 8px;"><p><strong>${device.deviceName}</strong></p></div>`,
          }).open(mapInstance.current, marker);
        });
      }
    });
  }, [devicesQuery.data]);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 scan-lines">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold neon-glow">MAPA EM TEMPO REAL</h1>
          <p className="text-muted-foreground">Localização dos seus dispositivos</p>
        </div>

        {devicesQuery.isLoading ? (
          <Card className="card-neon p-12 text-center">
            <Loader2 className="mx-auto animate-spin text-foreground" size={48} />
          </Card>
        ) : (
          <div className="space-y-4">
            <Card className="card-neon overflow-hidden" style={{ height: "500px" }}>
              <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
            </Card>

            {devicesQuery.data && devicesQuery.data.length > 0 && (
              <Card className="card-neon p-6 space-y-4">
                <h2 className="text-xl font-bold neon-glow-cyan">Dispositivos no Mapa</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {devicesQuery.data
                    .filter((d: any) => d.lastLocation)
                    .map((device: any) => (
                      <div key={device.id} className="flex items-center gap-3 p-3 bg-background/50 rounded">
                        <div className={`status-${device.status}`}>
                          <span className="text-sm font-bold uppercase">
                            {device.status === "online" ? "Online" : "Offline"}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-foreground">{device.deviceName}</p>
                          <p className="text-xs text-muted-foreground">
                            📍 {device.lastLocation.latitude.toFixed(4)}, {device.lastLocation.longitude.toFixed(4)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            )}

            {devicesQuery.data && devicesQuery.data.filter((d: any) => d.lastLocation).length === 0 && (
              <Card className="card-neon p-12 text-center space-y-4">
                <MapPin className="mx-auto text-muted-foreground" size={48} />
                <p className="text-lg text-muted-foreground">Nenhum dispositivo com localização</p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
