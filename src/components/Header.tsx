
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          <h1 className={`font-bold ${isMobile ? 'text-xl' : 'text-2xl'}`}>
            IDIV Graham Investor
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          {!isMobile && (
            <span className="text-sm opacity-90">
              Analisando ações do IDIV com método de Graham
            </span>
          )}
          <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30">
            {isMobile ? "Info" : "Sobre o método"}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
