import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Calculator } from "lucide-react";
import TransmissionMediaContent from "@/components/Laboratorio4/teoria";
import CalcDistancia from "@/components/Laboratorio4/calc_distancia_max";
import CalcGanancia from "@/components/Laboratorio4/calc_ganancia";
import { integrantes } from "@/lib/utils";
import { Header } from "@/components/templates/header";
import { Sidebar } from "@/components/templates/sidebar";
import { Footer } from "@/components/templates/footer";

const Lab4 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header
        title="Medios de Transmisión"
        lab="Laboratorio 4"
        description="Análisis de los medios de transmisión físicos (guiados) y ondas electromagnéticas (no guiados), incluyendo propiedades de antenas y propagación."
      />

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
          <Sidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Lab4;
