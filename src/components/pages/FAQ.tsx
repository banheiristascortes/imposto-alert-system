import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const faqData = [
  {
    question: "Como funciona o sistema de notificações?",
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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Perguntas Frequentes</h1>
      <Card className="p-6">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
};