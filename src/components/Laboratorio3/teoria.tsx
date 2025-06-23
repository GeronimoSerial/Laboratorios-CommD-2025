// src/components/EncodingModulationContent.jsx
import { Component } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

class EncodingModulationContent extends Component {
  render() {
    return (
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-blue-800 mb-6 sm:mb-8 border-b-4 border-blue-600 pb-3">
          Codificación y Modulación: Transformando Datos en Señales
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          Este laboratorio se enfoca en cómo los datos, ya sean analógicos o
          digitales, se transforman en señales eléctricas o electromagnéticas
          aptas para la transmisión. Exploramos las técnicas de codificación
          para señales digitales y los principios de modulación para señales
          analógicas.
        </p>

        <section className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 border-l-4 border-blue-500 pl-3">
            Codificación y Modulación: Una Visión General
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Para la transmisión de datos digitales, una fuente de datos
            (analógica o digital) se convierte en una señal digital. La forma
            final de esta señal dependerá de la técnica de codificación
            seleccionada. El objetivo principal de estas técnicas es optimizar
            el uso del medio de transmisión, por ejemplo, minimizando el ancho
            de banda requerido y la tasa de errores.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            En el caso de la transmisión analógica, se utiliza una señal
            continua de frecuencia constante, conocida como **portadora**. La
            frecuencia de esta portadora debe ser compatible con las
            características del medio físico por el cual se transmitirá la
            señal. Los datos se transmiten modificando esta señal portadora
            mediante un proceso llamado **modulación**.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Modulación:</strong> Es el proceso de codificar los datos
              (la señal moduladora o señal en banda base,{" "}
              <InlineMath math="s(t)" />) en la señal portadora, que tiene una
              frecuencia específica (<InlineMath math="f_c" />
              ).
            </li>
            <li>
              <strong>Técnicas de Modulación:</strong> Implican alterar uno o
              más de los tres parámetros fundamentales de una onda portadora: su
              **amplitud**, su **frecuencia**, o su **fase**.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 border-l-4 border-blue-500 pl-3">
            Técnicas de Codificación de Datos Digitales
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Las técnicas de codificación digital transforman los bits (unos y
            ceros) en formas de onda que pueden ser transmitidas. Buscan
            eficiencia y fiabilidad.
          </p>

          <h4 className="text-lg font-semibold text-blue-600 mb-2 mt-6">
            NRZ (No Retorno a Cero, "Non Return to Zero")
          </h4>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Concepto:</strong> Es la forma más directa de codificar
              bits. Cada bit se representa mediante un nivel de tensión
              constante durante toda su duración. No hay transiciones de la
              señal al nivel cero entre bits.
            </li>
            <li>
              <strong>Ventajas:</strong> Son los códigos más sencillos de
              implementar y hacen un uso muy eficiente del ancho de banda, ya
              que requieren menos transiciones.
            </li>
            <li>
              <strong>NRZ-L (Nivel):</strong> Utiliza un nivel de tensión
              positivo para un valor binario (ej. 0) y un nivel negativo para el
              otro (ej. 1).
            </li>
            <li>
              <strong>NRZ-I (Invertido):</strong> Codifica los datos basándose
              en la presencia o ausencia de una transición de la señal al
              principio del intervalo del bit. Una transición al inicio del
              intervalo representa un valor (ej. 1), y la ausencia de transición
              representa el otro (ej. 0).
            </li>
          </ul>

          <h4 className="text-lg font-semibold text-blue-600 mb-2 mt-6">
            Binario Multinivel
          </h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Estas técnicas utilizan más de dos niveles de señal para representar
            los bits, permitiendo codificar más de un bit por símbolo.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Bipolar–AMI (Alternate Mark Inversion):</strong> Un 0
              binario se representa por la ausencia de señal. Un 1 binario se
              representa por un pulso de tensión, pero la polaridad de estos
              pulsos para los 1's se alterna (positivo, negativo, positivo,
              etc.).
            </li>
            <li>
              <strong>Pseudoternario:</strong> Es lo opuesto a Bipolar-AMI. El 1
              binario se representa por la ausencia de señal, y el 0 binario se
              representa mediante pulsos de polaridad alternada.
            </li>
          </ul>

          <h4 className="text-lg font-semibold text-blue-600 mb-2 mt-6">
            Bifase
          </h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Las técnicas bifase superan algunas limitaciones de los códigos NRZ,
            especialmente en lo que respecta a la sincronización. Cada dígito
            binario se representa por una o más transiciones dentro del
            intervalo del bit.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Manchester:</strong> Se caracteriza por una transición en
              el medio del intervalo de cada bit. Una transición de bajo a alto
              representa un 1 binario, y una transición de alto a bajo
              representa un 0 binario. Esta transición central facilita la
              sincronización entre transmisor y receptor.
            </li>
            <li>
              <strong>Manchester Diferencial:</strong> Similar al Manchester en
              que usa una transición a mitad del intervalo para sincronización.
              Sin embargo, la codificación del bit se determina por la presencia
              o ausencia de una transición al principio del intervalo del bit.
              Por ejemplo, un 0 binario se representa por la presencia de una
              transición al inicio del intervalo, mientras que un 1 podría no
              tenerla.
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

export default EncodingModulationContent;
