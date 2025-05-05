
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Plans from "./pages/Plans";
import NotFound from "./pages/NotFound";
import { useState, createContext, useContext } from "react";

// Create authentication context
type AuthContextType = {
  isAuthenticated: boolean;
  hasSubscription: boolean;  // Adicionado para controlar o status da assinatura
  login: () => void;
  logout: () => void;
  setSubscription: (value: boolean) => void; // Adicionado para atualizar o status da assinatura
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Protected route component - agora verifica se o usuário tem assinatura
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, hasSubscription } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // Se autenticado mas sem assinatura, redireciona para a página de planos
  if (!hasSubscription) {
    return <Navigate to="/plans" replace />;
  }
  
  return <>{children}</>;
};

// Rota que requer apenas autenticação, sem verificar assinatura
const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => {
  // Simple authentication state (would be replaced by real auth in production)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasSubscription, setHasSubscription] = useState<boolean>(false);
  
  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    setHasSubscription(false);
  };
  const setSubscription = (value: boolean) => setHasSubscription(value);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, hasSubscription, login, logout, setSubscription }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/plans" 
                element={
                  <AuthenticatedRoute>
                    <Plans />
                  </AuthenticatedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
