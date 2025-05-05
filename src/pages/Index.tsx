
import { useState } from "react";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import MethodInfo from "@/components/MethodInfo";
import { Button } from "@/components/ui/button";
import { Info, BookOpen } from "lucide-react";

const Index = () => {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col finance-gradient">
      <Header />
      
      <main className="flex-1 animate-fade-in pt-2">
        <Dashboard />
      </main>

      <footer className="py-4 border-t border-white/10 bg-secondary/40 backdrop-blur-md">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2025 IDIV Graham Investor</p>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs rounded-full bg-transparent border border-white/10 hover:bg-primary/10 hover:border-primary/30"
              onClick={() => setInfoOpen(true)}
            >
              <BookOpen className="h-3.5 w-3.5 mr-1.5" /> Sobre o método de Graham
            </Button>
          </div>
        </div>
      </footer>
      
      <MethodInfo open={infoOpen} onOpenChange={setInfoOpen} />
    </div>
  );
};

export default Index;
