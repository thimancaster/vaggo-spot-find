import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface WalletData {
  id: string;
  user_id: string;
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'deposito' | 'reserva' | 'estorno';
  description: string | null;
  reservation_id: string | null;
  stripe_payment_intent_id: string | null;
  created_at: string;
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingCredit, setAddingCredit] = useState(false);
  const { user } = useAuth();

  const fetchWallet = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching wallet:', error);
        toast.error('Erro ao carregar carteira');
        return;
      }

      // If no wallet exists, create one
      if (!data) {
        const { data: newWallet, error: createError } = await supabase
          .from('wallets')
          .insert({ user_id: user.id, balance: 0 })
          .select()
          .single();

        if (createError) {
          console.error('Error creating wallet:', createError);
          toast.error('Erro ao criar carteira');
          return;
        }

        setWallet(newWallet);
      } else {
        setWallet(data);
      }
    } catch (err) {
      console.error('Wallet fetch error:', err);
      toast.error('Erro ao carregar carteira');
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching transactions:', error);
        toast.error('Erro ao carregar histórico');
        return;
      }

      setTransactions(data as Transaction[] || []);
    } catch (err) {
      console.error('Transactions fetch error:', err);
      toast.error('Erro ao carregar histórico');
    }
  };

  const addCredit = async (amount: number) => {
    if (!user) {
      toast.error('Usuário não autenticado');
      return null;
    }

    setAddingCredit(true);
    try {
      const { data, error } = await supabase.functions.invoke('add-credit-pix', {
        body: { amount }
      });

      if (error) {
        console.error('Error adding credit:', error);
        toast.error('Erro ao processar pagamento PIX');
        return null;
      }

      toast.success('Pagamento PIX criado com sucesso!');
      return data;
    } catch (err) {
      console.error('Add credit error:', err);
      toast.error('Erro ao adicionar crédito');
      return null;
    } finally {
      setAddingCredit(false);
    }
  };

  const payWithWallet = async (spotId: string, vehicleId: string, duration: number, price: number) => {
    if (!user) {
      toast.error('Usuário não autenticado');
      return null;
    }

    if (!wallet || wallet.balance < price) {
      toast.error('Saldo insuficiente na carteira');
      return null;
    }

    try {
      const { data, error } = await supabase.functions.invoke('process-wallet-payment', {
        body: { 
          spotId, 
          vehicleId, 
          duration, 
          price 
        }
      });

      if (error) {
        console.error('Error processing wallet payment:', error);
        toast.error('Erro ao processar pagamento');
        return null;
      }

      toast.success('Reserva criada com sucesso!');
      
      // Refresh wallet and transactions
      await fetchWallet();
      await fetchTransactions();
      
      return data;
    } catch (err) {
      console.error('Wallet payment error:', err);
      toast.error('Erro ao processar pagamento');
      return null;
    }
  };

  useEffect(() => {
    fetchWallet();
    fetchTransactions();
  }, [user]);

  // Set up real-time subscription for wallet updates
  useEffect(() => {
    if (!user) return;

    const walletSubscription = supabase
      .channel('wallet-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'wallets',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchWallet();
        }
      )
      .subscribe();

    const transactionSubscription = supabase
      .channel('transaction-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'transactions',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchTransactions();
        }
      )
      .subscribe();

    return () => {
      walletSubscription.unsubscribe();
      transactionSubscription.unsubscribe();
    };
  }, [user]);

  return {
    wallet,
    transactions,
    loading,
    addingCredit,
    addCredit,
    payWithWallet,
    refetch: () => {
      fetchWallet();
      fetchTransactions();
    }
  };
}