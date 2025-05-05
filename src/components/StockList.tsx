
import { StockData } from "@/lib/data";
import StockCard from "./StockCard";

interface StockListProps {
  stocks: StockData[];
}

const StockList = ({ stocks }: StockListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stocks.map((stock) => (
        <StockCard key={stock.papel} stock={stock} />
      ))}
    </div>
  );
};

export default StockList;
