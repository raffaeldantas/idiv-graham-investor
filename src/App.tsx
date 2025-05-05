
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Plans from "./pages/Plans";
import NotFound from "./pages/NotFound";
import { useState, createContext, useContext, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

// Create authentication context
type AuthContextType = {
  isAuthenticated: boolean;
  hasSubscription: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  setSubscription: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, hasSubscription } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasSubscription, setHasSubscription] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  
  // Inicializa o estado de autenticação com base no Supabase
  useEffect(() => {
    // Primeiro verificamos se há uma sessão existente
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
        setUser(session.user);
        
        // Buscar o status da assinatura do usuário
        supabase
          .from('profiles')
          .select('has_subscription')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (!error && data) {
              setHasSubscription(data.has_subscription);
            }
          });
      }
    });

    // Configura o listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setIsAuthenticated(true);
          setUser(session.user);
          
          // Buscar o status da assinatura quando o usuário faz login
          setTimeout(() => {
            supabase
              .from('profiles')
              .select('has_subscription')
              .eq('id', session.user.id)
              .single()
              .then(({ data, error }) => {
                if (!error && data) {
                  setHasSubscription(data.has_subscription);
                }
              });
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          setUser(null);
          setHasSubscription(false);
        }
      }
    );

    // Limpeza do listener quando o componente é desmontado
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const login = () => setIsAuthenticated(true);
  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setHasSubscription(false);
    setUser(null);
  };
  
  const setSubscription = async (value: boolean) => {
    if (user) {
      // Atualiza o valor no banco de dados
      await supabase
        .from('profiles')
        .update({ has_subscription: value })
        .eq('id', user.id);
      
      // Atualiza o estado local
      setHasSubscription(value);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, hasSubscription, user, login, logout, setSubscription }}>
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
