
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/App";
import { supabase } from "@/integrations/supabase/client";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password) {
      toast({
        title: "Campos em branco",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    if (!agreedToTerms) {
      toast({
        title: "Termos de uso",
        description: "Você precisa concordar com os termos de uso",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 8) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 8 caracteres",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Cadastro efetuado",
        description: "Sua conta foi criada com sucesso",
      });
      
      // Redirecionamento para a página de planos
      // Login é gerenciado pelo listener de auth do Supabase em App.tsx
      navigate("/plans");
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      toast({
        title: "Erro no cadastro",
        description: error.message || "Não foi possível criar sua conta",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">
          Mínimo de 8 caracteres
        </p>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox 
          id="terms" 
          checked={agreedToTerms} 
          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)} 
        />
        <Label htmlFor="terms" className="text-xs font-normal leading-relaxed">
          Concordo com os 
          <a href="#" className="text-primary hover:underline mx-1">Termos de Serviço</a> 
          e 
          <a href="#" className="text-primary hover:underline mx-1">Política de Privacidade</a>
        </Label>
      </div>

      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full group"
      >
        {isLoading ? "Cadastrando..." : "Criar conta"}
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
};

export default SignupForm;
