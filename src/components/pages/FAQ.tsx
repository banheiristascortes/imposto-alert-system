import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqData = [
  {
    question: "Como o sistema monitora alterações fiscais?",
    answer: "O sistema monitora automaticamente alterações fiscais e envia notificações em tempo real sobre mudanças relevantes para o seu negócio."
  },
  {
    question: "Como exportar relatórios?",
    answer: "Você pode exportar relatórios em PDF através do botão 'Exportar' localizado no topo do dashboard."
  },
  {
    question: "Como filtrar alterações por estado?",
    answer: "Utilize os filtros disponíveis no topo do dashboard para selecionar estados específicos e períodos de tempo."
  },
  {
    question: "Como atualizar minhas preferências de notificação?",
    answer: "Acesse seu perfil de usuário e navegue até a seção 'Preferências de Notificação' para personalizar suas configurações."
  }
];

export const FAQ = () => {
  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-200">Perguntas Frequentes</h1>
      <Card className="p-6 shadow-lg bg-white dark:bg-gray-900">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-800 dark:text-gray-200">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
};

export default FAQ;