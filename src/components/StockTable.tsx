
import { useState } from "react";
import { StockData, formatCurrency, formatPercentage } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StockTableProps {
  stocks: StockData[];
}

type SortField = 'papel' | 'cotacao' | 'valorIntrinseco' | 'desconto' | 'pl' | 'divYield';
type SortDirection = 'asc' | 'desc';

const StockTable = ({ stocks }: StockTableProps) => {
  const [sortField, setSortField] = useState<SortField>('desconto');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    const sortOrder = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * sortOrder;
    }
    
    return ((aValue as number) - (bValue as number)) * sortOrder;
  });

  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? (
      <ArrowUp className="h-3 w-3 ml-1 inline text-primary" />
    ) : (
      <ArrowDown className="h-3 w-3 ml-1 inline text-primary" />
    );
  };

  return (
    <div className="relative overflow-x-auto rounded-lg border border-white/10 shadow-md">
      <Table className="finance-table">
        <TableHeader className="bg-secondary/80">
          <TableRow className="border-b border-white/10 hover:bg-primary/5">
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('papel')}
            >
              Papel
              <SortIndicator field="papel" />
            </TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Setor</TableHead>
            <TableHead 
              className="cursor-pointer text-right"
              onClick={() => handleSort('cotacao')}
            >
              Cotação
              <SortIndicator field="cotacao" />
            </TableHead>
            <TableHead className="text-right">LPA</TableHead>
            <TableHead className="text-right">VPA</TableHead>
            <TableHead 
              className="cursor-pointer text-right"
              onClick={() => handleSort('valorIntrinseco')}
            >
              Valor Int.
              <SortIndicator field="valorIntrinseco" />
            </TableHead>
            <TableHead 
              className="cursor-pointer text-right"
              onClick={() => handleSort('desconto')}
            >
              Desconto
              <SortIndicator field="desconto" />
            </TableHead>
            <TableHead 
              className="cursor-pointer text-right"
              onClick={() => handleSort('pl')}
            >
              P/L
              <SortIndicator field="pl" />
            </TableHead>
            <TableHead 
              className="cursor-pointer text-right"
              onClick={() => handleSort('divYield')}
            >
              Div. Yield
              <SortIndicator field="divYield" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStocks.map((stock) => (
            <TableRow 
              key={stock.papel} 
              className="border-b border-white/5 hover:bg-primary/5"
            >
              <TableCell className="font-mono font-medium text-primary">{stock.papel}</TableCell>
              <TableCell>{stock.empresa}</TableCell>
              <TableCell className="opacity-80 italic">{stock.setor}</TableCell>
              <TableCell className="text-right">{formatCurrency(stock.cotacao)}</TableCell>
              <TableCell className="text-right">{stock.lpa.toFixed(2)}</TableCell>
              <TableCell className="text-right">{stock.vpa.toFixed(2)}</TableCell>
              <TableCell className="text-right">{formatCurrency(stock.valorIntrinseco)}</TableCell>
              <TableCell className={`text-right font-medium ${
                stock.desconto > 0 
                  ? "text-finance-positive" 
                  : "text-finance-negative"
              }`}>
                {formatPercentage(stock.desconto)}
              </TableCell>
              <TableCell className="text-right">{stock.pl.toFixed(2)}</TableCell>
              <TableCell className="text-right">{formatPercentage(stock.divYield)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StockTable;
