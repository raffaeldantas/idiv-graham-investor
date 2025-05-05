
import { StockData } from "@/lib/data";
import StockCard from "./StockCard";
import { motion } from "framer-motion";

interface StockListProps {
  stocks: StockData[];
}

const StockList = ({ stocks }: StockListProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1, duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {stocks.map((stock, index) => (
        <motion.div
          key={stock.papel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="h-full"
        >
          <StockCard stock={stock} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StockList;
