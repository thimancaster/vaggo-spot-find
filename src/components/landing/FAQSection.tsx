
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function FAQSection() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Como funciona o VAGGO?",
      answer: "É simples! Você abre o app, procura vagas próximas ao seu destino, reserva a vaga desejada e se dirige ao local. O pagamento é automático."
    },
    {
      question: "É seguro deixar meu carro nas vagas do VAGGO?",
      answer: "Sim! Todas as vagas são verificadas e muitas possuem câmeras de segurança. Além disso, trabalhamos apenas com estacionamentos licenciados."
    },
    {
      question: "Posso cancelar uma reserva?",
      answer: "Sim, você pode cancelar gratuitamente até 15 minutos antes do horário reservado."
    },
    {
      question: "Qual a diferença entre o plano gratuito e premium?",
      answer: "O plano gratuito permite 1 veículo e reservas básicas. O Premium oferece veículos ilimitados, reserva antecipada, suporte prioritário e mais benefícios."
    },
    {
      question: "O VAGGO está disponível em quais cidades?",
      answer: "Atualmente estamos nas principais capitais do Brasil, com expansão constante para novas cidades."
    }
  ];

  return (
    <section id="faq" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-muted-foreground">
            Tire suas dúvidas sobre o VAGGO
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader
                className="cursor-pointer hover:bg-secondary/50 transition-colors"
                onClick={() => setFaqOpen(faqOpen === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                  <ArrowRight 
                    className={`text-accent w-5 h-5 transition-transform ${
                      faqOpen === index ? 'transform rotate-90' : ''
                    }`} 
                  />
                </div>
              </CardHeader>
              {faqOpen === index && (
                <CardContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
