import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Network, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const laboratorios = [
    {
      numero: 1,
      titulo: "Señales y espectros",
      descripcion:
        "Fundamentos de señales analógicas y digitales, muestreo y el análisis de espectro mediante la Transformada de Fourier.",
      route: "/lab1",
    },
    {
      numero: 2,
      titulo: "Transmisión de Datos",
      descripcion:
        "Explora los tipos de transmisión de datos y los factores clave que determinan la capacidad máxima de un canal de comunicación, según Nyquist y Shannon.",
      route: "/lab2",
    },
    {
      numero: 3,
      titulo: "Codificación y Modulación",
      descripcion:
        " Entiende cómo los datos se transforman en señales mediante técnicas de codificación digital y los principios de modulación analógica.",
      route: "/lab3",
    },
    {
      numero: 4,
      titulo: "Medios de Transmisión",
      descripcion:
        "Análisis de los medios de transmisión físicos (guiados) y ondas electromagnéticas (no guiados), incluyendo propiedades de antenas y propagación.",
      route: "/lab4",
    },
  ];

  const integrantes = [
    { nombre: "Fabian Gustavo Quintana", dni: "45.678.901" },
    { nombre: "Geraldine Janet Rodriguez", dni: "56.789.012" },
    { nombre: "Geronimo Serial", dni: "42.603.578" },
    { nombre: "Leonel Francisco Alegre", dni: "45.169.283" },
    { nombre: "Máximo Tomás Riveros", dni: "45.643.192" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-12 md:py-20 shadow-xl">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div> */}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          {/* Institutional Logos */}
          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="backdrop-blur-sm p-4 rounded-xl shadow-lg w-40 h-40 md:w-40 md:h-40 flex items-center justify-center">
              <img
                src="/Logo-UNNE.png"
                className="aspect-[308/308] object-contain"
                alt=""
              />
            </div>
            <div className="backdrop-blur-sm p-4 rounded-xl shadow-lg w-40 h-40 md:w-40 md:h-40 flex items-center justify-center">
              <img
                src="/facena.png"
                className="aspect-[308/308] object-contain"
                alt=""
              />
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 mb-4">
              Comunicaciones de Datos 2025
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light">
              Laboratorios Prácticos - <strong>Grupo 25</strong>
            </p>
          </div>
        </div>
      </header>

      {/* Descripción del Trabajo Práctico */}
      <section className="py-16 px-6 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxNSkiPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0icmdiYSgwLDExNSwyMDUsMC4wMikiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto max-w-5xl relative">
          <div className="opacity-0 animate-fade-in [animation-fill-mode:forwards]">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-gray-800 flex items-center justify-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  Desarrollo de Laboratorios
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Esta interfaz web abarca el desarrollo completo de cuatro
                  laboratorios enfocados en diferentes aspectos de las
                  comunicaciones de datos. Cada laboratorio incluye
                  implementación práctica y análisis teórico, proporcionando una
                  comprensión integral de los sistemas de comunicación modernos.
                </p>

                {/* Integrantes del Grupo */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Integrantes del Grupo
                  </h3>
                  <div className="max-w-2xl mx-auto space-y-3">
                    {integrantes.map((integrante, index) => (
                      <div
                        key={index}
                        className="bg-white/50 text-black px-6 py-3 rounded-lg border border-blue-200 flex justify-between items-center"
                      >
                        <span className="font-medium">{integrante.nombre}</span>
                        <span className="text-black font-mono text-sm">
                          DNI: {integrante.dni}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Laboratorios Grid */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-70"></div>
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-16 opacity-0 animate-fade-in [animation-fill-mode:forwards]">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Laboratorios
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {laboratorios.map((lab, index) => (
              <div
                key={lab.numero}
                className="opacity-0 animate-fade-in [animation-fill-mode:forwards]"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: "0.6s",
                }}
              >
                <Card className="group h-full flex flex-col hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white hover:-translate-y-2 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white py-6 px-8">
                    <CardTitle className="text-xl">
                      Laboratorio {lab.numero}
                    </CardTitle>
                    <p className="text-blue-100 font-medium">{lab.titulo}</p>
                  </CardHeader>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <p className="text-gray-600 mb-6 line-clamp-3 flex-1">
                      {lab.descripcion}
                    </p>
                    <div className="mt-auto pt-4">
                      <Link to={lab.route} className="block w-full">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 group-hover:bg-blue-700">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Acceder al Laboratorio
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="flex flex-col items-center opacity-0 animate-fade-in [animation-fill-mode:forwards]">
            <div className="flex items-center justify-center mb-4 bg-blue-600/20 p-3 rounded-full">
              <Network className="w-8 h-8 text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 mb-2">
              Comunicaciones de Datos 2025
            </h3>
            <p className="text-blue-100 max-w-2xl">
              Universidad Nacional del Nordeste • Facultad de Ciencias Exactas
              Naturales y Agrimensura • Licenciatura en Sistemas de Información.
            </p>
            <div className="w-24 h-1 bg-blue-500 rounded-full my-6"></div>
            <p className="text-blue-200 text-sm">
              {new Date().getDate()}/{new Date().getMonth()}/
              {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
