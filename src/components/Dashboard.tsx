
import { useState } from "react";
import { idivStocks } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StockTable from "./StockTable";
import StockList from "./StockList";
import { Info, TrendingUp, LineChart, CreditCard } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [view, setView] = useState<"table" | "cards">("table");
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Auto-switch to cards view on mobile
  useState(() => {
    if (isMobile) {
      setView("cards");
    }
  });

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <LineChart className="w-6 h-6 text-primary" />
            Análise Graham - Ações IDIV
          </h2>
          <p className="text-muted-foreground">
            Descubra ações potencialmente subavaliadas usando a metodologia de Benjamin Graham
          </p>
        </div>
        <Button
          onClick={() => navigate("/plans")}
          variant="outline"
          className="border-primary/30 bg-primary/10 hover:bg-primary/20 self-start md:self-auto"
        >
          <CreditCard className="mr-2 h-4 w-4" /> Assinar plano premium
        </Button>
      </div>

      <Card className="mb-6 finance-card">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="flex items-center gap-2 text-primary">
            <TrendingUp size={18} /> 
            Fórmula de Graham
          </CardTitle>
          <CardDescription className="opacity-80">
            A fórmula simplificada calcula o valor intrínseco das ações usando: 
            <code className="ml-2 bg-primary/20 px-2 py-0.5 rounded text-sm">
              Valor Intrínseco = √(22,5 × LPA × VPA)
            </code>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
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
        <TabsList className="bg-secondary/60 border border-white/10">
          <TabsTrigger value="table" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            Visualização em Tabela
          </TabsTrigger>
          <TabsTrigger value="cards" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            Visualização em Cards
          </TabsTrigger>
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
