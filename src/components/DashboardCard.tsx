import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  tooltip: string;
  variant?: "teal" | "purple" | "yellow";
}

export const DashboardCard = ({ 
  title, 
  value, 
  tooltip, 
  variant = "teal" 
}: DashboardCardProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "purple":
        return "bg-brand-purple-light/10 hover:bg-brand-purple-light/20";
      case "yellow":
        return "bg-brand-yellow-light/10 hover:bg-brand-yellow-light/20";
      case "teal":
      default:
        return "bg-brand-teal-light/10 hover:bg-brand-teal-light/20";
    }
  };

  const getValueColor = () => {
    switch (variant) {
      case "purple":
        return "text-brand-purple";
      case "yellow":
        return "text-brand-yellow-dark";
      case "teal":
      default:
        return "text-brand-teal";
    }
  };

  return (
    <TooltipProvider>
      <Card className={`p-6 transition-all duration-300 ${getVariantClasses()}`}>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <p className={`text-3xl font-bold animate-fadeIn ${getValueColor()}`}>
          {value}
        </p>
      </Card>
    </TooltipProvider>
  );
};