
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-6 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl shadow-inner">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h1 className={`font-bold ${isMobile ? 'text-xl' : 'text-2xl'}`}>
            IDIV Graham Investor
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          {!isMobile && (
            <span className="text-sm opacity-90 bg-white/10 py-1 px-3 rounded-full">
              Analisando ações do IDIV com método de Graham
            </span>
          )}
          <Button variant="secondary" size="sm" className="rounded-full font-medium bg-white hover:bg-white/90 text-primary">
            {isMobile ? "Info" : "Sobre o método"}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
