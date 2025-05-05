
import { useState } from "react";
import { idivStocks } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StockTable from "./StockTable";
import StockList from "./StockList";
import { Info } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const [view, setView] = useState<"table" | "cards">("table");
  const isMobile = useIsMobile();

  // Auto-switch to cards view on mobile
  useState(() => {
    if (isMobile) {
      setView("cards");
    }
  });

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Análise Graham - Ações IDIV</h2>
        <p className="text-muted-foreground">
          Encontre ações potencialmente subavaliadas usando a fórmula do Benjamin Graham
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info size={18} /> 
            Fórmula de Graham
          </CardTitle>
          <CardDescription>
            A fórmula simplificada calcula o valor intrínseco das ações usando: 
            Valor Intrínseco = √(22,5 × LPA × VPA)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Esta análise compara o valor de mercado atual com o valor intrínseco calculado.
            Um desconto positivo indica que a ação pode estar subavaliada segundo os critérios de Graham.
            Lembre-se de que essa é apenas uma análise quantitativa e deve ser complementada com outros fatores.
          </p>
        </CardContent>
      </Card>

      <Tabs 
        defaultValue={isMobile ? "cards" : "table"} 
        value={view}
        onValueChange={(v) => setView(v as "table" | "cards")}
        className="mb-6"
      >
        <TabsList>
          <TabsTrigger value="table">Visualização em Tabela</TabsTrigger>
          <TabsTrigger value="cards">Visualização em Cards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="table" className="mt-6">
          {!isMobile ? (
            <StockTable stocks={idivStocks} />
          ) : (
            <p className="text-center text-muted-foreground py-4">
              Visualização de tabela recomendada apenas em telas maiores.
              Por favor, use a visualização em cards.
            </p>
          )}
        </TabsContent>
        
        <TabsContent value="cards" className="mt-6">
          <StockList stocks={idivStocks} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
