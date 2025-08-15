import { useState } from 'react';
import { ArrowLeft, Plus, Wallet, CreditCard, History, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWallet } from '@/hooks/useWallet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function WalletPage() {
  const { wallet, transactions, loading, addingCredit, addCredit, refetch } = useWallet();
  const [creditAmount, setCreditAmount] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddCredit = async () => {
    const amount = parseFloat(creditAmount);
    if (isNaN(amount) || amount <= 0) {
      return;
    }

    const result = await addCredit(amount);
    if (result) {
      setCreditAmount('');
      setDialogOpen(false);
      // Here you could open the PIX QR code or payment instructions
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposito':
        return <Plus className="h-4 w-4 text-green-600" />;
      case 'reserva':
        return <CreditCard className="h-4 w-4 text-red-600" />;
      case 'estorno':
        return <RefreshCw className="h-4 w-4 text-blue-600" />;
      default:
        return <History className="h-4 w-4" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposito':
        return 'text-green-600';
      case 'reserva':
        return 'text-red-600';
      case 'estorno':
        return 'text-blue-600';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case 'deposito':
        return 'Depósito';
      case 'reserva':
        return 'Reserva';
      case 'estorno':
        return 'Estorno';
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            <h1 className="text-xl font-bold">Minha Carteira</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Saldo Disponível</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={refetch}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">
                  R$ {wallet?.balance?.toFixed(2) || '0,00'}
                </p>
                <p className="text-primary-foreground/80">
                  Última atualização: {wallet?.updated_at ? format(new Date(wallet.updated_at), 'dd/MM/yyyy HH:mm', { locale: ptBR }) : 'N/A'}
                </p>
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Adicionar Crédito
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Crédito via PIX</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Valor (R$)</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="1"
                        placeholder="0,00"
                        value={creditAmount}
                        onChange={(e) => setCreditAmount(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={handleAddCredit} 
                      disabled={addingCredit || !creditAmount}
                      className="w-full"
                    >
                      {addingCredit ? (
                        <>
                          <LoadingSpinner />
                          Processando...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Gerar PIX
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Histórico de Transações
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma transação encontrada</p>
                <p className="text-sm">Adicione créditos para começar a usar sua carteira</p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <p className="font-medium">
                          {getTransactionTypeLabel(transaction.type)}
                        </p>
                        {transaction.description && (
                          <p className="text-sm text-muted-foreground">
                            {transaction.description}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(transaction.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                        {transaction.amount >= 0 ? '+' : ''}R$ {transaction.amount.toFixed(2)}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {getTransactionTypeLabel(transaction.type)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}