import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ExportButton } from "./ExportButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FilterBarProps {
  onSearch: (term: string) => void;
  onExport: () => void;
}

export const FilterBar = ({ onSearch, onExport }: FilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
      <TooltipProvider>
        <div className="relative flex-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar alterações..."
                  className="pl-9"
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Busque por estado, tipo ou descrição da alteração</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <div className="flex gap-2">
        <ExportButton />
      </div>
    </div>
  );
};