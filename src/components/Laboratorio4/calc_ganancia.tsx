import { useRef, useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

Chart.register(...registerables);

const Laboratorio4 = () => {
  const [diameter, setDiameter] = useState(3);
  const [frequency, setFrequency] = useState(2);
  const [ganancia, setGanancia] = useState("");
  const chartFrequencyRef = useRef(null);
  const chartDiameterRef = useRef(null);
  const chartFrequency = useRef(null);
  const chartDiameter = useRef(null);

  useEffect(() => {
    calcularGanancia();
  }, [diameter, frequency]);

  useEffect(() => {
    // Cleanup al desmontar
    return () => {
      if (chartFrequency.current) {
        chartFrequency.current.destroy();
      }
      if (chartDiameter.current) {
        chartDiameter.current.destroy();
      }
    };
  }, []);

  const calcularGanancia = () => {
    if (!diameter || !frequency || diameter <= 0 || frequency <= 0) {
      setGanancia("N/A");
      return;
    }

    const area = Math.PI * Math.pow(diameter / 2, 2);
    const lambda = (3 * Math.pow(10, 8)) / (frequency * Math.pow(10, 9));
    const gananciaValue = 10 * Math.log10((7 * area) / Math.pow(lambda, 2));

    setGanancia(gananciaValue.toFixed(2) + " dB");

    // Actualizar gráficos
    setTimeout(() => {
      graficarPorFrecuencia();
      graficarPorDiametro();
    }, 100);
  };

  const graficarPorFrecuencia = () => {
    if (!chartFrequencyRef.current) return;

    const ctx = chartFrequencyRef.current.getContext("2d");
    if (!ctx) return;

    // Destruir gráfico anterior
    if (chartFrequency.current) {
      chartFrequency.current.destroy();
    }

    // Generar datos para frecuencia variable (diámetro fijo)
    const data = [];
    for (let f = 0.5; f <= 15; f += 0.5) {
      const area = Math.PI * Math.pow(diameter / 2, 2);
      const lambda = (3 * Math.pow(10, 8)) / (f * Math.pow(10, 9));
      const gananciaCalc = 10 * Math.log10((7 * area) / Math.pow(lambda, 2));
      data.push({ x: f, y: gananciaCalc });
    }

    chartFrequency.current = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Ganancia (dB)",
            data: data,
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            fill: false,
            pointRadius: 2,
            pointHoverRadius: 5,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Ganancia vs Frecuencia (Diámetro fijo: ${diameter}m)`,
            font: {
              size: 14,
              weight: "bold",
            },
          },
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          x: {
            type: "linear",
            title: {
              display: true,
              text: "Frecuencia de la antena (GHz)",
              font: {
                weight: "bold",
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Ganancia (dB)",
              font: {
                weight: "bold",
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        },
        animation: {
          duration: 750,
          easing: "easeInOutQuart",
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
    });
  };

  const graficarPorDiametro = () => {
    if (!chartDiameterRef.current) return;

    const ctx = chartDiameterRef.current.getContext("2d");
    if (!ctx) return;

    // Destruir gráfico anterior
    if (chartDiameter.current) {
      chartDiameter.current.destroy();
    }

    // Generar datos para diámetro variable (frecuencia fija)
    const data = [];
    for (let d = 0.5; d <= 15; d += 0.5) {
      const area = Math.PI * Math.pow(d / 2, 2);
      const lambda = (3 * Math.pow(10, 8)) / (frequency * Math.pow(10, 9));
      const gananciaCalc = 10 * Math.log10((7 * area) / Math.pow(lambda, 2));
      data.push({ x: d, y: gananciaCalc });
    }

    chartDiameter.current = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Ganancia (dB)",
            data: data,
            borderColor: "rgb(34, 197, 94)",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            fill: false,
            pointRadius: 2,
            pointHoverRadius: 5,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Ganancia vs Diámetro (Frecuencia fija: ${frequency}GHz)`,
            font: {
              size: 14,
              weight: "bold",
            },
          },
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          x: {
            type: "linear",
            title: {
              display: true,
              text: "Diámetro de la antena (m)",
              font: {
                weight: "bold",
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Ganancia (dB)",
              font: {
                weight: "bold",
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        },
        animation: {
          duration: 750,
          easing: "easeInOutQuart",
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
    });
  };

  const handleDiameterChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setDiameter(value);
    }
  };

  const handleFrequencyChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setFrequency(value);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Calculadora de Ganancia de Antena
      </h2>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label
              htmlFor="diameter"
              className="block text-sm font-semibold text-gray-700"
            >
              Diámetro de la antena (metros):
            </label>
            <input
              type="number"
              id="diameter"
              min="0.1"
              max="50"
              step="0.1"
              value={diameter}
              onChange={handleDiameterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="frequency"
              className="block text-sm font-semibold text-gray-700"
            >
              Frecuencia de transmisión (GHz):
            </label>
            <input
              type="number"
              id="frequency"
              min="0.1"
              max="50"
              step="0.1"
              value={frequency}
              onChange={handleFrequencyChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>
        </div>

        <div className="text-center">
          <div className="inline-block bg-blue-100 border border-blue-300 rounded-lg px-6 py-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Ganancia de la Antena:
            </h3>
            <p className="text-2xl font-bold text-blue-600">{ganancia}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="h-80">
            <canvas ref={chartFrequencyRef} className="w-full h-full" />
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              <strong>Análisis:</strong> Variación de la ganancia al cambiar la
              frecuencia
              <br />
              <span className="text-blue-600">Diámetro fijo: {diameter} m</span>
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="h-80">
            <canvas ref={chartDiameterRef} className="w-full h-full" />
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              <strong>Análisis:</strong> Variación de la ganancia al cambiar el
              diámetro
              <br />
              <span className="text-green-600">
                Frecuencia fija: {frequency} GHz
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">
          Información técnica:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p>
              <strong>Fórmula utilizada:</strong>
            </p>
            <p className="font-mono bg-gray-100 p-2 rounded mt-2">
              G = 10 × log₁₀((7 × A) / λ²)
            </p>
          </div>
          <div>
            <p>
              <strong>Donde:</strong>
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>G = Ganancia en dB</li>
              <li>A = Área de la antena (π × r²)</li>
              <li>λ = Longitud de onda (c / f)</li>
              <li>c = Velocidad de la luz (3×10⁸ m/s)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const DEFAULT_H1 = 30;
const DEFAULT_H2 = 20;

const CalcLaboratorio4 = () => {
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
    // eslint-disable-next-line
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

export { CalcLaboratorio4 };

export default Laboratorio4;
