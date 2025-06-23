// src/components/DataTransmissionContent.jsx
import { Component } from "react";
import { InlineMath } from "react-katex"; // Import InlineMath
import "katex/dist/katex.min.css"; // Ensure KaTeX CSS is imported globally or in your root App component

class DataTransmissionContent extends Component {
  render() {
    return (
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-blue-800 mb-6 sm:mb-8 border-b-4 border-blue-600 pb-3">
          Transmisión de Datos: Conceptos Clave
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          Este laboratorio profundiza en los mecanismos de transmisión de datos,
          explorando las diferencias entre la transmisión analógica y digital, y
          los factores que determinan la velocidad y fiabilidad en un canal de
          comunicación.
        </p>

        <section className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 border-l-4 border-blue-500 pl-3">
            Tipos de Transmisión de Datos
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            La forma en que las señales y los datos interactúan define distintos
            tipos de transmisión:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Transmisión Analógica con Señal Analógica:</strong>
              <p className="text-gray-600 text-sm pl-4 mt-1">
                La señal, que puede representar datos analógicos o digitales, se
                propaga y se amplifica a lo largo del medio. La amplificación
                simplemente eleva la intensidad de la señal, incluyendo
                cualquier ruido que se haya incorporado.
              </p>
            </li>
            <li>
              <strong>Transmisión Digital con Señal Analógica:</strong>
              <p className="text-gray-600 text-sm pl-4 mt-1">
                Aquí, una señal analógica se utiliza para transportar datos
                digitales. La propagación ocurre a través de "repetidores". En
                cada repetidor, los datos digitales se extraen de la señal
                entrante y se utilizan para generar una señal analógica de
                salida completamente nueva y limpia, lo que ayuda a mitigar el
                ruido acumulado.
              </p>
            </li>
            <li>
              <strong>Transmisión Digital con Señal Digital:</strong>
              <p className="text-gray-600 text-sm pl-4 mt-1">
                La señal es directamente una secuencia de unos y ceros (bits),
                que pueden ser datos digitales o una codificación de datos
                analógicos. Esta señal también se propaga a través de
                repetidores. Al igual que en la transmisión digital con señal
                analógica, los repetidores regeneran la señal digital,
                reduciendo la acumulación de distorsiones.
              </p>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 border-l-4 border-blue-500 pl-3">
            Capacidad del Canal: Factores Clave
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            La capacidad del canal se refiere a la velocidad máxima a la que se
            pueden transmitir datos a través de una vía de comunicación bajo
            condiciones específicas. Varios factores interrelacionados influyen
            en esta capacidad:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Velocidad de Transmisión de Datos (bps):</strong>
              <p className="text-gray-600 text-sm pl-4 mt-1">
                Es la medida de cuántos bits de información se pueden enviar por
                segundo. Es el objetivo principal que buscamos maximizar.
              </p>
            </li>
            <li>
              <strong>Ancho de Banda (B, en Hz):</strong>
              <p className="text-gray-600 text-sm pl-4 mt-1">
                Se refiere al rango de frecuencias que el canal puede transmitir
                eficazmente. Está limitado por el transmisor y por la naturaleza
                física del medio (cables, aire, fibra óptica). Un mayor ancho de
                banda generalmente permite una mayor velocidad de datos.
              </p>
            </li>
            <li>
              <strong>Ruido:</strong>
              <p className="text-gray-600 text-sm pl-4 mt-1">
                Se refiere a las señales no deseadas que se mezclan con la señal
                útil durante la transmisión. El ruido puede ser generado por el
                medio, los equipos electrónicos o interferencias externas, y es
                una causa principal de errores.
              </p>
            </li>
            <li>
              <strong>Tasa de Errores:</strong>
              <p className="text-gray-600 text-sm pl-4 mt-1">
                Es la frecuencia con la que un bit transmitido se recibe
                incorrectamente (un 0 se interpreta como un 1, o viceversa). Una
                tasa de errores baja es crucial para la fiabilidad de la
                comunicación.
              </p>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 border-l-4 border-blue-500 pl-3">
            Capacidad del Sistema y Niveles de Señal (M)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            La velocidad binaria de un sistema se puede incrementar codificando
            más bits por cada "símbolo" transmitido. Un símbolo es una unidad de
            señal que representa uno o más bits. El número de niveles de señal
            distintos que un símbolo puede tomar se define como{" "}
            <InlineMath math="M = 2^n" />, donde <InlineMath math="n" /> es el
            número de bits por símbolo.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A medida que aumentamos el número de niveles de señal (
            <InlineMath math="M" />
            ), podemos transmitir más bits por cada cambio en la señal. Sin
            embargo, esto también reduce el "espacio" o la diferencia entre los
            niveles de señal. Un espacio menor hace que el sistema sea más
            susceptible al ruido, aumentando la probabilidad de errores en la
            recepción.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 border-l-4 border-blue-500 pl-3">
            Fórmulas de Capacidad del Canal: Nyquist y Shannon
          </h3>

          <h4 className="text-lg font-semibold text-blue-600 mb-2 mt-6">
            Capacidad del Canal según Nyquist (Canal Sin Ruido)
          </h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nyquist formuló una ecuación para calcular la velocidad máxima de
            transmisión de datos en un canal ideal, es decir, un canal **sin
            ruido**. En este escenario, la limitación principal es impuesta por
            el ancho de banda de la señal y por el número de niveles de
            modulación (<InlineMath math="M" />) que se utilizan para codificar
            los datos.
          </p>
          <div className="bg-green-50 border-l-4 border-green-400 text-green-800 p-4 mb-4 rounded-md">
            <p className="font-semibold mb-2">Fórmula de Nyquist:</p>
            <p className="text-center text-lg font-mono">
              <InlineMath math="C = 2 \cdot B \cdot \log_2(M)" />
            </p>
            <ul className="text-sm mt-2 list-none pl-0">
              <li>C = Capacidad del canal (bps)</li>
              <li>B = Ancho de banda del canal (Hz)</li>
              <li>M = Número de niveles de la señal (ej. 2 para binario)</li>
            </ul>
            <p className="mt-2 text-sm">
              Si se utilizan solo dos niveles de señal (
              <InlineMath math="M=2" />, codificación binaria simple), entonces{" "}
              <InlineMath math="\log_2(2)=1" />, y la fórmula se simplifica a{" "}
              <InlineMath math="C = 2 \cdot B" />.
            </p>
          </div>

          <h4 className="text-lg font-semibold text-blue-600 mb-2 mt-6">
            Capacidad del Canal según Shannon (Canal Con Ruido)
          </h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Shannon extendió este concepto al escenario más realista de un canal
            que sí presenta **ruido**. La presencia de ruido puede corromper
            bits, y este efecto se agrava al aumentar la velocidad de
            transmisión, ya que los bits se hacen más cortos y más susceptibles
            a la influencia del ruido en un intervalo de tiempo dado.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            La clave en la fórmula de Shannon es la "relación señal-ruido"
            (SNR), que mide la fuerza de la señal deseada en relación con el
            ruido de fondo.
          </p>
          <div className="bg-red-50 border-l-4 border-red-400 text-red-800 p-4 mb-4 rounded-md">
            <p className="font-semibold mb-2">Relación Señal-Ruido (SNR):</p>
            <p className="text-center text-lg font-mono">
              <InlineMath math="\text{SNR(dB)} = 10 \cdot \log_{10} \left( \frac{\text{Potencia señal}}{\text{Potencia ruido}} \right)" />
            </p>
            <p className="font-semibold mb-2 mt-4">Fórmula de Shannon:</p>
            <p className="text-center text-lg font-mono">
              <InlineMath math="C = B \cdot \log_2(1 + \text{SNR})" />
            </p>
            <ul className="text-sm mt-2 list-none pl-0">
              <li>C = Capacidad del canal (bps)</li>
              <li>B = Ancho de banda del canal (Hz)</li>
              <li>SNR = Relación señal/ruido (un valor lineal, no en dB)</li>
            </ul>
          </div>
          <p className="text-gray-700 leading-relaxed">
            La fórmula de Shannon establece el límite teórico máximo de
            transmisión de datos que puede lograrse en un canal con un ancho de
            banda y nivel de ruido dados, sin importar la complejidad de la
            codificación.
          </p>
        </section>
      </div>
    );
  }
}

export default DataTransmissionContent;
