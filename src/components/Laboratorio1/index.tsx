import { useEffect, useRef, useState, useMemo } from "react";
import { Chart } from "chart.js/auto";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Laboratorio1 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const [frecuencias, setFrecuencias] = useState(1);
  const [waveType, setWaveType] = useState<"sine" | "square">("sine");
  const [periodsToShow, setPeriodsToShow] = useState(2);

  const [formData, setFormData] = useState({
    frequency: 1.0,
    amplitude: 1.0,
    phase: 0.0,
  });

  // Memoizar fase en radianes
  const phaseInRadians = useMemo(
    () => (formData.phase * Math.PI) / 180,
    [formData.phase]
  );

  // Memoizar etiqueta de la onda
  const waveLabel = useMemo(() => {
    return waveType === "sine"
      ? `Senoide (${formData.frequency} Hz)`
      : `Onda Cuadrada (${frecuencias} armónicos)`;
  }, [waveType, formData.frequency, frecuencias]);

  // Configuración inicial del gráfico
  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: waveLabel,
            borderColor: "#3b82f6",
            borderWidth: 2,
            backgroundColor: "rgba(59, 130, 246, 0.05)",
            tension: 0,
            fill: false,
            pointRadius: 0,
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "linear",
            title: {
              display: true,
              text: "Tiempo (s)",
              font: {
                weight: "bold",
              },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          y: {
            type: "linear",
            title: {
              display: true,
              text: "Amplitud",
              font: {
                weight: "bold",
              },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            mode: "nearest",
            intersect: false,
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, []);

  // Actualización de datos y escalas
  useEffect(() => {
    if (!chartRef.current) return;

    const { frequency, amplitude } = formData;
    const safeFrequency = frequency > 0 ? frequency : 1; 
    const dataPoints = 2000;
    const totalTime = periodsToShow / safeFrequency;
    const data = [];

    // Estimación teórica de amplitud máxima
    let maxAmplitude = amplitude;
    if (waveType === "square") {
      const harmonics = Array.from(
        { length: frecuencias },
        (_, i) => 2 * i + 1
      );
      const sum = harmonics.reduce((acc, n) => acc + 1 / n, 0);
      maxAmplitude = (4 / Math.PI) * amplitude * sum;
    }

    for (let i = 0; i <= dataPoints; i++) {
      const x = (i / dataPoints) * totalTime;
      let y = 0;

      if (waveType === "sine") {
        y = amplitude * Math.sin(2 * Math.PI * frequency * x + phaseInRadians);
      } else {
        for (let j = 1; j <= 2 * frecuencias - 1; j += 2) {
          y +=
            ((4 * amplitude) / (Math.PI * j)) *
            Math.sin(2 * Math.PI * j * frequency * x + phaseInRadians);
        }
      }

      data.push({ x, y });
    }

    const chart = chartRef.current;
    chart.data.datasets[0].data = data;
    chart.data.datasets[0].label = waveLabel;

    // Escalado dinámico
    chart.options.scales!.x!.min = 0;
    chart.options.scales!.x!.max = totalTime;
    chart.options.scales!.y!.min = -maxAmplitude * 1.1;
    chart.options.scales!.y!.max = maxAmplitude * 1.1;

    chart.update();
  }, [
    formData,
    frecuencias,
    waveType,
    periodsToShow,
    phaseInRadians,
    waveLabel,
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  return (
    <Card className="w-full shadow-sm">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="frequency">Frecuencia (Hz):</Label>
            <Input
              type="number"
              id="frequency"
              name="frequency"
              min={0.1}
              max={10}
              step={0.1}
              value={formData.frequency}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amplitude">Amplitud:</Label>
            <Input
              type="number"
              id="amplitude"
              name="amplitude"
              min={0.1}
              max={2}
              step={0.1}
              value={formData.amplitude}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phase">Fase (grados):</Label>
            <Input
              type="number"
              id="phase"
              name="phase"
              min={-180}
              max={180}
              step={1}
              value={formData.phase}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Tipo de Onda:</Label>
            <Select
              value={waveType}
              onValueChange={(v) => setWaveType(v as "sine" | "square")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sine">Sinusoidal</SelectItem>
                <SelectItem value="square">Cuadrada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {waveType === "square" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label>Armónicos: {frecuencias}</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    setFrecuencias((prev) => Math.max(1, prev - 1))
                  }
                >
                  -
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setFrecuencias((prev) => prev + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Períodos a mostrar:</Label>
              <Input
                type="number"
                min={1}
                max={10}
                value={periodsToShow}
                onChange={(e) => setPeriodsToShow(Number(e.target.value))}
              />
            </div>
          </div>
        )}

        <div className="w-full aspect-video bg-gray-50 p-4 rounded-md border border-gray-200">
          <canvas ref={canvasRef} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Laboratorio1;
