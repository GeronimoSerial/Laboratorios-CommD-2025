import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Network } from "lucide-react";

export const Header = ({
  title,
  lab,
  description,
}: {
  title: string;
  lab: string;
  description?: string;
}) => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/">
            <Button
              variant="outline"
              size="sm"
              className="text-white bg-blue-700 hover:bg-blue-600 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <Badge
            variant="secondary"
            className="bg-blue-700 text-white hover:bg-blue-700"
          >
            {lab}
          </Badge>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <Network className="w-8 h-8 flex-shrink-0" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
                {description && (
                  <p className="text-blue-100 text-lg mt-1">{description}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 flex items-center justify-center rounded-lg text-blue-700 text-xs text-center">
              <img src="/Logo-UNNE.webp" alt="UNNE Logo" />
            </div>
            <div className="w-20 h-20 flex items-center justify-center rounded-lg text-blue-700 text-xs text-center">
              <img src="/facena.webp" alt="FACENA Logo" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
