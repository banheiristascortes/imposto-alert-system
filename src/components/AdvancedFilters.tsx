import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

interface AdvancedFiltersProps {
  onFilterChange: (filters: {
    startDate?: Date;
    endDate?: Date;
    type?: string;
  }) => void;
}

export const AdvancedFilters = ({ onFilterChange }: AdvancedFiltersProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [type, setType] = useState<string>("all");

  const handleDateChange = (field: "start" | "end", date?: Date) => {
    if (field === "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    onFilterChange({ startDate, endDate, type });
  };

  const handleTypeChange = (newType: string) => {
    setType(newType);
    onFilterChange({ startDate, endDate, type: newType });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? (
                format(startDate, "PPP", { locale: ptBR })
              ) : (
                "Data inicial"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => handleDateChange("start", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "PPP", { locale: ptBR }) : "Data final"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={(date) => handleDateChange("end", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <select
          className="border rounded-md px-3 py-2"
          value={type}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="all">Todos os tipos</option>
          <option value="ICMS">ICMS</option>
          <option value="ISS">ISS</option>
          <option value="PIS/COFINS">PIS/COFINS</option>
        </select>
      </div>
    </div>
  );
};