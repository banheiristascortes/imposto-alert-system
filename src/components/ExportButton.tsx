import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toPDF } from "react-to-pdf";
import { useToast } from "@/hooks/use-toast";

export const ExportButton = () => {
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      await toPDF("dashboard-content", {
        filename: "relatorio-alteracoes.pdf",
      });
      
      toast({
        title: "Exportação concluída",
        description: "O relatório foi gerado com sucesso.",
      });
    } catch (error) {
      console.error("Erro na exportação:", error);
      toast({
        title: "Erro na exportação",
        description: "Não foi possível gerar o relatório.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleExport} variant="outline" className="ml-2">
      <Download className="mr-2 h-4 w-4" />
      Exportar PDF
    </Button>
  );
};