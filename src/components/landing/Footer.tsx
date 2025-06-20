
import { Logo } from '../Logo';

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo size="md" className="mb-4" />
            <p className="text-muted-foreground">
              A solução inteligente para estacionamento urbano.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Como Funciona</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Planos</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Segurança</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Sobre</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacidade</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 VAGGO. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
