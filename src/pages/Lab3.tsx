import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Laboratorio3 from "@/components/Laboratorio3";
import { BookOpen, ChartLine } from "lucide-react";
import EncodingModulationContent from "@/components/Laboratorio3/teoria";
import { Header } from "@/components/templates/header";
import { Sidebar } from "@/components/templates/sidebar";
import { Footer } from "@/components/templates/footer";

const Lab3 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header
        title="Codificación de Datos"
        lab="Laboratorio 3"
        description="Codificación de datos y modulación de señales para transmisión digital."
      />

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs defaultValue="teoria" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="teoria" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Teoría
                </TabsTrigger>
                <TabsTrigger
                  value="graficos"
                  className="flex items-center gap-2"
                >
                  <ChartLine className="w-4 h-4" />
                  Graficos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="teoria" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className=""></CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <EncodingModulationContent />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="graficos" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className=""></CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Laboratorio3 />
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

export default Lab3;
