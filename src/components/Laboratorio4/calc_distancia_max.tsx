import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Antenna } from "lucide-react";

const DEFAULT_H1 = 30;
const DEFAULT_H2 = 20;

const CalcDistancia = () => {
  const [altura1, setAltura1] = useState(DEFAULT_H1);
  const [altura2, setAltura2] = useState(DEFAULT_H2);
  const [distancia, setDistancia] = useState<number | null>(null);

  const calcular = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const d =
      3.57 * (Math.sqrt((4 / 3) * altura1) + Math.sqrt((4 / 3) * altura2));
    setDistancia(d);
  };

  // Calcular al inicio y cuando cambian los valores
  useEffect(() => {
    calcular();
  }, [altura1, altura2]);

  // Para la "gráfica" visual simple
  const maxAltura = Math.max(altura1, altura2, 50);
  const escala = 100 / maxAltura;
  const h1Px = Math.max(altura1 * escala, 10);
  const h2Px = Math.max(altura2 * escala, 10);

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4 text-center">
          Cálculo de Distancia Máxima LOS
        </h2>
        <form
          onSubmit={calcular}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          <div className="space-y-2">
            <Label htmlFor="altura-antena1">Altura Antena 1 (metros):</Label>
            <Input
              type="number"
              id="altura-antena1"
              min={0}
              step={0.1}
              value={altura1}
              onChange={(e) => setAltura1(Number(e.target.value))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="altura-antena2">Altura Antena 2 (metros):</Label>
            <Input
              type="number"
              id="altura-antena2"
              min={0}
              step={0.1}
              value={altura2}
              onChange={(e) => setAltura2(Number(e.target.value))}
              required
            />
          </div>
        </form>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
          {distancia !== null && (
            <h4 className="font-semibold">
              Distancia máxima LOS: <span>{distancia.toFixed(2)} km</span>
            </h4>
          )}
        </div>
        <div className="flex flex-row items-end justify-center gap-8 mt-8">
          <div className="flex flex-col items-center">
            <Antenna className="w-8 h-8" />
            <div
              style={{
                height: h1Px,
                width: 30,
                background: "#3b82f6",
                borderRadius: 6,
                marginBottom: 4,
              }}
            />
            <span className="text-xs">
              Antena 1<br />
              {altura1} m
            </span>
          </div>
          <div className="flex flex-col items-center">
            {/* <Antenna className="w-8 h-8" /> */}
            <div
              style={{
                height: 2,
                width: 80,
                background: "#10b981",
                marginBottom: 4,
              }}
            />
            <span className="text-xs">
              Distancia
              <br />
              {distancia?.toFixed(2) ?? "-"} km
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Antenna className="w-8 h-8" />
            <div
              style={{
                height: h2Px,
                width: 30,
                background: "#f59e42",
                borderRadius: 6,
                marginBottom: 4,
              }}
            />
            <span className="text-xs">
              Antena 2<br />
              {altura2} m
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalcDistancia;
