
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQSectionProps {
  faqOpen: number | null;
  setFaqOpen: (index: number | null) => void;
}

export function FAQSection({ faqOpen, setFaqOpen }: FAQSectionProps) {
  const faqs = [
    {
      question: 'Como funciona o sistema de reservas?',
      answer: 'Você pode reservar uma vaga com até 24h de antecedência. Basta selecionar a vaga desejada, escolher o horário e fazer o pagamento pelo app.'
    },
    {
      question: 'Posso cancelar uma reserva?',
      answer: 'Sim! Você pode cancelar sua reserva até 2 horas antes do horário marcado e receber o reembolso total.'
    },
    {
      question: 'Como são verificadas as vagas?',
      answer: 'Todas as vagas em nossa plataforma são verificadas por nossa equipe e parceiros certificados. Garantimos que todas estão disponíveis e seguras.'
    },
    {
      question: 'Quais formas de pagamento aceitas?',
      answer: 'Aceitamos cartão de crédito, débito, PIX e carteiras digitais como PayPal e PicPay.'
    },
    {
      question: 'O que acontece se a vaga estiver ocupada?',
      answer: 'Em casos raros onde isso acontece, nosso suporte encontra uma alternativa imediata ou oferece reembolso total.'
    }
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
            Perguntas Frequentes
          </h2>
          <p className="text-xl" style={{ color: 'rgb(var(--text-secondary))' }}>
            Tudo que você precisa saber sobre o VAGGO.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border rounded-lg overflow-hidden"
              style={{ borderColor: 'rgb(var(--border-neutral) / 0.2)' }}
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center hover:opacity-80 transition-opacity"
                onClick={() => setFaqOpen(faqOpen === index ? null : index)}
              >
                <span className="font-semibold text-lg" style={{ color: 'rgb(var(--text-primary))' }}>
                  {faq.question}
                </span>
                {faqOpen === index ? (
                  <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: 'rgb(var(--highlight-primary))' }} />
                ) : (
                  <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: 'rgb(var(--highlight-primary))' }} />
                )}
              </button>
              {faqOpen === index && (
                <div className="px-6 pb-6">
                  <p style={{ color: 'rgb(var(--text-secondary))' }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
