import { useRef, useState, useEffect } from "react";

const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 120;
const BIT_LENGTH = 11;
const DEFAULT_BITS = "10110011001";

const signalNames = [
  { id: "nrzl", label: "NRZ-L" },
  { id: "nrzi", label: "NRZ-I" },
  { id: "bipolarAmi", label: "Bipolar AMI" },
  { id: "pseudoternario", label: "Pseudoternario" },
  { id: "manchester", label: "Manchester" },
  { id: "manchesterDifferential", label: "Manchester diferencial" },
];

const Laboratorio3 = () => {
  const [bitString, setBitString] = useState(DEFAULT_BITS);
  const canvasRefs = useRef({});

  useEffect(() => {
    if (bitString.length === BIT_LENGTH) {
      drawAll(bitString);
    }
  }, [bitString]);

  const drawAll = (bits) => {
    signalNames.forEach(({ id }) => {
      const canvas = canvasRefs.current[id];
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
          drawReference(ctx);
          drawGrid(ctx, bits.length);
          switch (id) {
            case "nrzl":
              drawNRZL(ctx, bits);
              break;
            case "nrzi":
              drawNRZI(ctx, bits);
              break;
            case "bipolarAmi":
              drawBipolarAMI(ctx, bits);
              break;
            case "pseudoternario":
              drawPseudoternario(ctx, bits);
              break;
            case "manchester":
              drawManchester(ctx, bits);
              break;
            case "manchesterDifferential":
              drawManchesterDiff(ctx, bits);
              break;
            default:
              break;
          }
        }
      }
    });
  };

  const drawReference = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_HEIGHT / 2);
    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT / 2);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const drawGrid = (ctx, length) => {
    const bitWidth = CANVAS_WIDTH / length;
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= length; i++) {
      const x = i * bitWidth;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_HEIGHT);
      ctx.stroke();
    }
  };

  // --- Algoritmos de codificación corregidos ---
  const drawNRZL = (ctx, bits) => {
    const bitWidth = CANVAS_WIDTH / bits.length;
    let x = 0;
    let currentY = CANVAS_HEIGHT * 0.5;

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    for (let i = 0; i < bits.length; i++) {
      const bit = parseInt(bits[i]);
      const newY = bit === 0 ? CANVAS_HEIGHT * 0.1 : CANVAS_HEIGHT * 0.9;

      // Transición vertical si hay cambio de nivel
      if (newY !== currentY) {
        ctx.beginPath();
        ctx.moveTo(x, currentY);
        ctx.lineTo(x, newY);
        ctx.stroke();
      }

      // Línea horizontal para el bit actual
      ctx.beginPath();
      ctx.moveTo(x, newY);
      ctx.lineTo(x + bitWidth, newY);
      ctx.stroke();

      currentY = newY;
      x += bitWidth;
    }
  };

  const drawNRZI = (ctx, bits) => {
    const bitWidth = CANVAS_WIDTH / bits.length;
    let x = 0;
    let currentY = CANVAS_HEIGHT * 0.9; // Empezar en nivel alto

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    for (let i = 0; i < bits.length; i++) {
      const bit = parseInt(bits[i]);

      if (bit === 1) {
        // Cambiar de nivel para bit 1
        const newY =
          currentY === CANVAS_HEIGHT * 0.9
            ? CANVAS_HEIGHT * 0.1
            : CANVAS_HEIGHT * 0.9;
        ctx.beginPath();
        ctx.moveTo(x, currentY);
        ctx.lineTo(x, newY);
        ctx.stroke();
        currentY = newY;
      }

      // Línea horizontal
      ctx.beginPath();
      ctx.moveTo(x, currentY);
      ctx.lineTo(x + bitWidth, currentY);
      ctx.stroke();

      x += bitWidth;
    }
  };

  const drawBipolarAMI = (ctx, bits) => {
    const bitWidth = CANVAS_WIDTH / bits.length;
    let x = 0;
    let currentY = CANVAS_HEIGHT * 0.5;
    let lastSignal = true; // true = positivo, false = negativo

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    for (let i = 0; i < bits.length; i++) {
      const bit = parseInt(bits[i]);
      let newY;

      if (bit === 0) {
        newY = CANVAS_HEIGHT * 0.5; // Nivel cero
      } else {
        newY = lastSignal ? CANVAS_HEIGHT * 0.1 : CANVAS_HEIGHT * 0.9;
        lastSignal = !lastSignal; // Alternar polaridad
      }

      // Transición vertical
      if (newY !== currentY) {
        ctx.beginPath();
        ctx.moveTo(x, currentY);
        ctx.lineTo(x, newY);
        ctx.stroke();
      }

      // Línea horizontal
      ctx.beginPath();
      ctx.moveTo(x, newY);
      ctx.lineTo(x + bitWidth, newY);
      ctx.stroke();

      currentY = newY;
      x += bitWidth;
    }
  };

  const drawPseudoternario = (ctx, bits) => {
    const bitWidth = CANVAS_WIDTH / bits.length;
    let x = 0;
    let currentY = CANVAS_HEIGHT * 0.5;
    let lastSignal = true; // true = positivo, false = negativo

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    for (let i = 0; i < bits.length; i++) {
      const bit = parseInt(bits[i]);
      let newY;

      if (bit === 1) {
        newY = CANVAS_HEIGHT * 0.5; // Nivel cero para 1
      } else {
        newY = lastSignal ? CANVAS_HEIGHT * 0.1 : CANVAS_HEIGHT * 0.9;
        lastSignal = !lastSignal; // Alternar polaridad para 0
      }

      // Transición vertical
      if (newY !== currentY) {
        ctx.beginPath();
        ctx.moveTo(x, currentY);
        ctx.lineTo(x, newY);
        ctx.stroke();
      }

      // Línea horizontal
      ctx.beginPath();
      ctx.moveTo(x, newY);
      ctx.lineTo(x + bitWidth, newY);
      ctx.stroke();

      currentY = newY;
      x += bitWidth;
    }
  };

  const drawManchester = (ctx, bits) => {
    const bitWidth = CANVAS_WIDTH / bits.length;
    let x = 0;
    let currentY = CANVAS_HEIGHT * 0.5;

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    for (let i = 0; i < bits.length; i++) {
      const bit = parseInt(bits[i]);
      const startY = bit === 0 ? CANVAS_HEIGHT * 0.1 : CANVAS_HEIGHT * 0.9;
      const endY = bit === 0 ? CANVAS_HEIGHT * 0.9 : CANVAS_HEIGHT * 0.1;

      // Transición al inicio del bit si es necesario
      if (startY !== currentY) {
        ctx.beginPath();
        ctx.moveTo(x, currentY);
        ctx.lineTo(x, startY);
        ctx.stroke();
      }

      // Primera mitad del bit
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x + bitWidth / 2, startY);
      ctx.stroke();

      // Transición en el medio del bit
      ctx.beginPath();
      ctx.moveTo(x + bitWidth / 2, startY);
      ctx.lineTo(x + bitWidth / 2, endY);
      ctx.stroke();

      // Segunda mitad del bit
      ctx.beginPath();
      ctx.moveTo(x + bitWidth / 2, endY);
      ctx.lineTo(x + bitWidth, endY);
      ctx.stroke();

      currentY = endY;
      x += bitWidth;
    }
  };

  const drawManchesterDiff = (ctx, bits) => {
    const bitWidth = CANVAS_WIDTH / bits.length;
    let x = 0;
    let currentY = CANVAS_HEIGHT * 0.9; // Empezar en nivel alto

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    for (let i = 0; i < bits.length; i++) {
      const bit = parseInt(bits[i]);

      if (bit === 0) {
        // Para 0: transición al inicio y en el medio
        const midY =
          currentY === CANVAS_HEIGHT * 0.9
            ? CANVAS_HEIGHT * 0.1
            : CANVAS_HEIGHT * 0.9;

        // Transición al inicio
        ctx.beginPath();
        ctx.moveTo(x, currentY);
        ctx.lineTo(x, midY);
        ctx.stroke();

        // Primera mitad
        ctx.beginPath();
        ctx.moveTo(x, midY);
        ctx.lineTo(x + bitWidth / 2, midY);
        ctx.stroke();

        // Transición en el medio
        const endY =
          midY === CANVAS_HEIGHT * 0.9
            ? CANVAS_HEIGHT * 0.1
            : CANVAS_HEIGHT * 0.9;
        ctx.beginPath();
        ctx.moveTo(x + bitWidth / 2, midY);
        ctx.lineTo(x + bitWidth / 2, endY);
        ctx.stroke();

        // Segunda mitad
        ctx.beginPath();
        ctx.moveTo(x + bitWidth / 2, endY);
        ctx.lineTo(x + bitWidth, endY);
        ctx.stroke();

        currentY = endY;
      } else {
        // Para 1: sin transición al inicio, solo en el medio
        // Primera mitad
        ctx.beginPath();
        ctx.moveTo(x, currentY);
        ctx.lineTo(x + bitWidth / 2, currentY);
        ctx.stroke();

        // Transición en el medio
        const endY =
          currentY === CANVAS_HEIGHT * 0.9
            ? CANVAS_HEIGHT * 0.1
            : CANVAS_HEIGHT * 0.9;
        ctx.beginPath();
        ctx.moveTo(x + bitWidth / 2, currentY);
        ctx.lineTo(x + bitWidth / 2, endY);
        ctx.stroke();

        // Segunda mitad
        ctx.beginPath();
        ctx.moveTo(x + bitWidth / 2, endY);
        ctx.lineTo(x + bitWidth, endY);
        ctx.stroke();

        currentY = endY;
      }

      x += bitWidth;
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^01]/g, "");
    setBitString(value);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Graficador de Codificación de Datos
      </h2>

      <div className="mb-8">
        <div className="flex flex-col items-center gap-4">
          <label
            htmlFor="bitString"
            className="text-lg font-semibold text-gray-700"
          >
            Cadena de bits ({bitString.length}/{BIT_LENGTH} caracteres):
          </label>
          <input
            type="text"
            id="bitString"
            maxLength={BIT_LENGTH}
            value={bitString}
            onChange={handleInputChange}
            className="px-4 py-2 text-lg font-mono border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-center"
            placeholder="Ingrese 11 bits (0s y 1s)"
          />
          {bitString.length !== BIT_LENGTH && (
            <p className="text-red-500 text-sm">
              La cadena debe tener exactamente {BIT_LENGTH} bits
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {signalNames.map(({ id, label }) => (
          <div
            key={id}
            className="flex flex-col items-center bg-gray-50 p-4 rounded-lg"
          >
            <h4 className="font-semibold mb-3 text-gray-800">{label}</h4>
            <canvas
              ref={(el) => (canvasRefs.current[id] = el)}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="border border-gray-300 shadow-sm bg-white"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 text-sm text-gray-600">
        <p className="mb-2">
          <strong>Instrucciones:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Ingrese una cadena de exactamente 11 bits (solo 0s y 1s)</li>
          <li>Las gráficas se actualizan automáticamente en tiempo real</li>
          <li>
            La línea negra horizontal representa el nivel de referencia (0V)
          </li>
          <li>La línea roja muestra la señal codificada</li>
        </ul>
      </div>
    </div>
  );
};

export default Laboratorio3;
