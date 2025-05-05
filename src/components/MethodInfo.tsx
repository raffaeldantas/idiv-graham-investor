
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

interface MethodInfoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MethodInfo = ({ open, onOpenChange }: MethodInfoProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Método de Graham</DialogTitle>
          <DialogDescription>
            Entenda como a análise de valor intrínseco funciona
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <h4 className="font-medium">O que é o método de Graham?</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Benjamin Graham, conhecido como o "pai do investimento em valor", desenvolveu métodos para
              identificar ações potencialmente subavaliadas no mercado. Uma de suas abordagens envolve
              calcular o valor intrínseco de uma ação.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium">A Fórmula</h4>
            <div className="bg-muted p-3 rounded-md text-center my-2">
              <p className="font-medium">Valor Intrínseco = √(22,5 × LPA × VPA)</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Onde:<br />
              LPA = Lucro por Ação<br />
              VPA = Valor Patrimonial por Ação<br />
              22,5 = Representa um P/L de 15 e um P/VPA de 1,5 (15 × 1,5)
            </p>
          </div>
          
          <div>
            <h4 className="font-medium">O Desconto</h4>
            <p className="text-sm text-muted-foreground mt-1">
              O desconto é calculado como a diferença percentual entre o valor intrínseco e a cotação atual:
            </p>
            <div className="bg-muted p-3 rounded-md text-center my-2">
              <p className="font-medium">Desconto = (Valor Intrínseco - Cotação) / Cotação × 100%</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Um desconto positivo sugere que a ação pode estar abaixo do seu valor justo, segundo essa metodologia.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium">Limitações</h4>
            <p className="text-sm text-muted-foreground mt-1">
              A fórmula de Graham é uma simplificação e deve ser usada como um ponto de partida, não como único critério
              de investimento. É recomendado combinar essa análise com outros indicadores e análise qualitativa da empresa.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MethodInfo;
