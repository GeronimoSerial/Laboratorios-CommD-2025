import { useRef, useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";

import annotationPlugin from "chartjs-plugin-annotation";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Info } from "lucide-react";

Chart.register(...registerables, annotationPlugin);

const Laboratorio4 = () => {
  const [diameter, setDiameter] = useState(3);
  const [frequency, setFrequency] = useState(2);
  const [ganancia, setGanancia] = useState("");
  const [warning, setWarning] = useState("");
  const chartFrequencyRef = useRef(null);
  const chartDiameterRef = useRef(null);
  const chartFrequency = useRef(null);
  const chartDiameter = useRef(null);

  useEffect(() => {
    calcularGanancia();
  }, [diameter, frequency]);

  useEffect(() => {
    return () => {
      if (chartFrequency.current) {
        chartFrequency.current.destroy();
      }
      if (chartDiameter.current) {
        chartDiameter.current.destroy();
      }
    };
  }, []);

  const validateInputs = () => {
    // Validar combinaciones poco prácticas
    if (frequency < 0.5 && diameter < 1) {
      setWarning(
        "Combinación poco práctica: antena pequeña con frecuencia baja"
      );
      return false;
    }
    if (frequency > 40 && diameter > 10) {
      setWarning(
        "Combinación poco práctica: antena grande con frecuencia muy alta"
      );
      return false;
    }
    setWarning("");
    return true;
  };

  const calcularGananciaNumerica = (d, f) => {
    if (!d || !f || d <= 0 || f <= 0) return null;
    const area = Math.PI * Math.pow(d / 2, 2);
    const lambda = 3e8 / (f * 1e9);
    return 10 * Math.log10((7 * area) / Math.pow(lambda, 2));
  };

  const calcularGanancia = () => {
    const valor = calcularGananciaNumerica(diameter, frequency);

    if (valor === null) {
      setGanancia("N/A");
      setWarning("Valores deben ser mayores que cero");
      return;
    }

    if (!validateInputs()) return;

    if (valor > 60) {
      setWarning(
        `Ganancia muy alta (${valor.toFixed(
          2
        )} dB). Puede ser poco práctica para implementación real.`
      );
    } else if (valor < 10) {
      setWarning(
        `Ganancia baja (${valor.toFixed(
          2
        )} dB). Considere aumentar tamaño o frecuencia.`
      );
    } else {
      setWarning("");
    }

    setGanancia(valor.toFixed(2) + " dB");
    graficarPorFrecuencia(diameter, frequency);
    graficarPorDiametro(diameter, frequency);
  };

  const graficarPorFrecuencia = (d, f) => {
    if (!chartFrequencyRef.current) return;
    const ctx = chartFrequencyRef.current.getContext("2d");
    if (!ctx) return;
    if (chartFrequency.current) chartFrequency.current.destroy();

    const data = [];
    const practical = [];
    const maxF = Math.max(15, f * 1.2);
    const step = maxF <= 15 ? 0.5 : 1;

    for (let freq = 0.5; freq <= maxF; freq += step) {
      const valor = calcularGananciaNumerica(d, freq);
      data.push({ x: freq, y: valor });
      practical.push({ x: freq, y: freq >= 3 && freq <= 30 ? valor : null });
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
            tension: 0.1,
          },
          {
            label: "Rango práctico (3-30 GHz)",
            data: practical,
            borderColor: "rgb(16, 185, 129)",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            fill: false,
            borderDash: [5, 5],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Ganancia vs Frecuencia (Diámetro fijo: ${d}m)`,
          },
          annotation: {
            annotations: {
              lineaActual: {
                type: "line",
                scaleID: "x",
                value: f,
                borderColor: "red",
                borderDash: [6, 6],
                borderWidth: 2,
                label: {
                  display: true,
                  content: `f = ${f} GHz`,
                  position: "start",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              },
            },
          },
        },
        scales: {
          x: {
            type: "linear",
            title: { display: true, text: "Frecuencia (GHz)" },
          },
          y: {
            title: { display: true, text: "Ganancia (dB)" },
            min: 0,
            max: Math.max(...data.map((d) => d.y)) + 10,
          },
        },
      },
    });
  };

  const graficarPorDiametro = (d, f) => {
    if (!chartDiameterRef.current) return;
    const ctx = chartDiameterRef.current.getContext("2d");
    if (!ctx) return;
    if (chartDiameter.current) chartDiameter.current.destroy();

    const data = [];
    const practical = [];
    const maxD = Math.max(15, d * 1.2);
    const step = maxD <= 15 ? 0.5 : 1;

    for (let dia = 0.5; dia <= maxD; dia += step) {
      const valor = calcularGananciaNumerica(dia, f);
      data.push({ x: dia, y: valor });
      practical.push({ x: dia, y: dia >= 0.5 && dia <= 5 ? valor : null });
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
            tension: 0.1,
          },
          {
            label: "Rango práctico (0.5-5m)",
            data: practical,
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            fill: false,
            borderDash: [5, 5],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Ganancia vs Diámetro (Frecuencia fija: ${f}GHz)`,
          },
          annotation: {
            annotations: {
              lineaActual: {
                type: "line",
                scaleID: "x",
                value: d,
                borderColor: "red",
                borderDash: [6, 6],
                borderWidth: 2,
                label: {
                  display: true,
                  content: `D = ${d} m`,
                  position: "start",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (context) =>
                `${context.dataset.label}: ${context.parsed.y.toFixed(
                  2
                )} dB @ ${context.parsed.x} m`,
            },
          },
        },
        scales: {
          x: {
            type: "linear",
            title: { display: true, text: "Diámetro (m)" },
          },
          y: {
            title: { display: true, text: "Ganancia (dB)" },
            min: 0,
            max: Math.max(...data.map((d) => d.y)) + 10,
          },
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

      {warning && (
        <Alert variant="default" className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Advertencia</AlertTitle>
          <AlertDescription>{warning}</AlertDescription>
        </Alert>
      )}

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
            <p className="mt-2">
              Donde 7 representa la eficiencia aproximada (70%) de la antena
              parabólica.
            </p>
          </div>
          <div>
            <p>
              <strong>Rangos prácticos:</strong>
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Diámetros típicos: 0.5m a 5m</li>
              <li>Frecuencias comunes: 3GHz a 30GHz (bandas C, Ku, Ka)</li>
              <li>Ganancias prácticas: 20dB a 50dB</li>
              <li>Eficiencia típica: 50% a 75%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laboratorio4;
