
import { Car, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t py-12 px-4 sm:px-6 lg:px-8" style={{ borderColor: 'rgb(var(--border-neutral) / 0.2)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Car className="w-8 h-8" style={{ color: 'rgb(var(--highlight-primary))' }} />
              <span className="text-xl font-bold" style={{ color: 'rgb(var(--text-primary))' }}>
                VAGGO
              </span>
            </div>
            <p className="mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
              A revolução no estacionamento urbano. Encontre, reserve e pague vagas com facilidade.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
              Produto
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-highlight transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>Como funciona</a></li>
              <li><a href="#" className="hover:text-highlight transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>Planos</a></li>
              <li><a href="#" className="hover:text-highlight transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
              Suporte
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-highlight transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>FAQ</a></li>
              <li><a href="#" className="hover:text-highlight transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>Contato</a></li>
              <li><a href="#" className="hover:text-highlight transition-colors" style={{ color: 'rgb(var(--text-secondary))' }}>Ajuda</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
              Contato
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" style={{ color: 'rgb(var(--highlight-primary))' }} />
                <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  contato@vaggo.com
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" style={{ color: 'rgb(var(--highlight-primary))' }} />
                <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  (11) 99999-9999
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center" style={{ borderColor: 'rgb(var(--border-neutral) / 0.2)' }}>
          <p style={{ color: 'rgb(var(--text-secondary))' }}>
            © 2024 VAGGO. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
