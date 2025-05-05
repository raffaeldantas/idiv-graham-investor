import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";

const Plans = () => {
  const [isLoading, setIsLoading] = useState<{[key: string]: boolean}>({
    monthly: false,
    yearly: false
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, setSubscription } = useAuth();
  
  // Redirecionar para landing page se não estiver autenticado
  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  const handleSubscription = async (plan: 'monthly' | 'yearly') => {
    setIsLoading({ ...isLoading, [plan]: true });
    
    try {
      // Aqui será implementada a integração com o Mercado Pago após a conexão com Supabase
      
      // Simulando um atraso para mostrar o estado de carregamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Atualiza o status da assinatura no Supabase
      await setSubscription(true);
      
      toast({
        title: "Assinatura realizada",
        description: `Sua assinatura ${plan === 'monthly' ? 'mensal' : 'anual'} foi ativada com sucesso.`,
      });
      
      // Redireciona para o dashboard após a assinatura
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao processar sua assinatura.",
        variant: "destructive",
      });
      console.error("Erro na assinatura:", error);
    } finally {
      setIsLoading({ ...isLoading, [plan]: false });
    }
  };

  const features = [
    "Análise completa de todas as ações IDIV",
    "Alertas de oportunidades de investimento",
    "Análise de valor intrínseco",
    "Dashboard personalizado",
    "Suporte prioritário",
  ];

  return (
    <div className="min-h-screen flex flex-col finance-gradient">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Escolha seu plano</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Acesse análises exclusivas de ações do IDIV com a metodologia de Benjamin Graham
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plano Mensal */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-primary/20 h-full flex flex-col">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">Plano Mensal</CardTitle>
                <CardDescription>Para quem prefere flexibilidade</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">R$ 9,90</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="bg-primary/10 p-1 rounded-full">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={() => handleSubscription('monthly')}
                  disabled={isLoading.monthly}
                >
                  {isLoading.monthly ? "Processando..." : "Assinar por R$ 9,90/mês"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
          
          {/* Plano Anual */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-primary/20 bg-primary/5 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                Economize 50%
              </div>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">Plano Anual</CardTitle>
                <CardDescription>Para quem busca economia</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">R$ 59,90</span>
                  <span className="text-muted-foreground">/ano</span>
                  <div className="text-sm text-muted-foreground mt-1">
                    <span className="line-through">R$ 118,80</span>
                    <span className="ml-2">Economize R$ 58,90</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="bg-primary/20 p-1 rounded-full">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="default" 
                  className="w-full bg-primary/90 hover:bg-primary"
                  onClick={() => handleSubscription('yearly')}
                  disabled={isLoading.yearly}
                >
                  {isLoading.yearly ? "Processando..." : "Assinar por R$ 59,90/ano"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          Todos os pagamentos são processados de forma segura pelo Mercado Pago.<br />
          Você pode cancelar sua assinatura a qualquer momento.
        </div>
      </div>
    </div>
  );
};

export default Plans;
