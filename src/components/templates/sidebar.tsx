import { integrantes } from "@/lib/utils";
import { Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export const Sidebar = () => {
  return (
    <div className="lg:col-span-1">
      <div className="space-y-6 sticky top-6">
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
  );
};
