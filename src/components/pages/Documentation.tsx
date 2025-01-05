import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Documentation = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Documentação</h1>
      <Tabs defaultValue="getting-started">
        <TabsList className="mb-4">
          <TabsTrigger value="getting-started">Começando</TabsTrigger>
          <TabsTrigger value="features">Funcionalidades</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Primeiros Passos</h2>
            <div className="prose dark:prose-invert">
              <p>
                Bem-vindo ao sistema de monitoramento de alterações fiscais. Este guia
                irá ajudá-lo a começar a usar nossa plataforma.
              </p>
              <h3>1. Configuração Inicial</h3>
              <ul>
                <li>Faça login com suas credenciais</li>
                <li>Complete seu perfil de usuário</li>
                <li>Configure suas preferências de notificação</li>
              </ul>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Funcionalidades</h2>
            <div className="prose dark:prose-invert">
              <ul>
                <li>Dashboard interativo com visualização de dados</li>
                <li>Sistema de notificações em tempo real</li>
                <li>Exportação de relatórios em PDF</li>
                <li>Filtros avançados por estado e período</li>
                <li>Mapa interativo do Brasil</li>
              </ul>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Documentação da API</h2>
            <div className="prose dark:prose-invert">
              <p>
                Nossa API REST permite integrar os dados de alterações fiscais
                com seus sistemas internos.
              </p>
              <pre className="bg-muted p-4 rounded-lg">
                GET /api/changes
                POST /api/notifications
                GET /api/states
              </pre>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};