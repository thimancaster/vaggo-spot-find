
import { useState } from 'react';
import { Send, HelpCircle, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

export function SupportPage() {
  const [selectedFaq, setSelectedFaq] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const faqs = [
    {
      id: '1',
      question: 'Como funciona a reserva de vagas?',
      answer: 'Selecione uma vaga no mapa e clique em "Reservar vaga". A reserva será válida por 1 hora e você será cobrado conforme o valor da zona.'
    },
    {
      id: '2',
      question: 'Como adicionar um veículo?',
      answer: 'Vá para "Gerenciar veículos" e clique em "Adicionar veículo". Digite a placa do seu carro no formato ABC1234 ou ABC1D23.'
    },
    {
      id: '3',
      question: 'Qual a diferença entre os planos?',
      answer: 'O plano gratuito permite 1 veículo e reservas básicas. O plano Premium oferece veículos ilimitados, reserva antecipada e suporte prioritário.'
    },
    {
      id: '4',
      question: 'Posso cancelar uma reserva?',
      answer: 'Atualmente as reservas não podem ser canceladas, mas em breve teremos essa funcionalidade no plano Premium.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Preencha todos os campos",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Mensagem enviada!",
      description: "Recebemos sua mensagem e responderemos em breve.",
    });

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#081C2D] pb-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <h1 className="text-xl font-bold text-white">Suporte</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* FAQ Section */}
        <div>
          <h2 className="text-white font-semibold mb-4 flex items-center">
            <HelpCircle className="w-5 h-5 mr-2 text-[#7CFC00]" />
            Perguntas Frequentes
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-600 rounded-xl overflow-hidden">
                <button
                  onClick={() => setSelectedFaq(selectedFaq === faq.id ? null : faq.id)}
                  className="w-full p-4 text-left bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{faq.question}</span>
                    <span className="text-[#7CFC00] text-xl">
                      {selectedFaq === faq.id ? '−' : '+'}
                    </span>
                  </div>
                </button>
                {selectedFaq === faq.id && (
                  <div className="p-4 bg-gray-750 border-t border-gray-600">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-white font-semibold mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-[#7CFC00]" />
            Entre em Contato
          </h2>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-gray-700 border-gray-500 text-white placeholder-gray-400"
                  placeholder="Seu nome"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-white">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-700 border-gray-500 text-white placeholder-gray-400"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-white">Mensagem</Label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full h-24 px-3 py-2 bg-gray-700 border border-gray-500 rounded-md text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#7CFC00] focus:border-transparent"
                  placeholder="Descreva sua dúvida ou problema..."
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-[#7CFC00] hover:bg-[#6BD300] text-[#081C2D] font-bold h-12 rounded-xl"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
