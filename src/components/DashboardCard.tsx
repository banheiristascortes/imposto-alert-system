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
        return "bg-gradient-to-br from-brand-teal-light to-brand-teal text-white hover:from-brand-teal hover:to-brand-teal-dark";
      case "purple":
        return "bg-gradient-to-br from-brand-purple-light to-brand-purple text-white hover:from-brand-purple hover:to-brand-purple-dark";
      case "yellow":
        return "bg-gradient-to-br from-brand-yellow-light to-brand-yellow text-white hover:from-brand-yellow hover:to-brand-yellow-dark";
      default:
        return "bg-gradient-to-br from-brand-teal-light to-brand-teal text-white hover:from-brand-teal hover:to-brand-teal-dark";
    }
  };

  return (
    <TooltipProvider>
      <Card className={cn(
        "p-6 transition-all duration-300 hover:shadow-lg border-none",
        getVariantClasses(variant)
      )}>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold mb-2 text-white/90">{title}</h3>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-white/80 hover:text-white" />
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