// src/components/TransmissionMediaContent.jsx
import { Component } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

class TransmissionMediaContent extends Component {
  render() {
    return (
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-blue-800 mb-6 sm:mb-8 border-b-4 border-blue-600 pb-3">
          Medios de Transmisión: Guiados y No Guiados
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          La capacidad de una comunicación, en términos de velocidad de
          transmisión o ancho de banda, está fuertemente influenciada por la
          distancia y por si la conexión es punto a punto o multipunto. Esta
          sección explora los diferentes medios físicos y no físicos a través de
          los cuales se propagan las señales.
        </p>

        <section className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 border-l-4 border-blue-500 pl-3">
            Medios de Transmisión Guiados
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Los medios guiados son aquellos que confinan la señal a un camino
            físico, dirigiendo la energía a lo largo del medio.
          </p>

          <h4 className="text-lg font-semibold text-blue-600 mb-2 mt-6">
            Par Trenzado
          </h4>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Descripción:</strong> Consiste en dos cables de cobre
              aislados, entrelazados en espiral. Este trenzado reduce la
              interferencia electromagnética (diafonía) entre pares adyacentes.
              Varios pares suelen agruparse en una misma envoltura protectora.
            </li>
            <li>
              <strong>Uso y Características:</strong> Es el medio guiado más
              económico y ampliamente utilizado tanto para señales analógicas
              como digitales. Sin embargo, es susceptible a interferencias
              externas y al ruido.
            </li>
          </ul>

          <h4 className="text-lg font-semibold text-blue-600 mb-2 mt-6">
            Cable Coaxial
          </h4>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Descripción:</strong> Se compone de un conductor central
              rodeado por un aislante, a su vez cubierto por un conductor
              cilíndrico externo, y todo ello envuelto por una funda protectora.
              Su diámetro es variable.
            </li>
            <li>
              <strong>Uso y Características:</strong> Es un medio muy versátil,
              empleado en distribución de televisión, telefonía a larga
              distancia y conexiones periféricas. Es significativamente menos
              susceptible a interferencias y diafonía que el par trenzado,
              permitiendo mayores distancias y más estaciones en una línea
              compartida. Sus limitaciones principales son la atenuación y
              distintos tipos de ruido (térmico, de intermodulación). Para
              transmisiones analógicas a larga distancia, requiere
              amplificadores periódicamente, con separaciones menores a mayor
              frecuencia.
            </li>
          </ul>

          <h4 className="text-lg font-semibold text-blue-600 mb-2 mt-6">
            Fibra Óptica
          </h4>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Descripción:</strong> Un medio flexible y extremadamente
              fino que conduce energía óptica (luz). Su estructura cilíndrica
              consta de tres secciones concéntricas: el núcleo (una o varias
              fibras de vidrio o plástico), el revestimiento (también de vidrio
              o plástico con diferentes propiedades ópticas) y la cubierta
              (capas de plástico y otros materiales para protección).
            </li>
            <li>
              <strong>Uso y Características:</strong> Ampliamente utilizada en
              telecomunicaciones de larga distancia, tanto civiles como
              militares, debido a su alta capacidad, inmunidad a interferencias
              electromagnéticas y su costo decreciente.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 border-l-4 border-blue-500 pl-3">
            Medios de Transmisión No Guiados
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Los medios no guiados, también conocidos como inalámbricos, no
            utilizan cables. La transmisión se realiza a través de ondas
            electromagnéticas, generalmente en el aire.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Transmisión y Recepción:</strong> Se efectúan mediante
              antenas. La energía eléctrica del transmisor se convierte en
              energía electromagnética en la antena y se irradia al medio. A la
              inversa, la energía electromagnética captada por la antena se
              convierte en energía eléctrica para el receptor.
            </li>
            <li>
              <strong>Configuraciones de Transmisión:</strong>
              <ul className="list-circle list-inside ml-4">
                <li>
                  <strong>Direccional:</strong> La antena transmisora concentra
                  la energía en un haz estrecho. Requiere que las antenas de
                  emisión y recepción estén perfectamente alineadas.
                </li>
                <li>
                  <strong>Omnidireccional:</strong> La antena transmisora emite
                  energía en todas direcciones con un patrón de radiación
                  disperso. Permite que la señal sea recibida por múltiples
                  antenas en diferentes ubicaciones.
                </li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 border-l-4 border-blue-500 pl-3">
            Antenas y Propagación
          </h3>

          <h4 className="text-lg font-semibold text-blue-600 mb-2 mt-6">
            Antenas
          </h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Una antena es un componente eléctrico diseñado para convertir
            energía eléctrica en energía electromagnética (radiación) para la
            transmisión, y viceversa para la recepción. En comunicaciones
            bidireccionales, la misma antena puede ser utilizada para ambas
            funciones, ya que sus características de transmisión y recepción son
            idénticas.
          </p>

          <h4 className="text-lg font-semibold text-blue-600 mb-2 mt-6">
            Ganancia de una Antena
          </h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            La ganancia de una antena es una medida de su direccionalidad,
            indicando qué tan bien concentra la potencia en una dirección
            específica. Se define comparando la potencia de salida en una
            dirección dada con la potencia que sería transmitida en todas
            direcciones por una antena isotrópica ideal (que irradia
            uniformemente en todas direcciones).
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Un concepto relacionado es el área efectiva (
            <InlineMath math="A_e" />
            ), que se relaciona con el tamaño físico y la geometría de la
            antena. La relación entre la ganancia (<InlineMath math="G" />) y el
            área efectiva está dada por la siguiente fórmula:
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 mb-4 rounded-md">
            <p className="text-center text-lg font-mono">
              <InlineMath math="G = \frac{4 \pi A_e}{\lambda^2} = \frac{4 \pi f^2 A_e}{c^2}" />
            </p>
            <ul className="text-sm mt-2 list-none pl-0">
              <li>
                <InlineMath math="G" />: Ganancia de la antena (adimensional)
              </li>
              <li>
                <InlineMath math="A_e" />: Área efectiva (
                <InlineMath math="m^2" />)
              </li>
              <li>
                <InlineMath math="f" />: Frecuencia de la portadora (Hz)
              </li>
              <li>
                <InlineMath math="c" />: Velocidad de la luz (
                <InlineMath math="3 \times 10^8 \text{ m/s}" />)
              </li>
              <li>
                <InlineMath math="\lambda" />: Longitud de onda de la portadora
                (<InlineMath math="m" />)
              </li>
            </ul>
          </div>

          <h4 className="text-lg font-semibold text-blue-600 mb-2 mt-6">
            Refracción
          </h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            La refracción es el fenómeno por el cual la dirección de una onda
            electromagnética cambia al pasar de un medio a otro con diferente
            densidad. Esto ocurre porque la velocidad de la onda es una función
            de la densidad del medio.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Cuando una onda pasa de un medio menos denso a uno más denso, se
            desvía hacia el medio más denso. En la atmósfera, el índice de
            refracción disminuye con la altura (se vuelve menos densa). Esto
            hace que las ondas de radio viajen más lento cerca de la Tierra que
            a mayores alturas, lo que provoca que las ondas de radio se curven
            suavemente hacia la Tierra.
          </p>
        </section>
      </div>
    );
  }
}

export default TransmissionMediaContent;
