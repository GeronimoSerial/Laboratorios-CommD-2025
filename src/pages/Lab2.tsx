import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Laboratorio2 from "@/components/Laboratorio2";
import { BookOpen, Calculator } from "lucide-react";
import DataTransmissionContent from "@/components/Laboratorio2/teoria";
import { Header } from "@/components/templates/header";
import { Sidebar } from "@/components/templates/sidebar";
import { Footer } from "@/components/templates/footer";

const Lab2 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <Header
        title="Transmisión de Datos"
        lab="Laboratorio 2"
        description="Explora los tipos de transmisión de datos y los factores clave que determinan la capacidad máxima de un canal de comunicación, según Nyquist y Shannon."
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
                  Calculadora
                </TabsTrigger>
              </TabsList>

              {/* Teoría */}
              <TabsContent value="teoria" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className=""></CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <DataTransmissionContent />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="calculadora" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className=""></CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Laboratorio2 />
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

export default Lab2;
