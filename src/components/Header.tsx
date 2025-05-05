
import { TrendingUp, DollarSign, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-secondary/90 border-b border-white/5 backdrop-blur-md text-foreground py-4 px-6 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-lg pulse-glow">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <h1 className={`font-bold ${isMobile ? 'text-xl' : 'text-2xl'} flex items-center gap-2`}>
            <span>IDIV</span>
            <span className="text-primary">Graham</span>
            <DollarSign className="w-5 h-5 text-finance-positive" />
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          {!isMobile && (
            <span className="text-xs opacity-80 bg-black/20 py-1 px-3 rounded-full border border-white/10">
              Analisando ações do IDIV pelo método Graham
            </span>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full font-medium text-foreground border-primary/50 hover:bg-primary/20 hover:text-primary"
            asChild
          >
            <Link to="/" className="flex items-center gap-1.5">
              <UserCircle className="w-4 h-4" />
              {isMobile ? "Login" : "Login / Cadastro"}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
