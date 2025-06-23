import { Network } from "lucide-react";

export const Footer = () => {
  return (
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
  );
};
