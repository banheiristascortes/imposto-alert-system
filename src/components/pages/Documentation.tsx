import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, Settings, HelpCircle, LifeBuoy } from "lucide-react";

export const Documentation = () => {
  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-800 dark:text-gray-200">Documentação</h1>
      <Tabs defaultValue="getting-started">
        <TabsList className="mb-8 flex justify-center space-x-4">
          <TabsTrigger value="getting-started" className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[hsl(var(--brand-teal-dark))] text-white hover:bg-[hsl(var(--brand-yellow-dark))] hover:text-gray-800 transition data-[state=active]:bg-[hsl(var(--brand-purple-dark))] data-[state=active]:text-white">
            <Rocket className="w-5 h-5" />
            <span>Começando</span>
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[hsl(var(--brand-teal-dark))] text-white hover:bg-[hsl(var(--brand-yellow-dark))] hover:text-gray-800 transition data-[state=active]:bg-[hsl(var(--brand-purple-dark))] data-[state=active]:text-white">
            <Settings className="w-5 h-5" />
            <span>Funcionalidades</span>
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[hsl(var(--brand-teal-dark))] text-white hover:bg-[hsl(var(--brand-yellow-dark))] hover:text-gray-800 transition data-[state=active]:bg-[hsl(var(--brand-purple-dark))] data-[state=active]:text-white">
            <HelpCircle className="w-5 h-5" />
            <span>FAQ</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[hsl(var(--brand-teal-dark))] text-white hover:bg-[hsl(var(--brand-yellow-dark))] hover:text-gray-800 transition data-[state=active]:bg-[hsl(var(--brand-purple-dark))] data-[state=active]:text-white">
            <LifeBuoy className="w-5 h-5" />
            <span>Suporte</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started">
          <Card className="p-8 shadow-lg bg-white dark:bg-gray-900">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Primeiros Passos</h2>
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
              <h3>2. Navegação</h3>
              <p>
                Use o menu lateral para navegar entre as diferentes seções do sistema.
              </p>
              <h3>3. Personalização</h3>
              <p>
                Acesse as configurações para personalizar suas preferências e notificações.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card className="p-8 shadow-lg bg-white dark:bg-gray-900">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Funcionalidades</h2>
            <div className="prose dark:prose-invert">
              <ul>
                <li>Dashboard interativo com visualização de dados</li>
                <li>Notificações em tempo real sobre alterações fiscais</li>
                <li>Relatórios detalhados e exportáveis</li>
                <li>Configurações personalizáveis de usuário</li>
                <li>Suporte multi-usuário com diferentes níveis de acesso</li>
              </ul>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="faq">
          <Card className="p-8 shadow-lg bg-white dark:bg-gray-900">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">FAQ</h2>
            <div className="prose dark:prose-invert">
              <h3>Perguntas Frequentes</h3>
              <ul>
                <li><strong>Como faço para resetar minha senha?</strong> - Acesse a página de recuperação de senha e siga as instruções.</li>
                <li><strong>Como posso alterar minhas preferências de notificação?</strong> - Vá para as configurações do usuário e ajuste suas preferências.</li>
                <li><strong>Como entro em contato com o suporte?</strong> - Utilize a aba de suporte ou envie um email para suporte@kyros.com.br.</li>
              </ul>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="support">
          <Card className="p-8 shadow-lg bg-white dark:bg-gray-900">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Suporte</h2>
            <div className="prose dark:prose-invert">
              <p>
                Se você precisar de ajuda, entre em contato com nosso suporte técnico.
              </p>
              <h3>Contato</h3>
              <p>Email: <a href="mailto:suporte@kyros.com.br">suporte@kyros.com.br</a></p>
              <p>Telefone: (11) 1234-5678</p>
              <h3>Horário de Atendimento</h3>
              <p>Segunda a Sexta: 9h às 18h</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documentation;