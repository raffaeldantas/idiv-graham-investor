
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
    
    // Simulate login (in a real app, you'd connect to your backend)
    try {
      // Mock successful login
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Login efetuado",
        description: "Você foi autenticado com sucesso",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
          <a 
            href="#" 
            className="text-xs text-primary hover:underline"
          >
            Esqueceu a senha?
          </a>
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
