import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  tooltip: string;
}

export const DashboardCard = ({ title, value, tooltip }: DashboardCardProps) => {
  return (
    <TooltipProvider>
      <Card className="p-6 transition-all duration-300 hover:shadow-lg">
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
        <p className="text-3xl font-bold text-primary-500 animate-fadeIn">{value}</p>
      </Card>
    </TooltipProvider>
  );
};