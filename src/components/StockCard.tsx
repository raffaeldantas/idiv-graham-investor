
import { StockData, formatCurrency, formatPercentage } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StockCardProps {
  stock: StockData;
}

const StockCard = ({ stock }: StockCardProps) => {
  const isUndervalued = stock.desconto > 0;
  
  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              {stock.papel}
              <span className="text-sm text-muted-foreground font-normal">
                {stock.empresa}
              </span>
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">{stock.setor}</p>
          </div>
          <Badge className={isUndervalued ? "bg-finance-positive" : "bg-finance-negative"}>
            {isUndervalued ? "Subavaliada" : "Sobreavaliada"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div>
            <p className="text-muted-foreground">Cotação:</p>
            <p className="font-medium">{formatCurrency(stock.cotacao)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Valor Intrínseco:</p>
            <p className="font-medium">{formatCurrency(stock.valorIntrinseco)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">LPA:</p>
            <p className="font-medium">{stock.lpa.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">VPA:</p>
            <p className="font-medium">{stock.vpa.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">P/L:</p>
            <p className="font-medium">{stock.pl.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Div. Yield:</p>
            <p className="font-medium">{formatPercentage(stock.divYield)}</p>
          </div>
          <div className="col-span-2 mt-2 pt-2 border-t">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">Desconto:</p>
              <p className={`font-semibold ${
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
