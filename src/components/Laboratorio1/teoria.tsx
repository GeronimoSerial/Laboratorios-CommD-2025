// src/components/SignalLabContent.jsx
import { Component } from "react";
import { InlineMath } from "react-katex"; // Import InlineMath
import "katex/dist/katex.min.css"; // Ensure KaTeX CSS is imported globally or in your root App component

class SignalLabContent extends Component {
  render() {
    return (
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-blue-800 mb-6 sm:mb-8 border-b-4 border-blue-600 pb-3">
          Fundamentos de Señales y Espectros
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          Esta sección explora los principios esenciales de las señales
          analógicas, su conversión al dominio digital y su análisis en el
          dominio de la frecuencia. Estos conocimientos son fundamentales en el
          campo de las comunicaciones de datos.
        </p>

        <section className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 border-l-4 border-blue-500 pl-3">
            1. El Teorema del Muestreo (Nyquist-Shannon)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            El muestreo periódico es el proceso de tomar mediciones de una señal
            analógica a intervalos de tiempo constantes. En la digitalización de
            audio, por ejemplo, la señal se convierte a una cierta "frecuencia
            de muestreo" (fm).
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Una frecuencia de muestreo insuficiente puede llevar a la pérdida de
            información y a un fenómeno conocido como "aliasing". El aliasing
            ocurre cuando las muestras de una señal de alta frecuencia son
            indistinguibles de las muestras de una señal de menor frecuencia, lo
            que resulta en una reconstrucción incorrecta de la señal original.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Para evitar este problema, el Teorema del Muestreo (Nyquist-Shannon)
            establece una regla fundamental: la frecuencia mínima de muestreo
            (fm) debe ser mayor que el doble del ancho de banda (BW) de la señal
            a muestrear.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 mb-4 rounded-md">
            <p className="font-semibold mb-2">Principio del Muestreo:</p>
            <p className="text-center text-lg font-mono">
              <InlineMath math="f_m > 2 \cdot BW" />
            </p>
            <p className="mt-2 text-sm">
              Donde BW es el ancho de banda de la señal.
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Este principio asegura que se capture suficiente información para
            reconstruir fielmente la señal analógica original a partir de sus
            muestras digitales.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 border-l-4 border-blue-500 pl-3">
            2. La Transformada Rápida de Fourier (FFT)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            La Transformada Rápida de Fourier (FFT) es un algoritmo eficiente
            para calcular la Transformada de Fourier discreta. Su importancia
            radica en su capacidad de transformar una señal del "dominio del
            tiempo" al "dominio de la frecuencia".
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Esto significa que nos permite identificar qué componentes de
            frecuencia (ondas senoidales y cosenoidales de diferentes
            frecuencias) están presentes en una señal y con qué amplitud. Es
            como "descomponer" una melodía compleja en sus notas individuales.
          </p>
          <div className="bg-purple-50 border-l-4 border-purple-400 text-purple-800 p-4 mb-4 rounded-md">
            <p className="font-semibold mb-2">Idea Central:</p>
            <p className="text-center text-lg font-mono">
              Señal en el Tiempo <InlineMath math="\leftrightarrow" />{" "}
              Componentes en Frecuencia
            </p>
            <p className="mt-2 text-sm">
              Esta transformación es vital para analizar características de las
              señales que no son obvias al observarlas únicamente en el tiempo.
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            La Transformada de Fourier es una herramienta matemática poderosa
            que se extiende a una amplia gama de aplicaciones en ingeniería y
            sistemas, desde el procesamiento de audio e imágenes hasta las
            telecomunicaciones.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 border-l-4 border-blue-500 pl-3">
            3. Tipos de Señales Comunes y su Representación
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            En el estudio de las comunicaciones, se trabaja con diversas formas
            de onda. Comprender sus características es clave:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Señal Escalón:</strong> Representa un cambio instantáneo
              de un estado a otro, como el encendido de un interruptor.
            </li>
            <li>
              <strong>Señal Pulso:</strong> Una señal que está activa por un
              período corto y luego regresa a su estado inicial, ideal para
              modelar eventos discretos.
            </li>
            <li>
              <strong>Señal Sinc:</strong> Es fundamental en el muestreo digital
              y tiene una forma ondulada que decae.
            </li>
            <li>
              <strong>Señal Impulso (Delta de Dirac):</strong> Una idealización
              de un evento extremadamente corto con una "intensidad" concentrada
              en un solo punto.
            </li>
            <li>
              <strong>Señal Triangular y Diente de Sierra:</strong> Ondas
              periódicas que cambian linealmente con el tiempo, usadas en
              barridos de frecuencia o generación de formas de onda.
            </li>
            <li>
              <strong>Señal Exponencial Decreciente:</strong> Describe procesos
              de decaimiento o atenuación, comunes en circuitos RC o transmisión
              de señales.
            </li>
            <li>
              <strong>Señal Cuadrada:</strong> Una onda que alterna abruptamente
              entre dos valores, esencial en lógica digital y modulación.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 border-l-4 border-blue-500 pl-3">
            4. Análisis de Espectro en Aplicaciones Prácticas
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            La FFT es invaluable para analizar señales complejas del mundo real,
            incluyendo aquellas que contienen múltiples componentes y ruido.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Espectro de Señales Senoidales:</strong> La FFT de una
              onda senoidal pura muestra un pico claro en su frecuencia. Para
              una señal compuesta por múltiples sinusoides, se observarán picos
              distintos para cada frecuencia.
            </li>
            <li>
              <strong>Análisis de Señales Cuadradas:</strong> Una señal
              cuadrada, al ser una combinación de muchas frecuencias (armónicos
              impares), revela un espectro que muestra estos componentes, no
              solo una única frecuencia.
            </li>
            <li>
              <strong>Extracción de Señales con Ruido:</strong> La FFT es
              crucial para identificar las frecuencias originales de una señal,
              incluso cuando esta está oculta por ruido aleatorio. Al pasar la
              señal ruidosa por la FFT, las frecuencias dominantes de la señal
              original a menudo se destacan sobre el "piso de ruido".
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

export default SignalLabContent;
