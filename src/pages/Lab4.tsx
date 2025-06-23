import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Network, BookOpen, Users, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import TransmissionMediaContent from "@/components/Laboratorio4/teoria";
import CalcDistancia from "@/components/Laboratorio4/calc_distancia_max";
import CalcGanancia from "@/components/Laboratorio4/calc_ganancia";
import { integrantes } from "@/lib/utils";

const Lab4 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button
                variant="outline"
                size="sm"
                className="text-blue-900 border-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </Link>
            <Badge variant="secondary" className="bg-blue-700 text-white">
              Laboratorio 4
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Network className="w-8 h-8" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Medios de Transmisión
              </h1>
              <p className="text-blue-100 text-lg">
                Análisis de los medios de transmisión físicos (guiados) y ondas
                electromagnéticas (no guiados), incluyendo propiedades de
                antenas y propagación.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="teoria" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="teoria" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Teoría
                </TabsTrigger>
                <TabsTrigger
                  value="calculadora"
                  className="flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  Calculadora Ganancia
                </TabsTrigger>
                <TabsTrigger
                  value="calculadora2"
                  className="flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  Calculadora Distancia Maxima
                </TabsTrigger>
              </TabsList>

              {/* Teoría */}
              <TabsContent value="teoria" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className=""></CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <TransmissionMediaContent />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="calculadora" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className=""></CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CalcGanancia />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="calculadora2" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className=""></CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CalcDistancia />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-6">
              {/* Team Members */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Integrantes del Grupo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {integrantes.map((integrante, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-600 p-2 bg-gray-50 rounded"
                      >
                        {integrante}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lab4;
