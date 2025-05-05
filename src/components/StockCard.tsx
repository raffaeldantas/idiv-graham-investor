
import { StockData, formatCurrency, formatPercentage } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StockCardProps {
  stock: StockData;
}

const StockCard = ({ stock }: StockCardProps) => {
  const isUndervalued = stock.desconto > 0;
  
  return (
    <Card className="w-full shadow-md hover:shadow-lg finance-card hover:border-primary/30 transition-all">
      <CardHeader className="pb-2 border-b border-white/5">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <span className="ticker-text text-primary">{stock.papel}</span>
              <span className="text-xs font-normal text-muted-foreground opacity-80">
                {stock.empresa}
              </span>
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1 italic">{stock.setor}</p>
          </div>
          <Badge className={isUndervalued ? "bg-finance-positive border-finance-positive/30" : "bg-finance-negative border-finance-negative/30"}>
            {isUndervalued ? (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Subavaliada</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>Sobreavaliada</span>
              </div>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Cotação:</p>
            <p className="font-medium">{formatCurrency(stock.cotacao)}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Valor Intrínseco:</p>
            <p className="font-medium">{formatCurrency(stock.valorIntrinseco)}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">LPA:</p>
            <p className="font-medium">{stock.lpa.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">VPA:</p>
            <p className="font-medium">{stock.vpa.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">P/L:</p>
            <p className="font-medium">{stock.pl.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-0.5">Div. Yield:</p>
            <p className="font-medium">{formatPercentage(stock.divYield)}</p>
          </div>
          <div className="col-span-2 mt-2 pt-3 border-t border-white/5">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground text-xs">Desconto:</p>
              <p className={`font-semibold text-base ${
                stock.desconto > 0 
                  ? "text-finance-positive" 
                  : "text-finance-negative"
              }`}>
                {formatPercentage(stock.desconto)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockCard;
