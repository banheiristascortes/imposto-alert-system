import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

interface AdvancedFiltersProps {
  onFilterChange: (filters: {
    startDate: Date | undefined;
    endDate: Date | undefined;
    tipo: string;
  }) => void;
}

export const AdvancedFilters = ({ onFilterChange }: AdvancedFiltersProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [tipo, setTipo] = useState("todos");

  const handleFilterChange = () => {
    onFilterChange({
      startDate,
      endDate,
      tipo,
    });
  };

  return (
    <div className="flex flex-wrap gap-4 items-center mb-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            {startDate ? format(startDate, "dd/MM/yyyy") : "Data inicial"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={setStartDate}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            {endDate ? format(endDate, "dd/MM/yyyy") : "Data final"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={setEndDate}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>

      <select
        className="border rounded-md px-3 py-2"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      >
        <option value="todos">Todos os tipos</option>
        <option value="ICMS">ICMS</option>
        <option value="ISS">ISS</option>
        <option value="PIS/COFINS">PIS/COFINS</option>
      </select>

      <Button onClick={handleFilterChange} className="gap-2">
        <Filter className="h-4 w-4" />
        Aplicar Filtros
      </Button>
    </div>
  );
};