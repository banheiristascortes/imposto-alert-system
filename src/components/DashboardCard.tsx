import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case "teal":
        return "bg-brand-teal-light hover:bg-brand-teal text-brand-teal-dark";
      case "purple":
        return "bg-brand-purple-light hover:bg-brand-purple text-brand-purple-dark";
      case "yellow":
        return "bg-brand-yellow-light hover:bg-brand-yellow text-brand-yellow-dark";
      default:
        return "bg-brand-teal-light hover:bg-brand-teal text-brand-teal-dark";
    }
  };

  return (
    <TooltipProvider>
      <Card className={cn(
        "p-6 transition-all duration-300 hover:shadow-lg",
        getVariantClasses(variant)
      )}>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <p className="text-3xl font-bold animate-fadeIn">
          {value}
        </p>
      </Card>
    </TooltipProvider>
  );
};