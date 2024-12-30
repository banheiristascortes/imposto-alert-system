import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download } from "lucide-react";

interface FilterBarProps {
  onSearch: (term: string) => void;
  onExport: () => void;
}

export const FilterBar = ({ onSearch, onExport }: FilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar alterações..."
          className="pl-9"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Button variant="outline" onClick={onExport}>
        <Download className="mr-2 h-4 w-4" />
        Exportar
      </Button>
    </div>
  );
};