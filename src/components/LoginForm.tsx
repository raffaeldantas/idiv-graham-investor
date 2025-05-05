
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

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast({
        title: "Campos em branco",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Login efetuado",
        description: "Você foi autenticado com sucesso",
      });
      
      // Login é gerenciado pelo listener de auth do Supabase em App.tsx
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Erro de login:", error);
      toast({
        title: "Erro no login",
        description: error.message || "Email ou senha incorretos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast({
        title: "Email necessário",
        description: "Por favor, informe seu email para resetar a senha",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });

      if (error) throw error;

      toast({
        title: "Email enviado",
        description: "Siga as instruções no email para resetar sua senha",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível enviar o email de reset",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Senha</Label>
          <button 
            type="button"
            onClick={handleResetPassword}
            className="text-xs text-primary hover:underline"
          >
            Esqueceu a senha?
          </button>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remember" 
          checked={rememberMe} 
          onCheckedChange={(checked) => setRememberMe(checked as boolean)} 
        />
        <Label htmlFor="remember" className="text-sm font-normal">
          Lembrar de mim
        </Label>
      </div>

      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full group"
      >
        {isLoading ? "Entrando..." : "Entrar"}
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
};

export default LoginForm;
