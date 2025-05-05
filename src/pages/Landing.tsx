
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

const Landing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95">
      {/* Header */}
      <header className="border-b bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-xl">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h1 className="font-bold text-2xl">IDIV Graham Investor</h1>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
            className="font-medium"
          >
            Dashboard
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column - Hero content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Invista com a estratégia de <span className="text-primary">Benjamin Graham</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Descubra ações do IDIV com desconto segundo a fórmula de valor intrínseco do pai do value investing.
            </p>
            
            <div className="space-y-4 pt-4">
              {["Análise de valor intrínseco", "Foco em ações com dividendos", "Margem de segurança"].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="bg-primary/10 p-1 rounded-full">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="pt-4">
              <Button 
                onClick={() => navigate("/dashboard")}
                className="rounded-full px-6 group"
                size="lg"
              >
                Ver análise completa
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* Right column - Auth forms */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-muted rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("login")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === "login" 
                    ? "bg-background shadow text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab("signup")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === "signup" 
                    ? "bg-background shadow text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Cadastro
                </button>
              </div>
            </div>

            <div className="mt-4">
              {activeTab === "login" ? <LoginForm /> : <SignupForm />}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-sm text-center text-muted-foreground">
          © 2025 IDIV Graham Investor. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
