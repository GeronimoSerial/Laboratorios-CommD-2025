import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Laboratorio2 = () => {
  const nyquistChartRef = useRef<HTMLCanvasElement>(null);
  const shannonChartRef = useRef<HTMLCanvasElement>(null);
  const [bandwidth, setBandwidth] = useState(1000);
  const [levels, setLevels] = useState(2);
  const [snr, setSnr] = useState(10);
  const [nyquistResult, setNyquistResult] = useState<string>("");
  const [shannonResult, setShannonResult] = useState<string>("");
  const nyquistChart = useRef<Chart | null>(null);
  const shannonChart = useRef<Chart | null>(null);

  useEffect(() => {
    const snrLinear = Math.pow(10, snr / 10);
    const nyquistCapacity = 2 * bandwidth * Math.log2(levels);
    const shannonCapacity = bandwidth * Math.log2(1 + snrLinear);
    setNyquistResult(
      `Capacidad según Nyquist: ${nyquistCapacity.toLocaleString("es-ES", {
        maximumFractionDigits: 2,
      })} bps`
    );
    setShannonResult(
      `Capacidad según Shannon: ${shannonCapacity.toLocaleString("es-ES", {
        maximumFractionDigits: 2,
      })} bps`
    );
    graficarNyquist();
    graficarShannon();
  }, [bandwidth, levels, snr]);

  const calculateChannelCapacity = (levels: number, bandwidth: number) => {
    const data = [];
    for (let i = 2; i <= levels * 2; i++) {
      const capacity = 2 * bandwidth * Math.log2(i);
      data.push({ x: i, y: capacity });
    }
    return data;
  };

  const graficarNyquist = () => {
    if (!nyquistChartRef.current) return;
    const ctx = nyquistChartRef.current.getContext("2d");
    if (!ctx) return;

    if (nyquistChart.current) nyquistChart.current.destroy();

    const chartData = calculateChannelCapacity(levels, bandwidth);

    nyquistChart.current = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Capacidad del canal (bps)",
            data: chartData,
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

  const calculateShannonCapacity = (snr: number, bandwidth: number) => {
    const data = [];
    for (let i = 2; i <= 100; i++) {
      const capacity = bandwidth * Math.log2(1 + (snr * i) / 100);
      data.push({ x: i, y: capacity });
    }
    return data;
  };

  const graficarShannon = () => {
    if (!shannonChartRef.current) return;
    const ctx = shannonChartRef.current.getContext("2d");
    if (!ctx) return;

    if (shannonChart.current) shannonChart.current.destroy();

    const chartData = calculateShannonCapacity(snr, bandwidth);

    shannonChart.current = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Capacidad del canal (bps)",
            data: chartData,
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
            <Label htmlFor="bandwidth" className="font-medium text-gray-700">
              Ancho de banda (Hz):
            </Label>
            <Input
              type="number"
              id="bandwidth"
              min={1}
              step={0.1}
              value={bandwidth}
              onChange={(e) => setBandwidth(Number(e.target.value))}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="levels" className="font-medium text-gray-700">
              Niveles de modulación:
            </Label>
            <Input
              type="number"
              id="levels"
              min={2}
              value={levels}
              onChange={(e) => setLevels(Number(e.target.value))}
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
          <p className="font-medium text-blue-600">{nyquistResult}</p>
          <p className="font-medium text-red-600">{shannonResult}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h5 className="font-semibold mb-4 text-gray-700">
              Capacidad según Nyquist
            </h5>
            <div className="w-full aspect-[16/9]">
              <canvas ref={nyquistChartRef} />
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h5 className="font-semibold mb-4 text-gray-700">
              Capacidad según Shannon
            </h5>
            <div className="w-full aspect-[16/9]">
              <canvas ref={shannonChartRef} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Laboratorio2;
