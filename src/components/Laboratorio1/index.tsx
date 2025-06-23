import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const Laboratorio1 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [frecuencias, setFrecuencias] = useState(1);
  const [formData, setFormData] = useState({
    frequency: 1.0,
    amplitude: 1.0,
    phase: 0.0,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Función sinusoidal",
            borderColor: "#3b82f6", // Azul más moderno
            borderWidth: 2,
            backgroundColor: "rgba(59, 130, 246, 0.1)", // Sutil relleno
            tension: 0.1, // Suaviza ligeramente la curva
            fill: true,
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
            min: 0,
            max: 3,
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
            min: -formData.amplitude,
            max: formData.amplitude,
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
            labels: {
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
        datasets: {
          line: {
            pointRadius: 0,
          },
        },
        elements: {
          point: {
            radius: 0,
            hoverRadius: 5,
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    const { frequency, amplitude, phase } = formData;
    const data = [];
    const k = frecuencias * 2;
    for (let i = 0; i < 1000; i++) {
      const x = (i / 1000) * Math.PI;
      let y = 0;
      for (let j = 0; j <= k; j++) {
        if (j % 2 !== 0) {
          y +=
            amplitude *
            (1 / j) *
            Math.sin(2 * Math.PI * frequency * j * x + phase);
        }
      }
      data.push({ x, y });
    }
    chartRef.current.data.datasets[0].data = data;
    chartRef.current.options.scales = {
      ...chartRef.current.options.scales,
      y: {
        ...chartRef.current.options.scales?.y,
        min: -amplitude,
        max: amplitude,
      },
    };
    chartRef.current.update();
  }, [formData, frecuencias]);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="frequency" className="font-medium text-gray-700">
              Frecuencia (Hz):
            </Label>
            <Input
              type="number"
              id="frequency"
              name="frequency"
              min={0}
              max={1000}
              step={0.1}
              value={formData.frequency}
              onChange={handleInputChange}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amplitude" className="font-medium text-gray-700">
              Amplitud:
            </Label>
            <Input
              type="number"
              id="amplitude"
              name="amplitude"
              min={0}
              max={100}
              step={0.1}
              value={formData.amplitude}
              onChange={handleInputChange}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phase" className="font-medium text-gray-700">
              Fase (grados):
            </Label>
            <Input
              type="number"
              id="phase"
              name="phase"
              min={-180}
              max={180}
              step={1}
              value={formData.phase}
              onChange={handleInputChange}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">
              Cantidad de Frecuencias:{" "}
              <span className="text-blue-600">{frecuencias}</span>
            </span>
            <Button
              variant="outline"
              onClick={() => setFrecuencias((prev) => prev + 1)}
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              + Aumentar frecuencia
            </Button>
            <Button
              variant="outline"
              onClick={() => setFrecuencias((prev) => Math.max(1, prev - 1))}
              className="border-red-500 text-red-600 hover:bg-red-50"
            >
              - Quitar frecuencia
            </Button>
          </div>
        </div>

        <div className="w-full aspect-[16/9] bg-gray-50 p-4 rounded-md border border-gray-200">
          <canvas ref={canvasRef} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Laboratorio1;
