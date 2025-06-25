import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Laboratorio2 = () => {
  const refGraficoNyquist = useRef<HTMLCanvasElement>(null);
  const refGraficoShannon = useRef<HTMLCanvasElement>(null);
  const [anchoBanda, setAnchoBanda] = useState(1000);
  const [niveles, setNiveles] = useState(2);
  const [snr, setSnr] = useState(10);
  const [resultadoNyquist, setResultadoNyquist] = useState<string>("");
  const [resultadoShannon, setResultadoShannon] = useState<string>("");
  const graficoNyquist = useRef<Chart | null>(null);
  const graficoShannon = useRef<Chart | null>(null);

  useEffect(() => {
    const snrLineal = Math.pow(10, snr / 10);
    const capacidadNyquist = 2 * anchoBanda * Math.log2(niveles);
    const capacidadShannon = anchoBanda * Math.log2(1 + snrLineal);
    setResultadoNyquist(
      `Capacidad según Nyquist: ${capacidadNyquist.toLocaleString("es-ES", {
        maximumFractionDigits: 2,
      })} bps`
    );
    setResultadoShannon(
      `Capacidad según Shannon: ${capacidadShannon.toLocaleString("es-ES", {
        maximumFractionDigits: 2,
      })} bps`
    );
    graficarNyquist();
    graficarShannon();
  }, [anchoBanda, niveles, snr]);

  const calcularCapacidadNyquist = (niveles: number, anchoBanda: number) => {
    const datos = [];
    for (let i = 2; i <= niveles * 2; i++) {
      const capacidad = 2 * anchoBanda * Math.log2(i);
      datos.push({ x: i, y: capacidad });
    }
    return datos;
  };

  const graficarNyquist = () => {
    if (!refGraficoNyquist.current) return;
    const ctx = refGraficoNyquist.current.getContext("2d");
    if (!ctx) return;

    if (graficoNyquist.current) graficoNyquist.current.destroy();

    const datosGrafico = calcularCapacidadNyquist(niveles, anchoBanda);

    graficoNyquist.current = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Capacidad del canal (bps)",
            data: datosGrafico,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            tension: 0.1,
            fill: true,
            pointRadius: 0,
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
              text: "Niveles de modulación",
              font: {
                weight: "bold",
              },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Capacidad (bps)",
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
            callbacks: {
              label: (context) =>
                `${context.parsed.y.toLocaleString("es-ES")} bps`,
            },
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
      },
    });
  };

  const calcularCapacidadShannon = (snr: number, anchoBanda: number) => {
    const datos = [];
    for (let i = 2; i <= 100; i++) {
      const capacidad = anchoBanda * Math.log2(1 + (snr * i) / 100);
      datos.push({ x: i, y: capacidad });
    }
    return datos;
  };

  const graficarShannon = () => {
    if (!refGraficoShannon.current) return;
    const ctx = refGraficoShannon.current.getContext("2d");
    if (!ctx) return;

    if (graficoShannon.current) graficoShannon.current.destroy();

    const datosGrafico = calcularCapacidadShannon(snr, anchoBanda);

    graficoShannon.current = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Capacidad del canal (bps)",
            data: datosGrafico,
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            borderWidth: 2,
            tension: 0.1,
            fill: true,
            pointRadius: 0,
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
              text: "Porcentaje de SNR",
              font: {
                weight: "bold",
              },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Capacidad (bps)",
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
            callbacks: {
              label: (context) =>
                `${context.parsed.y.toLocaleString("es-ES")} bps`,
            },
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
      },
    });
  };

  return (
    <Card className="w-full shadow-sm">
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
          Calculadora de Capacidad de Canal
        </h2>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="space-y-2">
            <Label htmlFor="anchoBanda" className="font-medium text-gray-700">
              Ancho de banda (Hz):
            </Label>
            <Input
              type="number"
              id="anchoBanda"
              min={1}
              step={0.1}
              value={anchoBanda}
              onChange={(e) => setAnchoBanda(Number(e.target.value))}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="niveles" className="font-medium text-gray-700">
              Niveles de modulación:
            </Label>
            <Input
              type="number"
              id="niveles"
              min={2}
              value={niveles}
              onChange={(e) => setNiveles(Number(e.target.value))}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="snr" className="font-medium text-gray-700">
              Relación señal-ruido (dB):
            </Label>
            <Input
              type="number"
              id="snr"
              min={0}
              step={0.1}
              value={snr}
              onChange={(e) => setSnr(Number(e.target.value))}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </form>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8 bg-gray-50 p-4 rounded-md">
          <p className="font-medium text-blue-600">{resultadoNyquist}</p>
          <p className="font-medium text-red-600">{resultadoShannon}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h5 className="font-semibold mb-4 text-gray-700">
              Capacidad según Nyquist
            </h5>
            <div className="w-full aspect-[16/9]">
              <canvas ref={refGraficoNyquist} />
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h5 className="font-semibold mb-4 text-gray-700">
              Capacidad según Shannon
            </h5>
            <div className="w-full aspect-[16/9]">
              <canvas ref={refGraficoShannon} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Laboratorio2;
