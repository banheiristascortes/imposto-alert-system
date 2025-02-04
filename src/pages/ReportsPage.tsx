import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, BarChart, LineChart, PieChart } from "lucide-react";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const ReportsPage = () => {
  const { data: reportData, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: () => api.getTaxChanges(),
  });

  console.log("Reports data loaded:", reportData);

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-800 dark:text-gray-200">Relatórios</h1>
      
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="mb-8 flex justify-center space-x-4">
          <TabsTrigger value="summary" className="flex items-center space-x-2 px-4 py-2">
            <FileText className="w-5 h-5" />
            <span>Resumo</span>
          </TabsTrigger>
          <TabsTrigger value="monthly" className="flex items-center space-x-2 px-4 py-2">
            <BarChart className="w-5 h-5" />
            <span>Mensal</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center space-x-2 px-4 py-2">
            <LineChart className="w-5 h-5" />
            <span>Tendências</span>
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex items-center space-x-2 px-4 py-2">
            <PieChart className="w-5 h-5" />
            <span>Distribuição</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Resumo de Alterações Fiscais</h2>
            {isLoading ? (
              <div>Carregando...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-4 bg-brand-teal/10">
                  <h3 className="text-lg font-medium mb-2">Total de Alterações</h3>
                  <p className="text-3xl font-bold">{reportData?.length || 0}</p>
                </Card>
                <Card className="p-4 bg-brand-purple/10">
                  <h3 className="text-lg font-medium mb-2">Estados Afetados</h3>
                  <p className="text-3xl font-bold">
                    {new Set(reportData?.map(change => change.state)).size || 0}
                  </p>
                </Card>
                <Card className="p-4 bg-brand-yellow/10">
                  <h3 className="text-lg font-medium mb-2">Alterações Pendentes</h3>
                  <p className="text-3xl font-bold">
                    {reportData?.filter(change => change.status === "pending").length || 0}
                  </p>
                </Card>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Relatório Mensal</h2>
            {/* Implementar gráfico de barras mensal aqui */}
            <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
              Gráfico de Alterações Mensais
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Análise de Tendências</h2>
            {/* Implementar gráfico de linha de tendências aqui */}
            <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
              Gráfico de Tendências
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Distribuição por Estado</h2>
            {/* Implementar gráfico de pizza de distribuição aqui */}
            <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
              Gráfico de Distribuição por Estado
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};